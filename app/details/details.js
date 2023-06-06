let slideIndex = 1;

// showSlides(slideIndex);

// function plusSlides(n) {
//   showSlides(slideIndex += n);
// }

// function currentSlide(n) {
//   showSlides(slideIndex = n);
// }

// function showSlides(n) {
//   let i;
//   let slides = document.getElementsByClassName("slideImages");
//   let dots = document.getElementsByClassName("items");
//   if (n > slides.length) {slideIndex = 1}    
//   if (n < 1) {slideIndex = slides.length}
//   for (i = 0; i < slides.length; i++) {
//     slides[i].style.display = "none";  
//   }
//   for (i = 0; i < dots.length; i++) {
//     dots[i].className = dots[i].className.replace(" active", "");
//   }
//   slides[slideIndex-1].style.display = "block";  
//   dots[slideIndex-1].className += " active";
// }



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









  

