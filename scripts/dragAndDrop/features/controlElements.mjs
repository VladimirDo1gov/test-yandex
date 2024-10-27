// Отвечает за изменение элементов

import { addClass, removeClass } from "../../lib/utils.mjs";
class ControlElements {
    /**
     * Добавляет продукт в корзину
     * @param {DOMElement} item
     */
    addProductIntoCart(item) {
        item.className = selectedElementClasses.productIntoCart;
        selectedDOMElements.cartGrid.append(item);
    }
    /**
     * Вешает opacity не продукты, которые не находятся в корзине
     */
    disableItemsNotInCart() {
        for (let item of selectedDOMElements.productItems) {
            addClass(item, selectedElementClasses.opacity);
            addClass(item, selectedElementClasses.noDrop);
        }
    }
    /**
     * Вешает класс захваченного предмета "selected-item" на переданный элемент
     * @param {DOMElement} item
     */
    addClassSelected(item) {
        addClass(item, selectedElementClasses.draggedItem);
    }
    /**
     * Обнуляет захваченный элемент
     * @param {DOMElement} item
     */
    resetSelectedItem(item) {
        if (item) {
            removeClass(item, selectedElementClasses.draggedItem);
            item.style.position = "";
            item = null;
        }
    }
}

export const selectedElementClasses = {
    get draggedItem() {
        return "selected-item";
    },
    get productIntoCart() {
        return "product-into-cart";
    },
    get opacity() {
        return "opacity";
    },
    get noDrop() {
        return "no-drop";
    },
};

export const selectedDOMElements = {
    get cartGrid() {
        return document.querySelector(".cart-grid");
    },
    get productItems() {
        return document.querySelectorAll(".product-group-item");
    },
};

export default new ControlElements();
