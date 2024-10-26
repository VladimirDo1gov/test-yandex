import mouseDownHandler from "./dragAndDrop/eventHandlers/mouseDownHandler.mjs";
import touchHandlers from "./dragAndDrop/eventHandlers/touchHandlers.mjs";
import { DOMEventElement } from "./dragAndDrop/eventHandlers/controllEvent.mjs";

document.addEventListener("DOMContentLoaded", () => {
    DOMEventElement.productGroup.addEventListener("mousedown", mouseDownHandler);
    DOMEventElement.productGroup.addEventListener("touchstart", touchHandlers.onTouchStart);
    DOMEventElement.productGroup.addEventListener("touchmove", touchHandlers.onTouchMove);
    DOMEventElement.productGroup.addEventListener("touchend", touchHandlers.onTouchEnd);
});
