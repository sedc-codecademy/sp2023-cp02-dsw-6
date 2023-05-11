let searchByAuthorInput = document.getElementById("searchByAuthor");
let searchByTitleInput = document.getElementById("searchByTitle");
let searchBtn = document.getElementById("searchBtn");
let bookList = document.getElementById("bookList");

let slideIndex = 1;

showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("slideImages");
  let dots = document.getElementsByClassName("items");
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