// Отвечает за движение

import grabedTargetEffects from "../animation/grabedTargetEffects.mjs";
class ControllMotion {
    shiftX = 0;
    shiftY = 0;
    previousX = [];

    /**
     * Вызывает ротацию элемента при движении в соответствующую сторону
     * @param {MouseEvent} event
     * @param {DOMElement} item
     */
    rotate(event, item) {
        const previousX = this.previousX.shift();
        const currentX = event.clientX || event.touches[0].clientX;
        if (previousX < currentX) {
            grabedTargetEffects.rotateTargetToRight(item);
        }
        if (previousX > currentX) {
            grabedTargetEffects.rotateTargetToLeft(item);
        }
    }

    /**
     * Задает координаты смещения для элемента, полученные из координат курсора
     * @param {MouseEvent} event
     * @param {DOMElement} item
     */
    getCoordinats(event, item) {
        this.shiftX =
            event.clientX - item.clientWidth * 0.5 ||
            event.touches[0].clientX - item.clientWidth * 0.5;
        this.shiftY =
            event.clientY - item.clientHeight * 0.5 ||
            event.touches[0].clientY - item.clientHeight * 0.5;
    }

    /**
     * Устанавливает для элемента left и top стили, соответствующие координаты
     * @param {MouseEvent} event
     * @param {DOMElement} item
     */
    moveAt(event, item) {
        this.getCoordinats(event, item);
        this.previousX.push(event.clientX || event.touches[0].clientX);
        item.style.left = this.shiftX + "px";
        item.style.top = this.shiftY + "px";
    }

    /**
     * Принимает объект события и элемент. Получает координаты курсора и проверяет
     * не выходит ли элемент за их пределы.
     * @param {MouseEvent} event
     * @param {DOMElement} item
     * @returns {boolean} Возвращает true, если элемент выходит за границы документа
     */
    setLimitBorder(event, item) {
        const borderArea = document.documentElement;
        const leftBorder = event.clientX - item.clientWidth * 0.5 < borderArea.offsetLeft;
        const rightBorder = event.clientX + item.clientWidth * 0.5 > borderArea.clientWidth;
        const topBorder = event.clientY - item.clientWidth * 0.5 < borderArea.offsetTop;
        const bottomBorder = event.clientY + item.clientWidth * 0.5 > borderArea.clientHeight;
        if (leftBorder || rightBorder || topBorder || bottomBorder) return true;
    }

    /**
     * Возвращает самый глубоко вложенный элемент по заданному классу
     * для указанного переданного элемента
     * @param {string} dropTargetClass - Класс элемента, который должен быть целью для сброса. Значение принимает в формате querySelector
     * @param {DOMElement} target - Цель для сброса
     * @returns {DOMelement} dropTarget элемент
     */
    getDropTarget(target) {
        if (target) {
            const y = target.getBoundingClientRect().bottom;
            const x = this.shiftX;
            target.hidden = true;
            const dropTarget = document.elementFromPoint(x, y)?.closest(".cart-area");
            target.hidden = false;
            return dropTarget;
        }
    }

    /**
     * Запускает движение элемента и анимацию ротации
     * @param {MouseEvent} event - объект события
     * @param {DOMElement} item - схваченный элемент
     */
    mouseMove(event, item) {
        this.moveAt(event, item);
        this.rotate(event, item);
    }

    /**
     * Сбрасывает координаты переещаемого элемента и удаляет аниамцию ротации
     * @param {DOMElement} item - перемещаемый элемент
     */
    reset(item) {
        grabedTargetEffects.removeRotateTarget(item); //
        this.shiftX = 0;
        this.shiftY = 0;
        this.previousX = [];
    }
}

export default new ControllMotion();
