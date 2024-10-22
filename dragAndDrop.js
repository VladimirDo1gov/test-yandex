const productGroup = document.querySelector(".product-group");
let currentDroppable = null;

productGroup.onmousedown = (event) => {
    const item = event.target.closest(".product-item");
    let shiftX = event.clientX;
    let shiftY = event.clientY;

    item.style.position = "relative";
    item.style.zIndex = 1000;

    moveAt(event.pageX, event.pageY);

    function moveAt(pageX, pageY) {
        item.style.left = pageX - shiftX + "px";
        item.style.top = pageY - shiftY + "px";
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);

        item.hidden = true;
        let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
        item.hidden = false;
        if (!elemBelow) return;
        let droppableBelow = elemBelow.closest(".droppable");
        if (currentDroppable != droppableBelow) {
            if (currentDroppable) {
                leaveDroppable(currentDroppable);
            }
            currentDroppable = droppableBelow;
            if (currentDroppable) {
                console.log(1);
            }
        }
    }

    document.addEventListener("mousemove", onMouseMove);

    item.onmouseup = function () {
        document.removeEventListener("mousemove", onMouseMove);
        item.onmouseup = null;
    };
    item.ondragstart = function () {
        return false;
    };
};

function getCoordinats(e) {
    let shiftX = e.clientX;
    let shiftY = e.clientY;
    return { shiftX, shiftY };
}

function drop(event) {
    document.removeEventListener("mousemove", onMouseMove);
    event.target.onmouseup = null;
}
