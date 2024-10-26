import { addClass, removeClass } from "../utils/classList.mjs";

class CartEffects {
    showCartTooltip() {
        addClass(elements.tooltip, classes.showTooltip);
        elements.tooltip.removeAttribute("aria-hidden");
    }
    removeCartTooltip() {
        removeClass(elements.tooltip, classes.showTooltip);
        elements.tooltip.setAttribute("aria-hidden", "false");
    }
    cartAddScale() {
        removeClass(elements.cart, classes.notScale);
        addClass(elements.cart, classes.isScale);
    }
    cartRemoveScale() {
        removeClass(elements.cart, classes.isScale);
        addClass(elements.cart, classes.notScale);
    }
    cartMove() {
        addClass(elements.cartWrapper, classes.move);
    }
    targetDrop() {
        this.cartRemoveScale();
        this.removeCartTooltip();
    }
    targetGrabing() {
        this.cartAddScale();
        this.showCartTooltip();
    }
}

const classes = {
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

const elements = {
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
