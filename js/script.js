const bar = document.getElementById('bar')
const close = document.getElementById('close')
const nav = document.getElementById('navbar')
const select = document.getElementById('category-select')
const option = document.getElementById('option')

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active')
    })
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active')
    })
}

if (select) {
    select.addEventListener('click', (event) => {
        event.preventDefault()
        if (select.classList.contains('active')) {
            option.setAttribute('style', 'display: none;')
            select.classList.remove('active')
        } else {
            option.setAttribute('style', '')
            select.classList.add('active')
        }
    })
}

function clicky(idCategory) {
    console.log('CLICKY ' + idCategory)
}
