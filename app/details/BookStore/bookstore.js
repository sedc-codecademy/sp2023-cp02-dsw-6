
let searchByAuthorInput = document.getElementById("searchByAuthor");
let searchByTitleInput = document.getElementById("searchByTitle");
let searchBtn = document.getElementById("searchBtn");
let bookList = document.getElementById("bookList");




searchBtn.addEventListener("click", searchBooks);


function searchBooks() {
 
  categoryTitle.innerHTML =  "Bookstore"
  let title = searchByTitleInput.value.trim();
  let author = searchByAuthorInput.value.trim();

  let url = `https://www.googleapis.com/books/v1/volumes?q=`;
  if (title) {
    url += `intitle:${title}&`;
  }
  if (author) {
    url += `inauthor:"${author}"&`; 
  }
  url += `orderBy=relevance&printType=books&maxResults=40&filter=partial&fields=items(id,volumeInfo/title,volumeInfo/authors,volumeInfo/imageLinks/thumbnail,volumeInfo/categories,volumeInfo/publishedDate,volumeInfo/description)`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => displayBooksSearch(data.items))
    .catch((error) => console.error(error));
}

function displayBooksSearch(books) {
  container.innerHTML = "";
  previousButton.style.display = "block";
  nextButton.style.display = "block";

  if (books) {
    books.forEach((book) => {
      const bookElement = createBookElement(book);
      container.appendChild(bookElement);
    });
  } else {
    let p = document.getElementById("bookList");
    p.innerHTML = "No books found.";
 
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
                const bookElement = createBookElement(book,i);
                  
                container.appendChild(bookElement);
                const detailsBtn = document.querySelector(`.detailsButton${i}`);
                // console.log(bookElement);
                  detailsBtn.addEventListener('click', () => {
                    // console.log(detailsBtn.dataset.price);
                    localStorage.setItem(
                      "detailBook",
                      JSON.stringify([{ ...book, price: Number(detailsBtn.dataset.price) }])
                    );
                    window.location.replace('../details.html');
                  })
                  const buyBtn = document.querySelector(`.buyButton${i}`);
                  buyBtn.addEventListener('click', () => {
                    let allProducts = JSON.parse(localStorage.getItem('products'));

  if(allProducts == null) {
    allProducts = [{ ...book, price: Number(detailsBtn.dataset.price) }];
  } else {
    allProducts.push({ ...book, price: Number(detailsBtn.dataset.price) });
}
  localStorage.setItem('products', JSON.stringify(allProducts));
window.location.replace('../../ShoppingCard/shoppingCard.html');
                  })
            }
            previousButton.style.display = "block";
            nextButton.style.display = "block";
            previousButton.disabled = startIndex === 0;
            nextButton.disabled = startIndex + 12 >= books.length;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}



