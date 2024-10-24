import onMouseDown, { productElements } from "./dragAndDropNewNew.mjs";
import TouchEvents from "./TouchHandlerNew.mjs";
// navigator.userAgent

productElements.productGroup.addEventListener("mousedown", onMouseDown);

productElements.productGroup.addEventListener("touchstart", TouchEvents.onTouchStart);
productElements.productGroup.addEventListener("touchmove", TouchEvents.onTouchMove);
productElements.productGroup.addEventListener("touchend", TouchEvents.onTouchEnd);
