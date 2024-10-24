import AnimationService from "./AnimationService.mjs";
import ProductService from "./ProductService.mjs";
import StoreService from "./StoreService.mjs";

class EventService {
    isDragging = false;
    item = null;
    shiftX = 0;
    shiftY = 0;
    dropTarget = null;
    addedProductArr = [];
    draggetItemClass = "selected";

    atMove(event) {
        if (event.clientX) {
            this.shiftX = event.clientX + window.scrollX;
            this.shiftY = event.clientY + window.scrollY;
        }
        if (event.touches) {
            const { clientX, clientY } = event.touches[0];
            this.shiftX = clientX + window.scrollX;
            this.shiftY = clientY + window.scrollY;
        }
        this.item.style.position = "fixed";
        this.item.style.left = this.shiftX + "px";
        this.item.style.top = this.shiftY + "px";
    }
    drop() {
        this.item.hidden = true;
        this.dropTarget = document.elementFromPoint(this.shiftX, this.shiftY).closest(".cart");
        this.item.hidden = false;
        AnimationService.cartRemoveScale();
        if (this.dropTarget) {
            ProductService.addProductIntoCart(this.item);
            StoreService.store(this.item.id, this.addedProductArr);
        }
    }
    reset() {
        this.isDragging = false;
        this.resetItem();
        this.shiftX = 0;
        this.shiftY = 0;
    }
    resetItem() {
        if (this.item) {
            this.item.classList.remove(this.draggetItemClass);
            this.item.style.position = "";
            this.item = null;
        }
    }
    productArrIsFull() {
        ProductService.showBannerButton();
        ProductService.addClassesForProductItem();
    }
    addSelectedClass() {
        if (!this.item.classList.contains(this.draggetItemClass)) {
            this.item.classList.add(this.draggetItemClass);
        }
    }
    checkState() {
        StoreService.storeCheck(this.addedProductArr);
        if (StoreService.completed) {
            this.isDragging = false;
            ProductService.removeClassesForProductItem();
            this.productArrIsFull();
            this.reset();
        }
    }
}

export default new EventService();
