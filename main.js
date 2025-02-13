'use strict';

(() => {
     // ============= Variablen deklarieren =====================
    const firstNameInput = document.querySelector('#vorname');
    const lastNameInput = document.querySelector('#name');
    const emailInput = document.querySelector('#email');
    const formEl = document.querySelector('form');

    const primaryLabels = document.querySelectorAll(".primaryLabel");
    const secondaryLabels = document.querySelectorAll(".secondaryLabel");

    const errorMessage = document.querySelector('.alert-danger');
    const successMessage = document.querySelector('.alert-success');

    // ============= functionen =====================
    function validateEmail(email) {
        const standardEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return standardEmail.test(email);
    }

    function validateForm(e) {
        e.preventDefault(); // Verhindert das automatische Absenden des Formulars
        const errors = [];

        if (firstNameInput.value.trim() === '') {
            errors.push('Bitte geben Sie Ihren Vornamen ein.');
        }

        if (lastNameInput.value.trim() === '') {
            errors.push('Bitte geben Sie Ihren Nachnamen ein.');
        }

        if (!validateEmail(emailInput.value.trim())) {
            errors.push('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
        }

        if (errors.length > 0) {
            errorMessage.innerHTML = errors.join('<br>'); // Fehler anzeigen
            Object.assign(errorMessage.style, {
                display: 'block',
                height: '90px',
                backgroundColor: '#FDF7F4',
                border: '0.2px solid #997C70',
                borderRadius: '10px',
                marginTop: '30px'
            });
            successMessage.style.display = 'none';
        } else {
            errorMessage.style.display = 'none';
            successMessage.innerHTML = 'Formular erfolgreich gesendet!';
            Object.assign(successMessage.style, {
                display: 'block',
                height: '30px',
                marginTop: '30px',
                textAlign: 'center',
                backgroundColor: '#FDF7F4',
                border: '0.2px solid #8EB486',
                borderRadius: '10px'
            });
        }
    }

    function highlightPrimaryLabel() {
        primaryLabels.forEach(el => el.classList.toggle("selected-label", false));
        primaryLabels.forEach(el => el.classList.toggle("unselected-label", true));

        const selectedMainDate = document.querySelector('input[name="Lieblingstermin"]:checked');
        if (selectedMainDate) {
            selectedMainDate.parentElement.classList.toggle("selected-label", true);
            selectedMainDate.parentElement.classList.toggle("unselected-label", false);
        }
    }

    function highlightSecondaryLabel() {
        secondaryLabels.forEach(el => el.classList.toggle("selected-label", false));
        secondaryLabels.forEach(el => el.classList.toggle("unselected-label", true));

        const selectedAltDate = document.querySelector('input[name="ersatztermin"]:checked');
        if (selectedAltDate) {
            selectedAltDate.parentElement.classList.toggle("selected-label", true);
            selectedAltDate.parentElement.classList.toggle("unselected-label", false);
        }
    }

    // Event-Listener für die Radio-Buttons
    document.querySelectorAll('input[name="Lieblingstermin"]').forEach(radio =>
        radio.addEventListener("change", highlightPrimaryLabel)
    );

    document.querySelectorAll('input[name="ersatztermin"]').forEach(radio =>
        radio.addEventListener("change", highlightSecondaryLabel)
    );

    // Event-Listener für das Formular
    formEl.addEventListener('submit', validateForm);
})();
