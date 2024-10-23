class StoreService {
    completed = false;
    getStartedCoordinats(event) {
        const clientX = event.clientX + window.scrollX;
        const clientY = event.clientY + window.scrollY;
        return { clientX, clientY };
    }

    store(elem, state) {
        state.push(elem);
        console.log(state);
        return state;
    }

    storeCheck(store) {
        if (store.length > 2) {
            const buttonSubmitPay = document.querySelector("#button-submit-pay");
            buttonSubmitPay.removeAttribute("hidden");
            const message = document.querySelector(".message-abiut-cart-full");
            message.removeAttribute("hidden");
            this.completed = true;
        }
    }
}

export default new StoreService();
