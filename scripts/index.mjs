import handlerDrag, { productElements } from "./dragAndDrop.mjs";
import TouchEvents from "./TouchHandler.mjs";
// navigator.userAgent

productElements.productGroup.addEventListener("mousedown", handlerDrag);

productElements.productGroup.addEventListener("touchstart", TouchEvents.onTouchStart);
productElements.productGroup.addEventListener("touchmove", TouchEvents.onTouchMove);
productElements.productGroup.addEventListener("touchend", TouchEvents.onTouchEnd);
