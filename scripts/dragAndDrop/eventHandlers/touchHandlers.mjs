import controllEvent from "./controllEvent.mjs";

class TouchHandlers {
    onTouchStart(event) {
        event.preventDefault();
        controllEvent.isGrabingTarget(event);
    }
    onTouchMove(event) {
        controllEvent.onMove(event);
    }
    onTouchEnd() {
        controllEvent.drop();
    }
}

export default new TouchHandlers();
