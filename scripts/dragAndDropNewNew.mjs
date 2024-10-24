import StoreService from "./Services/StoreService.mjs";
import ProductService from "./Services/ProductService.mjs";
import AnimationService from "./Services/AnimationService.mjs";
import EventService from "./Services/EventService.mjs";

export const productElements = {
    productGroup: document.querySelector(".product-group"),
    cart: document.querySelector(".cart"),
    banner: document.querySelector(".banner-section"),
};

export default function onMouseDown(event) {
    if (event.target.closest(".product-group-item")) {
        EventService.isDragging = true;
        EventService.item = event.target.closest(".product-group-item");
        AnimationService.cartAddScale();
        onMouseMove(event);
        productElements.banner.addEventListener("mousemove", onMouseMove);
        productElements.productGroup.addEventListener("mouseup", onMouseUp);

        EventService.item.ondragstart = () => {
            return false;
        };
    }
}

function onMouseMove(event) {
    if (EventService.isDragging && EventService.item) {
        EventService.atMove(event);
        addSelectedClass();
    }
}

function onMouseUp() {
    if (EventService.isDragging) {
        document.removeEventListener("mousemove", onMouseMove);
        EventService.drop();
        checkState();
        EventService.reset();
    }
}

function addSelectedClass() {
    if (!EventService.item.classList.contains(EventService.draggetItemClass)) {
        EventService.item.classList.add(EventService.draggetItemClass);
    }
}

function checkState() {
    StoreService.storeCheck(EventService.addedProductArr);
    if (StoreService.completed) {
        productElements.productGroup.removeEventListener("mousedown", onMouseDown);
        ProductService.removeClassesForProductItem();
        productArrIsFull();
        EventService.reset();
    }
}

function productArrIsFull() {
    ProductService.showBannerButton();
    ProductService.addClassesForProductItem();
}
