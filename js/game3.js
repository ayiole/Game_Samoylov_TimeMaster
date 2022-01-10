'use strict'

let game3 = document.querySelector('.game-3__inner')

let starttitle = document.createElement('h1')
starttitle.classList.add('title')
starttitle.innerHTML = 'Нажмите Start чтобы начать игру'

let startbtn = document.createElement('button')
startbtn.classList.add('start__btn')
startbtn.classList.add('start__btn--level3')
startbtn.innerHTML = 'Start'

let lampinner = document.createElement('div')
lampinner.classList.add('lamp__inner')
let lamp1 = document.createElement('img')
lamp1.classList.add('level3__lamp')
lamp1.classList.add('level3__lamp--1')
lamp1.src = 'images/level3--lamp.png'
let lamp2 = document.createElement('img')
lamp2.classList.add('level3__lamp')
lamp2.classList.add('level3__lamp--2')
lamp2.src = 'images/level3--lamp.png'

//специальная тема для картинок
if (JSON.parse(localStorage.getItem('theme'))){
    lamp1.classList.add('theme-img')
    lamp2.classList.add('theme-img')
}

let lamp__label = document.createElement('label')
lamp__label.classList.add('lamp__label')
lamp__label.htmlFor = 'lamp__input'
let lamp__input = document.createElement('input')
lamp__input.classList.add('lamp__input')
lamp__input.id = 'lamp__input'
lamp__input.placeholder = '\u00A0'
let lamp__labelspan = document.createElement('span')
lamp__labelspan.classList.add('lamp__label-span')
lamp__labelspan.innerHTML = 'Ответ'
let lamp__bg = document.createElement('span')
lamp__bg.classList.add('lamp__bg')

let scoretext = document.createElement('p')
scoretext.classList.add('scoretext')
scoretext.classList.add('scoretext--3')

//проверка темы
let theme = JSON.parse(localStorage.getItem('theme'))
if (theme == true) {
    document.querySelector('body').classList.add('body-theme')
}

let rounding = 500
let plusscore

let difficulty = 0

let diff_ul = document.querySelector('.difficulty__list')

diff_ul.addEventListener('click', DifficultyChoose)

//выбор сложности
function DifficultyChoose(event) {
    let target = event.target

    if (target.classList[0] != 'difficulty__list-item') return

    let diff = parseInt(target.classList[1].match(/\d+/))

    switch (diff) {
        case 0:
            rounding = 500
            plusscore = 1
            break

        case 1:
            rounding = 300
            plusscore = 2
            break

        case 2:
            rounding = 100
            plusscore = 3
            break
    }
    PrepareToStart()
}

let timelamp1, timelamp2, randnum, timing

//проверка ответа
lamp__input.addEventListener('keydown', function (e) {
    if (e.key != 'Enter') return
    if (!/^(0|[1-9]\d*)([.,][0-9]{1,1})?$/.test(lamp__input.value)) return
    let timelampdiff = timelamp2 - timelamp1
    if (+lamp__input.value > (+timelampdiff + rounding) / 1000 || +lamp__input.value < (+timelampdiff - rounding) / 1000) {
        EndGame()
    }
    else {
        let arrscore = JSON.parse(localStorage.getItem('score'));
        arrscore[arrscore.length - 1].score+=plusscore
        localStorage.setItem('score', JSON.stringify(arrscore))
        scoretext.innerHTML = `Счет: ${arrscore[arrscore.length - 1].score}`
        lamp__input.value = ''
        lamp__input.disabled = true
        GameLamp()
    }
})

//подготовка к игре
function PrepareToStart() {
    diff_ul.style.display = 'none'

    game3.append(starttitle)
    game3.append(startbtn)
}

startbtn.addEventListener('click', StartGame)

//старт игры
function StartGame() {
    starttitle.style.display = 'none'
    startbtn.style.display = 'none'

    game3.style.display = 'grid'

    if (!JSON.parse(localStorage.getItem('score'))) {
        localStorage.setItem('score', JSON.stringify([{score: 0, gamename: 'Three'}]))
    }
    else {
        let arrscore = JSON.parse(localStorage.getItem('score'));
        arrscore.push({score: 0, gamename: 'Three'})
        localStorage.setItem('score', JSON.stringify(arrscore))
    }

    scoretext.innerHTML = `Счет: 0`

    game3.append(scoretext)

    game3.append(lampinner)
    lampinner.append(lamp1)
    lampinner.append(lamp2)

    game3.append(lamp__label)
    lamp__label.append(lamp__input, lamp__labelspan, lamp__bg)

    lamp__input.disabled = true

    setTimeout(GameLamp, 500)
}

//вычисление времени между лампочками
function GameLamp() {
    randnum = getRandomNumber(0, 50) / 10

    LampFlashing(lamp1)
    timelamp1 = Date.now()
    setTimeout(() => {
        LampFlashing(lamp2)
        timelamp2 = Date.now()
        lamp__input.disabled = false
        lamp__input.focus()
    }, randnum * 1000)
}


//мигание лампочки
function LampFlashing(lamp) {
    lamp.classList.add('level3__lamp--flash')
    setTimeout(() => {
        lamp.classList.remove('level3__lamp--flash')
    }, 500)
}

//конец игры
function EndGame() {
    lampinner.style.display = 'none'
    lamp__label.style.display = 'none'

    let endgametext = document.createElement('p')
    let arrscore = JSON.parse(localStorage.getItem('score'));
    endgametext.innerHTML = `Конец игры! Количество набранных очков: ${arrscore[arrscore.length - 1].score}`
    endgametext.classList.add('endgametext')
    game3.append(endgametext)

    let backtomenu = document.createElement('a')
    backtomenu.classList.add('backtomenu')
    backtomenu.classList.add('backtomenu--level3')
    backtomenu.innerHTML = 'Вернуться в меню'
    backtomenu.href = 'index.html'
    game3.append(backtomenu)
}

//рандомайзер числа
function getRandomNumber(min = 1, max = 5) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}
