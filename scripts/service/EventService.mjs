import animationService from "./animationService.mjs";
import productService from "./productService.mjs";
import storeService from "./storeService.mjs";

class EventService {
    draggableTarget = false;
    target = null;
    shiftX = 0;
    shiftY = 0;
    dropTarget = null;
    previousX = [];

    rotate(event) {
        const previousX = this.previousX.shift();
        let currentX = event.clientX;
        if (previousX < currentX) {
            animationService.rotateTargetToRight(this.target);
        }
        if (previousX > currentX) {
            animationService.rotateTargetToLeft(this.target);
        }
    }

    getCoordinats(clientX, clientY) {
        this.shiftX = clientX - this.target.clientWidth / 2;
        this.shiftY = clientY - this.target.clientHeight / 2;
    }
    moveAt(event) {
        if (event.clientX) {
            this.getCoordinats(event.clientX, event.clientY);
            this.previousX.push(event.clientX);
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
            this.dropTarget = document
                .elementFromPoint(this.shiftX, this.shiftY)
                ?.closest(".cart-area");
            this.target.hidden = false;
            animationService.cartRemoveScale();
            if (this.dropTarget) {
                productService.addProductIntoCart(this.target);
                storeService.addTargetToStore(this.target.id);
            }
        }
    }
    resetAll() {
        productService.resetSelectedItem(this.target);
        this.draggableTarget = false;
        this.dropTarget = null;
        this.shiftX = 0;
        this.shiftY = 0;
    }

    resetTargetOutsideBorderArea() {
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
    isGrabing(event) {
        this.draggableTarget = true;
        this.target = event.target.closest(".product-group-item");
        productService.addClassSelected(this.target);
        animationService.cartAddScale();
        this.moveAt(event); // Без этого предметы смещаются
        this.target.ondragstart = () => false;
    }
}

export default new EventService();
