import { addClass, removeClass } from "../../lib/utils.mjs";

class ButtonEffects {
    /**
     * Анимация появления кнопки
     */
    showButton() {
        removeClass(banerButtonDOMElement.bannerButton, bannerButtonclasses.outsideBanner);
        addClass(banerButtonDOMElement.bannerButton, bannerButtonclasses.insideBanner);
        banerButtonDOMElement.bannerButton.removeAttribute("aria-hidden");
    }
    /**
     * Добавляет блик
     */
    onBlick() {
        removeClass(banerButtonDOMElement.bannerButton, bannerButtonclasses.notBlick);
        addClass(banerButtonDOMElement.bannerButton, bannerButtonclasses.blick);
    }
    /**
     * Удаляет блик
     */
    offBlick() {
        removeClass(banerButtonDOMElement.bannerButton, bannerButtonclasses.blick);
        addClass(banerButtonDOMElement.bannerButton, bannerButtonclasses.notBlick);
    }
    /**
     * Анимация моргания
     */
    buttonIsBlick() {
        const delay = 500;
        let timerId = setInterval(() => {
            this.onBlick();
            setTimeout(this.offBlick, delay);
        }, delay * 2);

        setTimeout(() => {
            clearInterval(timerId);
        }, 10000);
    }
    /**
     * Появления кнопки и активирование моргания
     */
    butonAnimated() {
        this.showButton();
        this.buttonIsBlick();
    }
}
export const bannerButtonclasses = {
    get blick() {
        return "btn-blick";
    },
    get notBlick() {
        return "btn-not-blick";
    },
    get outsideBanner() {
        return "btn-outside-banner";
    },
    get insideBanner() {
        return "btn-inside-banner";
    },
};

export const banerButtonDOMElement = {
    get bannerButton() {
        return document.querySelector("#banner-button");
    },
};

export default new ButtonEffects();
