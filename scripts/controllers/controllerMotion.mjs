// Отвечает за обработку события

import grabedTargetAnimation from "../animation/grabedTargetAnimation.mjs";
import controllerEvent from "./controllerEvent.mjs";

class ControllerMotion {
    shiftX = 0;
    shiftY = 0;
    previousX = [];

    rotate(event, item) {
        const previousX = this.previousX.shift();
        let currentX = event.clientX;
        if (previousX < currentX) {
            grabedTargetAnimation.rotateTargetToRight(item);
        }
        if (previousX > currentX) {
            grabedTargetAnimation.rotateTargetToLeft(item);
        }
    }
    getCoordinats(event, item) {
        if (event.clientX) {
            this.shiftX = event.clientX - item.clientWidth / 2;
            this.shiftY = event.clientY - item.clientHeight / 2;
        }
        if (event.touches) {
            const { clientX, clientY } = event.touches[0];
            this.shiftX = clientX - item.clientWidth / 2;
            this.shiftY = clientY - item.clientHeight / 2;
        }
    }
    moveAt(event, item) {
        this.getCoordinats(event, item);
        this.previousX.push(event.clientX);

        item.style.left = this.shiftX + "px";
        item.style.top = this.shiftY + "px";
    }
    setLimitBorder(event, item) {
        const clientX = event.clientX;
        const clientY = event.clientY;
        const borderArea = document.documentElement;
        if (clientX + item.clientWidth > borderArea.clientWidth) {
            controllerEvent.resetAll(); //right border
        } else if (clientX - item.clientWidth < borderArea.offsetLeft) {
            controllerEvent.resetAll(); //left border
        } else if (clientY - item.clientWidth / 2 < borderArea.offsetTop) {
            controllerEvent.resetAll(); //up border
        } else if (clientY + item.clientWidth / 2 > borderArea.clientHeight) {
            controllerEvent.resetAll(); // down border
        }
    }
}

export default new ControllerMotion();
