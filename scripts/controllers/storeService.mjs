/* Следить за количеством предметов в корзине */

import productService from "./productService.mjs";
import { DOMElements } from "../index.mjs";
import mouseDownHandler from "../dragAndDrop/mouseDownHandler.mjs";
import touchHandlers from "../dragAndDrop/touchHandlers.mjs";
import buttonAnimation from "../animation/buttonAnimation.mjs";
import cartAnimation from "../animation/cartAnimation.mjs";
class StoreService {
    stateCart = [];

    addTargetToStore(elem) {
        this.stateCart.push(elem);
        console.log(this.stateCart);
    }
    checkStateCart() {
        if (this.stateCart.length > 2) {
            buttonAnimation.butonAnimations();
            cartAnimation.cartMove();
            productService.disableItemsNotInCart();
            DOMElements.productGroup.removeEventListener("mousedown", mouseDownHandler);
            DOMElements.productGroup.removeEventListener("touchstart", touchHandlers.onTouchStart);
        }
    }
}

export default new StoreService();
