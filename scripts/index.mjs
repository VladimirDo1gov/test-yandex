import handlerDrag, { productElements } from "./dragAndDrop.mjs";
import ProductService from "./Services/ProductService.mjs";
import StoreService from "./Services/StoreService.mjs";
import AnimationService from "./Services/AnimationService.mjs";

productElements.productGroup.addEventListener("mousedown", handlerDrag);
productElements.productGroup.addEventListener("touchstart", onTouch);

function onTouch(event) {
    event.preventDefault();
    const item = event.target.closest(".product-group-item");
    const { clientX, clientY } = ProductService.getCoordinats(event);

    item.classList.add("selected");
    AnimationService.cartAddScale();
    item.style.left = event.pageX - clientX + "px";
    item.style.top = event.pageY - clientY + "px";

    document.addEventListener("touchmove", onMouseMove);

    function moveAt(pageX, pageY) {
        item.style.left = pageX - clientX + "px";
        item.style.top = pageY - clientY + "px";
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    productElements.productGroup.addEventListener("touchend", (event) => {
        document.removeEventListener("mousemove", onMouseMove);
        insertToCart(item, event);
        item.classList.remove("selected");
        AnimationService.cartRemoveScale();
    });

    item.ondragstart = function () {
        return false;
    };
}

function insertToCart(item, event) {
    const { clientX, clientY } = ProductService.getCoordinats(event);
    item.hidden = true;
    let requiereElement = document.elementFromPoint(clientX, clientY).closest(".cart");
    item.hidden = false;
    if (requiereElement === productElements.cart) {
        ProductService.fillRemoveItemPlace(item);
        ProductService.addProductIntoCart(item);
        StoreService.store(item.id, initialState);
        StoreService.storeCheck(initialState);
        if (StoreService.completed) {
            productElements.productGroup.removeEventListener("touchstart", onTouch);
            ProductService.removeClassesForProductItem();
            ProductService.addClassesForProductItem();
            ProductService.showBannerButton();
        }
    }
}
