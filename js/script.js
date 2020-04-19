	/* Menu */
	function dMenu(){
		document.getElementById('dMenu').classList.toggle('open');
		document.getElementById('menuButton').classList.toggle('open');
	}

	/* General */
	function copyClip(e, b) {
		var el, input, selection, embedId, checkButton, bBackgroundColor, bBorderColor, bColor, bText;
		if(b){
			checkButton = e.id;
			if(checkButton=="embed") {
				embedId = e.getAttribute('shortid');
			}else{
				embedId = e.parentElement.parentElement.id;
			}
			input = '<div style="width:100%;height:0px;position:relative;padding-bottom:56.327%;"><iframe src="https://streamja.com/embed/'+embedId+'" frameborder="0" width="100%" height="100%" allowfullscreen style="width:100%;height:100%;position:absolute;"></iframe></div>';
		}else{
			input = "https://streamja.com/"+e.parentElement.parentElement.parentElement.id;
		}

		el = document.createElement('textarea');
		el.value = input;

		bBackgroundColor = e.style.backgroundColor;
		bBorderColor = e.style.borderColor;
		bColor = e.style.color;
		bText = e.innerHTML;

		if(checkButton=="embed") {
			e.style.cssText = "color: #27ae60;";
		}else{
			e.style.cssText = "background-color:#27ae60;border-color:#27ae60;color:#fff;";
		}
		e.innerHTML = "Copied";

		// Prevent keyboard from showing on mobile
		el.setAttribute('readonly', '');

		el.style.contain = 'strict';
		el.style.position = 'absolute';
		el.style.left = '-9999px';
		el.style.fontSize = '12pt'; // Prevent zooming on iOS

		selection = document.getSelection();
		var originalRange = false;
		if (selection.rangeCount > 0) {
			originalRange = selection.getRangeAt(0);
		}

		document.body.appendChild(el);
		el.select();

		// Explicit selection workaround for iOS
		el.selectionStart = 0;
		el.selectionEnd = input.length;

		var successCopy = false;
		try {
			successCopy = document.execCommand('copy');
			setTimeout(function(){
				e.style.cssText = "background-color:"+bBackgroundColor+";border-color:"+bBorderColor+";color:"+bColor+";";
				e.innerHTML = bText;
			}, 3000);
		} catch (err) {}

		document.body.removeChild(el);

		if (originalRange) {
			selection.removeAllRanges();
			selection.addRange(originalRange);
		}
		return successCopy;
	}

	/* Log In */
	function logIn(e) {
		var email = e.querySelector('#email').value,
			password = e.querySelector('#password').value,
			errorDiv = document.getElementById("errorCheck"),
			submitButton = e.querySelector('button'),
			responseData;

		submitButton.innerHTML = "LOADING...";
		submitButton.setAttribute("disabled", "");

		if(email && password) {
			getAjax('/ajax/login.php', 'email='+email+'&password='+password, function(error, data) {
				if(error == null) {
					responseData = JSON.parse(data);
					if(responseData.status == 1){
						window.location.replace("/videos");
					}else{
						submitButton.innerHTML = "LOG IN";
						submitButton.removeAttribute("disabled", "");
						errorCheck.innerHTML = responseData.message;
						errorCheck.style.top = "-6px";
						setTimeout(function() {
							errorCheck.style.top = "-50px";
						}, 3000);
					}
				}
			});
		}else{
			console.log("nothing");
		}
		return false;
	}

	/* Log In */
	function signUp(e) {
		var email = e.querySelector('#email').value,
			password = e.querySelector('#password').value,
			rePassword = e.querySelector('#repassword').value,
			errorDiv = document.getElementById("errorCheck"),
			submitButton = e.querySelector('button'),
			responseData;

		submitButton.innerHTML = "LOADING...";
		submitButton.setAttribute("disabled", "");

		if(email && password && rePassword) {
			getAjax('/ajax/signup.php', 'email='+email+'&password='+password+'&repassword='+rePassword, function(error, data) {
				if(error == null) {
					responseData = JSON.parse(data);
					if(responseData.status == 1){
						window.location.replace("/videos");
					}else{
						submitButton.innerHTML = "SIGN UP";
						submitButton.removeAttribute("disabled", "");
						errorCheck.innerHTML = responseData.message;
						errorCheck.style.top = "-6px";
						setTimeout(function() {
							errorCheck.style.top = "-50px";
						}, 4000);
					}
				}
			});
		}else{
			submitButton.innerHTML = "SIGN UP";
			submitButton.removeAttribute("disabled", "");
			errorCheck.innerHTML = "Please enter all the fields.";
			errorCheck.style.top = "-6px";
			setTimeout(function() {
				errorCheck.style.top = "-50px";
			}, 4000);
		}
		return false;
	}

	/* Files */
	function fileOptions(e) {
		e.parentElement.parentElement.parentElement.querySelector('.fileActions').classList.toggle('active');
	}

	function delFile(e) {
		var id = e.parentElement.parentElement.id;
		var result = confirm("Are you sure you want to delete this video?");
		if(result) {
			if(id) {
				getAjax('/ajax/delete.php', 'id='+id, function(error, data) {
					if(error == null) {
						e.parentElement.parentElement.parentElement.style.display = "none";
					}
				});
			}
		}
	}

	function dlFile(e) {
		var id = e.parentElement.parentElement.id;
		var subStr = id.toLowerCase();
		window.location.assign("/mp4/"+subStr.substring(0, 2)+"/"+id+".mp4");
	}

	function socialLogin() {
		alert("We are currently resolving a known issue with our social login options, please try again later or use your email to sign up.");
	}

	var getAjax = function(url, data, callback) {
		var xhr = new XMLHttpRequest();
		xhr.open('POST', url, true);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
		xhr.onload = function() {
			var status = xhr.status;
			if(status === 200) {
				callback(null, xhr.response);
			}else{
				callback(status, xhr.response);
			}
		};
		xhr.send(data);
	}


	// FOR DROPZONE WHEN UPLOAD IS ON, ASK IF THEY ARE SURE ABOUT LEAVING.
	//window.onbeforeunload = function() {
	//  return "Are you sure you want to navigate away?";
	//}




