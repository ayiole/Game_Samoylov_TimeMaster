'use strict'

let game2 = document.querySelector('.game-2__inner')

let starttitle = document.createElement('h1')
starttitle.classList.add('title')
starttitle.innerHTML = 'Нажмите Start чтобы начать игру'

let preparetext = document.createElement('p')
preparetext.classList.add('preparetext')
preparetext.innerHTML = 'Будьте готовы! Переносите быстро появляющиеся картинки влево, а медленно появляющиеся вправо'

let startbtn = document.createElement('button')
startbtn.classList.add('start__btn')
startbtn.classList.add('start__btn--level2')
startbtn.innerHTML = 'Start'

let gametext = document.createElement('p')
gametext.classList.add('gametext')

let gamebtn = document.createElement('button')
let gamebtnspan = document.createElement('span')
gamebtn.classList.add('gamebtn')
gamebtn.classList.add('gamebtn--level2')
gamebtnspan.classList.add('gamebtnspan')
gamebtnspan.classList.add('gamebtnspan--level2')

let scoretext = document.createElement('p')
scoretext.classList.add('scoretext')
scoretext.classList.add('scoretext--2')

let gamefieldleft = document.createElement('div')
gamefieldleft.classList.add('gamefield--left')
let gamefieldright = document.createElement('div')
gamefieldright.classList.add('gamefield--right')

let timerdiv = document.createElement('div')
timerdiv.classList.add('timer')
let timersecond = document.createElement('span')
timersecond.classList.add('timer-seconds')
let timermillisecond = document.createElement('span')
timermillisecond.classList.add('timer-milliseconds')

//проверка темы
let theme = JSON.parse(localStorage.getItem('theme'))
if (theme == true) {
    document.querySelector('body').classList.add('body-theme')
}

let time, randnum, timing

let second
let millisecond = 1000

let cron;

let plusscore
let difsecond

let difficulty = 0

let diff_ul = document.querySelector('.difficulty__list')

let picspawn, picdeltmo, picdelint

diff_ul.addEventListener('click', DifficultyChoose)

//выбор сложности
function DifficultyChoose(event) {
    let target = event.target

    if (target.classList[0] != 'difficulty__list-item') return

    let diff = parseInt(target.classList[1].match(/\d+/))

    switch (diff) {
        case 0:
            difsecond = 4
            plusscore = 1
            break

        case 1:
            difsecond = 3
            plusscore = 2
            break

        case 2:
            difsecond = 2
            plusscore = 3
            break
    }
    PrepareToStart()
}

//подготовка перед игрой
function PrepareToStart() {
    diff_ul.style.display = 'none'

    game2.append(starttitle)
    game2.append(preparetext)
    game2.append(startbtn)
}

gamebtn.addEventListener('focus', BtnBlur)

//для анимации кнопки игры
function BtnBlur() {
    setTimeout(() => gamebtn.blur(), 750)
}

startbtn.addEventListener('click', StartGame)

function StartGame() {
    starttitle.style.display = 'none'
    preparetext.style.display = 'none'
    startbtn.style.display = 'none'

    if (!JSON.parse(localStorage.getItem('score'))) {
        localStorage.setItem('score', JSON.stringify([{ score: 0, gamename: 'Two' }]))
    }
    else {
        let arrscore = JSON.parse(localStorage.getItem('score'));
        arrscore.push({ score: 0, gamename: 'Two' })
        localStorage.setItem('score', JSON.stringify(arrscore))
    }

    game2.style.width = 100 + '%'
    game2.style.height = 100 + '%'

    game2.style.display = 'flex'
    game2.style.justifyContent = 'space-between'

    scoretext.innerHTML = 'Счет: 0'

    game2.append(scoretext)

    game2.append(gamefieldleft)
    game2.append(gamefieldright)

    second = difsecond
    game2.append(timerdiv)
    timerdiv.append(timersecond)
    timerdiv.append(':')
    timerdiv.append(timermillisecond)
    cron = setInterval(() => { timer(); }, 10)

    CreatePicture()
}

