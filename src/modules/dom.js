import { el, mount, setChildren } from "redom";

export default function buildDOM() {
    const pageTitle = el("#title");
    const pageWrapper = el(".card-bounding"); // everything below this goes into this wrapper

    const titleCCN = el("aside");
    titleCCN.textContent = `Card Number:`;

    const ccContainer = el(".card-container") // wrapper

    const ccType = el(".card-type") // empty div for card pic
    const ccnInput = el("input#cc-number");
    ccnInput.setAttribute('placeholder', '0000 0000 0000 0000');
    ccnInput.setAttribute('type', 'text');
    const checkmark = el(".card-valid");
    checkmark.innerHTML = '&#10003;';

    setChildren(ccContainer, [ccType, ccnInput, checkmark]);

    const cardDetails = el(".card-details.clearfix");

    const expiration = el(".expiration");
    const cvv = el(".cvv");
    const email = el(".email");

    setChildren(expiration, [el("aside", {textContent: 'Expiration Date'}), el("input#cc-exp", {placeholder: 'MM/YY'})]);
    setChildren(cvv, [el("aside", {textContent: 'CVV'}), el("input#cc-cvv", {placeholder: 'XXX'})]);
    setChildren(email, [el("aside", {textContent: 'Enter e-mail address to get receipt'}), el("input#emailInput", {placeholder: 'example@mail.com'})]);

    setChildren(cardDetails, [expiration, cvv, email]);

    const btnContainer = el(".button-container");
    setChildren(btnContainer, el("button#submit-btn", {disabled: 'disabled', textContent: 'Оплатить'}));

    setChildren(pageWrapper, [titleCCN, ccContainer, cardDetails, btnContainer]);
    setChildren(window.document.body, [pageTitle, pageWrapper])
}