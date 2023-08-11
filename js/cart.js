import {items, cartBtn, cartCounter, CartBox, total} from "../main";

export const cartCounterUpdate = () => {
  let count = parseInt(cartCounter[0].innerText);
  cartCounter.forEach(currentCounter => {
    currentCounter.innerText = count + 1;
  })
}

export const costTotal = () => {
    let allCartCost = document.querySelectorAll('.cart-cost');
    return total.innerHTML = [...allCartCost].reduce((pv, cv) => pv + parseFloat(cv.innerText) ,0).toFixed(2);
}

window.inc = function (event, price) {
    let currentCart = event.target.closest(".item-in-cart");
    let cartQuantity = currentCart.querySelector('.cart-quantity');
    let cartCost = currentCart.querySelector('.cart-cost');
    cartQuantity.valueAsNumber += 1;
    cartCost.innerText =( cartQuantity.valueAsNumber * price).toFixed(2);

    costTotal();
}


export const createItemInCart = ({id, image, title, price}) => {
  let div = document.createElement('div');
  div.classList.add('item-in-cart');
  div.innerHTML = `
    <div class="p-3 border rounded mb-3">
    <div class="mb-2">
    <img src="${image}" class="cart-item-img"/>
  </div>
  <p class="text-small fw-bold"> ${title}</p>
  <div class="row justify-content-between align-items-center">
    <div class="col-4">
      <p class="mb-0">
        $ <span class="cart-cost"> ${price} </span>
      </p>
    </div>
    <div class="col-6">
      <div class="cart-item-quantity input-group input-group-sm">
        <button class="btn btn-primary">
          <i class="bi bi-dash pe-none"></i>
        </button>
        <input type="number" class="form-control text-end cart-quantity" value="1"/>
        <button class="btn btn-primary" onclick="inc(event, ${price})">
          <i class="bi bi-plus pe-none"></i>
        </button>
      </div>
    </div>
  </div>
    </div>
    
  `;
  CartBox.append(div);
}

export const addToCart = (e) => {
  if(e.target.classList.contains('add-to-cart')){

    let currentItemCard = e.target.closest('.item-card');
    let itemId = currentItemCard.getAttribute('item-id');
    let itemDetail = items.find(item => item.id === parseInt(itemId));
    let currentImg = currentItemCard.querySelector('.item-img');

    let newImg = new Image();

    newImg.src = currentImg.src;
    newImg.classList.add('item-img')

    newImg.style.position = "fixed";
    newImg.style.top = currentImg.getBoundingClientRect().top + 'px';
    newImg.style.left = currentImg.getBoundingClientRect().left + 'px';
    newImg.style.zIndex = 2000;
    newImg.style.transition = 0.5 + 's';
        
    document.body.append(newImg);

    setTimeout(_=>{
        newImg.style.top = (cartBtn.getBoundingClientRect().top + 10)  + 'px';
        newImg.style.left = (cartBtn.getBoundingClientRect().left + 10) + 'px';
        newImg.style.transform = "rotate(360deg)";
        newImg.style.height = 0;
    }, 10)

    setTimeout(() => {
        cartBtn.classList.add('animate__tada');
        cartCounterUpdate();
        createItemInCart(itemDetail);
        newImg.remove();

        cartBtn.addEventListener('animationend', () => {
            cartBtn.classList.remove('animate__tada');
        })
    }, 400);

      costTotal();

  }
}