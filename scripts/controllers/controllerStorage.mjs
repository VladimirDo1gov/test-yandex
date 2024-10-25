/* Следить за количеством предметов в корзине */

import controllerEvent from "./controllerEvent.mjs";

class ControllerStorage {
    stateCart = [];

    addTargetToStore(elem) {
        this.stateCart.push(elem);
        console.log(this.stateCart);
    }
    checkStateCart() {
        if (this.stateCart.length > 2) {
            controllerEvent.finishEvent();
        }
    }
}

export default new ControllerStorage();
