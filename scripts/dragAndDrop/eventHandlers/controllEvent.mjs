import buttonEffects from "../animation/buttonEffects.mjs";
import cartEffects from "../animation/cartEffects.mjs";
import controlElements from "../features/controlElements.mjs";
import mouseDownHandler from "./mouseDownHandler.mjs";
import touchHandlers from "./touchHandlers.mjs";
import controllMotion from "../features/controllMotion.mjs";
import storage from "../features/storage.mjs";

class ControllEvent {
    draggableTarget = false;
    target = null;
    dropTarget = null;

    isGrabingTarget(event) {
        if (event.target.closest(".product-group-item")) {
            this.draggableTarget = true;
            this.target = event.target.closest(".product-group-item");
            controlElements.addClassSelected(this.target);
            cartEffects.addCartShacking();
            controllMotion.moveAt(event, this.target);
            this.target.ondragstart = () => false;
        }
    }
    onMove(event) {
        if (this.draggableTarget) {
            controllMotion.mouseMove(event, this.target);
            controllMotion.setLimitBorder(event, this.target) && this.resetAll();
        }
    }
    drop() {
        const y = this.target.getBoundingClientRect().bottom;
        const x = controllMotion.shiftX;

        this.target.hidden = true;
        this.dropTarget = document.elementFromPoint(x, y)?.closest(".cart-area");
        this.target.hidden = false;
        cartEffects.removeCartShacking();

        if (this.dropTarget) {
            controlElements.addProductIntoCart(this.target);
            storage.addTargetToStore(this.target.id);
            this.checkStateCart();
        }

        this.resetAll();
    }
    resetAll() {
        this.draggableTarget = false;
        this.dropTarget = null;
        controlElements.resetSelectedItem(this.target);
        controllMotion.reset(this.target);
    }

    checkStateCart() {
        if (storage.checkStateisFull(2)) {
            this.finishEvent();
        }
    }

    finishEvent() {
        buttonEffects.butonAnimated();
        cartEffects.cartMove();
        controlElements.disableItemsNotInCart();
        DOMEventElement.productGroup.removeEventListener("mousedown", mouseDownHandler);
        DOMEventElement.productGroup.removeEventListener("touchstart", touchHandlers.onTouchStart);
    }
}

export const DOMEventElement = {
    get productGroup() {
        return document.querySelector(".product-area-group");
    },
};

export default new ControllEvent();
