import animationService from "../service/animationService.mjs";
import productService from "../service/productService.mjs";
import eventService from "../service/eventService.mjs";
import storeService from "../service/storeService.mjs";

class TouchHandlers {
    onTouchStart(event) {
        event.preventDefault();
        if (event.target.closest(".product-group-item")) {
            eventService.isDragging(event);
            productService.targetIsGrabing();
            animationService.cartAddScale();
        }
    }
    onTouchMove(event) {
        if (eventService.draggableTarget && eventService.target) {
            eventService.moveAt(event);
        }
    }
    onTouchEnd() {
        eventService.drop();
        storeService.checkStateCart();
        eventService.resetAll();
    }
}

export default new TouchHandlers();
