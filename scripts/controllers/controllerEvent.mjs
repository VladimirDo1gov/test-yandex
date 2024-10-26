import buttonAnimation from "../animation/buttonAnimation.mjs";
import cartAnimation from "../animation/cartAnimation.mjs";
import controllerElements from "./controllerElements.mjs";
import { DOMElements } from "../index.mjs";
import mouseDownHandler from "../eventHandlers/mouseDownHandler.mjs";
import touchHandlers from "../eventHandlers/touchHandlers.mjs";
import controllerMotion from "./controllerMotion.mjs";
import storage from "./storage.mjs";

class ControllerEvent {
    draggableTarget = false;
    target = null;
    dropTarget = null;

    isGrabing(event) {
        this.draggableTarget = true;
        this.target = event.target.closest(".product-group-item");
        controllerElements.addClassSelected(this.target);
        cartAnimation.targetGrabing();
        controllerMotion.moveAt(event, this.target); // Без этого предметы смещаются
        this.target.ondragstart = () => false;
    }
    drop() {
        if (this.target) {
            const targetBottom = this.target.getBoundingClientRect().bottom;
            const x = controllerMotion.shiftX;
            this.target.hidden = true;
            this.dropTarget = document.elementFromPoint(x, targetBottom)?.closest(".cart-area");
            this.target.hidden = false;
            cartAnimation.targetDrop();
            if (this.dropTarget) {
                controllerElements.addProductIntoCart(this.target);
                storage.addTargetToStore(this.target.id);
            }
        }
        this.resetAll();
    }
    resetAll() {
        controllerElements.resetSelectedItem(this.target);
        this.draggableTarget = false;
        this.dropTarget = null;
        controllerMotion.shiftX = 0;
        controllerMotion.shiftY = 0;
    }
    finishEvent() {
        buttonAnimation.butonAnimations();
        cartAnimation.cartMove();
        controllerElements.disableItemsNotInCart();
        DOMElements.productGroup.removeEventListener("mousedown", mouseDownHandler);
        DOMElements.productGroup.removeEventListener("touchstart", touchHandlers.onTouchStart);
    }
}
export default new ControllerEvent();
