/**
 * Добавляет указанный класс к указанному элементу
 * @param {string} item - DOM элемент
 * @param {string} className - название класса
 */
export const addClass = (item, className) => {
    if (!item.classList.contains(className)) {
        item.classList.add(className);
    }
};

/**
 * Удаляет указанный класс из указанного элемента
 * @param {string} item - DOM элемент
 * @param {string} className - название класса
 */
export const removeClass = (item, className) => {
    if (item.classList.contains(className)) {
        item.classList.remove(className);
    }
};
