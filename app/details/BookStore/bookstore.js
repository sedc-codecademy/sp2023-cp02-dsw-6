
let searchByAuthorInput = document.getElementById("searchByAuthor");
let searchByTitleInput = document.getElementById("searchByTitle");
let searchBtn = document.getElementById("searchBtn");
let bookList = document.getElementById("bookList");

searchBtn.addEventListener("click", searchBooks);


function searchBooks() {
  let title = searchByTitleInput.value.trim();
  let author = searchByAuthorInput.value.trim();

  let url = `https://www.googleapis.com/books/v1/volumes?q=`;
  if (title) {
    url += `intitle:${title}&`;
  }
  if (author) {
    url += `inauthor:${author}&`;
  }
  url += `orderBy=relevance&printType=books&maxResults=40&filter=partial&fields=items(id,volumeInfo/title,volumeInfo/authors,volumeInfo/imageLinks/thumbnail,volumeInfo/categories,volumeInfo/publishedDate,volumeInfo/description)`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => displayBooksSearch(data.items))
    .catch((error) => console.error(error));
}

function displayBooksSearch(books) {
  container.innerHTML = "";

  if (books) {
    books.forEach((book) => {
      const bookElement = createBookElement(book);
      container.appendChild(bookElement);
    });
  } else {
    let li = document.createElement("li");
    li.textContent = "No books found.";
    container.appendChild(li);
  }

  previousButton.disabled = true;
  nextButton.disabled = true;
}




  //Displaying all books random
const container = document.querySelector('.container');
const previousButton = document.getElementById('previous');
const nextButton = document.getElementById('next');
let startIndex = 0;

function displayBooks() {
    const apiUrl = 'https://www.googleapis.com/books/v1/volumes?q=language:en&orderBy=relevance&printType=books&maxResults=40&filter=partial&fields=items(id,volumeInfo/title,volumeInfo/authors,volumeInfo/imageLinks/thumbnail,volumeInfo/categories,volumeInfo/publishedDate,volumeInfo/description)';
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const books = data.items;
            container.innerHTML = '';

            for (let i = startIndex; i < startIndex + 12 && i < books.length; i++) {
                const book = books[i];
                const bookElement = createBookElement(book);
                container.appendChild(bookElement);
            }

            previousButton.disabled = startIndex === 0;
            nextButton.disabled = startIndex + 12 >= books.length;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}



function createBookElement(book) {
    const bookElement = document.createElement('div');
    bookElement.classList.add('book');

    const thumbnail = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : '';
    const title = book.volumeInfo.title;
    const author=book.volumeInfo.authors;
    const price = getRandomPrice();

    bookElement.innerHTML = `
        <img src="${thumbnail}" alt="Book Cover">
        <div class="book-title">${title}</div>
        <div class="book-author">${author}</div>
        <div class="book-price">$${price}</div>
        <div class="book-buttons">
            <button class="detailsButton"><i class="fa-solid fa-check" style="color: #0C54C0;"></i> Details </button>
            <button class="buyButton"><i class="fa-solid fa-cart-shopping" style="color: #0C54C0;"></i>Buy</button>
        </div>
    `;

    return bookElement;
}

function getRandomPrice() {
    const minPrice = 5;
    const maxPrice = 20;
    return (Math.random() * (maxPrice - minPrice) + minPrice).toFixed(2);
}

previousButton.addEventListener('click', () => {
    startIndex -= 12;
    displayBooks();
});

nextButton.addEventListener('click', () => {
    startIndex += 12;
    displayBooks();
});

displayBooks();