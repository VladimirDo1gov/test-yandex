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
        DOMElements.cart.classList.add(this.classes.isScale);
    }
    cartRemoveScale() {
        if (DOMElements.cart.classList.contains(this.classes.isScale)) {
            DOMElements.cart.classList.remove(this.classes.isScale);
        }
        DOMElements.cart.classList.add(this.classes.notScale);
    }
    showBannerButton() {
        DOMElements.bannerButton.classList.add("btn-outside-banner");
        DOMElements.bannerButton.classList.add("btn-inside-banner");
        DOMElements.bannerButton.removeAttribute("aria-hidden");
    }
    bannerButtonBlick() {
        const delay = 500;
        let timerId = setInterval(() => {
            if (DOMElements.bannerButton.classList.contains("btn-not-blick")) {
                DOMElements.bannerButton.classList.remove("btn-not-blick");
            }
            DOMElements.bannerButton.classList.add("btn-blick");
            setTimeout(() => {
                if (DOMElements.bannerButton.classList.contains("btn-blick")) {
                    DOMElements.bannerButton.classList.remove("btn-blick");
                }
                DOMElements.bannerButton.classList.add("btn-not-blick");
            }, delay);
        }, delay * 2);

        setTimeout(() => {
            clearInterval(timerId);
        }, 5000);
    }
    butonAnimations() {
        this.showBannerButton();
        this.bannerButtonBlick();
        this.bannerButtonBlick();
    }
}

export default new AnimationService();
