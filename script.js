const bins = document.querySelectorAll(".bin");
const androids = document.querySelectorAll(".android");
const scoreBoard = document.querySelector(".score");
const twoOneFive = document.querySelector("#two-one-five");
const xxx = document.querySelector("#xxx");
const nav = document.querySelectorAll('.not-game');
const misirlou = document.querySelector('.misirlou');
let lastBin;
let lasText;
let timeup = false;
let score = 0;
let start = true;
let tout = 45000;
let velocity = 1500;
let x = 2000;
let bool = 1;
let arr = ['df1s1', 'df1s2', 'df1s3', 'df2s1', 'df2s2', 'df2s3', 'df3s1', 'df3s2', 'df3s3']

// Set speed var
xxx.addEventListener('change', frustrated);
xxx.addEventListener('mousechange', frustrated);

function frustrated() {
    velocity = parseInt(xxx.value);
    x = velocity + 500;
    let vectors = [1500, 1000, 500]
    let taunts = ["Speed: I suck at this", "Speed: I still suck", "Speed: Bring it on!"]
    for (let i = 0; i < vectors.length; i++) {
        if (vectors[i] === velocity) {
            document.querySelector('.peeps').innerHTML = taunts[i];
        }
    }
}

// Set duration var
twoOneFive.addEventListener('change', parse);
twoOneFive.addEventListener('mousechange', parse);

function parse() {
    tout = parseInt(twoOneFive.value);
    let touts = [45000, 90000, 135000]
    let desc = ["Duration: I don't enjoy playing", "Duration: I am sadistic", "Duration: I love Misirlou!"]
    for (let i = 0; i < touts.length; i++) {
        if (touts[i] === tout) {
            document.querySelector('.enjoy').innerHTML = desc[i];
        }
    }
}

// Set the random place where android will peep
function randomBin(bins) {
    const idx = Math.floor(Math.random() * bins.length);
    const bin = bins[idx];
    if (bin === lastBin) {
        return randomBin(bins);
    }
    return lastBin = bin;
}

// Set the random duration of each peep
function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

// Set peep function
function peep() {
    const time = randomTime(velocity, x);
    const bin = randomBin(bins);
    bin.classList.add("up");
    setTimeout(() => {
        bin.classList.remove("up");
        if (!timeup) peep();
    }, time);
}

//End Game
function stopit() {
    start = true;
    timeup = true
    misirlou.pause();
    document.querySelector('.start').innerHTML = 'Start whacking!';
    document.querySelector('.start').removeEventListener('click', stopit);
    document.querySelector('.start').removeEventListener('click', () => {
        clearInterval(myI);
        clearTimeout(myT);
    });
    hscore();
    nerds();
}

// Start Game
function startGame() {
    if (start != false) {
        start = false;
        setTimeout(() => peep(), 1000);
        let time = parseInt(twoOneFive.value);
        let myI = setInterval(() => {
            let minutes = Math.floor((time / 1000) / 60);
            let seconds = (time / 1000) % 60;
            document.querySelector('.start').innerHTML = 'Time left - <span class="timeLeft"><span style="color: hsl(350, 70%, 55%);">00:00</span></span>';
            document.querySelector('.start').addEventListener('click', stopit);
            document.querySelector('.start').addEventListener('click', () => {
                clearInterval(myI);
                clearTimeout(myT);
            });
            if (time != 0) {
                time = time - 1000;
                document.querySelector('.timeLeft').textContent = "0" + minutes + ":" + seconds;
                if (time <= 9000) { document.querySelector('.timeLeft').style.color = 'hsl(350, 70%, 55%)'; }
            }
        }, 1000)
        timeup = false;
        score = 0;
        scoreBoard.textContent = score;
        misirlou.currentTime = 0;
        if (bool === 1) { misirlou.play(); }
        let myT = setTimeout(() => {
            stopit();
            clearInterval(myI);
        }, 2000 + tout)
        nav.forEach(li => li.addEventListener('click', stopit))
        nav.forEach(li => li.addEventListener('click', () => {
            clearInterval(myI);
            clearTimeout(myT);
        }))

    }
}

