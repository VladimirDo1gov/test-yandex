import { addClass, removeClass } from "../../lib/utils.mjs";

class ButtonEffects {
    showButton() {
        removeClass(banerButtonDOMElement.bannerButton, bannerButtonclasses.outsideBanner);
        addClass(banerButtonDOMElement.bannerButton, bannerButtonclasses.insideBanner);
        banerButtonDOMElement.bannerButton.removeAttribute("aria-hidden");
    }
    buttonIsBlick() {
        const delay = 500;
        let timerId = setInterval(() => {
            removeClass(banerButtonDOMElement.bannerButton, bannerButtonclasses.notBlick);
            addClass(banerButtonDOMElement.bannerButton, bannerButtonclasses.blick);
            setTimeout(() => {
                removeClass(banerButtonDOMElement.bannerButton, bannerButtonclasses.blick);
                addClass(banerButtonDOMElement.bannerButton, bannerButtonclasses.notBlick);
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
