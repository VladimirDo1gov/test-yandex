import controllerMotion from "../controllers/controllerMotion.mjs";
import storage from "../controllers/storage.mjs";
import controllerEvent from "../controllers/controllerEvent.mjs";

class TouchHandlers {
    onTouchStart(event) {
        event.preventDefault();
        if (event.target.closest(".product-group-item")) {
            controllerEvent.isGrabing(event);
        }
    }
    onTouchMove(event) {
        if (controllerEvent.draggableTarget && controllerEvent.target) {
            controllerMotion.moveAt(event);
        }
    }
    onTouchEnd() {
        controllerEvent.drop();
        storage.checkStateCart();
    }
}

export default new TouchHandlers();