// Count Score
function hit(e) {
    if (!e.isTrusted) return;
    score++;
    scoreBoard.textContent = score;
    this.parentNode.classList.remove('up');
    const text = ['Stop it!', 'Ouch!', 'Owww', "I'm Sorry!", 'Nooo', 'I want my mommy!', '*cries*', 'Leave me be!'];
    const index = Math.floor(Math.random() * text.length);
    this.nextElementSibling.textContent = text[index];
    this.nextElementSibling.classList.add('whacked');
    setTimeout(() => this.nextElementSibling.classList.remove('whacked'), 500);
    const audio = document.querySelector('.snare');
    audio.currentTime = 0;
    audio.play();
    audio.volume = 0.5;
}
androids.forEach(android => android.addEventListener('click', hit));

// Remove overlay
function off() {
    document.getElementById("overlay").style.display = "none";
}

//Turn music  off
function music() {
    if (bool === 1) {
        bool = 0;
        document.querySelector('.img').innerHTML = '<img src="svg/off.svg" width="45px" height="45px">';
    } else if (bool === 0) {
        bool = 1;
        document.querySelector('.img').innerHTML = '<img src="svg/on.svg" width="45px" height="45px">';
    }
}

// Highscore
window.onload = function() {
    nerds();
    document.getElementById("overlay").style.display = "block";
    for (let i = 0; i < arr.length; i++) {
        if (localStorage.getItem(arr[i]) === null) {
            localStorage.setItem(arr[i], 0);
        }
    }
}

//Update Highscore
function hscore() {
    tove = tout + velocity
    toves = [46500, 46000, 45500, 91500, 91000, 90500, 136500, 136000, 135500]
    for (let i = 0; i < toves.length; i++) {
        if (toves[i] === tove) {
            let tv = parseInt(localStorage.getItem(arr[i]));
            if (tv < score) {
                localStorage.removeItem(arr[i]);
                localStorage.setItem(arr[i], score);
            }
        }
    }
}

// Display High Score
function nerds() {
    let dotnerd = ['.df1s1', '.df1s2', '.df1s3', '.df2s1', '.df2s2', '.df2s3', '.df3s1', '.df3s2', '.df3s3']
    for (let i = 0; i < arr.length; i++) {
        document.querySelector(dotnerd[i]).innerHTML = parseInt(localStorage.getItem(arr[i]));
    }
}

// animation
const sig = document.querySelectorAll('.sign');
const notSig = document.querySelectorAll('.not-sig');

function sign() {
    sig.forEach(sig => sig.classList.add('nature'));
}

function removal() {
    sig.forEach(sig => sig.classList.remove('nature'));
}

// Cheats
let activate = 0;
// a key map of allowed keys
var allowedKeys = { 65: 'A', 70: 'F', 82: 'R', 69: 'E', 78: 'N' };

// the sequence
var code = ['A', 'F', 'R', 'E', 'E', 'N'];

// a variable to remember the 'position' the user has reached so far.
var position = 0;

// add keydown event listener
document.addEventListener('keydown', function(e) {
    // get the value of the key code from the key map
    var key = allowedKeys[e.keyCode];
    // get the value of the required key from the code
    var requiredKey = code[position];

    // compare the key with the required key
    if (key == requiredKey) {

        // move to the next key in the code sequence
        position++;

        // if the last key is reached,
        if (position == code.length) {
            activate++;
            if (activate === 3) {
                PlaySong();
                activate = 0;
            }
            position = 0;
        }
    } else {
        position = 0;
    }
});

let needle = new Audio("https://github.com/ValnIlyo/Strange-Aff/blob/ValnIlyo/Strange-Aff/Needles%20And%20Pins.mp3?raw=true");

function PlaySong() {
    needle.play();
    document.getElementById("cheat").style.display = "block";
    score = 999;
    cheat();
    nerds();
};

function back() {
    document.getElementById("cheat").style.display = "none";
}

function cheat() {
    for (let i = 0; i < arr.length; i++) {
        localStorage.setItem(arr[i], score);
    }
}