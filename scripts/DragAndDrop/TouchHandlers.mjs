import AnimationService from "../Services/AnimationService.mjs";
import EventService from "../Services/EventService.mjs";

class TouchHandlers {
    onTouchStart(event) {
        event.preventDefault();
        if (event.target.closest(".product-group-item")) {
            EventService.isDragging = true;
            EventService.target = event.target.closest(".product-group-item");
            AnimationService.cartAddScale();
        }
    }
    onTouchMove(event) {
        if (EventService.isDragging && EventService.target) {
            EventService.MoveAt(event);
            EventService.addSelectedClass();
        }
    }
    onTouchEnd() {
        EventService.drop();
        EventService.checkState();
        EventService.reset();
    }
}

export default new TouchHandlers();
