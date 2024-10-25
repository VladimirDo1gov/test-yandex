import MouseDownHandler from "./dragAndDrop/mouseDownHandler.mjs";
import TouchHandlers from "./dragAndDrop/touchHandlers.mjs";
import AnimationService from "./service/animationService.mjs";

export const DOMElements = {
    get productGroup() {
        return document.querySelector(".product-group");
    },
    get banner() {
        return document.querySelector(".banner-section");
    },
    get productItems() {
        return document.querySelectorAll(".product-group-item");
    },
    get cart() {
        return document.querySelector(".cart");
    },
    get bannerButton() {
        return document.querySelector("#banner-button");
    },
};

document.addEventListener("DOMContentLoaded", () => {
    DOMElements.productGroup.addEventListener("mousedown", MouseDownHandler);
    DOMElements.productGroup.addEventListener("touchstart", TouchHandlers.onTouchStart);
    DOMElements.productGroup.addEventListener("touchmove", TouchHandlers.onTouchMove);
    DOMElements.productGroup.addEventListener("touchend", TouchHandlers.onTouchEnd);
});
