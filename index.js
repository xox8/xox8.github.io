if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(reg => {
        console.log('service worker registed!');
    }).reject(err => {
        console.log('Opooos, something wrong happend!');
    })
}
 
window.onload = function() {
    document.body.append('PWA!')
}
