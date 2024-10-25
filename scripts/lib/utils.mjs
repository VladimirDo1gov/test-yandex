export const addClass = (item, className) => {
    if (!item.classList.contains(className)) {
        item.classList.add(className);
    }
};
export const removeClass = (item, className) => {
    if (item.classList.contains(className)) {
        item.classList.remove(className);
    }
};
