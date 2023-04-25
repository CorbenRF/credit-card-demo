import 'babel-polyfill';

import {} from 'imask'
import buildDOM from './modules/dom.js'
import './css/styles.scss'

buildDOM();

var valid = require("card-validator");
var ccNumber = document.getElementById('cc-number');
var ccExp = document.getElementById('cc-exp');
var ccCVV = document.getElementById('cc-cvv');
let emailInput = document.getElementById('emailInput');
const submitBtn = document.getElementById('submit-btn')
const cardContainer = document.querySelector('.card-container')
let ccNumberFlag = false;
let ccExpFlag = false;
let ccCVVFlag = false;
let ccEmailFlag = false;

var ccNumberMask = {
  mask: '0000 0000 0000 0000 00',
};
var ccExpMask = {
    mask: 'MM/YY',
blocks: {
    MM: {
        mask: IMask.MaskedRange,
        from: 1,
        to: 12,
        maxLength: 2,
        lazy: false,
      },
    YY: {
      mask: IMask.MaskedRange,
      from: 0,
      to: 35,
      maxLength: 2,
      lazy: false,
    },
}
  };
var ccCVVMask = {
    mask: '000'
  };
var maskNumber = new IMask(ccNumber, ccNumberMask);
var maskExp = new IMask(ccExp, ccExpMask);
var maskCVV = new IMask(ccCVV, ccCVVMask);

ccNumber.addEventListener('blur', (e)=> {
    const checkmark = document.querySelector('.card-valid');
    const cardType = document.querySelector('.card-type');
    var numberValidation = valid.number(e.target.value);
    cardContainer.classList.remove('error');
    cardType.classList.remove('mastercard', 'visa', 'amex', 'discover')
    checkmark.classList.remove('active');
    ccNumberFlag = false;

    if (!numberValidation.isPotentiallyValid) {
        console.log('not valid card number')
        cardContainer.classList.add('error')
    }
    if(numberValidation.isValid) {
        cardType.classList.add(`${numberValidation.card.type}`)
        checkmark.classList.add('active');
        ccNumberFlag = true;
    } else {
        cardContainer.classList.add('error')
    }
    btnRelease()
})

ccExp.addEventListener('blur', (e)=> {
    let expiryValidation = valid.expirationDate(e.target.value);
    ccExp.classList.remove('error');
    ccExpFlag = false;

    if (!expiryValidation.isPotentiallyValid) {
        console.log('not potentially valid exp date')
        ccExp.classList.add('error');
    }

    if(expiryValidation.isValid) {
        console.log('exp date is valid')
        ccExp.classList.remove('error');
        ccExpFlag = true;
    } else {
        console.log('exp date is invalid')
        ccExp.classList.add('error');
    }
    btnRelease()
})

ccCVV.addEventListener('blur', (e)=> {
    let cvvValidation = valid.cvv(e.target.value);
    ccCVV.classList.remove('error');
    ccCVVFlag = false;

    if(cvvValidation.isValid) {
        console.log('cvv is valid')
        ccCVV.classList.remove('error');
        ccCVVFlag = true;
    } else {
        console.log('cvv is invalid')
        ccCVV.classList.add('error');
    }
    btnRelease()
})

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

emailInput.addEventListener('blur', (e)=> {
    emailInput.classList.remove('error')
    ccEmailFlag = false;

    if(!validateEmail(e.target.value)){
        console.log(validateEmail(e.target.value))
        console.log(e.target.value)
        emailInput.classList.add('error')
    } else {emailInput.classList.remove('error'); ccEmailFlag = true;}
    btnRelease()
})

function btnRelease() {
    if(ccNumberFlag && ccCVVFlag && ccExpFlag && ccEmailFlag){
        submitBtn.removeAttribute('disabled')
    }
    else submitBtn.setAttribute('disabled', 'disabled')
}

for(let item of document.querySelectorAll('input')) {
    item.addEventListener('input', (e)=> {
        item.classList.remove('error')
    })
}
