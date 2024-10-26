/* Следить за количеством предметов в корзине */
class Storage {
    stateCart = [];

    addTargetToStore(elem) {
        this.stateCart.push(elem);
        console.log(this.stateCart);
    }
    checkStateisFull(num) {
        if (this.stateCart.length > num) return true;
    }
}

export default new Storage();
