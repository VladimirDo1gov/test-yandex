import buttonEffects from "../animation/buttonEffects.mjs";
import cartEffects, { cartDOMElements } from "../animation/cartEffects.mjs";
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

    targetOverDropEffect(event) {
        const { top, bottom, left, right } = cartDOMElements.cartArea.getBoundingClientRect();
        const topBorder = Math.trunc(top + window.scrollY);
        const bottomBorder = Math.trunc(bottom + window.scrollY);
        const leftBorder = Math.trunc(left);
        const rightBorder = Math.trunc(right);
        if (
            topBorder < event.clientY &&
            bottomBorder > event.clientY &&
            leftBorder < event.clientX &&
            rightBorder > event.clientX
        ) {
            cartEffects.addCartScale();
        } else {
            cartEffects.removeCartScale();
        }
    }
    onMove(event) {
        if (this.draggableTarget) {
            controllMotion.mouseMove(event, this.target);
            this.targetOverDropEffect(event);
            controllMotion.setLimitBorder(event, this.target) && this.resetAll();
            controllMotion.rotate(event, this.target); // или в ней
        }
    }

    drop() {
        if (this.target) {
            this.dropTarget = controllMotion.getDropTarget(this.target);
            this.fillDropTarget(this.target);
            this.resetAll();
        }
    }

    /**
     * Если, цель для сброса существует, добавляет в нее сбрасываемый элемент
     * сохраняет его в store и проверяет store
     * @param {element} dropTarget
     */
    fillDropTarget() {
        if (this.dropTarget) {
            controlElements.addProductIntoCart(this.target);
            storage.addTargetToStore(this.target.id);
            this.checkStateCart(2);
        }
    }

    resetAll() {
        this.draggableTarget = false;
        this.dropTarget = null;
        cartEffects.removeCartAnimations();
        controlElements.resetSelectedItem(this.target);
        controllMotion.reset(this.target);
    }

    checkStateCart(num) {
        if (storage.checkStateisFull(num)) {
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
