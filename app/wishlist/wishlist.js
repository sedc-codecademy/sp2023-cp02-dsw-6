window.addEventListener('load', () => {
  let allProducts = JSON.parse(localStorage.getItem('wishlist')) || [];
  const productsDiv = document.querySelector('.allproducts');
 
  allProducts = allProducts.filter(prod => prod.volumeInfo);
  allProducts.forEach((product) => {
    
    const displayProduct = `
      <div class="card_info-body">
        <div class="image_title">
          <img class="image-info_img" src="${product.volumeInfo.imageLinks.thumbnail}" alt="book-photo">
          <p class="image-info_book_title">${product.volumeInfo.title}</p>
        </div>
        <div class="info-body_right-side">
          <p class="card_info-body-price">${product.price}</p>
          <button class="buyButtonCard" data-id="${product.id}"><i class="fa-solid fa-cart-shopping" style="color: #0C54C0;"></i>Buy</button>
          <button class="remove-btn" data-id="${product.id}">X</button>
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
      const wishlistProducts = JSON.parse(localStorage.getItem('wishlist')) || [];
  
      // Check if the item already exists in the wishlist
      const itemInWishlist = wishlistProducts.find((product) => product.id === itemId);
  
      if (!itemInWishlist) {
        wishlistProducts.push({ ...itemToBuy });
        localStorage.setItem('wishlist', JSON.stringify(wishlistProducts));
      }
  
      window.location.replace('../ShoppingCard/shoppingCard.html');
    });
  });
  
    });

    
document.addEventListener("DOMContentLoaded", function() {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  hamburger.addEventListener("click", mobileMenu);

  function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  }
});