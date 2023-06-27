const addToWishlistBtn = document.getElementById("wishlist-btn");
const wishlistTableBody = document.getElementById("wishlist-table-body");
const allBooks = [];

addToWishlistBtn.addEventListener("click", () => {
  fetch("https://www.googleapis.com/books/v1/volumes?q=language:en&orderBy=relevance&printType=books&maxResults=10&filter=partial&fields=items(id,volumeInfo/title,volumeInfo/authors,volumeInfo/imageLinks/thumbnail,volumeInfo/categories,volumeInfo/publishedDate,volumeInfo/description)")
    .then(response => response.json())
    .then(data => {
      const books = data.items;
      const bookRowsHtml = books.map(book => {
        const stockStatus = Math.random() >= 0.5 ? "In stock" : "Out of stock";
        const buyNowButtonHtml = stockStatus === "In stock" ? `<button data-id="${book.id}" class="buyButtonCard">Buy Now</button>` : '';
        const randomPrice = Math.floor(Math.random() * 50) + 1;

        if(stockStatus === "In stock") {
          allBooks.push({...book, price: randomPrice});
        }
        

        return `
          <tr>
            <td>${book.volumeInfo.title}</td>
            <td>$${randomPrice}</td>
            <td>${stockStatus}</td>
            <td>${buyNowButtonHtml}</td>
          </tr>
        `;
        
      }).join("");

      wishlistTableBody.innerHTML = bookRowsHtml;


      const buyButtons = document.querySelectorAll('.buyButtonCard');
  buyButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    const itemId = e.target.dataset.id;
    const itemToBuy = allBooks.find(book => book.id === itemId);
    let allProducts = JSON.parse(localStorage.getItem('products'));
  
    if(allProducts == null) {
      allProducts = [{...itemToBuy}];
    } else {
      allProducts.push({...itemToBuy});
  }
    localStorage.setItem('products', JSON.stringify(allProducts));
  window.location.replace('../ShoppingCard/shoppingCard.html');
  })
})
    })
    .catch(error => console.log(error));
});


// buy


        








