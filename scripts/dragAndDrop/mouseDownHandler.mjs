import motionController from "../controllers/motionController.mjs";
import { DOMElements } from "../index.mjs";
import storeService from "../controllers/storeService.mjs";

export default function MouseDownHandler(event) {
    if (event.target.closest(".product-group-item")) {
        motionController.isGrabing(event);
        document.addEventListener("mousemove", onMouseMove);
        DOMElements.productGroup.addEventListener("mouseup", onMouseUp);
    }
}

function onMouseMove(event) {
    if (motionController.draggableTarget) {
        motionController.moveAt(event);
        motionController.rotate(event);
        motionController.setLimitBorder(event);
    }
}

function onMouseUp() {
    document.removeEventListener("mousemove", onMouseMove); // Не удалять
    motionController.drop();
    storeService.checkStateCart();
    motionController.resetAll();
}
