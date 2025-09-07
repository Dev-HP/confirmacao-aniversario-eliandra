// Função para inicializar a página assim que ela carregar
document.addEventListener('DOMContentLoaded', function() {
    initForm();
});

// Inicializa o formulário de confirmação para enviar ao Firebase
function initForm() {
    const form = document.getElementById('confirm-form');
    const submitButton = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', async function(e) { // Adicionamos 'async' para usar o 'await'
        e.preventDefault();

        const name = document.getElementById('nome').value;
        const companions = document.getElementById('acompanhantes').value;

        if (!name.trim()) {
            alert('Por favor, informe seu nome.');
            return;
        }

        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Confirmando...';

        try {
            // Envia os dados para a coleção "confirmacoes" no Firestore
            // A variável 'db' foi criada no seu arquivo index.html
            await db.collection("confirmacoes").add({
                name: name,
                companions: companions,
                timestamp: firebase.firestore.FieldValue.serverTimestamp() // Pega a data/hora do servidor Firebase
            });
            
            form.reset();
            showSuccessMessage();

        } catch (error) {
            console.error("Erro ao confirmar presença: ", error);
            alert("Ocorreu um erro ao confirmar sua presença. Tente novamente.");
        } finally {
            submitButton.disabled = false;
            submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Confirmar Presença';
        }
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
