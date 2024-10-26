import MouseDownHandler from "./eventHandlers/mouseDownHandler.mjs";
import TouchHandlers from "./eventHandlers/touchHandlers.mjs";
import { DOMEventElement } from "./controllers/controllerEvent.mjs";

document.addEventListener("DOMContentLoaded", () => {
    DOMEventElement.productGroup.addEventListener("mousedown", MouseDownHandler);
    DOMEventElement.productGroup.addEventListener("touchstart", TouchHandlers.onTouchStart);
    DOMEventElement.productGroup.addEventListener("touchmove", TouchHandlers.onTouchMove);
    DOMEventElement.productGroup.addEventListener("touchend", TouchHandlers.onTouchEnd);
});
