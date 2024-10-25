import { DOMElements } from "../index.mjs";
import { addClass, removeClass } from "../lib/utils.mjs";
class AnimationService {
    animatedElements = {
        tooltip: document.querySelector(".cart-tooltip"),
        cartWrapper: document.querySelector(".cart-area-wrapper"),
    };
    classes = {
        cart: {
            move: "cart-move",
            isScale: "cart-scale",
            notScale: "cart-not-scale",
        },
        button: {
            blick: "btn-blick",
            notBlick: "btn-not-blick",
            outsideBanner: "btn-outside-banner",
            insideBanner: "btn-inside-banner",
        },
        rotateToRight: "rotate-to-right",
        rotateToLeft: "rotate-to-left",
        btnBlick: "btn-blick",
        btnNotBlick: "btn-not-blick",
        btnOutsideBanner: "btn-outside-banner",
        btnInsideBanner: "btn-inside-banner",
    };
    showCartTooltip() {
        addClass(this.animatedElements.tooltip, "show-cart-tooltip");
        this.animatedElements.tooltip.removeAttribute("aria-hidden");
    }
    removeCartTooltip() {
        removeClass(this.animatedElements.tooltip, "show-cart-tooltip");
        this.animatedElements.tooltip.setAttribute("aria-hidden", "false");
    }
    cartAddScale() {
        removeClass(DOMElements.cart, this.classes.cart.notScale);
        addClass(DOMElements.cart, this.classes.cart.isScale);
    }
    cartRemoveScale() {
        removeClass(DOMElements.cart, this.classes.cart.isScale);
        addClass(DOMElements.cart, this.classes.cart.notScale);
    }
    cartMove() {
        addClass(this.animatedElements.cartWrapper, this.classes.cart.move);
    }
    showBannerButton() {
        removeClass(DOMElements.bannerButton, this.classes.btnOutsideBanner);
        addClass(DOMElements.bannerButton, this.classes.btnInsideBanner);
        DOMElements.bannerButton.removeAttribute("aria-hidden");
    }
    bannerButtonBlick() {
        const delay = 500;
        let timerId = setInterval(() => {
            removeClass(DOMElements.bannerButton, this.classes.button.notBlick);
            addClass(DOMElements.bannerButton, this.classes.button.blick);
            setTimeout(() => {
                removeClass(DOMElements.bannerButton, this.classes.button.blick);
                addClass(DOMElements.bannerButton, this.classes.button.notBlick);
            }, delay);
        }, delay * 2);

        setTimeout(() => {
            clearInterval(timerId);
        }, 10000);
    }
    rotateTargetToRight(item) {
        addClass(item, this.classes.rotateToRight);
        removeClass(item, this.classes.rotateToLeft);
    }
    rotateTargetToLeft(item) {
        addClass(item, this.classes.rotateToLeft);
        removeClass(item, this.classes.rotateToRight);
    }
    removeRotateTarget(item) {
        removeClass(item, this.classes.rotateToLeft);
        removeClass(item, this.classes.rotateToRight);
    }
    butonAnimations() {
        this.showBannerButton();
        this.bannerButtonBlick();
    }
    finallyAnimation() {
        this.butonAnimations();
        this.cartMove();
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

export default new AnimationService();
