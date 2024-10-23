import StoreService from "./Services/StoreService.mjs";
import ProductService from "./Services/ProductService.mjs";

let initialState = [];

const productGroup = document.querySelector(".product-group");
const cart = document.querySelector(".cart");

function handlerDrag(event) {
    const item = event.target.closest(".product-item");
    const { clientX, clientY } = ProductService.getCoordinats(event);

    item.classList.add("selected");
    item.style.left = event.pageX - clientX + "px";
    item.style.top = event.pageY - clientY + "px";

    document.addEventListener("mousemove", onMouseMove);

    function moveAt(pageX, pageY) {
        item.style.left = pageX - clientX + "px";
        item.style.top = pageY - clientY + "px";
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    productGroup.addEventListener("mouseup", (event) => {
        document.removeEventListener("mousemove", onMouseMove);
        insertToCart(item, event);
        item.classList.remove("selected");
    });

    item.ondragstart = function () {
        return false;
    };
}

productGroup.addEventListener("mousedown", handlerDrag);

function insertToCart(item, event) {
    const { clientX, clientY } = ProductService.getCoordinats(event);
    item.hidden = true;
    let requiereElement = document.elementFromPoint(clientX, clientY).closest(".cart");
    item.hidden = false;
    if (requiereElement === cart) {
        ProductService.addProductIntoCart(item);
        StoreService.store(item.id, initialState);
        StoreService.storeCheck(initialState);
        if (StoreService.completed) {
            productGroup.removeEventListener("mousedown", handlerDrag);
            ProductService.removeClassesForProductItem();
        }
    }
}
