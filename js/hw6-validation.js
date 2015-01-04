function addListeners(emailField, nameField, checkboxField, submitBtn)
{
    emailField.addEventListener('blur', function(e) { emailValidation(e.target, submitBtn)});
    nameField.addEventListener('blur', function(e) { nameValidation(e.target, submitBtn)});
    checkboxField.addEventListener('change', function(e) { checkboxValidation(e.target, submitBtn)});
}

function emailValidation(field, submitBtn) {
    var emailRe = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/igm;
    if (field.value == '' || !emailRe.test(field.value)) {
        field.classList.add('error');
        //submitBtn.disabled = true;
    } else {
        field.classList.remove('error');
        //submitBtn.disabled = false;
    }
}

function nameValidation(field, submitBtn) {
    if (field.value === '') {
        field.classList.add('error');
        //submitBtn.disabled = true;
    } else {
        field.classList.remove('error');
        //submitBtn.disabled = false;
    }
}

function checkboxValidation(field, submitBtn) {
    if (field.checked) {
        field.classList.remove('error');
        //submitBtn.disabled = false;
    } else {
        field.classList.add('error');
        //submitBtn.disabled = true;
    }
}

function init(type) {
    var emailField = document.getElementById('email_valid_text');
    var nameField = document.getElementById('name_valid_text');
    var checkboxField = document.getElementById('check_validation');
    var submitButton = document.getElementById('validation_submit_form_btn');

    if (type === 1) {
        validateForm(emailField, nameField, checkboxField, submitButton);
    } else {
        addListeners(emailField, nameField, checkboxField, submitButton);
        //submitButton.disabled = true;
    }
}

function validateForm(emailField, nameField, checkboxField, submitButton)
{
    emailValidation(emailField, submitButton);
    nameValidation(nameField, submitButton);
    checkboxValidation(checkboxField, submitButton);
}

document.addEventListener('load', init());

document.forms[0].addEventListener('submit', function(e){
    e.preventDefault();
    init(1);
    var check = document.querySelectorAll('input.error').length;
    if (!check) {
        document.querySelector('p.validation-result').innerText = 'Form valid.';
    } else {
        document.querySelector('p.validation-result').innerText = 'Form not valid. Found ' + check + ' error(s)';
    }
});
