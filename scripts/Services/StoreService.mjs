/* Следить за количеством предметов в корзине */
class StoreService {
    completed = false;

    store(elem, state) {
        state.push(elem);
        console.log(state);
        return state;
    }

    storeCheck(store) {
        if (store.length > 2) {
            const buttonSubmitPay = document.querySelector("#button-submit-pay");
            buttonSubmitPay.removeAttribute("hidden");
            this.completed = true;
        }
    }
}

export default new StoreService();
