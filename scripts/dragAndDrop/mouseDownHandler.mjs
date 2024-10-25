import AnimationService from "../service/animationService.mjs";
import EventService from "../service/eventService.mjs";
import ProductService from "../service/productService.mjs";
import { DOMElements } from "../index.mjs";

export default function MouseDownHandler(event) {
    if (event.target.closest(".product-group-item")) {
        EventService.isDragging = true;
        EventService.target = event.target.closest(".product-group-item");
        ProductService.addClassSelected(EventService.target);
        AnimationService.cartAddScale();
        EventService.moveAt(event); // Без этого предметы смещаются
        ProductService.replaceDraggedTarget(EventService.target);
        document.addEventListener("mousemove", onMouseMove);
        DOMElements.productGroup.addEventListener("mouseup", onMouseUp);
        EventService.target.ondragstart = () => {
            return false;
        };
    }
}

function onMouseMove(event) {
    if (EventService.isDragging) {
        EventService.moveAt(event);
        EventService.setLimitBorder(event);
    }
}

function onMouseUp() {
    document.removeEventListener("mousemove", onMouseMove); // Не удалять
    EventService.drop();
    EventService.checkCartIsFulled();
    EventService.resetAll();
}
