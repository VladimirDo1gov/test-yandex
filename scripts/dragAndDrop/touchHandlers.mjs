import controllerMotion from "../controllers/controllerMotion.mjs";
import controllerStorage from "../controllers/controllerStorage.mjs";

class TouchHandlers {
    onTouchStart(event) {
        event.preventDefault();
        if (event.target.closest(".product-group-item")) {
            controllerMotion.isGrabing(event);
        }
    }
    onTouchMove(event) {
        if (controllerMotion.draggableTarget && controllerMotion.target) {
            controllerMotion.moveAt(event);
        }
    }
    onTouchEnd() {
        controllerMotion.drop();
        controllerStorage.checkStateCart();
        controllerMotion.resetAll();
    }
}

export default new TouchHandlers();
