const modalCloseBtn = document.querySelector('.modal__button')
const modalBtn = document.querySelector('.modal__close-btn')
const cardsBtn = document.querySelectorAll('.cards__button')
const videoBtn = document.querySelector('.video__button')
const modal = document.querySelector('.modal')


document.addEventListener('keydown', (event) => {
    if (event.code == 'Escape' && modal.classList.contains('modal--opened')) {
        modal.classList.remove('modal--opened')
        modal.classList.add('modal--closed')
    }
})

let arrBtn = [modalBtn, modalCloseBtn]

arrBtn && arrBtn.forEach((btn) => {
    btn.addEventListener('click', (event) => {
        event.preventDefault()

        if (modal.classList.contains('modal--opened')) {
            modal.classList.remove('modal--opened')
            modal.classList.add('modal--closed')
        }
    })
})

let catalogBtns = [...cardsBtn, videoBtn]

catalogBtns && catalogBtns.forEach((btn) => {
    btn.addEventListener('click', (event) => {
        event.preventDefault()

        if (modal.classList.contains('modal--closed')) {
            modal.classList.remove('modal--closed')
            modal.classList.add('modal--opened')
        }
    })
})