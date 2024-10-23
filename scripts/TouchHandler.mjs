import AnimationService from "./Services/AnimationService.mjs";
import ProductService from "./Services/ProductService.mjs";
import StoreService from "./Services/StoreService.mjs";

const localStorage = {
    isDragging: false,
    item: null,
    shiftX: 0,
    shiftY: 0,
    dropTarget: null,
    addedProductArr: [],
    draggetItemClass: "selected-touch",
};

class TouchEvents {
    onTouchStart(event) {
        event.preventDefault();
        if (event.target.closest(".product-group-item")) {
            localStorage.isDragging = true;
            localStorage.item = event.target.closest(".product-group-item");
            AnimationService.cartAddScale();
        }
    }
    onTouchMove(event) {
        if (localStorage.isDragging && localStorage.item) {
            atMove(event);
            if (!localStorage.item.classList.contains(localStorage.draggetItemClass)) {
                localStorage.item.classList.add(localStorage.draggetItemClass);
            }
        }
    }
    onTouchEnd() {
        if (localStorage.isDragging) {
            drop();
            checkState();
            reset();
        }
    }
}

export default new TouchEvents();

function atMove(event) {
    const { clientX, clientY } = event.touches[0];
    localStorage.shiftX = clientX;
    localStorage.shiftY = clientY;

    localStorage.item.style.position = "fixed";
    localStorage.item.style.left = localStorage.shiftX + "px";
    localStorage.item.style.top = localStorage.shiftY + "px";
}

function drop() {
    localStorage.item.hidden = true;
    localStorage.dropTarget = document
        .elementFromPoint(localStorage.shiftX, localStorage.shiftY)
        .closest(".cart");
    localStorage.item.hidden = false;
    AnimationService.cartRemoveScale();
    if (localStorage.dropTarget) {
        ProductService.addProductIntoCart(localStorage.item);
        StoreService.store(localStorage.item.id, localStorage.addedProductArr);
    }
}

function checkState() {
    StoreService.storeCheck(localStorage.addedProductArr);
    if (StoreService.completed) {
        productArrIsFull();
        reset();
    }
}

function productArrIsFull() {
    ProductService.showBannerButton();
    ProductService.fillRemoveItemPlace(localStorage.item);
    ProductService.removeClassesForProductItem();
    ProductService.addClassesForProductItem();
}

function reset() {
    localStorage.isDragging = false;
    localStorage.item.classList.remove(localStorage.draggetItemClass);
    localStorage.item.style.position = "";
    localStorage.item = null;
    localStorage.shiftX = 0;
    localStorage.shiftY = 0;
}
