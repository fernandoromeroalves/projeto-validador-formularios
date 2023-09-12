let validator = {
    handleSubmit:(event)=>{
        event.preventDefault();

        let send =true;

        let inputs = form.querySelectorAll('input');

        validator.clearErrors()

        for(let i = 0;i<inputs.length;i++){
            let input = inputs[i]
            let check = validator.checkInput(input);
            if(check !== true){
                send = false;
               validator.showError(input, check)
                //exibir erro
            }
        }

        if(send){
            form.submit()
        }
    },
    checkInput:(input) => {
        let rules = input.getAttribute('data-rules');
        if(rules !== null){
            rules = rules.split('|');
            for(let k in rules){
                let rDtails = rules[k].split('=');
                switch(rDtails[0]){
                    case 'required':
                        if(input.value == ''){
                            return ' este campo é obrigatorio'
                        }
                    break;
                    case 'min':
                        if(input.value.length < rDtails[1]){
                            return 'Campo tem que ter pelo menos '+rDtails[1]+ ' caracteres'
                        }
                    break;
                    case 'email':
                        if(input.value != ''){
                            let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                            if(!regex.test(input.value.toLowerCase())){
                                return 'e-mail digitado não é valido'
                            }

                        }
                }
            }
        }

        return true

    },
    showError:(input, error) => {
        input.style.borderColor = '#FF0000'

        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;
        
        input.parentElement.insertBefore(errorElement, input.ElementSibiling)

    },
    clearErrors:()=>{
        let inputs = form.querySelectorAll('input');
        for(let i=0;i<inputs.length;i++){
            inputs[i].style = ''
        }

        let errorElements = document.querySelectorAll('.error');
        for(let i =0;i<errorElements.length;i++){
            errorElements[i].remove();
        }
    }
};

let form = document.querySelector('.validator');
form.addEventListener('submit', validator.handleSubmit);