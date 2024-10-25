import { DOMElements } from "../index.mjs";
import EventService from "./eventService.mjs";
class ProductService {
    classes = {
        draggedItem: "selected",
    };

    createPlaceholder(item) {
        const itemStyle = getComputedStyle(item);
        const div = document.createElement("div");
        div.classList.add(`paceholder-${item.id}`);
        div.style.width = itemStyle.width;
        div.style.height = itemStyle.height;
        div.style.background = "red";
        return div;
    }

    replaceDraggedTarget(item) {
        const productGroupLevel = item.closest(".product-group-level");
        const div = this.createPlaceholder(item);
        if (productGroupLevel) {
            const nextSibling = item.nextElementSibling;
            const previousSibling = item.previousElementSibling;
            if (nextSibling) {
                nextSibling.insertAdjacentElement("beforeBegin", div);
            }
            if (previousSibling) {
                previousSibling.insertAdjacentElement("afterEnd", div);
            }
        }
    }
    removeReplaceDraggedTarget(item) {
        const placeHolderDraggedItem = document.querySelector(`.paceholder-${item.id}`);
        if (placeHolderDraggedItem) {
            placeHolderDraggedItem.remove();
        }
    }

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
            item.classList.remove("can-choose");
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
        this.addClassSelected(EventService.target);
        this.replaceDraggedTarget(EventService.target);
    }
}

export default new ProductService();
