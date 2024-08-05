let openShopping = document.querySelector('#openShopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', () => {
    body.classList.add('active');
});
closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
});

let products = [
    {
        id: 1,
        name: 'PRINGLES',
        image: 'pi.jpeg',
        price: 2.50
    },
    {
        id: 2,
        name: 'Galbanino l`originale',
        image: 'ga.jpeg',
        price: 3.00
    },
    {
        id: 3,
        name: 'PRODUCT NAME 3',
        image: '3.PNG',
        price: 220000
    },
    {
        id: 4,
        name: 'PRODUCT NAME 4',
        image: '4.PNG',
        price: 123000
    },
    {
        id: 5,
        name: 'PRODUCT NAME 5',
        image: '5.PNG',
        price: 320000
    },
    {
        id: 6,
        name: 'PRODUCT NAME 6',
        image: '6.PNG',
        price: 120000
    },
    {
        id: 7,
        name: 'PRODUCT NAME 7',
        image: 'pi.jpeg',
        price: 320000
    },

];

let listCards = [];

function initApp() {
    products.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="img/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Cart</button>`;
        list.appendChild(newDiv);
    });
}
initApp();

function addToCard(key) {
    if (listCards[key] == null) {
        listCards[key] = { ...products[key], quantity: 1 }; // copy product and add quantity property
    } else {
        listCards[key].quantity += 1;
    }
    reloadCard();
}

function reloadCard() {
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key) => {
        if (value != null) {
            totalPrice += value.price * value.quantity;
            count += value.quantity;
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="img/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${(value.price * value.quantity).toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
            listCard.appendChild(newDiv);
        }
    });
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}

function changeQuantity(key, quantity) {
    if (quantity == 0) {
        delete listCards[key];
    } else {
        listCards[key].quantity = quantity;
    }
    reloadCard();
}


document.addEventListener("DOMContentLoaded", function() {
    const total = document.querySelector('.total');
    const quantity = document.querySelector('.quantity');

    // Initialize values
    total.innerText = '0';
    quantity.innerText = '0';

    // Further logic to update values as needed
});



let cart = [];
let totalPrice = 0;
const deliveryCharge = 5.00; // Set your delivery charge

function addToCart(item) {
    const foundItem = cart.find(cartItem => cartItem.id === item.id);
    if (foundItem) {
        foundItem.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    updateCart();
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCart();
}

function updateCart() {
    const cartList = document.querySelector('.listCard');
    const totalElement = document.getElementById('totalPrice');

    cartList.innerHTML = '';
    totalPrice = 0;

    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
        
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = () => removeFromCart(item.id);
        listItem.appendChild(removeButton);

        cartList.appendChild(listItem);

        totalPrice += item.price * item.quantity;
    });

    totalElement.textContent = (totalPrice + deliveryCharge).toFixed(2);
}

document.getElementById('checkoutButton').onclick = () => {
    const checkoutData = {
        cart: cart,
        totalPrice: totalPrice + deliveryCharge
    };
    localStorage.setItem('checkoutData', JSON.stringify(checkoutData));
    window.location.href = 'checkout.html';
};

// Example usage
const exampleItem = { id: 1, name: 'Example Item', price: 9.99 };
document.querySelector('.someAddToCartButton').onclick = () => addToCart(exampleItem);
