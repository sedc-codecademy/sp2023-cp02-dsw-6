let searchByAuthorInput = document.getElementById("searchByAuthor");
let searchByTitleInput = document.getElementById("searchByTitle");
let searchBtn = document.getElementById("searchBtn");
let bookList = document.getElementById("bookList");
let slides = document.getElementsByClassName("slideImages");
let dots = document.getElementsByClassName("items");

//function for automatic slideshow, changing image every 3 seconds
let autoSlideIndex = 0;
showAutoSlides();
function showAutoSlides() {
  let i;
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display="none";  
  }
  autoSlideIndex++;
  if (autoSlideIndex > slides.length) {autoSlideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
    
  }
  slides[autoSlideIndex-1].style.display="block";  
  dots[autoSlideIndex-1].className += " active";
  setTimeout(showAutoSlides, 3000);
}


//function for slide images with press on next and previous buttons
let slideIndex = 1;
function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}
showSlides(slideIndex);


//function for slide messages from the readers
const slides1 = document.getElementsByClassName('slideMessage');
let currentSlide1 = 0;
slides1[currentSlide1].style.display = 'block';
setInterval(() => {
  slides1[currentSlide1].style.display = 'none';
  currentSlide1 = (currentSlide1 + 1) % slides1.length;
  slides1[currentSlide1].style.display = 'block';
}, 5000);



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
      li.innerHTML = `<img src="${book.volumeInfo.imageLinks?.thumbnail}" alt="${book.volumeInfo.title}">
        <div>
          <h2>${book.volumeInfo.title}</h2>
          <p>Author(s): ${book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "Unknown"}</p>
          <p>Category: ${book.volumeInfo.categories ? book.volumeInfo.categories.join(", ") : "Unknown"}</p>
          <p>Published Date: ${book.volumeInfo.publishedDate ? book.volumeInfo.publishedDate : "Unknown"}</p>
          <p>Description: ${book.volumeInfo.description ? book.volumeInfo.description : "N/A"}</p>
        </div>`;
      bookList.appendChild(li);
    });
  } else {
    let li = document.createElement("li");
    li.textContent = "No books found.";
    bookList.appendChild(li);
  }
}

