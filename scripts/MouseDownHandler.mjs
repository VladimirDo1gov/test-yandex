import AnimationService from "./Services/AnimationService.mjs";
import EventService from "./Services/EventService.mjs";
import { DOMElements } from "./index.mjs";

export default function MouseDownHandler(event) {
    if (event.target.closest(".product-group-item")) {
        EventService.isDragging = true;
        EventService.item = event.target.closest(".product-group-item");
        AnimationService.cartAddScale();
        onMouseMove(event);
        DOMElements.banner.addEventListener("mousemove", onMouseMove);
        DOMElements.productGroup.addEventListener("mouseup", onMouseUp);
        EventService.item.ondragstart = () => {
            return false;
        };
    }
}

function onMouseMove(event) {
    if (EventService.isDragging) {
        EventService.atMove(event);
        EventService.addSelectedClass();
    }
}

function onMouseUp() {
    if (EventService.isDragging) {
        EventService.drop();
        EventService.checkState();
        EventService.reset();
    }
}

// Раньше нужно было для удаления события, теперь работает без него
// Был в onMouseUp
// productElements.banner.removeEventListener("mousemove", onMouseMove);

// После загрузки корзины, элементы нельзя будет взять
// productElements.productGroup.removeEventListener("mousedown", onMouseDown);
