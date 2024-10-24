// import StoreService from "./Services/StoreService.mjs";
// import ProductService from "./Services/ProductService.mjs";
// import AnimationService from "./Services/AnimationService.mjs";

// const localStorage = {
//     isDragging: false,
//     item: null,
//     shiftX: 0,
//     shiftY: 0,
//     dropTarget: null,
//     addedProductArr: [],
//     draggetItemClass: "selected-touch",
// };

// const initialState = [];

// export const productElements = {
//     productGroup: document.querySelector(".product-group"),
//     cart: document.querySelector(".cart"),
//     banner: document.querySelector(".banner-section"),
// };

// export default function handlerDrag(event) {
//     const item = event.target.closest(".product-group-item");
//     const { clientX, clientY } = ProductService.getCoordinats(event);

//     item.classList.add("selected");
//     AnimationService.cartAddScale();
//     item.style.left = event.pageX - clientX + "px";
//     item.style.top = event.pageY - clientY + "px";

//     productElements.banner.addEventListener("mousemove", onMouseMove);

//     function moveAt(pageX, pageY) {
//         item.style.left = pageX - clientX + "px";
//         item.style.top = pageY - clientY + "px";
//     }

//     function onMouseMove(event) {
//         moveAt(event.pageX, event.pageY);
//     }

//     productElements.productGroup.addEventListener("mouseup", (event) => {
//         document.removeEventListener("mousemove", onMouseMove);
//         insertToCart(item, event);
//         item.classList.remove("selected");
//         AnimationService.cartRemoveScale();
//     });

//     item.ondragstart = function () {
//         return false;
//     };
// }

// function insertToCart(item, event) {
//     const { clientX, clientY } = ProductService.getCoordinats(event);
//     item.hidden = true;
//     let requiereElement = document.elementFromPoint(clientX, clientY).closest(".cart");
//     item.hidden = false;
//     if (requiereElement === productElements.cart) {
//         ProductService.fillRemoveItemPlace(item);
//         ProductService.addProductIntoCart(item);
//         StoreService.store(item.id, initialState);
//         StoreService.storeCheck(initialState);
//         if (StoreService.completed) {
//             productElements.productGroup.removeEventListener("mousedown", handlerDrag);
//             ProductService.removeClassesForProductItem();
//             ProductService.addClassesForProductItem();
//             ProductService.showBannerButton();
//         }
//     }
// }
