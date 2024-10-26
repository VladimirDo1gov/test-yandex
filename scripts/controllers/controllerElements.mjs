// Отвечает за изменение элементов

import { addClass, removeClass } from "../utils/classList.mjs";
import grabedTargetAnimation from "../animation/grabedTargetEffects.mjs";

class ControllerElements {
    addProductIntoCart(item) {
        item.className = classes.productIntoCart;
        elements.cartGrid.append(item);
    }

    disableItemsNotInCart() {
        for (let item of elements.productItems) {
            addClass(item, classes.opacity);
        }
    }
    addClassSelected(item) {
        addClass(item, classes.draggedItem);
    }
    resetSelectedItem(item) {
        if (item) {
            grabedTargetAnimation.removeRotateTarget(item);
            removeClass(item, classes.draggedItem);
            item.style.position = "";
            item = null;
        }
    }
}

const classes = {
    get draggedItem() {
        return "selected-item";
    },
    get productIntoCart() {
        return "product-into-cart";
    },
    get opacity() {
        return "opacity";
    },
};

const elements = {
    get cartGrid() {
        return document.querySelector(".cart-grid");
    },
    get productItems() {
        return document.querySelectorAll(".product-group-item");
    },
};

export default new ControllerElements();
