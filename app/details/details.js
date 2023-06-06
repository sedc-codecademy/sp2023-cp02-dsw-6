
window.addEventListener('load', () => {
  const wrapperDiv = document.querySelector('#wrapper');
  const bookData = JSON.parse(localStorage.getItem('detailBook'))[0] || [];
  // console.log(JSON.parse(localStorage.getItem('detailBook'))[0]);
  wrapperDiv.innerHTML += `
  <div id="containerDetails">
    <div id="coverImg"><img id="coverImgBook" src="${bookData.volumeInfo.imageLinks.thumbnail}" alt="Cover Image"></div>
    <div id="textDetails">
      <h1 id="title">${bookData.volumeInfo.title}</h1>
      <div class="offerBox">
        <div class="price">$${bookData.price}</div>              
              
        <div id="detailsButtonAndBuyButtonCart">
          <button class="detailsButton" id="detailsButtonCart"><i class="fa-solid fa-check" style="color: #0C54C0;"></i> Details </button>
          <button class="buyButton" id="buyButtonCart"><i class="fa-solid fa-cart-shopping" style="color: #0C54C0;"></i> Buy</button>
        </div>
      </div>
    </div>
  </div>
  <div class="bookDetails">
    <div class="bookDetailsTable">
      <h1 id="bookDet">Book Details</h1>
      <table id="tableDetails">
        <tbody>
          <tr>
            <th>Category</th>
            <td id="categoryTable">${bookData.volumeInfo.categories}</td>
          </tr>
          <tr>
            <th>Author</th>
            <td id="authorTable">${bookData.volumeInfo.authors}</td>
          </tr>
          <tr>
            <th>Published</th>
            <td id="publishedTable">${bookData.volumeInfo.publishedDate}</td>
          </tr>
        </tbody>
      </table>
      <div class="descriptionDetails">
        <h1 id="descDetails">Description</h1>
        <p class="desc">${bookData.volumeInfo.description}</p>
      </div>
    </div>
  </div>
  `
  // console.log('ready');
});


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



//details
let coverImg=document.getElementById("coverImg");
let titleDesc=document.getElementById("title");
let categoriesSpan=document.getElementById("categoriesSpan");




function descriptionFunc() {
  fetch('https://www.googleapis.com/books/v1/volumes?q=language:en&orderBy=relevance&printType=books&maxResults=40&filter=partial&fields=items(id,volumeInfo/title,volumeInfo/authors,volumeInfo/imageLinks/thumbnail,volumeInfo/categories,volumeInfo/publishedDate,volumeInfo/description)')
    .then((response) => response.json())
    .then((data) => {
      if (data.items) {
        displayDesc(data.items[0]);
      } else {
        console.log("No books found.");
      }
    })
    .catch((error) => console.error(error));
}



function displayDesc(book) {
  if (book) {
    let categoryTable = document.getElementById("categoryTable");
    let authorTable = document.getElementById("authorTable");
    let publishedTable = document.getElementById("publishedTable");
    let desc = document.querySelector('.desc');
    let price = getRandomPrice(); // Generate random price

    // titleDesc.innerHTML = book.volumeInfo.title;
    // coverImg.innerHTML = `<img id="coverImgBook" src="${book.volumeInfo.imageLinks.thumbnail}" alt="Cover Image">`;

    categoryTable.innerHTML += `<td>${book.volumeInfo.categories}</td>`;
    authorTable.innerHTML += `<td>${book.volumeInfo.authors}</td>`;
    publishedTable.innerHTML += `<td>${book.volumeInfo.publishedDate}</td>`;
    desc.innerHTML = `${book.volumeInfo.description}`;
    // document.querySelector('.price').textContent = price; 
  } else {
    console.log("No book found.");
  }
}

// descriptionFunc();


 function getRandomBooks() {
   const apiUrl = 'https://www.googleapis.com/books/v1/volumes?q=language:en&orderBy=relevance&printType=books&maxResults=40&filter=partial&fields=items(id,volumeInfo/title,volumeInfo/authors,volumeInfo/imageLinks/thumbnail,volumeInfo/categories,volumeInfo/publishedDate,volumeInfo/description)';

   fetch(apiUrl)
   .then(response => response.json())
     .then(data => {
       const books = data.items;
       const randomBooks = getRandomElements(books, 3); 

       randomBooks.forEach((book, index) => {
        const bookCover = document.getElementById(`bookCover${index + 1}`);
        const bookTitle = document.getElementById(`bookTitle${index + 1}`);
        
         const bookPrice = document.getElementById(`bookPrice${index + 1}`);
         let title = book.volumeInfo.title;
         if(title.length > 42) {
          title = title.substring(0, 40) + "...";
        }
        
         bookCover.src = book.volumeInfo.imageLinks.thumbnail;
         bookTitle.textContent = `${title}`;
         bookPrice.textContent = getRandomPrice();
        

       });
    })
     .catch(error => {
       console.log('Error:', error);
     });
 }


 function getRandomElements(arr, num) {
   const shuffled = arr.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
 }

 function getRandomPrice() {
 
   const price = Math.floor(Math.random() * 100) + 1;
   
   return `$${price}`;
 }

 getRandomBooks();









  

