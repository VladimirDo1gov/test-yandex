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
    removeAllCartAnimations() {
        this.removeCartShacking();
    }
    targetGrabing() {
        this.addCartShacking();
    }
}

const cartClasses = {
    get move() {
        return "cart-move";
    },
    get cartShaking() {
        return "cart-shaking";
    },
};

export const cartDOMElements = {
    get cartWrapper() {
        return document.querySelector(".cart-area-wrapper");
    },
    get cart() {
        return document.querySelector(".cart");
    },
};

export default new CartEffects();
