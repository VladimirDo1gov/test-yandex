import { addClass, removeClass } from "../../lib/utils.mjs";

class GrabedTargetEffects {
    rotateTargetToRight(item) {
        addClass(item, grabbedRotateElementclasses.rotateToRight);
        removeClass(item, grabbedRotateElementclasses.rotateToLeft);
    }
    rotateTargetToLeft(item) {
        addClass(item, grabbedRotateElementclasses.rotateToLeft);
        removeClass(item, grabbedRotateElementclasses.rotateToRight);
    }
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
