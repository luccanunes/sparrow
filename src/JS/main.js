if (document.cookie == 'null') {
    cookie = prompt('Welcome! taca um nome ae')
    document.cookie = cookie;
}
const n = Math.floor(Math.random()*8 + 1);
if (n == 8) {
    // lucky you, she get's hotter every episode
}
document.querySelector('img').src = `src/imgs/${n}.jpg`
const txt = document.querySelector('.txt');
if (n == 6) {
    txt.innerText = "that's a good one kkkkkkkkkkkkkk";
}

// TODO make verifications with backend, to hide the code
// TODO take the letters from the colors
// TODO vanya has no umbrella