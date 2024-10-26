import controllerMotion from "../controllers/controllerMotion.mjs";
import storage from "../controllers/storage.mjs";
import controllerEvent from "../controllers/controllerEvent.mjs";

class TouchHandlers {
    onTouchStart(event) {
        event.preventDefault();
        if (event.target.closest(".product-group-item")) {
            controllerEvent.isGrabingTarget(event);
        }
    }
    onTouchMove(event) {
        if (controllerEvent.draggableTarget) {
            controllerMotion.moveAt(event, controllerEvent.target);
        }
    }
    onTouchEnd() {
        controllerEvent.drop();
        storage.checkStateCart();
    }
}

export default new TouchHandlers();
