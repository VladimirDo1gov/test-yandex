const productItem = document.querySelectorAll(".product-item");

for (let item of productItem) {
    item.onmousedown = function (event) {
        let shiftX = event.clientX - item.getBoundingClientRect().left;
        let shiftY = event.clientY - item.getBoundingClientRect().top;
        // (1) отследить нажатие

        // (2) подготовить к перемещению:
        // разместить поверх остального содержимого и в абсолютных координатах
        item.style.position = "absolute";
        item.style.zIndex = 1000;
        // переместим в body, чтобы мяч был точно не внутри position:relative
        document.body.append(item);
        // и установим абсолютно спозиционированный мяч под курсор

        moveAt(event.pageX, event.pageY);

        // передвинуть мяч под координаты курсора
        // и сдвинуть на половину ширины/высоты для центрирования
        function moveAt(pageX, pageY) {
            item.style.left = pageX - shiftX + "px";
            item.style.top = pageY - shiftY + "px";
        }

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }

        // (3) перемещать по экрану
        document.addEventListener("mousemove", onMouseMove);

        // (4) положить мяч, удалить более ненужные обработчики событий
        item.onmouseup = function () {
            document.removeEventListener("mousemove", onMouseMove);
            item.onmouseup = null;
        };
    };

    item.ondragstart = function () {
        return false;
    };
}
