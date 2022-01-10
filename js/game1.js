'use strict'

let game1 = document.querySelector('.game-1__inner')

let starttitle = document.createElement('h1')
starttitle.classList.add('title')
starttitle.innerHTML = 'Нажмите Start чтобы начать игру'

let startbtn = document.createElement('button')
startbtn.classList.add('start__btn')
startbtn.classList.add('start__btn--level1')
startbtn.innerHTML = 'Start'

let gametext = document.createElement('p')
gametext.classList.add('gametext')

let gamebtn = document.createElement('button')
let gamebtnspan = document.createElement('span')
gamebtn.classList.add('gamebtn')
gamebtn.classList.add('gamebtn--level1')
gamebtnspan.classList.add('gamebtnspan')
gamebtnspan.classList.add('gamebtnspan--level1')

let scoretext = document.createElement('p')
scoretext.classList.add('scoretext')

//проверка темы
let theme = JSON.parse(localStorage.getItem('theme'))
if (theme == true) {
    document.querySelector('body').classList.add('body-theme')
}

let time, randnum, timing

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

//подготовка перед игрой
function PrepareToStart() {
    diff_ul.style.display = 'none'

    game1.append(starttitle)
    game1.append(startbtn)
}

gamebtn.addEventListener('focus', BtnBlur)

//для анимации кнопки игры
function BtnBlur() {
    setTimeout(() => gamebtn.blur(), 750)
}

startbtn.addEventListener('click', StartGame)

//старт игры
function StartGame() {
    starttitle.style.display = 'none'
    startbtn.style.display = 'none'

    if (!JSON.parse(localStorage.getItem('score'))) {
        localStorage.setItem('score', JSON.stringify([{ score: 0, gamename: 'One' }]))
    }
    else {
        let arrscore = JSON.parse(localStorage.getItem('score'));
        arrscore.push({ score: 0, gamename: 'One' })
        localStorage.setItem('score', JSON.stringify(arrscore))
    }

    scoretext.innerHTML = `Счет: 0`

    game1.append(scoretext)

    randnum = getRandomNumber()

    gametext.innerHTML = `Нажмите на кнопку ровно через ${randnum}c`
    game1.append(gametext)

    gamebtnspan.innerHTML = 'Нажми меня!'
    game1.append(gamebtn)
    gamebtn.append(gamebtnspan)

    time = Date.now()

    timing = setTimeout(EndGame, randnum * 1000 + rounding)
    gamebtn.addEventListener('click', CheckTime)
}

//проверка при нажатии
function CheckTime() {

    let checktime = Date.now()

    clearTimeout(timing)

    if (
        (checktime - time > randnum * 1000 + rounding) ||
        (checktime - time < randnum * 1000 - rounding)
    ) {
        EndGame()
    }
    else {
        let arrscore = JSON.parse(localStorage.getItem('score'));
        arrscore[arrscore.length - 1].score += plusscore
        localStorage.setItem('score', JSON.stringify(arrscore))
        scoretext.innerHTML = `Счет: ${arrscore[arrscore.length - 1].score}`

        randnum = getRandomNumber()

        gametext.innerHTML = `Нажмите на кнопку ровно через ${randnum}c`
        time = checktime

        timing = setTimeout(EndGame, randnum * 1000 + rounding)
    }
}

//конец игры
function EndGame() {
    gametext.style.display = 'none'
    gamebtn.style.display = 'none'
    let endgametext = document.createElement('p')
    let arrscore = JSON.parse(localStorage.getItem('score'));
    endgametext.innerHTML = `Конец игры! Количество набранных очков: ${arrscore[arrscore.length - 1].score}`
    endgametext.classList.add('endgametext')
    game1.append(endgametext)

    let backtomenu = document.createElement('a')
    backtomenu.classList.add('backtomenu')
    backtomenu.classList.add('backtomenu--level1')
    backtomenu.innerHTML = 'Вернуться в меню'
    backtomenu.href = 'index.html'
    game1.append(backtomenu)
}

//рандомайзер числа
function getRandomNumber(min = 1, max = 5) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}
