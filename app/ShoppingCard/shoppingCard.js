const productQuantity = document.querySelector('.product-quantity');
const productAddQuantityBtn = document.querySelector('.add-quantity');
const productRemoveQuantityBtn = document.querySelector('.remove-quantity');


let initialProductQt = 1;

productAddQuantityBtn.addEventListener('click', () => {
    productQuantity.value++;
})


productRemoveQuantityBtn.addEventListener('click', () => {
    if(productQuantity.value != 1) {
    productQuantity.value --;
    } 
})



