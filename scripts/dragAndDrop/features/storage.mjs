/* Следить за количеством предметов в корзине */

import controllEvent from "../eventHandlers/controllEvent.mjs";

class Storage {
    stateCart = [];

    addTargetToStore(elem) {
        this.stateCart.push(elem);
        console.log(this.stateCart);
    }
    checkStateCart() {
        if (this.stateCart.length > 2) {
            controllEvent.finishEvent();
        }
    }
}

export default new Storage();
