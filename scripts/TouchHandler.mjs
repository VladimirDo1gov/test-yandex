import AnimationService from "./Services/AnimationService.mjs";
const banner = document.querySelector(".banner-section");

let isDragging = false;
let item = null;
let shiftX = 0;
let shiftY = 0;
let dropTargetId = null;

export function onTouchStart(event) {
    event.preventDefault();
    if (event.target.closest(".product-group-item")) {
        isDragging = true;
        item = event.target.closest(".product-group-item");
        AnimationService.cartAddScale();
    }
}

export function onTouchMove(event) {
    if (isDragging && item) {
        item.classList.add("selected-touch");

        const { pageX, pageY, clientX, clientY, screenX, screenY } = event.touches[0];
        shiftX = clientX;
        shiftY = clientY;

        // console.log(shiftX, shiftY);
        console.log(event.touches);
        console.log(event.clientX);

        item.style.height = item.clientHeight;
        item.style.width = item.clientWidth;
        item.style.position = "fixed"; // Если удалить, предметы будут возвращаться на места
        item.style.left = shiftX + "px";
        item.style.top = shiftY + "px";
        console.log(shiftX, shiftY);
        console.log(item);
    }
}

export function onTouchEnd(event) {
    if (isDragging) {
        isDragging = false;
        item.classList.remove("selected-touch");
        item.style.left = "";
        item.style.top = "";
        item.style.height = "";
        item.style.width = "";
        item.style.position = "";
        item = null;
        shiftX = 0;
        shiftY = 0;
    }
}

function atMove() {}
