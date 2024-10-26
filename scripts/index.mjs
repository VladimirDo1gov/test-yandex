import MouseDownHandler from "./eventHandlers/mouseDownHandler.mjs";
import TouchHandlers from "./eventHandlers/touchHandlers.mjs";
import { DOMEventElements } from "./controllers/controllerEvent.mjs";

document.addEventListener("DOMContentLoaded", () => {
    DOMEventElements.productGroup.addEventListener("mousedown", MouseDownHandler);
    DOMEventElements.productGroup.addEventListener("touchstart", TouchHandlers.onTouchStart);
    DOMEventElements.productGroup.addEventListener("touchmove", TouchHandlers.onTouchMove);
    DOMEventElements.productGroup.addEventListener("touchend", TouchHandlers.onTouchEnd);
});
