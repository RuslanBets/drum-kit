const buttons = Array.from(document.querySelectorAll('.btn'));
const play = document.querySelector('.play');
const record = document.querySelector('.record');
let flag = false;
let miliSeconds;
let arrMusic = [];

window.addEventListener('keydown', event => {
  buttons.forEach(elem => {
    if (event.key === elem.dataset.namebutton) {
      createAudio(elem.dataset.srcAudio)
      showAnimation(elem)
      if (flag) {
        let diferendTime = Date.now() - miliSeconds
        arrMusic.push({ i: elem.dataset.srcAudio, time: diferendTime })
      }
    }

  })
});
window.addEventListener('keyup', event => {
  buttons.forEach(elem => {
    if (event.key === elem.dataset.namebutton) {
      removeAnimation(elem)
    }

  })
});

function createAudio(src) {
  let audio = document.createElement('audio')
  audio.src = src
  audio.play()
}

function showAnimation(elem) {
  elem.classList.add('animation')
}
function removeAnimation(elem) {
  elem.classList.remove('animation')
}

play.addEventListener('click', () => {
  if (play.innerHTML == 'RECORD') {
    play.innerHTML = 'STOP'
    flag = true;
    miliSeconds = Date.now()
    arrMusic = []
  } else {
    play.innerHTML = 'RECORD'
    flag = false;
    miliSeconds = 0
  }
})

function playMusic(arr) {
  for (const item of arr) {
    setTimeout(createAudio, item.time, item.i)
  }
}

record.addEventListener('click', () => {
  playMusic(arrMusic)
});