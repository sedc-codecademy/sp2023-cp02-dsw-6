let bookElement=document.getElementById("book-element");
let buttonDetail=document.getElementsByClassName("detailsButton1");
let buttonBuy=document.getElementsByClassName("buyButton1");


 fetch('https://www.googleapis.com/books/v1/volumes?q=language:en&orderBy=relevance&printType=books&maxResults=40&filter=partial&fields=items(id,volumeInfo/title,volumeInfo/authors,volumeInfo/imageLinks/thumbnail,volumeInfo/categories,volumeInfo/publishedDate,volumeInfo/description)')
    .then(response => response.json())
    .then(data => {
      const discountBooks = data.items.slice(5, 17);//Displaying 12 books from index 5 to index 15 that are for sale
      discountBooks.forEach((book, index) => {
        bookElementFunc(book, index);
      });
    })
    .catch(error => console.log(error));

  // function for displaying books with discount prices
  function bookElementFunc(book, index) {
    const i = index + 1;
    const price = Math.floor(Math.random() * 45 + 10).toFixed(2); //showing random prices with discount of 15%
    const discountPercentage = 15;
    const discountPrice = price * (1 - discountPercentage / 100);
    const discountPriceFormatted = parseInt(discountPrice).toFixed(2);
  
    let bookPic = document.getElementById(`book-pic${i}`);
    let bookTitle = document.getElementById(`book-title${i}`);
    let bookAuthor = document.getElementById(`book-author${i}`);
    let priceNormal = document.getElementById(`price-normal${i}`);
    let priceDiscount = document.getElementById(`price-discount${i}`);
  
    if (bookPic) {
      bookPic.innerHTML = `<img class="discountImg" src="${book.volumeInfo.imageLinks.thumbnail}" alt="Cover Image">`;
    }
    if (bookTitle) {
      let title = book.volumeInfo.title;
      
      if (title.length > 42) {
        title = title.substring(0, 40) + "...";
      }
      
      bookTitle.innerHTML = `<h1 class="bookTitleForDiscount">${title}</h1>`;
    }
    
    if (bookAuthor) {
      const limitedWordsAuthor = book.volumeInfo.authors.slice(0, 2).join(', ');
      bookAuthor.innerHTML = `<h1 class="bookAuthorForDiscount">${limitedWordsAuthor}</h1>`;
    }
    if (priceNormal) {
      priceNormal.innerHTML = `<h1 class="normalPricesForBooks"><del aria-hidden="true"> $${price}</h1>`;
    }
    if (priceDiscount) {
      priceDiscount.innerHTML = `<h1 class="discountPricesForBooks">  $${discountPriceFormatted}</h1>`;
    }
  };



//Other products

let otherProductsElement=document.getElementById("otherProducts-container");


fetch('https://www.googleapis.com/books/v1/volumes?q=language:en&orderBy=relevance&printType=books&maxResults=40&filter=partial&fields=items(id,volumeInfo/title,volumeInfo/authors,volumeInfo/imageLinks/thumbnail,volumeInfo/categories,volumeInfo/publishedDate,volumeInfo/description)')
.then(response => response.json())
.then(data => {
  const boooksForOtherProducts= data.items.slice(17, 21);//Displaying 4 books from index 16 to index 20 in section Other Products
  boooksForOtherProducts.forEach((book, index) => {
    displayOtherProducts(book, index);
  });
})
.catch(error => console.log(error));

//function for displaying other products books with ratings
function displayOtherProducts(book, index){
const i=index+1; 
const bookPrice = Math.floor(Math.random() * 45 + 10);
let otherProdPic=document.getElementById(`bookPic${i}`);
let otherProdTitle=document.getElementById(`bookTitle${i}`);
let otherProdPrice=document.getElementById(`bookPrice${i}`);
if (otherProdPic) {
 otherProdPic.innerHTML = `<img class="otherProductsImage" src="${book.volumeInfo.imageLinks.thumbnail}" alt="Cover Image">`;
}

  if (otherProdTitle) {
    let titleO = book.volumeInfo.title;
    if(titleO.length > 42) {
      titleO= titleO.substring(0, 40) + "...";
    }
          
  otherProdTitle.innerHTML = `<h5 class="bookTitleForOtherProducts">${titleO}</h5>`;
}
if (otherProdPrice) {
 otherProdPrice.innerHTML = `<h4 class="PricesForBooks">  $${Math.floor(bookPrice)}</h4>`;
}

}


const buyButtons = document.querySelectorAll('.buyButton');
const detailsButton = document.querySelectorAll('.detailsButton');

buyButtons.forEach(btn => btn.addEventListener('click', (e) => {
  window.location.replace('../ShoppingCard/shoppingCard.html');
}));


detailsButton.forEach(btn => btn.addEventListener('click', (e) => {
  window.location.href='../details/details.html';
}));
