class ProductService {
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
        const cartGrid = document.querySelector(".cart-grid");
        item.className = "product-into-cart";
        cartGrid.append(item);
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

    showBannerButton() {
        const buttonSubmitPay = document.querySelector("#button-submit-pay");
        buttonSubmitPay.classList.add("btn-outside-banner");
        buttonSubmitPay.classList.add("btn-inside-banner");
    }
}

export default new ProductService();
