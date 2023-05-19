const btnHamburger = document.querySelector(".btnHamburger"); 
const navigationMobile = document.querySelector(".navLinkContainer");

btnHamburger.addEventListener("click", () => {
    navigationMobile.classList.toggle("active");
})