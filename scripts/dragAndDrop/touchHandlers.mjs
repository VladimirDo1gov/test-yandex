import AnimationService from "../service/animationService.mjs";
import ProductService from "../service/productService.mjs";
import EventService from "../service/eventService.mjs";
class TouchHandlers {
    onTouchStart(event) {
        event.preventDefault();
        if (event.target.closest(".product-group-item")) {
            EventService.isDragging = true;
            EventService.target = event.target.closest(".product-group-item");
            ProductService.addClassSelected(EventService.target);
            ProductService.replaceDraggedTarget(EventService.target);
            EventService.moveAt(event);
            AnimationService.cartAddScale();
        }
    }
    onTouchMove(event) {
        if (EventService.isDragging && EventService.target) {
            EventService.moveAt(event);
        }
    }
    onTouchEnd() {
        EventService.drop();
        EventService.checkCartIsFulled();
        EventService.resetAll();
    }
}

export default new TouchHandlers();
