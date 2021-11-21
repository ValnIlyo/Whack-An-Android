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

// Set speed var
xxx.addEventListener('change', frustrated);
xxx.addEventListener('mousechange', frustrated);

function frustrated() {
    velocity = parseInt(xxx.value);
    if (velocity === 1500) {
        document.querySelector('.peeps').innerHTML = "Speed: I suck at this";
        x = 2000;
    } else if (velocity === 1000) {
        document.querySelector('.peeps').innerHTML = "Speed: I still suck";
        x = 1500;
    } else if (velocity === 500) {
        document.querySelector('.peeps').innerHTML = "Speed: Bring it on!";
        x = 1000;
    }
}
// Set duration var

twoOneFive.addEventListener('change', parse);
twoOneFive.addEventListener('mousechange', parse);

function parse() {
    tout = parseInt(twoOneFive.value);
    if (tout === 45000) {
        document.querySelector('.enjoy').innerHTML = "Duration: I don't enjoy playing";
    } else if (tout === 90000) {
        document.querySelector('.enjoy').innerHTML = "Duration: I am sadistic";
    } else if (tout === 135000) {
        document.querySelector('.enjoy').innerHTML = "Duration: I love Misirlou!";
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

function off() {
    document.getElementById("overlay").style.display = "none";
}

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
const check1 = localStorage.getItem('df1s1');
const check2 = localStorage.getItem('df1s2');
const check3 = localStorage.getItem('df1s3');
const check4 = localStorage.getItem('df2s1');
const check5 = localStorage.getItem('df2s2');
const check6 = localStorage.getItem('df2s3');
const check7 = localStorage.getItem('df3s1');
const check8 = localStorage.getItem('df3s2');
const check9 = localStorage.getItem('df3s3');


window.onload = function() {
    nerds();
    document.getElementById("overlay").style.display = "block";
    if (check1 === null) {
        localStorage.setItem('df1s1', 0);
    }
    if (check2 === null) {
        localStorage.setItem('df1s2', 0);
    }
    if (check3 === null) {
        localStorage.setItem('df1s3', 0);
    }
    if (check4 === null) {
        localStorage.setItem('df2s1', 0);
    }
    if (check5 === null) {
        localStorage.setItem('df2s2', 0);
    }
    if (check6 === null) {
        localStorage.setItem('df2s3', 0);
    }
    if (check4 === null) {
        localStorage.setItem('df3s1', 0);
    }
    if (check5 === null) {
        localStorage.setItem('df3s2', 0);
    }
    if (check6 === null) {
        localStorage.setItem('df3s3', 0);
    }
}

function hscore() {
    if (tout === 45000 && velocity === 1500) {
        let tv = parseInt(localStorage.getItem('df1s1'));
        if (tv < score) {
            localStorage.removeItem('df1s1');
            localStorage.setItem('df1s1', score);
        }
    } else if (tout === 45000 && velocity === 1000) {
        let tv = parseInt(localStorage.getItem('df1s2'));
        if (tv < score) {
            localStorage.removeItem('df1s2');
            localStorage.setItem('df1s2', score);
        }
    } else if (tout === 45000 && velocity === 500) {
        let tv = parseInt(localStorage.getItem('df1s3'));
        if (tv < score) {
            localStorage.removeItem('df1s3');
            localStorage.setItem('df1s3', score);
        }
    } else if (tout === 90000 && velocity === 1500) {
        let tv = parseInt(localStorage.getItem('df2s1'));
        if (tv < score) {
            localStorage.removeItem('df2s1');
            localStorage.setItem('df2s1', score);
        }
    } else if (tout === 90000 && velocity === 1000) {
        let tv = parseInt(localStorage.getItem('df2s2'));
        if (tv < score) {
            localStorage.removeItem('df2s2');
            localStorage.setItem('df2s2', score);
        }
    } else if (tout === 90000 && velocity === 500) {
        let tv = parseInt(localStorage.getItem('df2s3'));
        if (tv < score) {
            localStorage.removeItem('df2s3');
            localStorage.setItem('df2s3', score);
        }
    } else if (tout === 135000 && velocity === 1500) {
        let tv = parseInt(localStorage.getItem('df3s1'));
        if (tv < score) {
            localStorage.removeItem('df3s1');
            localStorage.setItem('df3s1', score);
        }
    } else if (tout === 135000 && velocity === 1000) {
        let tv = parseInt(localStorage.getItem('df3s2'));
        if (tv < score) {
            localStorage.removeItem('df3s2');
            localStorage.setItem('df3s2', score);
        }
    } else if (tout === 135000 && velocity === 500) {
        let tv = parseInt(localStorage.getItem('df3s3'));
        if (tv < score) {
            localStorage.removeItem('df3s3');
            localStorage.setItem('df3s3', score);
        }
    }
}

function nerds() {
    document.querySelector('.df1s1').innerHTML = parseInt(localStorage.getItem('df1s1'));
    document.querySelector('.df1s2').innerHTML = parseInt(localStorage.getItem('df1s2'));
    document.querySelector('.df1s3').innerHTML = parseInt(localStorage.getItem('df1s3'));
    document.querySelector('.df2s1').innerHTML = parseInt(localStorage.getItem('df2s1'));
    document.querySelector('.df2s2').innerHTML = parseInt(localStorage.getItem('df2s2'));
    document.querySelector('.df2s3').innerHTML = parseInt(localStorage.getItem('df2s3'));
    document.querySelector('.df3s1').innerHTML = parseInt(localStorage.getItem('df3s1'));
    document.querySelector('.df3s2').innerHTML = parseInt(localStorage.getItem('df3s2'));
    document.querySelector('.df3s3').innerHTML = parseInt(localStorage.getItem('df3s3'));
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

// a key map of allowed keys
var allowedKeys = {
    65: 'A',
    70: 'F',
    82: 'R',
    69: 'E',
    78: 'N'
};

// the sequence
var code = ['A', 'F', 'R', 'E', 'E', 'N', 'A', 'F', 'R', 'E', 'E', 'N', 'A', 'F', 'R', 'E', 'E', 'N'];

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
            PlaySong();
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
    localStorage.setItem('df1s1', score);
    localStorage.setItem('df1s2', score);
    localStorage.setItem('df1s3', score);
    localStorage.setItem('df2s1', score);
    localStorage.setItem('df2s2', score);
    localStorage.setItem('df2s3', score);
    localStorage.setItem('df3s1', score);
    localStorage.setItem('df3s2', score);
    localStorage.setItem('df3s3', score);
}