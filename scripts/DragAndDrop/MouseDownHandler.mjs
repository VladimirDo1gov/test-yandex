import AnimationService from "../Services/AnimationService.mjs";
import EventService from "../Services/EventService.mjs";
import { DOMElements } from "../index.mjs";

export default function MouseDownHandler(event) {
    if (event.target.closest(".product-group-item")) {
        EventService.isDragging = true;
        EventService.target = event.target.closest(".product-group-item");
        AnimationService.cartAddScale();
        // onMouseMove(event); Пока не нужно, удалю позже
        DOMElements.banner.addEventListener("mousemove", onMouseMove);
        DOMElements.productGroup.addEventListener("mouseup", onMouseUp);
        EventService.target.ondragstart = () => {
            return false;
        };
    }
}

function onMouseMove(event) {
    if (EventService.isDragging) {
        EventService.MoveAt(event);
        EventService.addSelectedClass();
    }
}

function onMouseUp() {
    DOMElements.banner.removeEventListener("mousemove", onMouseMove); // Не удалять
    EventService.drop();
    EventService.checkState();
    EventService.reset();
}

// После загрузки корзины, элементы нельзя будет взять
// productElements.productGroup.removeEventListener("mousedown", onMouseDown);
