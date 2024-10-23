class ProductService {
    getCoordinats(event) {
        const clientX = event.clientX + window.scrollX;
        const clientY = event.clientY + window.scrollY;
        return { clientX, clientY };
    }
    addProductIntoCart(item) {
        const parent = item.closest(".product-level");
        const cart = document.querySelector(".cart-grid");

        // Выделить в отдельный метод
        const itemStyle = getComputedStyle(item);
        const div = document.createElement("div");
        div.style.width = itemStyle.width;
        div.style.height = itemStyle.height;
        // div.style.background = "red";
        console.log(itemStyle.width);

        if (parent) {
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
        //
        item.id += "-added";
        item.className = "product-into-cart";
        cart.append(item);
    }
    addClassesForProductItem() {
        const productItems = document.querySelectorAll(".product-item");
        for (let item of productItems) {
            item.classList.add("opacity");
        }
    }
    removeClassesForProductItem() {
        const productItems = document.querySelectorAll(".product-item");
        for (let item of productItems) {
            item.classList.remove("grab");
            item.classList.remove("can-choose");
        }
    }
}

export default new ProductService();
