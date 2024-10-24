import AnimationService from "./animationService.mjs";
import ProductService from "./productService.mjs";
import StoreService from "./storeService.mjs";
import { DOMElements } from "../index.mjs";
import MouseDownHandler from "../dragAndDrop/mouseDownHandler.mjs";
import TouchHandlers from "../dragAndDrop/touchHandlers.mjs";

class EventService {
    isDragging = false;
    target = null;
    shiftX = 0;
    shiftY = 0;
    dropTarget = null;
    addedProductArr = [];
    draggetItemClass = "selected";

    getCoordinats(clientX, clientY) {
        this.shiftX = clientX + window.scrollX - this.target.clientWidth / 2;
        this.shiftY = clientY + window.scrollY - this.target.clientHeight / 2;
    }
    moveAt(event) {
        if (event.clientX) {
            this.getCoordinats(event.clientX, event.clientY);
        }
        if (event.touches) {
            const { clientX, clientY } = event.touches[0];
            this.getCoordinats(clientX, clientY);
        }

        this.target.style.left = this.shiftX + "px";
        this.target.style.top = this.shiftY + "px";
    }
    drop() {
        if (this.target) {
            this.target.hidden = true;
            this.dropTarget = document.elementFromPoint(this.shiftX, this.shiftY)?.closest(".cart");
            this.target.hidden = false;
            AnimationService.cartRemoveScale();
            if (this.dropTarget) {
                ProductService.addProductIntoCart(this.target);
                StoreService.addTargetToStore(this.target.id, this.addedProductArr);
            }
            // Чтобы реплейсер не удалялся если элемент остался в корзине
            if (!this.dropTarget) {
                ProductService.removeReplaceDraggedTarget(this.target);
            }
        }
    }
    reset() {
        this.resetTarget();
        this.isDragging = false;
        this.dropTarget = null;
        this.shiftX = 0;
        this.shiftY = 0;
    }
    resetTarget() {
        if (this.target) {
            this.target.classList.remove(this.draggetItemClass);
            this.target.style.position = "";
            this.target = null;
        }
    }
    productCartIsFull() {
        ProductService.showBannerButton();
        ProductService.addClassesForProductItem();
    }
    addSelectedClass() {
        if (!this.target.classList.contains(this.draggetItemClass)) {
            this.target.classList.add(this.draggetItemClass);
        }
    }
    checkState() {
        StoreService.storeCheck(this.addedProductArr);
        if (StoreService.isFulled) {
            this.isDragging = false;
            ProductService.removeClassesForProductItem();
            this.productCartIsFull();
            this.reset();
            DOMElements.productGroup.removeEventListener("mousedown", MouseDownHandler);
            DOMElements.productGroup.removeEventListener("touchstart", TouchHandlers.onTouchStart);
        }
    }
}

export default new EventService();
