// Отвечает за движение

import { getClientCoordinats } from "../../lib/utils.mjs";
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
        const currentX = getClientCoordinats(event).clientX;
        if (previousX < currentX) {
            grabedTargetEffects.rotateTargetToRight(item);
        }
        if (previousX > currentX) {
            grabedTargetEffects.rotateTargetToLeft(item);
        }
    }

    /**
     * Устанавливает для элемента left и top стили, соответствующие координаты
     * @param {MouseEvent} event
     * @param {DOMElement} item
     */
    moveAt(event, item) {
        this.shiftX = getClientCoordinats(event).clientX - item.clientWidth * 0.5;
        this.shiftY = getClientCoordinats(event).clientY - item.clientHeight * 0.5;
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
        const { offsetLeft, offsetWidth, offsetTop, offsetHeight } = document.documentElement;
        const clientX = getClientCoordinats(event).clientX;
        const clientY = getClientCoordinats(event).clientY;
        const leftBorder = clientX - item.clientWidth * 0.5 < offsetLeft;
        const rightBorder = clientX + item.clientWidth * 0.5 > offsetWidth;
        const topBorder = clientY - item.clientHeight * 0.5 < offsetTop;
        const bottomBorder = clientY + item.clientHeight * 0.5 > offsetHeight;
        if (leftBorder || rightBorder || topBorder || bottomBorder) return true;
    }

    /**
     * Возвращает самый глубоко вложенный элемент по заданному классу
     * для указанного переданного элемента
     * @param {string} dropTargetClass - Класс элемента, который должен быть целью для сброса. Значение принимает в формате querySelector
     * @param {DOMElement} target - Цель для сброса
     * @returns {DOMelement} dropTarget элемент
     */
    getDropTarget(item) {
        if (item) {
            const y = item.getBoundingClientRect().bottom;
            const x = this.shiftX;
            item.hidden = true;
            const dropTarget = document.elementFromPoint(x, y)?.closest(".cart-area");
            item.hidden = false;
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
