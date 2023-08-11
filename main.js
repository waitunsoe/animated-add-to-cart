import './style.scss'
import * as bootstrap from 'bootstrap';

import {removeLoaderUi, showLoaderUi} from "./js/loader";
import { createItemUi } from './js/item';
import { addToCart } from './js/cart';

export let items = [];
export const itemRow = document.querySelector(".itemRow");
export const cartBtn = document.querySelector('.cart-btn');
export const cartCounter = document.querySelectorAll('.cart-counter');
export const CartBox = document.querySelector('.cart-box');
export const total = document.querySelector('.total');

showLoaderUi();

fetch('https://fakestoreapi.com/products')
    .then(res=>res.json())
    .then(json=> {
        items = json;
        items.forEach(item=>{
            itemRow.append(createItemUi(item))
        })
        removeLoaderUi();
    })

// event delegation
itemRow.addEventListener("click", e => {
    addToCart(e);
})