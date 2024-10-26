// Отвечает за обработку события

import grabedTargetEffects from "../animation/grabedTargetEffects.mjs";
import controllEvent from "./controllEvent.mjs";

class ControllMotion {
    shiftX = 0;
    shiftY = 0;
    previousX = [];

    rotate(event, item) {
        const previousX = this.previousX.shift();
        let currentX = event.clientX;
        if (previousX < currentX) {
            grabedTargetEffects.rotateTargetToRight(item);
        }
        if (previousX > currentX) {
            grabedTargetEffects.rotateTargetToLeft(item);
        }
    }
    getCoordinats(event, item) {
        if (event.clientX) {
            this.shiftX = event.clientX - item.clientWidth * 0.5;
            this.shiftY = event.clientY - item.clientHeight * 0.5;
        }
        if (event.touches) {
            const { clientX, clientY } = event.touches[0];
            this.shiftX = clientX - item.clientWidth * 0.5;
            this.shiftY = clientY - item.clientHeight * 0.5;
        }
    }
    moveAt(event, item) {
        this.getCoordinats(event, item);
        this.previousX.push(event.clientX);

        item.style.left = this.shiftX + "px";
        item.style.top = this.shiftY + "px";
    }
    setLimitBorder(event, item) {
        const borderArea = document.documentElement;
        const leftBorder = event.clientX - item.clientWidth * 0.5 < borderArea.offsetLeft;
        const rightBorder = event.clientX + item.clientWidth * 0.5 > borderArea.clientWidth;
        const topBorder = event.clientY - item.clientWidth * 0.5 < borderArea.offsetTop;
        const bottomBorder = event.clientY + item.clientWidth * 0.5 > borderArea.clientHeight;

        if (leftBorder || rightBorder || topBorder || bottomBorder) {
            controllEvent.resetAll();
        }
    }
    mouseMove(event, item) {
        this.moveAt(event, item);
        this.rotate(event, item);
        this.setLimitBorder(event, item);
    }

    reset() {
        this.shiftX = 0;
        this.shiftY = 0;
        this.previousX = [];
    }
}

export default new ControllMotion();
