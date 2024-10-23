class ProductService {
    getCoordinats(event) {
        const clientX = event.clientX + window.scrollX;
        const clientY = event.clientY + window.scrollY;
        return { clientX, clientY };
    }

    createPlaceholder(item) {
        const itemStyle = getComputedStyle(item);
        const div = document.createElement("div");
        div.style.width = itemStyle.width;
        div.style.height = itemStyle.height;
        return div;
    }

    fillRemoveItemPlace(item) {
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
            item.remove();
        }
    }

    addProductIntoCart(item) {
        const cart = document.querySelector(".cart-grid");
        item.id += "-added";
        item.className = "product-into-cart";
        cart.append(item);
    }

    addClassesForProductItem() {
        const productItems = document.querySelectorAll(".product-group-item");
        for (let item of productItems) {
            item.classList.add("opacity");
        }
    }

    removeClassesForProductItem() {
        const productItems = document.querySelectorAll(".product-group-item");
        for (let item of productItems) {
            item.classList.remove("grab");
            item.classList.remove("can-choose");
        }
    }
}

export default new ProductService();
