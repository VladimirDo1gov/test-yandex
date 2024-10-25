import buttonAnimation from "../animation/buttonAnimation.mjs";
import cartAnimation from "../animation/cartAnimation.mjs";
import controllerElements from "./controllerElements.mjs";
import { DOMElements } from "../index.mjs";
import mouseDownHandler from "../dragAndDrop/mouseDownHandler.mjs";
import touchHandlers from "../dragAndDrop/touchHandlers.mjs";

class ControllerEvent {
    finishEvent() {
        buttonAnimation.butonAnimations();
        cartAnimation.cartMove();
        controllerElements.disableItemsNotInCart();
        DOMElements.productGroup.removeEventListener("mousedown", mouseDownHandler);
        DOMElements.productGroup.removeEventListener("touchstart", touchHandlers.onTouchStart);
    }
}
export default new ControllerEvent();
