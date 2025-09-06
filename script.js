// Cole a URL que você copiou do Google Apps Script aqui
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz04yKUOFiB6aoCsNGNTGoEaCQmcL2zSxL2kUEYkXwlz4MVi9qxzNJWuiRtQkuLGpjxdg/exec";

// Função para inicializar a página assim que ela carregar
document.addEventListener('DOMContentLoaded', function() {
    initForm();
});

// Inicializa o formulário de confirmação
function initForm() {
    const form = document.getElementById('confirm-form');
    const submitButton = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('nome').value;
        if (!name.trim()) {
            alert('Por favor, informe seu nome.');
            return;
        }

        // Desabilita o botão para evitar envios duplos
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

        // Envia os dados do formulário para o Google Script
        fetch(SCRIPT_URL, {
            method: 'POST',
            body: new FormData(form)
        })
        .then(response => {
            form.reset();
            showSuccessMessage();
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Ocorreu um erro ao confirmar sua presença. Tente novamente.');
        })
        .finally(() => {
            // Reabilita o botão
            submitButton.disabled = false;
            submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Confirmar Presença';
        });
    });
}

// Mostra a mensagem de sucesso após o envio
function showSuccessMessage() {
    const successMessage = document.getElementById('success-message');
    successMessage.style.display = 'block';
    
    // Esconde a mensagem após 5 segundos
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 5000);
}
