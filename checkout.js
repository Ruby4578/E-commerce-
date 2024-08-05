document.addEventListener('DOMContentLoaded', () => {
    const checkoutData = JSON.parse(localStorage.getItem('checkoutData'));
    if (!checkoutData) {
        window.location.href = 'index.html';
        return;
    }

    const cartList = document.querySelector('.listCard');
    const totalElement = document.getElementById('totalPrice');

    checkoutData.cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
        cartList.appendChild(listItem);
    });

    totalElement.textContent = checkoutData.totalPrice.toFixed(2);

    document.getElementById('deliveryForm').onsubmit = async (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;

        const orderData = {
            name,
            address,
            phone,
            email,
            cart: checkoutData.cart,
            totalPrice: checkoutData.totalPrice
        };

        try {
            const response = await fetch('http://localhost:3000/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderData)
            });

            if (response.ok) {
                const result = await response.json();
                console.log(result.message);

                // Clear the cart and form
                localStorage.removeItem('checkoutData');
                alert('Order placed successfully');
                window.location.href = 'index.html';
            } else {
                console.error('Failed to place order');
                alert('Failed to place order. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error placing order. Please try again.');
        }
    };
});
