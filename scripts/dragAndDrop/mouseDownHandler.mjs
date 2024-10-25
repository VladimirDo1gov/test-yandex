import AnimationService from "../service/animationService.mjs";
import EventService from "../service/eventService.mjs";
import ProductService from "../service/productService.mjs";
import { DOMElements } from "../index.mjs";
import StoreService from "../service/storeService.mjs";

export default function MouseDownHandler(event) {
    if (event.target.closest(".product-group-item")) {
        EventService.isDragging(event);
        ProductService.targetIsGrabing();
        AnimationService.cartAddScale();
        document.addEventListener("mousemove", onMouseMove);
        DOMElements.productGroup.addEventListener("mouseup", onMouseUp);
    }
}

function onMouseMove(event) {
    if (EventService.draggableTarget) {
        EventService.moveAt(event);
        EventService.setLimitBorder(event);
    }
}

function onMouseUp() {
    document.removeEventListener("mousemove", onMouseMove); // Не удалять
    EventService.drop();
    StoreService.checkStateCart();
    EventService.resetAll();
}
