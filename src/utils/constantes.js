const CATEGORIES = {
    1: 'Food',
    2: 'Transport',
    3: 'Entertainment',
    4: 'Utilities',
    5: 'Other',
};

const descriptionInput = document.getElementById('description')
const amountInput = document.getElementById('amount')
const addBtn = document.getElementById('add')
const expensesContainer = document.getElementById('expenses')
const categoryInput = document.getElementById('category')

const EXPENSES_KEY = 'expenses'


export { CATEGORIES, descriptionInput, amountInput, addBtn, expensesContainer, categoryInput, EXPENSES_KEY };