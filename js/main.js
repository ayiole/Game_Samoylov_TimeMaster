'use strict'

let sectionAuth = document.querySelector('.auth')
let sectionMenu = document.querySelector('.main-menu')
let results = document.querySelector('.results')

let authinput = document.querySelector('.auth__input')
let authbtn = document.querySelector('.auth__btn')

let themebtn = document.querySelector('.theme-btn')

let logoutbtn = document.querySelector('.logout')

StartPageCheck()

//кнопка авторизации
authbtn.addEventListener('click', Authorization)
authinput.addEventListener('keydown', function (e) {
    if (e.key != 'Enter') return
    if (authinput.value) {
        localStorage.setItem('login', authinput.value)
        document.querySelector('.auth__top').classList.add('auth__top--dop')
        document.querySelector('.auth__bottom').classList.add('auth__bottom--dop')
        document.querySelector('.auth__center').style.opacity = 0
        document.querySelector('.auth__container').style.backgroundColor = '#151515'
        setTimeout(() => {
            sectionAuth.style.display = 'none', sectionMenu.style.display = 'block', results.style.display = 'block'
        }, 800)
    }
})

let theme

//проверка начальной темы
if (!localStorage.getItem('theme')) {
    theme = false
    localStorage.setItem('theme', theme)
} else {
    theme = JSON.parse(localStorage.getItem('theme'))
    if (theme == true) {
        document.querySelector('body').classList.add('body-theme')
    }
}

themebtn.addEventListener('click', ChangeTheme)
logoutbtn.addEventListener('click', LogOut)

//смена темы
function ChangeTheme() {
    document.querySelector('body').classList.toggle('body-theme')
    theme = JSON.parse(localStorage.getItem('theme'))
    localStorage.setItem('theme', !theme)
}

//проверка сохранен ли логин в браузере
function StartPageCheck() {
    if (localStorage.getItem('login')) {
        sectionMenu.style.display = 'block'
        results.style.display = 'block'
        themebtn.style.display = 'block'
        logoutbtn.style.display = 'block'
    }
    else {
        sectionAuth.style.display = 'block'
    }
}

//сохраняет логин в браузере + переходная анимация
function Authorization() {
    if (authinput.value) {
        localStorage.setItem('login', authinput.value)
        document.querySelector('.auth__top').classList.add('auth__top--dop')
        document.querySelector('.auth__bottom').classList.add('auth__bottom--dop')
        document.querySelector('.auth__center').style.opacity = 0
        document.querySelector('.auth__container').style.backgroundColor = '#151515'
        setTimeout(() => {
            sectionAuth.style.display = 'none',
                sectionMenu.style.display = 'block',
                results.style.display = 'block',
                themebtn.style.display = 'block',
                logoutbtn.style.display = 'block'
        }, 800)
    }
}

//функция логаута
function LogOut() {
    localStorage.clear()
    sectionMenu.style.display = 'none'
    results.style.display = 'none'
    themebtn.style.display = 'none'
    logoutbtn.style.display = 'none'
    document.querySelector('body').classList.remove('body-theme')
    document.querySelector('.auth__top').classList.remove('auth__top--dop')
    document.querySelector('.auth__bottom').classList.remove('auth__bottom--dop')
    document.querySelector('.auth__center').style.opacity = ''
    document.querySelector('.auth__container').style.backgroundColor = '#4e4e4e'
    sectionAuth.style.display = 'block'
    authinput.value = ''
}