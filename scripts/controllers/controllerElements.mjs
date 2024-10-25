// Отвечает за изменение элементов

import { DOMElements } from "../index.mjs";
import { addClass, removeClass } from "../lib/utils.mjs";
import grabedTargetAnimation from "../animation/grabedTargetAnimation.mjs";

class ControllerElements {
    classes = {
        draggedItem: "selected-item",
        productIntoCart: "product-into-cart",
        opacity: "opacity",
    };

    addProductIntoCart(item) {
        const cartGrid = document.querySelector(".cart-grid");
        item.className = this.classes.productIntoCart;
        cartGrid.append(item);
    }

    disableItemsNotInCart() {
        for (let item of DOMElements.productItems) {
            addClass(item, this.classes.opacity);
        }
    }
    addClassSelected(item) {
        addClass(item, this.classes.draggedItem);
    }
    resetSelectedItem(item) {
        if (item) {
            grabedTargetAnimation.removeRotateTarget(item);
            removeClass(item, this.classes.draggedItem);
            item.style.position = "";
            item = null;
        }
    }
}

export default new ControllerElements();
