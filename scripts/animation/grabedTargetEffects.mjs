import { addClass, removeClass } from "../utils/classList.mjs";

class GrabedTargetEffects {
    rotateTargetToRight(item) {
        addClass(item, classes.rotateToRight);
        removeClass(item, classes.rotateToLeft);
    }
    rotateTargetToLeft(item) {
        addClass(item, classes.rotateToLeft);
        removeClass(item, classes.rotateToRight);
    }
    removeRotateTarget(item) {
        removeClass(item, classes.rotateToLeft);
        removeClass(item, classes.rotateToRight);
    }
}

const classes = {
    get rotateToRight() {
        return "rotate-to-right";
    },
    get rotateToLeft() {
        return "rotate-to-left";
    },
};

export default new GrabedTargetEffects();