function CreatePicture() {
    let randpic = getRandomNumber(1, 10)
    let img = document.createElement('img')

    let randbool = Math.random() < 0.5;

    img.classList.add('level2-img')

    if (JSON.parse(localStorage.getItem('theme'))) {
        img.classList.add('theme-img')
    }

    img.style.left = window.innerWidth / 2 - 50 + 'px'
    img.style.top = window.innerHeight / 2 - 50 + 'px'


    img.src = 'images/level2--' + randpic + '.png'

    game2.append(img);

    if (randbool) {
        document.querySelector('.level2-img').style.transition = 'all 1s linear'
        setTimeout(() => {
            img.style.transition = ''
            img.style.width = 250 + 'px'
            img.style.height = 250 + 'px'
            img.style.transform = 'scale(1)'
            img.style.left = window.innerWidth / 2 - 125 + 'px'
            img.style.top = window.innerHeight / 2 - 125 + 'px'
        }, 1000)
    }
    else {
        document.querySelector('.level2-img').style.transition = 'all 2.5s linear'
        setTimeout(() => {
            img.style.transition = ''
            img.style.width = 250 + 'px'
            img.style.height = 250 + 'px'
            img.style.transform = 'scale(1)'
            img.style.left = window.innerWidth / 2 - 125 + 'px'
            img.style.top = window.innerHeight / 2 - 125 + 'px'
        }, 4000)
    }

    setTimeout(() => img.classList.add('level2-img--scale'), 100)

    img.ondragstart = function () {
        return false;
    };

    let currentDroppable = null;

    img.onmousedown = function (event) {

        let shiftX = event.clientX - img.getBoundingClientRect().left
        let shiftY = event.clientY - img.getBoundingClientRect().top

        moveAt(event.pageX, event.pageY)

        function moveAt(pageX, pageY) {
            img.style.left = pageX - shiftX + 'px'
            img.style.top = pageY - shiftY + 'px'

            let newY = pageY - shiftY;

            if (newY < 0) {
                img.style.top = 0
                img.onmouseup()
            }
            else if (newY > document.documentElement.clientHeight - img.offsetHeight) {
                img.style.top = document.documentElement.clientHeight - img.offsetHeight + 'px'
                img.onmouseup()
            }
        }

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);

            img.style.display = 'none'
            let elemBelow = document.elementFromPoint(event.clientX, event.clientY)
            img.style.display = 'block'

            if (!elemBelow) return;

            let droppableBelowtrue, droppableBelowfalse

            if (randbool) {
                droppableBelowtrue = elemBelow.closest('.gamefield--left')
                droppableBelowfalse = elemBelow.closest('.gamefield--right')
            } else {
                droppableBelowtrue = elemBelow.closest('.gamefield--right')
                droppableBelowfalse = elemBelow.closest('.gamefield--left')
            }

            if (currentDroppable != droppableBelowtrue || currentDroppable != droppableBelowfalse) {
                currentDroppable = droppableBelowtrue;
                if (droppableBelowtrue) {
                    let arrscore = JSON.parse(localStorage.getItem('score'))
                    arrscore[arrscore.length - 1].score += plusscore
                    localStorage.setItem('score', JSON.stringify(arrscore))
                    scoretext.innerHTML = `Счет: ${arrscore[arrscore.length - 1].score}`
                    img.onmouseup()
                    img.remove()
                    clearInterval(cron)
                    second = difsecond
                    millisecond = 1000;
                    cron = setInterval(() => { timer(); }, 10)
                    CreatePicture()
                } else if (droppableBelowfalse) {
                    img.onmouseup()
                    img.remove()
                    EndGame()
                }
            }
        }

        game2.addEventListener('mousemove', onMouseMove)

        img.onmouseup = function () {
            game2.removeEventListener('mousemove', onMouseMove)
            img.onmouseup = null
        };
    }
}

//конец игры
function EndGame() {

    game2.style.flexDirection = 'column'
    game2.style.display = 'flex'
    game2.style.justifyContent = 'center'

    gametext.style.display = 'none'
    gamebtn.style.display = 'none'

    timerdiv.style.display = 'none'

    scoretext.style.display = 'none'
    gamefieldleft.style.display = 'none'
    gamefieldright.style.display = 'none'

    let endgametext = document.createElement('p')

    let arrscore = JSON.parse(localStorage.getItem('score'));
    endgametext.innerHTML = `Конец игры! Количество набранных очков: ${arrscore[arrscore.length - 1].score}`
    endgametext.classList.add('endgametext')
    game2.append(endgametext)

    let backtodiff = document.createElement('a')
    backtodiff.classList.add('backtodiff')
    backtodiff.classList.add('backtodiff--level2')
    backtodiff.innerHTML = 'Вернуться к выбору сложности'
    backtodiff.href = '2.html'
    game2.append(backtodiff)

    let backtomenu = document.createElement('a')
    backtomenu.classList.add('backtomenu')
    backtomenu.classList.add('backtomenu--level2')
    backtomenu.innerHTML = 'Вернуться в меню'
    backtomenu.href = 'index.html'
    game2.append(backtomenu)
}

//рандомайзер числа
function getRandomNumber(min = 1, max = 5) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function timer() {
    if ((millisecond -= 10) == 0) {
        millisecond = 1000;
        second--;
    }
    if (second < 0) {
        millisecond = 0;
        clearInterval(cron)
        document.querySelector('.timer-seconds').innerText = '00';
        document.querySelector('.timer-milliseconds').innerText = '00';
        document.querySelector('img').remove()
        EndGame()
    }

    document.querySelector('.timer-seconds').innerText = returnData(second);
    document.querySelector('.timer-milliseconds').innerText = returnData(millisecond / 10);
}

function returnData(input) {
    return input > 10 ? input : `0${input}`
}
