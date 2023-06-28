window.addEventListener('load', () => {
  const allProducts = JSON.parse(localStorage.getItem('wishlist')) || [];
  const productsDiv = document.querySelector('.allproducts');

  allProducts.forEach((product) => {
    const displayProduct = `
      <div class="card_info-body">
        <div class="image_title">
          <img class="image-info_img" src="${product.volumeInfo.imageLinks.thumbnail}" alt="book-photo">
          <p class="image-info_book_title">${product.volumeInfo.title}</p>
        </div>
        <div class="info-body_right-side">
          <p class="card_info-body-price">$${product.price}</p>
          <button class="buyButtonCard" data-id="${product.id}">Buy</button>
          <button class="remove-btn" data-id="${product.id}">Remove</button>
        </div>
      </div>
    `;
    productsDiv.innerHTML += displayProduct;
  });

  const removeButtons = document.querySelectorAll('.remove-btn');
  removeButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const productId = event.target.dataset.id;
      const updatedProducts = allProducts.filter((product) => product.id !== productId);
      localStorage.setItem('wishlist', JSON.stringify(updatedProducts));
      event.target.parentElement.parentElement.remove();
    });
  });

  const buyButtons = document.querySelectorAll('.buyButtonCard');
  buyButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const itemId = e.target.dataset.id;
      const itemToBuy = allProducts.find((product) => product.id === itemId);
      let allProducts = JSON.parse(localStorage.getItem('products')) || [];

      allProducts.push({ ...itemToBuy });
      localStorage.setItem('products', JSON.stringify(allProducts));

      const updatedWishlist = allProducts.filter((product) => product.id !== itemId);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));

      window.location.replace('../ShoppingCard/shoppingCard.html');
    });
  });
});
