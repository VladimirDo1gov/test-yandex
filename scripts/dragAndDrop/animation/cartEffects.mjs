import { addClass, removeClass } from "../../lib/utils.mjs";

class CartEffects {
    /**
     * Добавляет анимацию движении корзины вправо
     */
    cartMove() {
        addClass(cartDOMElements.cartWrapper, cartClasses.move);
    }
    /**
     * Добавляет анимацию покачивания корзины
     */
    addCartShacking() {
        addClass(cartDOMElements.cart, cartClasses.cartShaking);
    }
    /**
     * Удаляет анимацию покачивания корзины
     */
    removeCartShacking() {
        removeClass(cartDOMElements.cart, cartClasses.cartShaking);
    }
    /**
     * Добавляет анимацию увеличения масштаба корзины
     */
    addCartScale() {
        removeClass(cartDOMElements.cartArea, cartClasses.cartNotScale);
        addClass(cartDOMElements.cartArea, cartClasses.cartScale);
    }
    /**
     * Удаляет анимацию увеличения масштаба корзины
     */
    removeCartScale() {
        removeClass(cartDOMElements.cartArea, cartClasses.cartScale);
        addClass(cartDOMElements.cartArea, cartClasses.cartNotScale);
    }
    /**
     * Удаляет анимаци покачивания и увеличения масштаба корзины
     */
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
