import buttonAnimation from "../animation/buttonAnimation.mjs";
import cartAnimation from "../animation/cartAnimation.mjs";
import productService from "./productService.mjs";
import { DOMElements } from "../index.mjs";

class eventController {
    finishEvent() {
        buttonAnimation.butonAnimations();
        cartAnimation.cartMove();
        productService.disableItemsNotInCart();
        DOMElements.productGroup.removeEventListener("mousedown", mouseDownHandler);
        DOMElements.productGroup.removeEventListener("touchstart", touchHandlers.onTouchStart);
    }
}
export default new Service();
