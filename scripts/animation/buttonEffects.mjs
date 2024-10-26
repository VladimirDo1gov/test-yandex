import { addClass, removeClass } from "../utils/classList.mjs";

class ButtonEffects {
    showButton() {
        removeClass(elements.bannerButton, classes.outsideBanner);
        addClass(elements.bannerButton, classes.insideBanner);
        elements.bannerButton.removeAttribute("aria-hidden");
    }
    buttonIsBlick() {
        const delay = 500;
        let timerId = setInterval(() => {
            removeClass(elements.bannerButton, classes.notBlick);
            addClass(elements.bannerButton, classes.blick);
            setTimeout(() => {
                removeClass(elements.bannerButton, classes.blick);
                addClass(elements.bannerButton, classes.notBlick);
            }, delay);
        }, delay * 2);

        setTimeout(() => {
            clearInterval(timerId);
        }, 10000);
    }
    butonAnimated() {
        this.showButton();
        this.buttonIsBlick();
    }
}
const classes = {
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

const elements = {
    get bannerButton() {
        return document.querySelector("#banner-button");
    },
};

export default new ButtonEffects();
