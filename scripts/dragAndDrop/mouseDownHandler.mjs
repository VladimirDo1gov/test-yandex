import AnimationService from "../service/animationService.mjs";
import EventService from "../service/eventService.mjs";
import ProductService from "../service/productService.mjs";
import { DOMElements } from "../index.mjs";

export default function MouseDownHandler(event) {
    if (event.target.closest(".product-group-item")) {
        EventService.isDragging = true;
        EventService.target = event.target.closest(".product-group-item");
        EventService.addSelectedClass();
        AnimationService.cartAddScale();
        EventService.moveAt(event); // Без этого предметы смещаются
        ProductService.replaceDraggedTarget(EventService.target);
        DOMElements.banner.addEventListener("mousemove", onMouseMove);
        DOMElements.productGroup.addEventListener("mouseup", onMouseUp);
        EventService.target.ondragstart = () => {
            return false;
        };
    }
}

function onMouseMove(event) {
    if (EventService.isDragging) {
        EventService.moveAt(event);
    }
}

function onMouseUp(event) {
    // Попытка настроить onMouseUp за пределами границ
    // const { left, right, top, bottom } = EventService.getLimit();
    // if (event.clientX > right) {
    //     EventService.reset();
    // }
    // else if (event.clientX < left) {
    //     EventService.reset();
    // }
    // else if (event.clientY < top) {
    //     EventService.reset();
    // }
    // else if (event.clientY > bottom) {
    //     EventService.reset();
    // } else {

    // }
    DOMElements.banner.removeEventListener("mousemove", onMouseMove); // Не удалять
    EventService.drop();
    EventService.checkState();
    EventService.reset();
}

// После загрузки корзины, элементы нельзя будет взять
// productElements.productGroup.removeEventListener("mousedown", onMouseDown);
