let bookTitle = document.getElementById("searchByTitle");
let starsRating = document.getElementsByName("stars");
let notes = document.getElementById("notes");
let submitBtn = document.getElementById("btn");
let theWrittenNote = document.getElementById("theWrittenNote");
let bookImage = "book_image_for_mydiary.png";
let titleValidation = document.getElementById("book_validation");
let ratingValidation = document.getElementById("rating_validation");

submitBtn.addEventListener("click", submitNote);
submitBtn.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    submitBtn.click();
  }
});

function submitNote() {
  let title = bookTitle.value.trim();

  // Validate book title
  if (title === "") {
    titleValidation.textContent = "*Please enter a book title.";
    return;
  }

  let noteDiv = document.createElement("div");
  noteDiv.style.display = "flex";
  noteDiv.style.flexDirection = "row";
  noteDiv.style.alignItems = "center";

  let image = document.createElement("img");
  image.src = bookImage;
  image.alt = title;
  image.classList.add("book-image");

  noteDiv.appendChild(image);

  let paragraph1 = document.createElement(`p`);
  paragraph1.classList.add("paragraph-styling");
  paragraph1.innerText = title;

  noteDiv.appendChild(paragraph1);
  bookTitle.value = "";

  let selectedRating = Array.from(starsRating).find((input) => input.checked);

  // Validate rating
  if (!selectedRating) {
    ratingValidation.textContent = "*Please select a rating.";
    return;
  }

  if (selectedRating) {
    let ratingValue = selectedRating.value;
    let stars = getStarsHTML(ratingValue);
    let paragraph2 = document.createElement(`p`);
    paragraph2.classList.add("paragraph-styling");
    paragraph2.innerHTML = stars;

    noteDiv.appendChild(paragraph2);
    selectedRating.checked = false;
  }

  let paragraph3 = document.createElement(`p`);
  paragraph3.classList.add("paragraph-styling");
  paragraph3.innerText = notes.value;

  noteDiv.appendChild(paragraph3);
  notes.value = "";

  titleValidation.textContent = ""; // Clear any previous validation message

  theWrittenNote.appendChild(noteDiv);
}

function getStarsHTML(rating) {
  let starsHTML = "";
  for (let i = 0; i < rating; i++) {
    starsHTML += '<span class="smallstar">&#9733;</span>'; // Full star HTML entity
  }
  return starsHTML;
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
