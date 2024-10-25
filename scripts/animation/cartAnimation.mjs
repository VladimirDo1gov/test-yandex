import { DOMElements } from "../index.mjs";
import { addClass, removeClass } from "../lib/utils.mjs";

class CartAnimation {
    classes = {
        move: "cart-move",
        isScale: "cart-scale",
        notScale: "cart-not-scale",
    };
    elements = {
        tooltip: document.querySelector(".cart-tooltip"),
        cartWrapper: document.querySelector(".cart-area-wrapper"),
    };

    showCartTooltip() {
        addClass(this.elements.tooltip, "show-cart-tooltip");
        this.elements.tooltip.removeAttribute("aria-hidden");
    }
    removeCartTooltip() {
        removeClass(this.elements.tooltip, "show-cart-tooltip");
        this.elements.tooltip.setAttribute("aria-hidden", "false");
    }
    cartAddScale() {
        removeClass(DOMElements.cart, this.classes.notScale);
        addClass(DOMElements.cart, this.classes.isScale);
    }
    cartRemoveScale() {
        removeClass(DOMElements.cart, this.classes.isScale);
        addClass(DOMElements.cart, this.classes.notScale);
    }
    cartMove() {
        addClass(this.elements.cartWrapper, this.classes.move);
    }
    targetGrabing() {
        this.cartRemoveScale();
        this.removeCartTooltip();
    }
    targetDrop() {
        this.cartAddScale();
        this.showCartTooltip();
    }
}

export default new CartAnimation();
