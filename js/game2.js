'use strict'

let game2 = document.querySelector('.game-2__inner')

let starttitle = document.createElement('h1')
starttitle.classList.add('title')
starttitle.innerHTML = 'Нажмите Start чтобы начать игру'

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

let picspawn, picdeltmo, picdelint

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

    game2.append(starttitle)
    game2.append(startbtn)
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
        localStorage.setItem('score', JSON.stringify([{score: 0, gamename: 'Two'}]))
    }
    else {
        let arrscore = JSON.parse(localStorage.getItem('score'));
        arrscore.push({score: 0, gamename: 'Two'})
        localStorage.setItem('score', JSON.stringify(arrscore))
    }

    scoretext.innerHTML = `Счет: 0`

    game2.append(scoretext)

    randnum = getRandomNumber()

    gametext.innerHTML = `Нажмите на кнопку ровно через ${randnum}c`
    game2.append(gametext)

    gamebtnspan.innerHTML = 'Нажми меня!'
    game2.append(gamebtn)
    gamebtn.append(gamebtnspan)

    time = Date.now()

    timing = setTimeout(EndGame, randnum * 1000 + rounding)
    gamebtn.addEventListener('click', CheckTime)

    picspawn = setInterval(CreatePicture, 2000)
    setTimeout(() => { picdelint = setInterval(DeletePicture, 2000) }, 8000)
}

//создание картинки
function CreatePicture() {
    let forpicwidth = window.innerWidth
    let forpicheight = window.innerHeight

    let randposwidth = getRandomNumber(0, forpicwidth - 250)
    let randposheight = getRandomNumber(0, forpicheight - 250)

    let randpic = getRandomNumber(1, 10)
    let img = document.createElement('img')

    img.classList.add('level2-img')

    if (JSON.parse(localStorage.getItem('theme'))){
        img.classList.add('theme-img')
    }
    
    img.src = 'images/level2--' + randpic + '.png'

    img.style.left = randposwidth + 'px'
    img.style.top = randposheight + 'px'

    game2.append(img);

    setTimeout(() => img.classList.add('level2-img--scale'), 100)
}

//удаление картинок
function DeletePicture() {
    try {
        document.querySelector('img').remove()
    }
    catch {
        clearInterval(picdelint)
    }
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
        arrscore[arrscore.length - 1].score+=plusscore
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


    clearTimeout(picdeltmo)
    clearInterval(picdelint)
    clearInterval(picspawn)

    let images = document.querySelectorAll('img')
    for (let i of images) {
        i.remove()
    }

    let endgametext = document.createElement('p')

    let arrscore = JSON.parse(localStorage.getItem('score'));
    endgametext.innerHTML = `Конец игры! Количество набранных очков: ${arrscore[arrscore.length - 1].score}`
    endgametext.classList.add('endgametext')
    game2.append(endgametext)

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
