class ProductService {
    getCoordinats(event) {
        const clientX = event.clientX + window.scrollX;
        const clientY = event.clientY + window.scrollY;
        return { clientX, clientY };
    }
    addProductIntoCart(item) {
        const parent = item.closest(".product-level");
        const cart = document.querySelector(".cart-grid");

        if (parent) {
            item.remove();
        }
        item.id += "-added";
        item.className = "product-into-cart";
        cart.append(item);
    }
}

export default new ProductService();
