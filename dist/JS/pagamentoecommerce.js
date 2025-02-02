
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function () {
        let product = {
            name: this.getAttribute('data-name'),
            price: parseFloat(this.getAttribute('data-price')),
            quantity: 1
        };

        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Verifica se o produto já está no carrinho
        let existingProduct = cart.find(item => item.name === product.name);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push(product);
        }

        localStorage.setItem('cart', JSON.stringify(cart));

        alert('Produto adicionado ao carrinho!');
        window.location.href = "cart.html"; // Redireciona para o carrinho
    });
});
