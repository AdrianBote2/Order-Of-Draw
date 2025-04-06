function Invisible(){
    var card = document.getElementById("card");
    card.classList.toggle("invisible");
}

function closeCard() {
    const card = document.getElementById("card");
    card.style.display = "none";
}

function openCard() {
    const card = document.getElementById("card");
    card.style.display = "block"; // or "flex", depending on your layout
}