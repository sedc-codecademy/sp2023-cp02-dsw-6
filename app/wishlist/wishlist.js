const addToWishlistBtn = document.getElementById("add-to-wishlist-btn");
const wishlistTableBody = document.getElementById("wishlist-table-body");

function addToWishlist() {
    fetch("https://www.googleapis.com/books/v1/volumes?q=language:en&orderBy=relevance&printType=books&maxResults=10&filter=partial&fields=items(id,volumeInfo/title,volumeInfo/authors,volumeInfo/imageLinks/thumbnail,volumeInfo/categories,volumeInfo/publishedDate,volumeInfo/description)")
      .then(response => response.json())
      .then(data => {
        const books = data.items;
        const bookRowsHtml = books.map(book => `
          <tr>
            <td>${book.volumeInfo.title}</td>
            <td>${book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : ""}</td>
            <td>${book.volumeInfo.publishedDate}</td>
            <td>${book.volumeInfo.categories ? book.volumeInfo.categories.join(", ") : ""}</td>
            <td>${book.volumeInfo.description || ""}</td>
          </tr>
        `).join("");
        wishlistTableBody.innerHTML = bookRowsHtml;
      })
      .catch(error => console.log(error));
  }
  
  addToWishlistBtn.addEventListener("click", addToWishlist);

