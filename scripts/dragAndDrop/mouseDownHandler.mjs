import controllerMotion from "../controllers/controllerMotion.mjs";
import { DOMElements } from "../index.mjs";
import controllerStorage from "../controllers/controllerStorage.mjs";

export default function MouseDownHandler(event) {
    if (event.target.closest(".product-group-item")) {
        controllerMotion.isGrabing(event);
        document.addEventListener("mousemove", onMouseMove);
        DOMElements.productGroup.addEventListener("mouseup", onMouseUp);
    }
}

function onMouseMove(event) {
    if (controllerMotion.draggableTarget) {
        controllerMotion.moveAt(event);
        controllerMotion.rotate(event);
        controllerMotion.setLimitBorder(event);
    }
}

function onMouseUp() {
    document.removeEventListener("mousemove", onMouseMove); // Не удалять
    controllerMotion.drop();
    controllerStorage.checkStateCart();
    controllerMotion.resetAll();
}
