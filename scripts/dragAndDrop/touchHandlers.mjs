import AnimationService from "../service/animationService.mjs";
import ProductService from "../service/productService.mjs";
import EventService from "../service/eventService.mjs";
import StoreService from "../service/storeService.mjs";

class TouchHandlers {
    onTouchStart(event) {
        event.preventDefault();
        if (event.target.closest(".product-group-item")) {
            EventService.isDragging(event);
            ProductService.targetIsGrabing();
            AnimationService.cartAddScale();
        }
    }
    onTouchMove(event) {
        if (EventService.draggableTarget && EventService.target) {
            EventService.moveAt(event);
        }
    }
    onTouchEnd() {
        EventService.drop();
        StoreService.checkStateCart();
        EventService.resetAll();
    }
}

export default new TouchHandlers();
