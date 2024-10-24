import AnimationService from "./Services/AnimationService.mjs";
import ProductService from "./Services/ProductService.mjs";
import StoreService from "./Services/StoreService.mjs";
import EventService from "./Services/EventService.mjs";

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
            EventService.isDragging = true;
            EventService.item = event.target.closest(".product-group-item");
            AnimationService.cartAddScale();
        }
    }
    onTouchMove(event) {
        if (EventService.isDragging && EventService.item) {
            EventService.atMove(event);
            if (!EventService.item.classList.contains(EventService.draggetItemClass)) {
                EventService.item.classList.add(EventService.draggetItemClass);
            }
        }
    }
    onTouchEnd() {
        if (EventService.isDragging) {
            EventService.drop();
            checkState();
            EventService.reset();
        }
    }
}

export default new TouchEvents();

function checkState() {
    StoreService.storeCheck(EventService.addedProductArr);
    if (StoreService.completed) {
        productArrIsFull();
        EventService.reset();
    }
}

function productArrIsFull() {
    ProductService.showBannerButton();
    ProductService.addClassesForProductItem();
}

function addSelectedClass() {
    if (!EventService.item.classList.contains(EventService.draggetItemClass)) {
        EventService.item.classList.add(EventService.draggetItemClass);
    }
}
