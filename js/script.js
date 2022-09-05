const url_base = 'https://ecommerce-backend-bsale.herokuapp.com/api/'
window.onload = listProducts(0, 'none')

let id_category = 0
const cateories = ['Todos los productos', 'Bebida energetica', 'Pisco', 'Ron', 'Bebida', 'Snack', 'Cerveza', 'Vodka']
const title_category = document.getElementById('title-category')
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

async function listProducts(category, name) {
    await fetch(url_base + 'product/'+category+'/' + name)
        .then(response => response.json())
        .then(data => {
            let products_container = document.getElementById('products-container')
            let num_products = data.data.length
            let cards_products = ''
            for (let i = 0; i<num_products; i++){
                let card = getCardProduct(data.data[i])
                cards_products = cards_products + card
            }
            products_container.innerHTML = cards_products
            pageList(data.last_page, data.links)
        })
        .catch(function (error) {
        console.log('Ocurrio un error 1: ')
            console.log(error)
    })
}

function filterProduct(idCategory) {
    idCategory != null ? id_category = idCategory : false
    let input_name = document.getElementById('input_name').value
    input_name === '' ? input_name = 'none' : false
    listProducts(id_category, input_name)
    title_category.innerText = cateories[idCategory]
}

function pageList(pages, links) {
    const page_container =document.getElementById('pagination')
    let content_page = ''
    for (let i = 1; i<=pages; i++){
        let page = `<a href="#" onclick="listProductPage('${links[i].url}')">${i}</a>`
        content_page = content_page + page
    }
    page_container.innerHTML = content_page
}

async function listProductPage(link) {
    const link_secure = 'https:' + link.split(':')[1]
    await fetch(link_secure)
        .then(response => response.json())
        .then(data => {
            let products_container = document.getElementById('products-container')
            let num_products = data.data.length
            let cards_products = ''
            for (let i = 0; i<num_products; i++){
                let card = getCardProduct(data.data[i])
                cards_products = cards_products + card
            }
            products_container.innerHTML = cards_products
            //pageList(data.last_page, data.links)
        })
        .catch(function (error) {
            console.log('Ocurrio un error 2: ')
            console.log(error)
        })
}

function getCardProduct(product) {
    let image = product.url_image
    if (product.url_image == null || product.url_image === ''){
        image = '/images/not_image.png'
    }
    return `<div class="pro">
                <img src="${image}" alt="imagen de producto">
                <div class="des">
                    <span>-${product.discount}%</span>
                    <h5>${product.name}</h5>
                    <div class="star">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                    </div>
                    <h4>$ ${product.price}</h4>
                </div>
                <a href="#"><i class="fal fa-shopping-cart cart"></i></a>
            </div>`
}

