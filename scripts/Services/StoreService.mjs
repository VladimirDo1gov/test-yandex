/* Следить за количеством предметов в корзине */
class StoreService {
    isFulled = false;

    addTargetToStore(elem, state) {
        state.push(elem);
        console.log(state);
        return state;
    }

    storeCheck(store) {
        if (store.length > 2) {
            const buttonSubmitPay = document.querySelector("#button-submit-pay");
            buttonSubmitPay.removeAttribute("hidden");
            this.isFulled = true;
        }
    }
}

export default new StoreService();
