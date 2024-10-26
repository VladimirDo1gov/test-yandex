import controllEvent, { DOMEventElement } from "./controllEvent.mjs";

export default function MouseDownHandler(event) {
    controllEvent.isGrabingTarget(event);
    document.addEventListener("mousemove", onMouseMove);
    DOMEventElement.productGroup.addEventListener("mouseup", onMouseUp);
}

function onMouseMove(event) {
    controllEvent.onMove(event);
}

function onMouseUp() {
    document.removeEventListener("mousemove", onMouseMove); // Не удалять
    controllEvent.drop();
}
