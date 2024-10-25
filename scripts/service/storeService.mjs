/* Следить за количеством предметов в корзине */

import animationService from "./animationService.mjs";
import productService from "./productService.mjs";
import { DOMElements } from "../index.mjs";
import eventService from "./eventService.mjs";
import mouseDownHandler from "../dragAndDrop/mouseDownHandler.mjs";
import touchHandlers from "../dragAndDrop/touchHandlers.mjs";
class StoreService {
    stateCart = [];

    addTargetToStore(elem) {
        this.stateCart.push(elem);
        console.log(this.stateCart);
    }
    checkStateCart() {
        if (this.stateCart.length > 2) {
            animationService.butonAnimations();
            productService.removeClassesForProductItem();
            productService.disableItemsNotInCart();
            eventService.resetAll();
            DOMElements.productGroup.removeEventListener("mousedown", mouseDownHandler);
            DOMElements.productGroup.removeEventListener("touchstart", touchHandlers.onTouchStart);
        }
    }
}

export default new StoreService();
