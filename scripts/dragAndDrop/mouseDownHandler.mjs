import animationService from "../service/animationService.mjs";
import eventService from "../service/eventService.mjs";
import productService from "../service/productService.mjs";
import { DOMElements } from "../index.mjs";
import storeService from "../service/storeService.mjs";

export default function MouseDownHandler(event) {
    if (event.target.closest(".product-group-item")) {
        eventService.isDragging(event);
        productService.targetIsGrabing();
        animationService.cartAddScale();
        document.addEventListener("mousemove", onMouseMove);
        DOMElements.productGroup.addEventListener("mouseup", onMouseUp);
    }
}

function onMouseMove(event) {
    if (eventService.draggableTarget) {
        eventService.moveAt(event);
        eventService.setLimitBorder(event);
    }
}

function onMouseUp() {
    document.removeEventListener("mousemove", onMouseMove); // Не удалять
    eventService.drop();
    storeService.checkStateCart();
    eventService.resetAll();
}
