import eventService from "../service/eventService.mjs";
import storeService from "../service/storeService.mjs";

class TouchHandlers {
    onTouchStart(event) {
        event.preventDefault();
        if (event.target.closest(".product-group-item")) {
            eventService.isGrabing(event);
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
