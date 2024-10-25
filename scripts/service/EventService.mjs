import AnimationService from "./animationService.mjs";
import ProductService from "./productService.mjs";
import StoreService from "./storeService.mjs";

class EventService {
    draggableTarget = false;
    target = null;
    shiftX = 0;
    shiftY = 0;
    dropTarget = null;

    getCoordinats(clientX, clientY) {
        this.shiftX = clientX - this.target.clientWidth / 2;
        this.shiftY = clientY - this.target.clientHeight / 2;
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
                StoreService.addTargetToStore(this.target.id);
            }
            // Чтобы реплейсер не удалялся если элемент остался в корзине
            if (!this.dropTarget) {
                ProductService.removeReplaceDraggedTarget(this.target);
            }
        }
    }
    resetAll() {
        ProductService.resetSelectedItem(this.target);
        this.draggableTarget = false;
        this.dropTarget = null;
        this.shiftX = 0;
        this.shiftY = 0;
    }

    resetTargetOutsideBorderArea() {
        ProductService.removeReplaceDraggedTarget(this.target);
        this.resetAll();
    }
    setLimitBorder(event) {
        const clientX = event.clientX;
        const clientY = event.clientY;
        const borderArea = document.documentElement;
        if (clientX + this.target.clientWidth > borderArea.clientWidth) {
            this.resetTargetOutsideBorderArea(); //right border
        } else if (clientX - this.target.clientWidth < borderArea.offsetLeft) {
            this.resetTargetOutsideBorderArea(); //left border
        } else if (clientY - this.target.clientWidth / 2 < borderArea.offsetTop) {
            this.resetTargetOutsideBorderArea(); //up border
        } else if (clientY + this.target.clientWidth / 2 > borderArea.clientHeight) {
            this.resetTargetOutsideBorderArea(); // down border
        }
    }
    isDragging(event) {
        this.draggableTarget = true;
        this.target = event.target.closest(".product-group-item");
        this.moveAt(event); // Без этого предметы смещаются
        this.target.ondragstart = () => false;
    }
}

export default new EventService();
