import { addClass, removeClass } from "../utils/classList.mjs";

class CartEffects {
    showCartTooltip() {
        addClass(cartDOMElements.tooltip, cartClasses.showTooltip);
        cartDOMElements.tooltip.removeAttribute("aria-hidden");
    }
    removeCartTooltip() {
        removeClass(cartDOMElements.tooltip, cartClasses.showTooltip);
        cartDOMElements.tooltip.setAttribute("aria-hidden", "false");
    }
    cartAddScale() {
        removeClass(cartDOMElements.cart, cartClasses.notScale);
        addClass(cartDOMElements.cart, cartClasses.isScale);
    }
    cartRemoveScale() {
        removeClass(cartDOMElements.cart, cartClasses.isScale);
        addClass(cartDOMElements.cart, cartClasses.notScale);
    }
    cartMove() {
        addClass(cartDOMElements.cartWrapper, cartClasses.move);
    }
    addCartShacking() {
        addClass(cartDOMElements.cart, "cart-shaking");
    }
    removeCartShacking() {
        removeClass(cartDOMElements.cart, "cart-shaking");
    }
    targetDrop() {
        this.removeCartShacking();
        this.cartRemoveScale();
        this.removeCartTooltip();
    }
    targetGrabing() {
        this.addCartShacking();
        this.cartAddScale();
        this.showCartTooltip();
    }
}

const cartClasses = {
    get move() {
        return "cart-move";
    },
    get isScale() {
        return "cart-scale";
    },
    get notScale() {
        return "cart-not-scale";
    },
    get showTooltip() {
        return "show-cart-tooltip";
    },
};

export const cartDOMElements = {
    get tooltip() {
        return document.querySelector(".cart-tooltip");
    },
    get cartWrapper() {
        return document.querySelector(".cart-area-wrapper");
    },
    get cart() {
        return document.querySelector(".cart");
    },
};

export default new CartEffects();
