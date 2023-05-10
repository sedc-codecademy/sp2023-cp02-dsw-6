let searchByAuthorInput = document.getElementById("searchByAuthor");
let searchByTitleInput = document.getElementById("searchByTitle");
let searchBtn = document.getElementById("searchBtn");
let bookList = document.getElementById("bookList");

if (searchByAuthorInput) {
  searchBtn.addEventListener("click", searchBooksByAuthor);
} else if (searchByTitleInput) {
  searchBtn.addEventListener("click", searchBooksByTitle);
}

//function for searching by title
/*function searchBooksByTitle() {
  let title = searchByTitleInput.value.trim();
  if (title) {
    let url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${title}&orderBy=relevance&printType=books&maxResults=40&filter=partial&fields=items(id,volumeInfo/title,volumeInfo/authors,volumeInfo/imageLinks/thumbnail,volumeInfo/categories,volumeInfo/publishedDate,volumeInfo/description)`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => displayBooks(data.items))
      .catch((error) => console.error(error));
  }
}*/

//function for searching by author
function searchBooksByAuthor() {
  let author = searchByAuthorInput.value.trim();
  if (author) {
    let url = `https://www.googleapis.com/books/v1/volumes?q=inauthor:${author}&orderBy=relevance&printType=books&maxResults=40&filter=partial&fields=items(id,volumeInfo/title,volumeInfo/authors,volumeInfo/imageLinks/thumbnail,volumeInfo/categories,volumeInfo/publishedDate,volumeInfo/description)`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => displayBooks(data.items))
      .catch((error) => console.error(error));
  }
}

//function for displaying the books after the search
function displayBooks(books) { //books =  data.items
  
  bookList.innerHTML = "";
  if (books) {
    books.forEach((book) => {
      let li = document.createElement("li");
      li.innerHTML = `<img src="${book.volumeInfo.imageLinks?.thumbnail}" alt="${book.volumeInfo.title}">
        <div>
          <h2>${book.volumeInfo.title}</h2>
                
        </div>`;
      bookList.appendChild(li);
    });
  } else {
    let li = document.createElement("li");
    li.textContent = "No books found.";
    bookList.appendChild(li);
  }
}
