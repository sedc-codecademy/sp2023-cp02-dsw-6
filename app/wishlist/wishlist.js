const addToWishlistBtn = document.getElementById("wishlist-btn");
const wishlistTableBody = document.getElementById("wishlist-table-body");

addToWishlistBtn.addEventListener("click", () => {
  fetch("https://www.googleapis.com/books/v1/volumes?q=language:en&orderBy=relevance&printType=books&maxResults=10&filter=partial&fields=items(id,volumeInfo/title,volumeInfo/authors,volumeInfo/imageLinks/thumbnail,volumeInfo/categories,volumeInfo/publishedDate,volumeInfo/description)")
    .then(response => response.json())
    .then(data => {
      const books = data.items;
      const bookRowsHtml = books.map(book => `
        <tr>
          <td>${book.volumeInfo.title}</td>
          <td>$${Math.floor(Math.random() * 50) + 1}</td>

          <td>${Math.random() >= 0.5 ? "In stock" : "Out of stock"}</td>
        </tr>
      `).join("");
      wishlistTableBody.innerHTML = bookRowsHtml;
    })
    .catch(error => console.log(error));
});











