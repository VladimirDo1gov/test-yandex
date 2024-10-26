import { addClass, removeClass } from "../../lib/utils.mjs";

class GrabedTargetEffects {
    /**
     * Вешает на элемент класс поворота вправо: "rotate-to-right"
     * @param {DOMElement} item - захваченный элемент
     */
    rotateTargetToRight(item) {
        addClass(item, grabbedRotateElementclasses.rotateToRight);
        removeClass(item, grabbedRotateElementclasses.rotateToLeft);
    }
    /**
     * Вешает на элемент класс поворота влево: "rotate-to-left"
     * @param {DOMElement} item - захваченный элемент
     */
    rotateTargetToLeft(item) {
        addClass(item, grabbedRotateElementclasses.rotateToLeft);
        removeClass(item, grabbedRotateElementclasses.rotateToRight);
    }
    /**
     * Удаляет у элемента все классы, связанные с ротацией
     * @param {DOMElement} item - захваченный элемент
     */
    removeRotateTarget(item) {
        removeClass(item, grabbedRotateElementclasses.rotateToLeft);
        removeClass(item, grabbedRotateElementclasses.rotateToRight);
    }
}

export const grabbedRotateElementclasses = {
    get rotateToRight() {
        return "rotate-to-right";
    },
    get rotateToLeft() {
        return "rotate-to-left";
    },
};

export default new GrabedTargetEffects();
