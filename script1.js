let text = document.getElementById('text');
let maxValue = 1000; // You can adjust this value to control how far the elements can move up.

window.addEventListener('scroll', () => {
    let value = window.scrollY;
    if (value <= maxValue) {
        text.style.marginTop = value * 2.5 + 'px';
    }
});