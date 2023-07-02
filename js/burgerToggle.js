const toggleBtn = document.querySelector('.menu__toggle')
const menu = document.querySelector('.menu')

toggleBtn.addEventListener('click', () => {
    if (menu.classList.contains('menu--closed')) {
        menu.classList.remove('menu--closed')
        menu.classList.add('menu--opened')
    } 
    else {
        menu.classList.remove('menu--opened')
        menu.classList.add('menu--closed')
    }
})