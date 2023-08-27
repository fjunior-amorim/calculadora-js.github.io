import Calculadora from "./class/Calculadora.js";

const buttons = document.querySelectorAll("#bts button");
const previous = document.querySelector(".previous");
const current = document.querySelector(".current");

const clc = new Calculadora(previous, current);

const handleClick = (buttons) => {
    buttons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const value = e.target.innerText;

            if(+value >= 0 || value === "."){
                clc.addDigito(value);
            }else {
                clc.processarOperacao(value);
            }
        })
    })  
};

handleClick(buttons);