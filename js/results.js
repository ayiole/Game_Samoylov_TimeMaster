'use strict'

let profilesinner = document.querySelector('.leaderboard__profiles')
let name = document.querySelector('.leaderboard__title--top')

//проверка темы
let theme = JSON.parse(localStorage.getItem('theme'))
if (theme == true) {
    document.querySelector('body').classList.add('body-theme')
}

let arrscore = JSON.parse(localStorage.getItem('score'));

name.innerHTML = localStorage.getItem('login')

let len = 0

//проверка длины массива
try {
    if (arrscore.length > 6) {
        len = 7
    }
    else {
        len = arrscore.length
    }
}
catch { }

//сортировка
try {
    arrscore.sort((prev, next) => next.score - prev.score)
}
catch { }


for (let i = 0; i < len; i++) {
    CreateProfileScore(i, arrscore[i])
}

//создание строки очков
function CreateProfileScore(pos, score) {
    let profile = document.createElement('article')
    profile.classList.add('leaderboard__profile')
    let position = document.createElement('div')
    position.classList.add('leaderboard__position')
    position.innerHTML = ++pos
    let gamename = document.createElement('span')
    gamename.classList.add('leaderboard__gamename')

    switch (score.gamename) {
        case 'One':
            gamename.classList.add('leaderboard__gamename--level1')
            break

        case 'Two':
            gamename.classList.add('leaderboard__gamename--level2')
            break

        case 'Three':
            gamename.classList.add('leaderboard__gamename--level3')
            break
    }

    gamename.innerHTML = score.gamename
    let gamescore = document.createElement('span')
    gamescore.classList.add('leaderboard__score')
    gamescore.innerHTML = score.score

    profilesinner.append(profile)
    profile.append(position)
    profile.append(gamename)
    profile.append(gamescore)
}
