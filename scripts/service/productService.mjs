import { DOMElements } from "../index.mjs";
import eventService from "./eventService.mjs";
class ProductService {
    classes = {
        draggedItem: "selected",
    };

    addProductIntoCart(item) {
        const cartGrid = document.querySelector(".cart-grid");
        item.className = "product-into-cart";
        cartGrid.append(item);
    }

    disableItemsNotInCart() {
        for (let item of DOMElements.productItems) {
            item.classList.add("opacity");
        }
    }
    removeClassesForProductItem() {
        for (let item of DOMElements.productItems) {
            item.classList.remove("grab");
        }
    }
    addClassSelected(item) {
        if (!item.classList.contains(this.classes.draggedItem)) {
            item.classList.add(this.classes.draggedItem);
        }
    }
    resetSelectedItem(item) {
        if (item) {
            item.classList.remove(this.classes.draggedItem);
            item.style.position = "";
            item = null;
        }
    }
    targetIsGrabing() {
        this.addClassSelected(eventService.target);
    }
}

export default new ProductService();
