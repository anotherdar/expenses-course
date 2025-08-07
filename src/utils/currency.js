// format currency
export function formatCurrency(amount = 0) {
    return new Intl.NumberFormat('es-DO', {
        style: 'currency',
        currency: 'DOP',
    }).format(amount);
}