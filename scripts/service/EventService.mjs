import AnimationService from "./animationService.mjs";
import ProductService from "./productService.mjs";
import StoreService from "./storeService.mjs";

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
        this.setLimitAtMove();
        this.target.style.left = this.shiftX + "px";
        this.target.style.top = this.shiftY + "px";
    }

    getLimit() {
        const borderMove = document.querySelector(".banner-section");
        const { left, right, top, bottom } = borderMove.getBoundingClientRect();
        console.log("left : ", left, "right : ", right, "top : ", top, "bottom : ", bottom);
        return { left, right, top, bottom };
    }

    // Доделать
    setLimitAtMove() {
        const { left, right, top, bottom } = this.getLimit();
        if (this.shiftX > right) {
            this.shiftX = right;
        } else if (this.shiftX < left) {
            this.shiftX = left;
        }
        if (this.shiftY < top) {
            this.shiftY = top;
        } else if (this.shiftY > bottom) {
            this.shiftY = bottom - this.target.clientHeight;
        }
    }

    drop() {
        if (this.target) {
            this.target.hidden = true;
            this.dropTarget = document.elementFromPoint(this.shiftX, this.shiftY).closest(".cart");
            this.target.hidden = false;
            AnimationService.cartRemoveScale();
            if (this.dropTarget) {
                ProductService.addProductIntoCart(this.target);
                StoreService.addTargetToStore(this.target.id, this.addedProductArr);
            }
            if (!this.dropTarget) {
                ProductService.removeDraggedTarget(this.target);
            }
        }
    }
    reset() {
        this.isDragging = false;
        this.resetTarget();
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
        }
    }
}

export default new EventService();
