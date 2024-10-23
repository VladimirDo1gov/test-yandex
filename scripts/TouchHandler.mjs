import AnimationService from "./Services/AnimationService.mjs";
import ProductService from "./Services/ProductService.mjs";
import StoreService from "./Services/StoreService.mjs";

const localState = {
    isDragging: false,
    item: null,
    shiftX: 0,
    shiftY: 0,
    dropTarget: null,
    state: [],
};

export function onTouchStart(event) {
    event.preventDefault();
    if (event.target.closest(".product-group-item")) {
        localState.isDragging = true;
        localState.item = event.target.closest(".product-group-item");
        AnimationService.cartAddScale();
    }
}

export function onTouchMove(event) {
    if (localState.isDragging && localState.item) {
        atMove(event);
        if (!localState.item.classList.contains("selected-touch")) {
            localState.item.classList.add("selected-touch");
        }
    }
}

export function onTouchEnd() {
    if (localState.isDragging) {
        drop();
        checkState();
        reset();
    }
}

function drop() {
    localState.item.hidden = true;
    localState.dropTarget = document
        .elementFromPoint(localState.shiftX, localState.shiftY)
        .closest(".cart");
    localState.item.hidden = false;
    AnimationService.cartRemoveScale();
    if (localState.dropTarget) {
        ProductService.addProductIntoCart(localState.item);
        StoreService.store(localState.item.id, localState.state);
    }
}

function checkState() {
    StoreService.storeCheck(localState.state);
    if (StoreService.completed) {
        stateIsFull();
        reset();
    }
}

function stateIsFull() {
    ProductService.showBannerButton();
    ProductService.fillRemoveItemPlace(localState.item);
    ProductService.removeClassesForProductItem();
    ProductService.addClassesForProductItem();
}

function atMove(event) {
    const { clientX, clientY } = event.touches[0];
    localState.shiftX = clientX;
    localState.shiftY = clientY;

    localState.item.style.position = "fixed";
    localState.item.style.left = localState.shiftX + "px";
    localState.item.style.top = localState.shiftY + "px";
}

function reset() {
    localState.isDragging = false;
    localState.item.classList.remove("selected-touch");
    localState.item.style.left = "";
    localState.item.style.top = "";
    localState.item.style.height = "";
    localState.item.style.width = "";
    localState.item.style.position = "";
    localState.item = null;
    localState.shiftX = 0;
    localState.shiftY = 0;
}