function createBookElement(book, i) {
    const bookElement = document.createElement('div');
    bookElement.classList.add('book');

    const thumbnail = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : '';
    let title = book.volumeInfo.title;
    if(title.length > 42) {
      title = title.substring(0, 40) + "...";
    }
    const limitedWordsAuthorr = book.volumeInfo.authors.slice(0, 2).join(', '); 
    const price = getRandomPrice();

    bookElement.innerHTML = `
        <img id="imgCoverBook" src="${thumbnail}" alt="Book Cover">
        <div class="book-title">${title}</div>
        <div class="book-author">${limitedWordsAuthorr}</div>
        <div class="book-price">$${price}</div>
        <div class="book-buttons">
            <button id="detailsButton" data-price='${price}' class="detailsButton${i}"><i class="fa-solid fa-check" style="color: #0C54C0;"></i> Details </button>
            <button class="buyButton${i}" id="buyButton"><i class="fa-solid fa-cart-shopping" style="color: #0C54C0;"></i>Buy</button>
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



/*Sidebar function to open on click*/

const openArrow = document.getElementById('open-arrow');
const sidebarOpen = document.getElementById('sidebar-show-all');

openArrow.addEventListener('click', function() {
  sidebarOpen.classList.toggle('show-sidebar');
  openArrow.classList.toggle('open-arrow-rotate');
});


//Displaying books by category
let backToAllBooks = document.getElementById("backToAll");
let categoryTitle = document.getElementById("cover-title");

backToAllBooks.addEventListener("click", () => {
categoryTitle.innerHTML = "Bookstore";
displayBooks()
backToAllBooks.style.visibility = (backToAllBooks.style.visibility === "hidden") ? "visible" : "hidden";})



// Get the value of the query parameter
const urlParams = new URLSearchParams(window.location.search);
const action = urlParams.get('action');


// Check the action value and calling the corresponding function
if (action === 'computers') {
  categoryTitle.innerHTML = "Computers";
  displayBooksByCategory("Computers");
} else if (action === 'language') {
  categoryTitle.innerHTML = "Language, Arts & Disciplines"
  displayBooksByCategory("Language Arts & Disciplines");
} else if (action === "history") {
  categoryTitle.innerHTML = "History"
  displayBooksByCategory("History");
}else if (action === "education") {
  categoryTitle.innerHTML = "Education"
  displayBooksByCategory("Education");
}else if (action === "political") {
  categoryTitle.innerHTML = "Political Science"
  displayBooksByCategory("Political Science");
}else if (action === "religion") {
  categoryTitle.innerHTML = "Religion"
  displayBooksByCategory("Religion");
}else if (action === "law") {
  categoryTitle.innerHTML = "Law"
  displayBooksByCategory("Law");
}else if (action === "nature") {
  categoryTitle.innerHTML = "Nature"
  displayBooksByCategory("Nature");
}else if (action === "electronic") {
  categoryTitle.innerHTML = "Electronic Books"
  displayBooksByCategory("Electronic books");
}else if (action === "science") {
    categoryTitle.innerHTML = "Science"
    displayBooksByCategory("Science");
}else if (action === "comparativeling") {
    categoryTitle.innerHTML = "Comparative linguistics"
    displayBooksByCategory("Comparative linguistics");
}else if (action === "computernet") {
    categoryTitle.innerHTML = "Cataloging of computer network resources"
    displayBooksByCategory("Cataloging of computer network resources");
}else if (action === "englishlang") {
    categoryTitle.innerHTML = "English language"
    displayBooksByCategory("English language");
}else if (action === "foreignlang") {
    categoryTitle.innerHTML = "Foreign Language Study"
    displayBooksByCategory("Foreign Language Study");
}else if (action === "bookstore") {
  displayBooks();
}


//function for displaying books by Category 

function displayBooksByCategory(category) {

  
  const apiUrl = 'https://www.googleapis.com/books/v1/volumes?q=language:en&orderBy=relevance&printType=books&maxResults=40&filter=partial&fields=items(id,volumeInfo/title,volumeInfo/authors,volumeInfo/imageLinks/thumbnail,volumeInfo/categories,volumeInfo/publishedDate,volumeInfo/description)';
  
  fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
          const books = data.items;
          container.innerHTML = " ";
          const booksInCategory = books.filter(book => {
            const { volumeInfo } = book;
            if (volumeInfo && volumeInfo.categories) {
              return volumeInfo.categories.some(bookCategory =>
                bookCategory.toLowerCase() === category.toLowerCase()
              );
            }
            return false;
          });
          for (let i = startIndex; i < booksInCategory.length; i++) {
            const book = booksInCategory[i];
            const bookElement = createBookElement(book,i);
                  
                container.appendChild(bookElement);
                const detailsBtn = document.querySelector(`.detailsButton${i}`);
                // console.log(bookElement);
                  detailsBtn.addEventListener('click', () => {
                    // console.log(detailsBtn.dataset.price);
                    localStorage.setItem(
                      "detailBook",
                      JSON.stringify([{ ...book, price: Number(detailsBtn.dataset.price) }])
                    );
                    window.location.replace('../details.html');
                  })
                  const buyBtn = document.querySelector(`.buyButton${i}`);
                  buyBtn.addEventListener('click', () => {
                    let allProducts = JSON.parse(localStorage.getItem('products'));

  if(allProducts == null) {
    allProducts = [{ ...book, price: Number(detailsBtn.dataset.price) }];
  } else {
    allProducts.push({ ...book, price: Number(detailsBtn.dataset.price) });
}
  localStorage.setItem('products', JSON.stringify(allProducts));
window.location.replace('../../ShoppingCard/shoppingCard.html');
                  })
        }
        previousButton.style.display = "none";
        nextButton.style.display = "none";
        
        backToAllBooks.style.visibility = "visible"
        
        return booksInCategory;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}



document.addEventListener("DOMContentLoaded", function() {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  hamburger.addEventListener("click", mobileMenu);

  function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  }
});



// const buyButton = document.getElementById(`buyButton${i}`);

// buyButton.addEventListener('click', () => {
//   let allProducts = JSON.parse(localStorage.getItem('products'));
//   if(allProducts == null) {
//     allProducts = [{...randomBook, price: Number(price)}];
//   } else {
//     allProducts.push({ ...randomBook, price: Number(price) });
//   }
//   localStorage.setItem("products", JSON.stringify(allProducts));
// });
