/* Следить за количеством предметов в корзине */
class StoreService {
    state = [];

    addTargetToStore(elem, state) {
        state.push(elem);
        console.log(state);
        return state;
    }

    storeCheck(store) {
        if (store.length > 2) {
            return true;
        }
        return false;
    }
}

export default new StoreService();
