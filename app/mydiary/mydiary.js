let bookTitle = document.getElementById("searchByTitle");
let starsRating = document.getElementsByName("stars");
let notes = document.getElementById("notes");
let submitBtn = document.getElementById("btn");
let theWrittenNote = document.getElementById("put");

submitBtn.addEventListener("click", function() {
    let paragraph1 = document.createElement(`p`);
    paragraph1.classList.add("paragraph-styling");
    paragraph1.innerText = bookTitle.value;
    theWrittenNote.appendChild(paragraph1);
    bookTitle.value = "";

    let selectedRating = Array.from(starsRating).find(input => input.checked);
    if (selectedRating) {
        let ratingValue = selectedRating.value;
        let stars = getStarsHTML(ratingValue);
        let paragraph2 = document.createElement(`p`);
        paragraph2.classList.add("paragraph-styling");
        paragraph2.innerHTML = stars;
        theWrittenNote.appendChild(paragraph2);
        selectedRating.checked = false;
    }

    let paragraph3 = document.createElement(`p`);
    paragraph3.classList.add("paragraph-styling");
    paragraph3.innerText = notes.value;
    theWrittenNote.appendChild(paragraph3);
    notes.value = "";
});

function getStarsHTML(rating) {
    let starsHTML = '';
    for (let i = 0; i < rating; i++) {
        starsHTML += '<span class="smallstar">&#9733;</span>'; // Full star HTML entity
    }
    return starsHTML;
}
