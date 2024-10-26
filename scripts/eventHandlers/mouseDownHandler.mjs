import controllerMotion from "../controllers/controllerMotion.mjs";
import { DOMElements } from "../index.mjs";
import storage from "../controllers/storage.mjs";
import controllerEvent from "../controllers/controllerEvent.mjs";

export default function MouseDownHandler(event) {
    if (event.target.closest(".product-group-item")) {
        controllerEvent.isGrabing(event);
        document.addEventListener("mousemove", onMouseMove);
        DOMElements.productGroup.addEventListener("mouseup", onMouseUp);
    }
}

function onMouseMove(event) {
    if (controllerEvent.draggableTarget) {
        controllerMotion.moveAt(event, controllerEvent.target);
        controllerMotion.rotate(event, controllerEvent.target);
        controllerMotion.setLimitBorder(event, controllerEvent.target);
    }
}

function onMouseUp() {
    document.removeEventListener("mousemove", onMouseMove); // Не удалять
    controllerEvent.drop();
    storage.checkStateCart();
    // controllerEvent.resetAll();
}
