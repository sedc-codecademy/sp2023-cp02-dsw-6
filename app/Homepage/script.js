
let slides = document.getElementsByClassName("slideImages");
let dots = document.getElementsByClassName("items");

//function for automatic slideshow, changing image every 3 seconds
let autoSlideIndex = 0;
showAutoSlides();
function showAutoSlides() {
  let i;
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  autoSlideIndex++;
  if (autoSlideIndex > slides.length) {
    autoSlideIndex = 1;
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[autoSlideIndex - 1].style.display = "block";
  dots[autoSlideIndex - 1].className += " active";
  setTimeout(showAutoSlides, 3000);
}

//function for slide images with press on next and previous buttons
let slideIndex = 1;
function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("slideImages");
  let dots = document.getElementsByClassName("items");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}
showSlides(slideIndex);

//function for slide messages from the readers
const slides1 = document.getElementsByClassName("slideMessage");
let currentSlide1 = 0;
slides1[currentSlide1].style.display = "block";
setInterval(() => {
  slides1[currentSlide1].style.display = "none";
  currentSlide1 = (currentSlide1 + 1) % slides1.length;
  slides1[currentSlide1].style.display = "block";
}, 5000);

//Search element

let searchByAuthorInput = document.getElementById("searchByAuthor");
let searchByTitleInput = document.getElementById("searchByTitle");
let searchBtn = document.getElementById("searchBtn");
let bookList = document.getElementById("bookList");
let containerSearch=document.querySelector(".containerSearch")



searchBtn.addEventListener("click", searchBooks);


function searchBooks() {
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
  containerSearch.innerHTML = "";

  if (books) {
    books.forEach((book) => {
      const bookElement = createBookElement(book);
      containerSearch.appendChild(bookElement);
    });
  } else {
    let p = document.getElementById("bookList");
    p.innerHTML = "No books found.";
 
  }

  previousButton.disabled = true;
  nextButton.disabled = true;
}

function createBookElement(book) {
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



// Function for displaying new releases books
const mainNewReleasesDiv = document.getElementById("mainNewReleasesDiv");

let url =
  "https://www.googleapis.com/books/v1/volumes?q=language:en&orderBy=relevance&printType=books&maxResults=40&filter=partial&fields=items(id,volumeInfo/title,volumeInfo/authors,volumeInfo/imageLinks/thumbnail,volumeInfo/categories,volumeInfo/publishedDate,volumeInfo/description)";

let displayNewReleasesBooks = () => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const newestBooks = data.items.filter((item) => { //filtered the newest books, published in 2022 and 2023
        const publishedDate = item.volumeInfo.publishedDate;
        return publishedDate >= "2022-01-01";
      });
      newReleasesBooks(newestBooks);
    })
    .catch((error) => console.error(error));
};

let generateRandomPrice = () => {
  // Generate a random price between 5 and 50$
  const randomPrice = Math.floor(Math.random() * 45) + 5;
  return randomPrice.toFixed(2);
};

let newReleasesBooks = (newBooks) => {
  // Get a random book from the array of new books
  
  let randomIndex;
  const displayedBooks = [];
  for (let i = 1; i <= 3; i++) {
    do {
      randomIndex = Math.floor(Math.random() * newBooks.length);
    } while (displayedBooks.includes(randomIndex));

    displayedBooks.push(randomIndex);
    const randomBook = newBooks[randomIndex];
    const price = generateRandomPrice();

    const displayImage = document.getElementById(`displayImage${i}`);
    const divTitleNewRelease = document.getElementById(
      `divTitleNewRelease${i}`
    );
    const divAuthorNewRelease = document.getElementById(
      `divAuthorNewRelease${i}`
    );
    const divPriceNewRelease = document.getElementById(
      `divPriceNewRelease${i}`
    );
    //
    const buyButton = document.getElementById(`buyButton${i}`);
    const detailsButton = document.getElementById(`detailsButton${i}`);

    detailsButton.addEventListener('click', () => {
      localStorage.setItem('detailBook', JSON.stringify([{...randomBook, price: Number(price)}]));
    })


    buyButton.addEventListener('click', () => {
      let allProducts = JSON.parse(localStorage.getItem('products'));
      if(allProducts == null) {
        allProducts = [{...randomBook, price: Number(price)}];
      } else {
        allProducts.push({...randomBook, price: Number(price)});
    }
      localStorage.setItem('products', JSON.stringify(allProducts));
    })

    //Displaying a random book image, title, authors and price
    displayImage.innerHTML = `<img class="newReleaseImg" src="${randomBook.volumeInfo.imageLinks.thumbnail}  alt="Image">`;
    
    divTitleNewRelease.innerHTML = `<h1 class="titleForNewReleases"> ${randomBook.volumeInfo.title}`;
    
    const limitedWordsAuthor = randomBook.volumeInfo.authors.slice(0, 2).join(', '); 
    divAuthorNewRelease.innerHTML = `<h1 class="authorForNewReleases"> ${limitedWordsAuthor}`;
    
    divPriceNewRelease.innerHTML = `<h1 class="priceForNewReleases"> $${price}`;

  }

};
displayNewReleasesBooks();


// Function for displaying popular books
let displayPopularBooks = () => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const popular = data.items.slice(3,6)
      popularBooks(popular);
    })
    .catch((error) => console.error(error));
};

let popularBooks=(showPopular)=>{
  for (let i = 0; i < showPopular.length; i++){
    const book = showPopular[i];
  const displayPopularBooksImage = document.getElementById(`displayImagePopular${i+1}`);
    const divTitlePopular = document.getElementById(
      `divTitlePopular${i+1}`
    );
    const divAuthorPopular = document.getElementById(
      `divAuthorPopular${i+1}`
    );
    const divPricePopular = document.getElementById(
      `divPricePopular${i+1}`
    );
    const priceForPopular = generateRandomPrice();
    //
    const buyButton = document.getElementById(`buyButtonPopular${i +1}`);
    const detailsButton = document.getElementById(`detailsButtonPopular${i +1}`);
    detailsButton.addEventListener('click', () => {
      localStorage.setItem('detailBook', JSON.stringify([{...book, price: Number(priceForPopular)}]));
    })


    buyButton.addEventListener('click', () => {
      let allProducts = JSON.parse(localStorage.getItem('products'));

      if(allProducts == null) {
        allProducts = [{...book, price: Number(priceForPopular)}];
      } else {
        allProducts.push({...book, price: Number(priceForPopular)});
    }
      localStorage.setItem('products', JSON.stringify(allProducts));
    })

    displayPopularBooksImage .innerHTML = `<img class="popularImg" src="${book.volumeInfo.imageLinks.thumbnail}  alt="Image">`;
    
    divTitlePopular.innerHTML = `<h1 class="titleForNewReleases"> ${book.volumeInfo.title}`;
    
    const limitedWordsAuthorr = book.volumeInfo.authors.slice(0, 2).join(', '); 
    divAuthorPopular.innerHTML = `<h1 class="authorForNewReleases"> ${limitedWordsAuthorr}`;
    
    divPricePopular.innerHTML = `<h1 class="priceForNewReleases"> $${priceForPopular}`;
  }
}

displayPopularBooks();


const buyButtons = document.querySelectorAll('.buyButton');
const detailsButton = document.querySelectorAll('.detailsButton');

buyButtons.forEach(btn => btn.addEventListener('click', (e) => {
  window.location.replace('../ShoppingCard/shoppingCard.html');
}));


detailsButton.forEach(btn => btn.addEventListener('click', (e) => {
  window.location.replace('../details/details.html');
}));
