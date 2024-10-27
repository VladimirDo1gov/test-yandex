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

/**
 *Возврщает координаты ".cart-area"
 * @param {DOMElement} - элемент, чьи координаты нужно получить
 * @returns {{ topBorder: number, bottomBorder: number, leftBorder: number, rightBorder: number }}
 */
export const getElementPosition = (item) => {
    const { top, bottom, left, right } = item.getBoundingClientRect();
    const topBorder = Math.trunc(top + window.scrollY);
    const bottomBorder = Math.trunc(bottom + window.scrollY);
    const leftBorder = Math.trunc(left);
    const rightBorder = Math.trunc(right);
    return { topBorder, bottomBorder, leftBorder, rightBorder };
};

/**
 * Возвращает координаты, как для событий мыши, так и для события тача
 * @param {MouseEvent} event
 * @returns {{clientX: number, clientY: number}}
 */
export const getClientCoordinats = (event) => {
    const clientX = event.clientX || event.touches[0].clientX;
    const clientY = event.clientY || event.touches[0].clientY;
    return { clientX, clientY };
};
