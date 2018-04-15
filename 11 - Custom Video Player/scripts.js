//dostac wszystkie nasze elementy

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');


//zbudować wszystkie funkcje

//toggle players

function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}
                    /*powyższą funkcję mogę zapisać także tak:
                    function togglePlay() {
                    if(video.paused){
                        video.play();
                    }else {
                        video.pause();
                    }
                    }*/
function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
    console.log(icon);
}

function skip() {
 video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    video[this.name] = this.value;
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) *100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
    console.log(e);
}

document.onkeypress = function(e){
    if((e || window.event).keyCode === 32){
        video.paused ? video.play() : video.pause();
    }
}; //fajny sposób na pause po spacji / innym przycisku :) 



//założyć event listenery

video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);


video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));

video.addEventListener('timeupdate', handleProgress);

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e)); //można użyć 
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);



