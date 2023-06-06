
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
    .then((data) => displayBooks(data.items))
    .catch((error) => console.error(error));
}

//function for displaying the books after the search
function displayBooks(books) {
  bookList.innerHTML = "";
  if (books) {
    books.forEach((book) => {
      let li = document.createElement("li");
      li.innerHTML = `<img src="${
        book.volumeInfo.imageLinks?.thumbnail
      }" alt="${book.volumeInfo.title}">
        <div>
          <h2>${book.volumeInfo.title}</h2>
          <p>Author(s): ${
            book.volumeInfo.authors
              ? book.volumeInfo.authors.join(", ")
              : "Unknown"
          }</p>
          <p>Category: ${
            book.volumeInfo.categories
              ? book.volumeInfo.categories.join(", ")
              : "Unknown"
          }</p>
          <p>Published Date: ${
            book.volumeInfo.publishedDate
              ? book.volumeInfo.publishedDate
              : "Unknown"
          }</p>
          <p>Description: ${
            book.volumeInfo.description ? book.volumeInfo.description : "N/A"
          }</p>
        </div>`;
      bookList.appendChild(li);
    });
  } else {
    let li = document.createElement("li");
    li.textContent = "No books found.";
    bookList.appendChild(li);
  }
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
    displayPopularBooksImage .innerHTML = `<img class="popularImg" src="${book.volumeInfo.imageLinks.thumbnail}  alt="Image">`;
    
    divTitlePopular.innerHTML = `<h1 class="titleForNewReleases"> ${book.volumeInfo.title}`;
    
    const limitedWordsAuthorr = book.volumeInfo.authors.slice(0, 2).join(', '); 
    divAuthorPopular.innerHTML = `<h1 class="authorForNewReleases"> ${limitedWordsAuthorr}`;
    
    divPricePopular.innerHTML = `<h1 class="priceForNewReleases"> $${priceForPopular}`;
  }
}

displayPopularBooks();


const buyButtons = document.querySelectorAll('.buyButton');

buyButtons.forEach(btn => btn.addEventListener('click', (e) => {
  // e.preventDefault();
  window.location.replace('../ShoppingCard/shoppingCard.html');
}))
