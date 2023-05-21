const btnHamburger = document.querySelector(".btnHamburger"); 
const navigationMobile = document.querySelector(".navLinkContainer");

btnHamburger.addEventListener("click", () => {
    navigationMobile.classList.toggle("active");
})

const cartBtn = document.querySelector("nav .rightContent .cartContentIcon .addCartContent");
const cart = document.querySelector(".cartContentList");
const closeCart= document.querySelector(".cartContentList #closeCart");

cartBtn.addEventListener("click", () => {
    cart.classList.add("active");
})

closeCart.addEventListener("click", () => {
    cart.classList.remove("active");
})

// Cart Working

if(document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

// Making Function

function ready() {
    // Remove Items From Cart

    var removeCartButtons = document.getElementsByClassName("cartRemove");
    for (var i = 0; i < removeCartButtons.length; i++){
        var button = removeCartButtons[i]
        button.addEventListener("click", removeCartItem);
    }
    // Quantity Changes
    var quantityInputs = document.getElementsByClassName("cartQuantity");
    for (var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }
    // Add to Cart
    var addCart = document.getElementsByClassName("addToCard");
    for (var i = 0; i < addCart.length; i++){
        addCart[i].addEventListener("click", addCartClicked);
    }
    // Buy Button Work
    document.getElementsByClassName("btnBuy")[0].addEventListener("click", buyButtonClicked);

}

// Buy Button
function buyButtonClicked(){
    alert("Votre commande a été validée !");
    var cartContent = document.getElementsByClassName("cartContent")[0];
    while(cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild)
    }
    updateTotal();
}

// Remove Items From Cart

function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
}

// Quantity Changes
function quantityChanged(event){
    var input = event.target;
    if(isNaN(input.value) || input.value <=0){
        input.value = 1;
    }
    updateTotal();
}

// Add To Cart


function addCartClicked(event){
    var button = event.target;
    var shopProducts = button.parentElement.parentElement.parentElement.parentElement;
    var imgProduct = shopProducts.querySelectorAll(".imgProduct img")[0].src;
    var nameProduct = shopProducts.getElementsByClassName("productTitle")[0].innerText;
    var priceProduct = shopProducts.querySelectorAll(".productPrice p")[0].innerText;
    addProductToCart(imgProduct ,nameProduct, priceProduct);
    updateTotal();
}

function addProductToCart(imgProduct ,nameProduct, priceProduct){
    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add("cartBox");
    var cartItems = document.getElementsByClassName("cartContent")[0];
    var cartItemsName = cartItems.querySelectorAll(".cartProductTitle h2");
    for (var i = 0; i < cartItemsName.length; i++){
        if(cartItemsName[i].innerText == nameProduct){
            alert("Produit à ajouté au panier avec succes");
            return;
        }
    }

    var cartBoxContent = `
                <img src="${imgProduct}" alt="Image Asus rog desktop" class="cartImg" />
                <div class="detailBox">
                    <div class="cartProductTitle">
                        <h2>${nameProduct}</h2>
                    </div>
                    <div class="cartPrice">
                        <p>${priceProduct}</p>
                    </div>
                    <input type="number" min="1" value="1" class="cartQuantity" />
                </div>
                <i class="fa-solid fa-trash cartRemove"></i>`

cartShopBox.innerHTML = cartBoxContent;
cartItems.append(cartShopBox);
cartShopBox.getElementsByClassName('cartRemove')[0].addEventListener("click", removeCartItem);
cartShopBox.getElementsByClassName('cartQuantity')[0].addEventListener("change", quantityChanged);
}
// Update Total

function updateTotal(){
    var cartContent = document.getElementsByClassName("cartContent")[0];
    var cartBoxes = cartContent.getElementsByClassName("cartBox");
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++){
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cartPrice")[0];
        var quantityElement = cartBox.getElementsByClassName("cartQuantity")[0];
        var price = parseFloat(priceElement.innerText.replace("€", ""));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }

    // If price Contain some Cents value
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName("totalPrice")[0].innerText = "€" + total;

    var count = document.getElementById("count");
    var counter = 0;
   
}