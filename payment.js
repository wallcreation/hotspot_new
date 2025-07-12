// Configuration Fedapay
const FEDAPAY_CONFIG = {
    apiKey: 'YOUR_API_KEY', // Remplacer par votre clé API Fedapay
    publicKey: 'YOUR_PUBLIC_KEY' // Remplacer par votre clé publique Fedapay
};

// Tarifs disponibles
const PRICES = {
    '100': { duration: '3h', price: 100, description: '3 heures' },
    '200': { duration: '7h', price: 200, description: '7 heures' },
    '300': { duration: '12h', price: 300, description: '12 heures' },
    '500': { duration: '24h', price: 500, description: '24 heures' },
    '1000': { duration: '72h', price: 1000, description: '72 heures' },
    '2000': { duration: '1w', price: 2000, description: '1 semaine' },
    '5000': { duration: '1m', price: 5000, description: '1 mois' }
};

// Fonction pour initialiser le paiement Fedapay
function initFedapayPayment(priceId) {
    const price = PRICES[priceId];
    
    // Créer une transaction Fedapay
    fetch('https://api.fedapay.com/v1/transactions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${FEDAPAY_CONFIG.apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            amount: price.price,
            currency: 'XOF',
            description: `Accès WiFi - ${price.description}`,
            metadata: {
                duration: price.duration
            }
        })
    })
    .then(response => response.json())
    .then(data => {
        // Rediriger vers la page de paiement Fedapay
        window.location.href = data.redirect_url;
    })
    .catch(error => {
        console.error('Erreur lors de la création du paiement:', error);
        alert('Une erreur est survenue lors de l\'initialisation du paiement.');
    });
}

// Ajouter les boutons de paiement
document.addEventListener('DOMContentLoaded', function() {
    const priceTable = document.querySelector('.table');
    if (priceTable) {
        // Ajouter un bouton de paiement pour chaque ligne
        const rows = priceTable.querySelectorAll('tr');
        rows.forEach(row => {
            const priceCell = row.querySelector('th:first-child');
            if (priceCell && !isNaN(priceCell.textContent)) {
                const priceId = priceCell.textContent.replace('f', '');
                const button = document.createElement('button');
                button.className = 'payment-button';
                button.textContent = 'Payer avec Fedapay';
                button.onclick = () => initFedapayPayment(priceId);
                row.appendChild(button);
            }
        });
    }
});
