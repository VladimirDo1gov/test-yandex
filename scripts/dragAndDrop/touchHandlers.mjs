import motionController from "../controllers/motionController.mjs";
import storeService from "../controllers/storeService.mjs";

class TouchHandlers {
    onTouchStart(event) {
        event.preventDefault();
        if (event.target.closest(".product-group-item")) {
            motionController.isGrabing(event);
        }
    }
    onTouchMove(event) {
        if (motionController.draggableTarget && motionController.target) {
            motionController.moveAt(event);
        }
    }
    onTouchEnd() {
        motionController.drop();
        storeService.checkStateCart();
        motionController.resetAll();
    }
}

export default new TouchHandlers();
