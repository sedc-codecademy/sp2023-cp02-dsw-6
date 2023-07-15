



let button100=document.getElementById("btn100");
let button200=document.getElementById("btn200");
let button150=document.getElementById("btn150");
let button50=document.getElementById("btn50");
let button200s=document.getElementById("btn200s");
let button100s=document.getElementById("btn100s");

button200.addEventListener("click",()=>{
 let price=200;
 let img=document.getElementById("image200");
 let title=document.getElementById("title200");
 window.location.replace('../ShoppingCard/shoppingCard.html');
})
button100.addEventListener("click",()=>{
  console.log("100");
  window.location.replace('../ShoppingCard/shoppingCard.html');
})
button200s.addEventListener("click",()=>{
  console.log("200");
  window.location.replace('../ShoppingCard/shoppingCard.html');
})
button100s.addEventListener("click",()=>{
  console.log("100");
  window.location.replace('../ShoppingCard/shoppingCard.html');
})
button150.addEventListener("click",()=>{
  console.log("150");
  window.location.replace('../ShoppingCard/shoppingCard.html');
})
button50.addEventListener("click",()=>{
  console.log("50");
  window.location.replace('../ShoppingCard/shoppingCard.html');
})


document.addEventListener("DOMContentLoaded", function() {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  hamburger.addEventListener("click", mobileMenu);

  function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  }
});

// window.addEventListener('load', () => {
//   const wrapperDiv = document.querySelector('#wrapper');
//   const bookData = JSON.parse(localStorage.getItem('detailBook'))[0] || [];
//   wrapperDiv.innerHTML += `
//   <div id="containerDetails">
//     <div id="coverImg"><img id="coverImgBook" src="${bookData.volumeInfo.imageLinks.thumbnail}" alt="Cover Image"></div>
//     <div id="textDetails">
//       <h1 id="title">${bookData.volumeInfo.title}</h1>
     
//       <table id="tableDetails">
//         <tbody>
//           <tr>
//             <th>Category</th>
//             <td id="categoryTable">${bookData.volumeInfo.categories}</td>
//           </tr>
//           <tr>
//             <th>Author</th>
//             <td id="authorTable">${bookData.volumeInfo.authors}</td>
//           </tr>
//           <tr>
//             <th>Published</th>
//             <td id="publishedTable">${bookData.volumeInfo.publishedDate}</td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   </div>
//   <div class="bookDetails">
//   <div class="offerBox">
//         <div class="price">$${bookData.price}</div>              
              
//         <div id="detailsButtonAndBuyButtonCart">
//           <button class="detailsButton" id="detailsButtonCart"><i class="fa-solid fa-heart" style="color: #0C54C0;"></i> Wish list </button>
//           <button class="buyButton" id="buyButtonCart"><i class="fa-solid fa-cart-shopping" style="color: #0C54C0;"></i> Buy</button>
//         </div>
//       </div>
//     <div class="bookDetailsTable">
      
//       <div class="descriptionDetails">
//         <h1 id="descDetails">Description</h1>
//         <p class="desc">${bookData.volumeInfo.description}</p>
//       </div>
//     </div>
//   </div>'