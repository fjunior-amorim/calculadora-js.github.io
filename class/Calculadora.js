export default class Calculadora {

    constructor(previousText, current){
       this.previousOpertionText = previousText;
       this.currenOperationText = current;
       this.CurrentOperation = "";
       this.dateOperation = "";
       this.historico = [];
    }

    addDigito(digit) {
        if(digit && this.previousOpertionText.innerText === ""){
            const d = new Date();
            const data = `${d.getHours()}:${d.getMinutes()} - ${d.getUTCDate()}/0${d.getMonth() + 1}/${d.getFullYear()}`;
            this.dateOperation = data;
            console.log(this.dateOperation);
        }

        if(digit === "." && this.currenOperationText.innerText.includes(".")){
            return;
        }

        this.CurrentOperation = digit;
        this.atualizarVisor();
    }


    processarOperacao(operation){
        if(this.currenOperationText.innerText === "" && operation !== "C"){
            if(this.previousOpertionText.innerText !== ""){
                this.mudarOperacao(operation);
            }
            return;
        }
       let operationValue;
       const previous = +this.previousOpertionText.innerText.split(" ")[0];
       const current = +this.currenOperationText.innerText;

        switch (operation) {
            case "+":
                operationValue = previous + current;
                this.atualizarVisor(operationValue, operation, current, previous);
                break;

            case "-":
                operationValue = previous - current;
                this.atualizarVisor(operationValue, operation, current, previous);
                break;

            case "÷":
                operationValue = previous / current;
                this.atualizarVisor(operationValue, operation, current, previous);
                break;

            case "x":
                operationValue = previous * current;
                this.atualizarVisor(operationValue, operation, current, previous);
                break;

            case "=":
                const firtValue = this.previousOpertionText.innerText
                this.operacaoIqual();
                const resultato = {
                    data: this.dateOperation,
                    res: `${firtValue} ${current} ${operation} ${this.previousOpertionText.innerText.slice(0, -1)}`
                }
                this.historico.push(resultato);
                this.verificarHistorico();
                break;
            case "%":
                operationValue = previous * current /100;
                this.atualizarVisor(operationValue, operation, current, previous);
                break;
            case "AC":
                this.deletarOperacao();
                break;
            case "C":
                this.limparOperacao();
                break;
            default:
                return;
        }

    }
    
    operacaoIqual() {
        const operation = this.previousOpertionText.innerText.split(" ")[1];
        this.processarOperacao(operation);
    }

    mudarOperacao(operation) {
        const operations = ["x", "÷", "+", "-"];

        if (!operations.includes(operation)) {
            return;
        }
        this.previousOpertionText.innerText = this.previousOpertionText.innerText.slice(0, -1) + operation;
    }

    atualizarVisor(
        operationValue = null,
        operation = null,
        current = null,
        previous = null
    ){
        console.log(operationValue ,operation, current, previous);
        if(operationValue == null){
            this.currenOperationText.innerText += this.CurrentOperation;
        }else {
            if(previous === 0){
                operationValue = current;
            }
            this.previousOpertionText.innerText = `${operationValue} ${operation}`;
            this.currenOperationText.innerText = "";
        }
    }
       
    deletarOperacao() {
        this.currenOperationText.innerText = this.currenOperationText.innerText.slice(0, -1);
    }
    
    limparOperacao() {
        this.currenOperationText.innerText = "";
        this.previousOpertionText.innerText = "";
        this.dateOperation = "";
    }

    verificarHistorico() {
        if(this.historico.length > 3) {
            this.criarHistorico();
        }else {
            const historico = document.getElementById("historico");
            historico.style.display = "nome";
        }
    }

    criarHistorico() {

        const historico = document.getElementById("historico");
        const title = document.createElement("h3");
        title.innerText = "Histórico";
        historico.appendChild(title);
        
        this.historico.forEach(item => {
            const div = document.createElement("div");
            div.className = "content";
            
            const horario = document.createElement("p");
            horario.className = "horario";
            horario.innerHTML = item.data;
            div.appendChild(horario);

            const valores = document.createElement("p");
            valores.className = "valores";
            valores.innerHTML = item.res;
            div.appendChild(valores);
            historico.appendChild(div);
        })
        
    }
    
}