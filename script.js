// Cole a URL que você copiou do Google Apps Script aqui
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz04yKUOFiB6aoCsNGNTGoEaCQmcL2zSxL2kUEYkXwlz4MVi9qxzNJWuiRtQkuLGpjxdg/exec";

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
            mode: 'no-cors', // Importante para evitar erros de CORS com o método POST simples
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(new FormData(form)) // Converte o formulário para envio
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

// O resto do seu arquivo (showSuccessMessage, etc.) continua igual.
document.addEventListener('DOMContentLoaded', function() {
    initForm();
});
// Função para inicializar a página
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar o formulário
    initForm();
});

// Inicializar o formulário de confirmação
function initForm() {
    const form = document.getElementById('confirm-form');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('nome').value;
        const companions = document.getElementById('acompanhantes').value;
        
        // Validar se o nome foi preenchido
        if (!name.trim()) {
            alert('Por favor, informe seu nome.');
            return;
        }
        
        // Obter confirmações existentes ou criar um array vazio
        const confirmedGuests = JSON.parse(localStorage.getItem('confirmedGuests')) || [];
        
        // Verificar se já existe uma confirmação com este nome
        const existingConfirmation = confirmedGuests.find(guest => 
            guest.name.toLowerCase() === name.toLowerCase()
        );
        
        if (existingConfirmation) {
            if (confirm('Já existe uma confirmação com este nome. Deseja atualizar?')) {
                // Atualizar confirmação existente
                existingConfirmation.companions = companions;
                existingConfirmation.timestamp = new Date().toISOString();
            } else {
                return;
            }
        } else {
            // Adicionar nova confirmação
            confirmedGuests.push({
                name: name,
                companions: companions,
                timestamp: new Date().toISOString()
            });
        }
        
        // Salvar no localStorage
        localStorage.setItem('confirmedGuests', JSON.stringify(confirmedGuests));
        
        // Limpar formulário
        form.reset();
        
        // Mostrar mensagem de sucesso
        showSuccessMessage();
    });
}

// Mostrar mensagem de sucesso
function showSuccessMessage() {
    const successMessage = document.getElementById('success-message');
    successMessage.style.display = 'block';
    
    // Esconder mensagem após 5 segundos
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 5000);
}

// Função para contar confirmações (para uso futuro)
function getConfirmationCount() {
    const confirmedGuests = JSON.parse(localStorage.getItem('confirmedGuests')) || [];
    return confirmedGuests.length;
}

// Função para obter o total de pessoas
function getTotalGuests() {
    const confirmedGuests = JSON.parse(localStorage.getItem('confirmedGuests')) || [];
    let total = 0;
    
    confirmedGuests.forEach(guest => {
        total += 1 + parseInt(guest.companions);
    });
    
    return total;
}
