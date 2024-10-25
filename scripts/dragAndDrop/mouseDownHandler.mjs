import eventService from "../service/eventService.mjs";
import { DOMElements } from "../index.mjs";
import storeService from "../service/storeService.mjs";

export default function MouseDownHandler(event) {
    if (event.target.closest(".product-group-item")) {
        eventService.isGrabing(event);
        document.addEventListener("mousemove", onMouseMove);
        DOMElements.productGroup.addEventListener("mouseup", onMouseUp);
    }
}

function onMouseMove(event) {
    if (eventService.draggableTarget) {
        eventService.moveAt(event);
        eventService.rotate(event);
        eventService.setLimitBorder(event);
    }
}

function onMouseUp() {
    document.removeEventListener("mousemove", onMouseMove); // Не удалять
    eventService.drop();
    storeService.checkStateCart();
    eventService.resetAll();
}
