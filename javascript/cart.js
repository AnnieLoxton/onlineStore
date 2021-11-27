/*Tutorial for adding to cart & cart functionality found here:
https://www.youtube.com/watch?v=PoTGs38DR9E&ab_channel=TelmoSampaio */

let carts = document.querySelectorAll('.toCart');

//Define products as an array
let products = [
    {
        name: 'Dining Chair',
        tag: 'diningchair',
        price: 1200,
        inCart: 0
    },
    {
        name: 'Arch Mirror',
        tag: 'archmirror',
        price: 800,
        inCart: 0
    },
    {
        name: 'Display Vase',
        tag: 'displayvase',
        price: 300,
        inCart: 0
    },
    {
        name: 'Rattan Chair',
        tag: 'rattanchair',
        price: 2500,
        inCart: 0
    },
    {
        name: 'Scatter Cushion',
        tag: 'scattercushion',
        price: 350,
        inCart: 0
    },
    {
        name: 'Floating Shelf',
        tag: 'floatingshelf',
        price: 850,
        inCart: 0
    },
    {
        name: 'Bucket Chair',
        tag: 'bucketchair',
        price: 1500,
        inCart: 0
    },
    {
        name: 'Plant Pot',
        tag: 'plantpot',
        price: 200,
        inCart: 0
    }
];

for (let i = 0; i < carts.length; i++) {
    //Select all carts with [i].
    carts[i].addEventListener('click', () =>{
        cartNumbers(products[i]); //Calling 'products' in this function shows us what product is clicked on.
        totalCost(products[i]);

        let cartCost = localStorage.getItem('totalCost');
        alert("my cart total is " + cartCost)
    });
}

function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers) {
        document.querySelector('.navIcon span').textContent = productNumbers;
    }
}

//Keeps track of the amount of items in the cart.
function cartNumbers(product) {
    
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if(productNumbers){
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.navIcon span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.navIcon span').textContent = 1;
    }
    
    setItems(product);  
}

//Allows us to add multiple items to cart, while keeping track how many of each.
function setItems(product) {
   let cartItems = localStorage.getItem('productsInCart');
   cartItems = JSON.parse(cartItems);

   if(cartItems != null) {

    if(cartItems[product.tag] == undefined) {
        cartItems = {
            ...cartItems,
            [product.tag]: product
        }
    }
   cartItems[product.tag].inCart += 1;
   } else {
        product.inCart =  1;
        cartItems = {
            [product.tag]: product
        }
   }

   localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

//Adding the prices of items in the cart.
function totalCost(product){
    // console.log("the product price is, ", product.price);
    let cartCost = localStorage.getItem('totalCost');

    // console.log("my cartCost is", cartCost);
    // console.log(typeof cartCost);

    if(cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else {
        localStorage.setItem("totalCost", product.price);
    }    
}

//Display products in cart.
function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);

    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');
   
    if(cartItems && productContainer) {
        productContainer.innerHTML = ''; 
        Object.values(cartItems).map(item => {

            //Cart layout
            productContainer.innerHTML +=`
            <div class="product">
                <ion-icon name="close-circle"></ion-icon>
                <img src="././images/${item.tag}.png"/>
                <span class="pSmallDark">${item.name}</span>
            </div>
            <div class="price pSmallDark">R${item.price}.00</div>
            <div class="quantity">
                <span class="pSmallDark">${item.inCart}</span>
            </div>
            <div class="total pSmallDark">
                R${item.inCart * item.price}.00
            </div>
            `
        });

        //Subtotal, discount code & shipping
        productContainer.innerHTML += `
            <div class="cartSubtotalContainer">
                <h6 class="h6Dark cartSubtotalTitle">Subtotal (incl. VAT)</h6>
                <h6 class="h6Dark cartSubtotal">R${cartCost}.00</h6>
            </div>

            <div class="cartVatContainer">
                <p class="pSmallDark">VAT R${cartCost*0.15}.00</p>
            </div>                  
            `

        //Cart total
        
        productContainer.innerHTML += `
        <div class="cartTotalContainer">
            <h4 class="cartTotalTitle h4Dark">Cart Total</h4>
            <h4 class="cartTotal h4Dark">R${cartCost}.00</h4>
        </div>
        `
        deleteButtons();
    }
    
}

//Function to remove item from the cart.
function deleteButtons() {
    let deleteButtons = document.querySelectorAll('.product ion-icon');
    let productNumbers = localStorage.getItem('cartNumbers');
    let cartCost = localStorage.getItem("totalCost");
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productName;
    console.log(cartItems);

    for(let i=0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', () => {
            productName = deleteButtons[i].parentElement.textContent.toLocaleLowerCase().replace(/ /g,'').trim();
           
            localStorage.setItem('cartNumbers', productNumbers - cartItems[productName].inCart);
            localStorage.setItem('totalCost', cartCost - ( cartItems[productName].price * cartItems[productName].inCart));

            delete cartItems[productName];
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));

            displayCart();
            onLoadCartNumbers();
        })
    }
}

//Function to generate reference number.
function makeString(length){
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random () * charactersLength));
    }
    return result; 
}

//Function to create an alert with the generated reference number.
function confirmOrder(){
    alert("Success! Your order reference number is " + makeString(8));
}

onLoadCartNumbers();
displayCart();

