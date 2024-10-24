// import StoreService from "./Services/StoreService.mjs";
// import ProductService from "./Services/ProductService.mjs";
// import AnimationService from "./Services/AnimationService.mjs";
// import EventService from "./Services/EventService.mjs";

// const localStorage = {
//     isDragging: false,
//     item: null,
//     shiftX: 0,
//     shiftY: 0,
//     dropTarget: null,
//     addedProductArr: [],
//     draggetItemClass: "selected",
// };

// export const productElements = {
//     productGroup: document.querySelector(".product-group"),
//     cart: document.querySelector(".cart"),
//     banner: document.querySelector(".banner-section"),
// };

// export default function onMouseDown(event) {
//     if (event.target.closest(".product-group-item")) {
//         localStorage.isDragging = true;
//         localStorage.item = event.target.closest(".product-group-item");
//         AnimationService.cartAddScale();
//         onMouseMove(event);
//         productElements.banner.addEventListener("mousemove", onMouseMove);
//         productElements.productGroup.addEventListener("mouseup", onMouseUp);

//         localStorage.item.ondragstart = () => {
//             return false;
//         };
//     }
// }

// function onMouseMove(event) {
//     if (localStorage.isDragging && localStorage.item) {
//         atMove(event);
//         addSelectedClass();
//     }
// }

// function onMouseUp() {
//     if (localStorage.isDragging) {
//         document.removeEventListener("mousemove", onMouseMove);
//         drop();
//         checkState();
//         reset();
//     }
// }

// function addSelectedClass() {
//     if (!localStorage.item.classList.contains(localStorage.draggetItemClass)) {
//         localStorage.item.classList.add(localStorage.draggetItemClass);
//     }
// }
// function resetItem() {
//     if (localStorage.item) {
//         localStorage.item.classList.remove(localStorage.draggetItemClass);
//         localStorage.item.style.position = "";
//         localStorage.item = null;
//     }
// }

// function atMove(event) {
//     localStorage.shiftX = event.clientX + window.scrollX;
//     localStorage.shiftY = event.clientY + window.scrollY;

//     localStorage.item.style.position = "fixed";
//     localStorage.item.style.left = localStorage.shiftX + "px";
//     localStorage.item.style.top = localStorage.shiftY + "px";
// }

// function reset() {
//     localStorage.isDragging = false;
//     resetItem();
//     localStorage.shiftX = 0;
//     localStorage.shiftY = 0;
// }

// function drop() {
//     localStorage.item.hidden = true;
//     localStorage.dropTarget = document
//         .elementFromPoint(localStorage.shiftX, localStorage.shiftY)
//         .closest(".cart");
//     localStorage.item.hidden = false;
//     AnimationService.cartRemoveScale();
//     if (localStorage.dropTarget) {
//         ProductService.addProductIntoCart(localStorage.item);
//         StoreService.store(localStorage.item.id, localStorage.addedProductArr);
//     }
// }

// function checkState() {
//     StoreService.storeCheck(localStorage.addedProductArr);
//     if (StoreService.completed) {
//         productElements.productGroup.removeEventListener("mousedown", onMouseDown);
//         ProductService.removeClassesForProductItem();
//         productArrIsFull();
//         reset();
//     }
// }

// function productArrIsFull() {
//     ProductService.showBannerButton();
//     ProductService.addClassesForProductItem();
// }
