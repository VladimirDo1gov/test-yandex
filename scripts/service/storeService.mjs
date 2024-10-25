/* Следить за количеством предметов в корзине */

import AnimationService from "./animationService.mjs";
import ProductService from "./productService.mjs";
import { DOMElements } from "../index.mjs";
import EventService from "./eventService.mjs";
import MouseDownHandler from "../dragAndDrop/mouseDownHandler.mjs";
import TouchHandlers from "../dragAndDrop/touchHandlers.mjs";
class StoreService {
    stateCart = [];

    addTargetToStore(elem) {
        this.stateCart.push(elem);
        console.log(this.stateCart);
    }
    checkStateCart() {
        if (this.stateCart.length > 2) {
            AnimationService.butonAnimations();
            ProductService.removeClassesForProductItem();
            ProductService.disableItemsNotInCart();
            EventService.resetAll();
            DOMElements.productGroup.removeEventListener("mousedown", MouseDownHandler);
            DOMElements.productGroup.removeEventListener("touchstart", TouchHandlers.onTouchStart);
        }
    }
}

export default new StoreService();
