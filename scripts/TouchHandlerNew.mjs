import AnimationService from "./Services/AnimationService.mjs";
import EventService from "./Services/EventService.mjs";
class TouchEvents {
    onTouchStart(event) {
        event.preventDefault();
        if (event.target.closest(".product-group-item")) {
            EventService.isDragging = true;
            EventService.item = event.target.closest(".product-group-item");
            AnimationService.cartAddScale();
        }
    }
    onTouchMove(event) {
        if (EventService.isDragging && EventService.item) {
            EventService.atMove(event);
            EventService.addSelectedClass();
        }
    }
    onTouchEnd() {
        if (EventService.isDragging) {
            EventService.drop();
            EventService.checkState();
            EventService.reset();
        }
    }
}

export default new TouchEvents();
