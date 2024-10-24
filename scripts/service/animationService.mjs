class AnimationService {
    cartAddScale() {
        const cart = document.querySelector(".cart");
        if (cart.classList.contains("cart-not-scale")) {
            cart.classList.remove("cart-not-scale");
        }
        cart.classList.add("cart-scale");
    }
    cartRemoveScale() {
        const cart = document.querySelector(".cart");
        if (cart.classList.contains("cart-scale")) {
            cart.classList.remove("cart-scale");
        }
        cart.classList.add("cart-not-scale");
    }
}

export default new AnimationService();
