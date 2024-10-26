// Отвечает за изменение элементов

import { addClass, removeClass } from "../../lib/utils.mjs";
class ControlElements {
    /**
     * Добавляет продукт в корзину
     * @param {DOMElement} item
     */
    addProductIntoCart(item) {
        item.className = grabbedSelectedElementClasses.productIntoCart;
        grabbedSelectedDOMElements.cartGrid.append(item);
    }
    /**
     * Вешает opacity не продукты, которые не находятся в корзине
     */
    disableItemsNotInCart() {
        for (let item of grabbedSelectedDOMElements.productItems) {
            addClass(item, grabbedSelectedElementClasses.opacity);
        }
    }
    /**
     * Вешает класс захваченного предмета "selected-item" на переданный элемент
     * @param {DOMElement} item
     */
    addClassSelected(item) {
        addClass(item, grabbedSelectedElementClasses.draggedItem);
    }
    /**
     * Обнуляет захваченный элемент
     * @param {DOMElement} item
     */
    resetSelectedItem(item) {
        if (item) {
            removeClass(item, grabbedSelectedElementClasses.draggedItem);
            item.style.position = "";
            item = null;
        }
    }
}

export const grabbedSelectedElementClasses = {
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

export const grabbedSelectedDOMElements = {
    get cartGrid() {
        return document.querySelector(".cart-grid");
    },
    get productItems() {
        return document.querySelectorAll(".product-group-item");
    },
};

export default new ControlElements();
