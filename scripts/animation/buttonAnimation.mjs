import { DOMElements } from "../index.mjs";
import { addClass, removeClass } from "../utils/classList.mjs";

class ButtonAnimation {
    classes = {
        blick: "btn-blick",
        notBlick: "btn-not-blick",
        outsideBanner: "btn-outside-banner",
        insideBanner: "btn-inside-banner",
    };

    showBannerButton() {
        removeClass(DOMElements.bannerButton, this.classes.outsideBanner);
        addClass(DOMElements.bannerButton, this.classes.insideBanner);
        DOMElements.bannerButton.removeAttribute("aria-hidden");
    }
    bannerButtonBlick() {
        const delay = 500;
        let timerId = setInterval(() => {
            removeClass(DOMElements.bannerButton, this.classes.notBlick);
            addClass(DOMElements.bannerButton, this.classes.blick);
            setTimeout(() => {
                removeClass(DOMElements.bannerButton, this.classes.blick);
                addClass(DOMElements.bannerButton, this.classes.notBlick);
            }, delay);
        }, delay * 2);

        setTimeout(() => {
            clearInterval(timerId);
        }, 10000);
    }
    butonAnimations() {
        this.showBannerButton();
        this.bannerButtonBlick();
    }
}

export default new ButtonAnimation();
