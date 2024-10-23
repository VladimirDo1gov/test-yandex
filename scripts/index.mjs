import handlerDrag, { productElements } from "./dragAndDrop.mjs";
import { onTouchStart, onTouchMove, onTouchEnd } from "./TouchHandler.mjs";
// navigator.userAgent

productElements.productGroup.addEventListener("mousedown", handlerDrag);

productElements.productGroup.addEventListener("touchstart", onTouchStart);
productElements.productGroup.addEventListener("touchmove", onTouchMove);
productElements.productGroup.addEventListener("touchend", onTouchEnd);
