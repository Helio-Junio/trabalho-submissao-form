const usuario = document.querySelector('#usuario');
const sobrenome = document.querySelector('#sobrenome');
const email = document.querySelector('#email');
const form = document.querySelector('#registro');

//Mostra mensagem de erro
const showsError = (input, message) => {
    // Obtem o elemento campo do formulário
    const formField = input.parentElement;
    // Adiciona a classe de erro
    formField.classList.remove('success');
    formField.classList.add('error');

    // Mostra a mensagem de erro
    const error = formField.querySelector('small');
    error.textContent = message;
};

//Mostra mensagem de sucesso
const showsSuccess = (input) => {
    // Obtem o elemento campo do formulário
    const formField = input.parentElement;

    // Remove a classe de erro
    formField.classList.remove('error');
    formField.classList.add('success');

    // Mostra a mensagem de sucesso
    const error = formField.querySelector('small');
    error.textContent = '';
};

// Checa entrada obrigatória
const isRequired = value => value === '' ? false : true;

// Checa tamanho da entrada
const isBetween = (length, min, max) => length < min || length > max ? false : true;

// Checa se idade tem o valor positivo
const isPositive = (value) => value > 15 && value < 120 ? true : false;

// Checa se email é valido
const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

// Valida o campo do usuario
const checkUsername = () => {
    let valid = false;
    const min = 3, max = 50;
    const usuarioVal = usuario.value.trim();

    if (!isRequired(usuarioVal)) {
        showsError(usuario, 'Nome não pode ficar em branco.');
    } else if (!isBetween(usuarioVal.length, min, max)) {
        showsError (usuario, `Nome deve ter entre ${min} e ${max} caracteres.`);
    } else {
        showsSuccess(usuario);
        valid = true;
    }
    return valid;
};

// Valida o campo do sobrenome
const checkSobrenome = () => {
    let valid = false;
    const min = 3, max = 50;
    const sobrenomeVal = sobrenome.value.trim();

    if (!isRequired(sobrenomeVal)) {
        showsError(sobrenome, 'Sobrenome não pode ficar em branco.');
    } else if (!isBetween(sobrenomeVal.length, min, max)) {
        showsError(sobrenome, `Sobrenome deve ter entre ${min} e ${max} caracteres.`);
    } else {
        showsSuccess(sobrenome);
        valid = true;
    }
    return valid;
};

// Valida o campo do email
const checkEmail = () => {
    let valid = false;
    const emailVal = email.value.trim();

    if (!isRequired(emailVal)) {
        showsError(email, 'E-mail não pode ficar em branco.');
    } else if (!isEmailValid(emailVal)) {
        showsError(email, 'E-mail inválido.');
    } else {
        showsSuccess(email);
        valid = true;
    }
    return valid;
};

// valida o campo de idade
const checkIdade = () => {
    let valid = false;
    const min = 16, max = 120;
    const idadeVal = idade.value.trim();

    if (!isRequired(idadeVal)) {
        showsError(idade, 'Idade não pode ficar em branco.');
    } else if (!isPositive(idadeVal)) {
        showsError (idade, `Idade deve ter entre ${min} e ${max} anos.`);
    } else {
        showsSuccess(idade);
        valid = true;
    }
    return valid;
};

// Modifica o manipulador de eventos de envio
form.addEventListener('submit', function (e) { 
    // Previne a submissão do formulário
    e.preventDefault();

    const isUsernameValid = checkUsername();
    const isSobrenomeValid = checkSobrenome();
    const isEmailValid = checkEmail();
    const isIdadeValid = checkIdade();

    // Submete o formulário, se válido
    if (isUsernameValid &&
        isEmailValid &&
        isSobrenomeValid &&
        isIdadeValid) {

        // Converte o formulário em um objeto JSON
        const formData = new FormData(form);
        const objeto = Object.fromEntries(formData);

        const json = JSON.stringify(objeto);

        localStorage.setItem('form', json);

        //TODO: Adicionar envio de formulário
        window.location.href = "./confirmation.html";
    }
});
