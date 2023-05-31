


window.addEventListener('load', () => {
    const allProducts = JSON.parse(localStorage.getItem('products')) || [];
    console.log('ready');
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
        <button class="add-quantity">+</button>
        <button class="remove-quantity">-</button>
      </div>
        <p class="card_info-body-amount">${prod.price}</p>
      </div>
      </div>
      `;
      productsDiv.innerHTML += displayProduct;
    });
}

})
let Products = [];
const productQuantity = document.querySelector('.product-quantity');
const productAddQuantityBtn = document.querySelector('.add-quantity');
const productRemoveQuantityBtn = document.querySelector('.remove-quantity');
// const productDiv = document.querySelector('.card_info-body');
const productsDiv = document.querySelector('.allproducts');


// productAddQuantityBtn.addEventListener('click', () => {
//     productQuantity.value++;
//     console.log(products);
// })


// productRemoveQuantityBtn.addEventListener('click', () => {
//     if(productQuantity.value != 1) {
//     productQuantity.value --;
//     } 
// })



