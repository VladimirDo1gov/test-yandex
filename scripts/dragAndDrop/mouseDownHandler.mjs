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
        setLimitBorder(event);
    }
}

function onMouseUp() {
    document.removeEventListener("mousemove", onMouseMove); // Не удалять
    EventService.drop();
    EventService.checkState();
    EventService.reset();
}

function setLimitBorder(event) {
    const clientX = event.clientX;
    const clientY = event.clientY;
    //Right
    if (clientX + EventService.target.clientWidth > document.documentElement.clientWidth) {
        ProductService.removeReplaceDraggedTarget(EventService.target);
        EventService.reset();
        console.log("right");
    }
    //left
    else if (clientX - EventService.target.clientWidth < document.documentElement.offsetLeft) {
        ProductService.removeReplaceDraggedTarget(EventService.target);
        EventService.reset();
        console.log("left");
    }
    //up
    else if (clientY - EventService.target.clientWidth / 2 < document.documentElement.offsetTop) {
        ProductService.removeReplaceDraggedTarget(EventService.target);
        EventService.reset();
        console.log("up");
    }
    // down
    else if (
        clientY + EventService.target.clientWidth / 2 >
        document.documentElement.clientHeight
    ) {
        ProductService.removeReplaceDraggedTarget(EventService.target);
        console.log("down");
        EventService.reset();
    }
}

console.log(" offsetWidth: ", document.documentElement.offsetWidth);
console.log(" offsetLeft: ", document.documentElement.offsetLeft);
console.log(" offsetTop: ", document.documentElement.offsetTop);
console.log(" clientHeight: ", document.documentElement.clientHeight);
