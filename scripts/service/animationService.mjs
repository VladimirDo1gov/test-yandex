import { DOMElements } from "../index.mjs";

class AnimationService {
    classes = {
        isScale: "cart-scale",
        notScale: "cart-not-scale",
    };
    cartAddScale() {
        if (DOMElements.cart.classList.contains(this.classes.notScale)) {
            DOMElements.cart.classList.remove(this.classes.notScale);
        }
        cart.classList.add(this.classes.isScale);
    }
    cartRemoveScale() {
        if (DOMElements.cart.classList.contains(this.classes.isScale)) {
            DOMElements.cart.classList.remove(this.classes.isScale);
        }
        cart.classList.add(this.classes.notScale);
    }
    showBannerButton() {
        const buttonSubmitPay = document.querySelector("#button-submit-pay");
        buttonSubmitPay.classList.add("btn-outside-banner");
        buttonSubmitPay.classList.add("btn-inside-banner");
        buttonSubmitPay.removeAttribute("aria-hidden");
    }
}

export default new AnimationService();
