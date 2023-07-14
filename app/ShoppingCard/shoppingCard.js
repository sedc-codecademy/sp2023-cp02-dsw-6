


window.addEventListener('load', () => {
    const allProducts = JSON.parse(localStorage.getItem('products')) || [];
    let initialAmount = 0;


    Products = allProducts;
    if(Products.length > 0 ) {
    Products.forEach(prod => {
        let displayProduct = `
        <div class="card_info-body">
        <div class="image_title">
        <img class="image-info_img" src="${prod.volumeInfo.imageLinks.thumbnail}" alt="book-photo">
        <p class="image-info_book_title">
            ${prod.volumeInfo.title}
        </p>
        </div>
        <div class="info-body_right-side">
        <p class="card_info-body-price">$${prod.price}</p>
        <div class="card_info-body-quantity">
        <input type="number" min="0" step="1" value="1" class="product-quantity">
        <button class="add-quantity" >+</button>
        <button class="remove-quantity">-</button>
      </div>
        <div class="product-amount">
        <p class="card_info-body-amount">${prod.price}</p>
        <button class="remove-product" ><i data-id="${prod.id}" class="fa fa-minus-square" style="color:#E22727" aria-hidden="true"></i></button>
        </div>
      </div>
      </div>
      `;
      productsDiv.innerHTML += displayProduct;
      initialAmount += prod.price;
      const cardTotal = document.querySelector('#card-total');
      cardTotal.textContent = `$${initialAmount.toFixed(2).toString()}`
    });
}
const removeProductBtns = document.querySelectorAll('.remove-product');
removeProductBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {

    const productId = e.target.dataset.id;
    let allProducts = JSON.parse(localStorage.getItem('products'));
    allProducts = allProducts.filter(prod => prod.id !== productId);
    localStorage.setItem('products', JSON.stringify(allProducts));
    window.location.reload();
  })
})

const cardTotal = document.querySelector('#card-total');

const addQuantityBtns = document.querySelectorAll('.add-quantity');
addQuantityBtns.forEach(btn => {

  btn.addEventListener('click', (e) => {
    let productAmount = e.target.previousElementSibling;
    productAmount.value = Number(productAmount.value) + 1;

    let productTotalAmount = e.target.nextElementSibling.
    parentElement.parentElement.lastElementChild.firstElementChild;
    let productPrice = e.target.parentElement.previousElementSibling.textContent;
    let parsedPrice = parseInt(productPrice.replace('$',''));
    const totalPrice = parsedPrice * Number(productAmount.value);
    productTotalAmount.textContent = totalPrice.toString();

    let parsedTotal = parseInt(cardTotal.textContent.replace('$', ''));
    parsedTotal += parsedPrice ;
    cardTotal.textContent = parsedTotal.toString();
  })
})

const removeQuantityBtns = document.querySelectorAll('.remove-quantity');
removeQuantityBtns.forEach(btn => {

  btn.addEventListener('click', (e) => {
    let productAmount = e.target.previousElementSibling.previousElementSibling;
    if(productAmount.value != 1) {
    productAmount.value = Number(productAmount.value) - 1;

    let productTotalAmount = e.target.
    parentElement.parentElement.lastElementChild.firstElementChild;
    let productPrice = e.target.parentElement.previousElementSibling.textContent;
    let parsedPrice = parseInt(productPrice.replace('$',''));
    const totalPrice = parsedPrice * Number(productAmount.value);
    productTotalAmount.textContent = totalPrice.toString();


    let parsedTotal = parseInt(cardTotal.textContent.replace('$', ''));
    parsedTotal -= parsedPrice;
    cardTotal.textContent = parsedTotal.toString();
  }
  })
})

})

let Products = [];
const productQuantity = document.querySelector('.product-quantity');
const productsDiv = document.querySelector('.allproducts');



document.addEventListener("DOMContentLoaded", function() {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  hamburger.addEventListener("click", mobileMenu);

  function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  }
});

