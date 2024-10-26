import { addClass, removeClass } from "../../lib/utils.mjs";

class CartEffects {
    cartMove() {
        addClass(cartDOMElements.cartWrapper, cartClasses.move);
    }
    addCartShacking() {
        addClass(cartDOMElements.cart, cartClasses.cartShaking);
    }
    removeCartShacking() {
        removeClass(cartDOMElements.cart, cartClasses.cartShaking);
    }
    addCartScale() {
        removeClass(cartDOMElements.cartArea, cartClasses.cartNotScale);
        addClass(cartDOMElements.cartArea, cartClasses.cartScale);
    }
    removeCartScale() {
        removeClass(cartDOMElements.cartArea, cartClasses.cartScale);
        addClass(cartDOMElements.cartArea, cartClasses.cartNotScale);
    }
    removeCartAnimations() {
        this.removeCartShacking();
        this.removeCartScale();
    }
}

export const cartClasses = {
    get move() {
        return "cart-move";
    },
    get cartShaking() {
        return "cart-shaking";
    },
    get cartScale() {
        return "cart-scale";
    },
    get cartNotScale() {
        return "cart-not-scale";
    },
};

export const cartDOMElements = {
    get cartWrapper() {
        return document.querySelector(".cart-area-wrapper");
    },
    get cart() {
        return document.querySelector(".cart");
    },
    get cartArea() {
        return document.querySelector(".cart-area");
    },
};

export default new CartEffects();
