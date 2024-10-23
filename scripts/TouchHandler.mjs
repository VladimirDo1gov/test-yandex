import AnimationService from "./Services/AnimationService.mjs";
import ProductService from "./Services/ProductService.mjs";
import StoreService from "./Services/StoreService.mjs";

const banner = document.querySelector(".banner-section");

let isDragging = false;
let item = null;
let shiftX = 0;
let shiftY = 0;
let dropTarget = null;
let state = [];

export function onTouchStart(event) {
    event.preventDefault();
    if (event.target.closest(".product-group-item")) {
        isDragging = true;
        item = event.target.closest(".product-group-item");
        AnimationService.cartAddScale();
    }
}

export function onTouchMove(event) {
    if (isDragging && item) {
        const { clientX, clientY } = event.touches[0];
        shiftX = clientX;
        shiftY = clientY;

        console.log(document.elementFromPoint(shiftX, shiftY).closest(".cart"));
        item.classList.add("selected-touch");
        item.style.position = "fixed"; // Если удалить, предметы будут возвращаться на места
        item.style.left = shiftX + "px";
        item.style.top = shiftY + "px";
    }
}

export function onTouchEnd(event) {
    if (isDragging) {
        drop();
        updateState();
        reset();
    }
}

function drop() {
    item.hidden = true;
    dropTarget = document.elementFromPoint(shiftX, shiftY).closest(".cart");
    item.hidden = false;
}

function updateState() {
    if (dropTarget) {
        StoreService.store(item.id, state);
    }
    StoreService.storeCheck(state);
    if (StoreService.completed) {
        ProductService.showBannerButton();
    }
}

function insertToCart(item) {
    item.hidden = true;
    let requiereElement = document.elementFromPoint(shiftX, shiftY).closest(".cart");
    item.hidden = false;
    console.log(1);
    if (requiereElement === productElements.cart) {
        console.log(2);
        ProductService.fillRemoveItemPlace(item);
        ProductService.addProductIntoCart(item);
        StoreService.store(item.id, initialState);
        StoreService.storeCheck(initialState);
        if (StoreService.completed) {
            ProductService.removeClassesForProductItem();
            ProductService.addClassesForProductItem();
            ProductService.showBannerButton();
        }
    }
}

function atMove() {}

function reset() {
    isDragging = false;
    item.classList.remove("selected-touch");
    item.style.left = "";
    item.style.top = "";
    item.style.height = "";
    item.style.width = "";
    item.style.position = "";
    item = null;
    shiftX = 0;
    shiftY = 0;
}

// item.style.height = item.clientHeight;
// item.style.width = item.clientWidth;
