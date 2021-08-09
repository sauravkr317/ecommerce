import axios from "axios";

const splideElm = document.querySelector('.splide');
if (splideElm !== null) {
    const splide = new Splide('.splide', {
        type: 'loop',
        perPage: 1,
        autoplay: true,
        interval: 4000,
        pauseOnHover: false,
        pauseOnFocus: false,
        resetProgress: false
    });
    splide.mount();
}

let list = document.querySelector('.list');
let hamburger = document.querySelector('.hamburger');
let addToCart = document.querySelectorAll('.add-cart-btn');
let deleteCart = document.querySelectorAll('.cart-remover');


hamburger.addEventListener('click', () => {
    if (list.className.includes('show')) {
        hamburger.firstElementChild.firstElementChild.classList.remove('fa-times');
        hamburger.firstElementChild.firstElementChild.classList.add('fa-bars');
        list.classList.remove('show');
    } else {
        list.classList.add('show');
        hamburger.firstElementChild.firstElementChild.classList.remove('fa-bars');
        hamburger.firstElementChild.firstElementChild.classList.add('fa-times');
    }
})

function updateCart(phone) {
    axios.post('/update-cart', phone).then(res => {
        let cart_item = document.querySelector('#cart-number');
        cart_item.innerText = res.data.totalQty;
    })
}

function removeCart(phone) {
    axios.post('/delete-cart', phone).then(res => {
        window.location.href = res.data.redirect
    })
}

addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        let phone = JSON.parse(btn.dataset.phone);
        updateCart(phone);
    })
})

if (deleteCart !== null) {
    deleteCart.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            let phone = JSON.parse(btn.dataset.phoneitem);
            removeCart(phone);
        })
    })
}

let success = document.querySelector('.order-success');
if(success){
    setTimeout(() => {
        success.remove();
    }, 2000);
}
