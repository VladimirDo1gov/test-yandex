let initialState = [];
function store(elem) {
    if (elem) {
        initialState.push(elem);
    }
    return initialState;
}

function storeCheck() {
    if (initialState.length > 2) {
        console.log("success");
    }
}

const productItem = document.querySelectorAll(".product-item");
const productGroup = document.querySelector(".product-group");
const cart = document.querySelector(".cart");

function getStartedCoordinats(event) {
    let clientX = event.clientX + window.scrollX;
    let clientY = event.clientY + window.scrollY;
    return { clientX, clientY };
}

// ----------------------

productGroup.addEventListener("mousedown", (event) => {
    const item = event.target.closest(".product-item");
    const { clientX, clientY } = getStartedCoordinats(event);

    item.classList.add("selected");
    item.style.left = event.pageX - clientX + "px";
    item.style.top = event.pageY - clientY + "px";

    console.log(
        `clientX: ${clientX} \n clientY: ${clientY} \n pageX: ${event.pageX} \n pageY: ${event.pageY}`
    );

    document.addEventListener("mousemove", (event) => {
        item.style.left = event.pageX - clientX + "px";
        item.style.top = event.pageY - clientY + "px";
    });

    productGroup.addEventListener(
        "mouseup",
        (event) => {
            insertToCart(item, event.clientX, event.clientY);

            item.classList.remove("selected");
        },
        { once: true }
    );

    item.ondragstart = function () {
        return false;
    };
});

// ----------------------

let currentDroppable = null;

function insertToCart(item, clientX, clientY) {
    item.hidden = true;
    let requiereElement = document.elementFromPoint(clientX, clientY).closest(".cart");
    item.hidden = false;
    if (requiereElement === cart) {
        store(item.id);
        storeCheck();
        console.log(2);
    }
}

function mouseMoveHandler(event) {}

// const getCart = () => {
//     const { left, top, right, bottom } = cart.getBoundingClientRect();
//     topScreen = top + window.scrollY;
//     bottomScreen = bottom + window.scrollY;
//     return { topScreen, bottomScreen };
// };

// function checkCart(clientX, clientY) {
//     const { topScreen, bottomScreen } = getCart();
//     if (clientY > topScreen && clientY < bottomScreen) {
//         console.log("hui");
//     }
// }

/*
bottom: 612
height: 0
left: 151.60000610351562
right: 151.60000610351562
top: 612
width: 0
x: 151.60000610351562
y: 612
*/

// document.addEventListener("click", (e) => {
//     console.log("globalX: ", e.clientX, "globalY: ", e.clientY);
// });

// console.log(
//     "left: ",
//     left + window.scrollX,
//     // "right: ",
//     // right + window.scrollX,
//     "top: ",
//     top + window.scrollY
//     // "bottom: ",
//     // bottom + window.scrollY
// );
