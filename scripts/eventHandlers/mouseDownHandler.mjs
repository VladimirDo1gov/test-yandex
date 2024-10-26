import controllerMotion from "../controllers/controllerMotion.mjs";
import storage from "../controllers/storage.mjs";
import controllerEvent, { DOMEventElements } from "../controllers/controllerEvent.mjs";

export default function MouseDownHandler(event) {
    if (event.target.closest(".product-group-item")) {
        controllerEvent.isGrabingTarget(event);
        document.addEventListener("mousemove", onMouseMove);
        DOMEventElements.productGroup.addEventListener("mouseup", onMouseUp);
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
}
