import buttonEffects from "../animation/buttonEffects.mjs";
import cartEffects from "../animation/cartEffects.mjs";
import controllerElements from "./controllerElements.mjs";
import mouseDownHandler from "../eventHandlers/mouseDownHandler.mjs";
import touchHandlers from "../eventHandlers/touchHandlers.mjs";
import controllerMotion from "./controllerMotion.mjs";
import storage from "./storage.mjs";

class ControllerEvent {
    draggableTarget = false;
    target = null;
    dropTarget = null;

    isGrabingTarget(event) {
        this.draggableTarget = true;
        this.target = event.target.closest(".product-group-item");
        controllerElements.addClassSelected(this.target);
        cartEffects.targetGrabing();
        controllerMotion.moveAt(event, this.target);
        this.target.ondragstart = () => false;
    }
    drop() {
        const y = this.target.getBoundingClientRect().bottom;
        const x = controllerMotion.shiftX;

        this.target.hidden = true;
        this.dropTarget = document.elementFromPoint(x, y)?.closest(".cart-area");
        this.target.hidden = false;
        cartEffects.targetDrop();

        if (this.dropTarget) {
            controllerElements.addProductIntoCart(this.target);
            storage.addTargetToStore(this.target.id);
        }

        this.resetAll();
    }
    resetAll() {
        controllerElements.resetSelectedItem(this.target);
        this.draggableTarget = false;
        this.dropTarget = null;
        controllerMotion.reset();
    }

    finishEvent() {
        buttonEffects.butonAnimated();
        cartEffects.cartMove();
        controllerElements.disableItemsNotInCart();
        DOMEventElements.productGroup.removeEventListener("mousedown", mouseDownHandler);
        DOMEventElements.productGroup.removeEventListener("touchstart", touchHandlers.onTouchStart);
    }
}

export const DOMEventElements = {
    get productGroup() {
        return document.querySelector(".product-area-group");
    },
};

export default new ControllerEvent();
