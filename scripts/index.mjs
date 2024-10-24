import MouseDownHandler from "./MouseDownHandler.mjs";
import TouchHandlers from "./TouchHandlers.mjs";

export const DOMElements = {
    get productGroup() {
        return document.querySelector(".product-group");
    },
    get banner() {
        return document.querySelector(".banner-section");
    },
};

document.addEventListener("DOMContentLoaded", () => {
    DOMElements.productGroup.addEventListener("mousedown", MouseDownHandler);
    DOMElements.productGroup.addEventListener("touchstart", TouchHandlers.onTouchStart);
    DOMElements.productGroup.addEventListener("touchmove", TouchHandlers.onTouchMove);
    DOMElements.productGroup.addEventListener("touchend", TouchHandlers.onTouchEnd);
});
