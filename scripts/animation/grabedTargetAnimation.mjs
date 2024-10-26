import { addClass, removeClass } from "../utils/classList.mjs";

class GrabedTargetAnimation {
    classes = {
        rotateToRight: "rotate-to-right",
        rotateToLeft: "rotate-to-left",
    };
    rotateTargetToRight(item) {
        addClass(item, this.classes.rotateToRight);
        removeClass(item, this.classes.rotateToLeft);
    }
    rotateTargetToLeft(item) {
        addClass(item, this.classes.rotateToLeft);
        removeClass(item, this.classes.rotateToRight);
    }
    removeRotateTarget(item) {
        removeClass(item, this.classes.rotateToLeft);
        removeClass(item, this.classes.rotateToRight);
    }
}

export default new GrabedTargetAnimation();
