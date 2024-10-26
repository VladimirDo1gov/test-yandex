/* Следить за количеством предметов в корзине */
class Storage {
    stateCart = [];

    /**
     * Сохраняет элемент во внутренним массиве
     * @param {string} elem
     */
    addTargetToStore(elem) {
        this.stateCart.push(elem);
        console.log(this.stateCart);
    }
    /**
     * Проверяет, больше ли переданное число, чем длина внутреннего массива
     * @param {number} num
     * @returns {boolean} возвращает true если num > длины внутреннего массива
     */
    checkStateisFull(num) {
        if (this.stateCart.length > num) return true;
    }
}

export default new Storage();
