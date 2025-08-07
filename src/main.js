import { DateTime } from 'luxon'
import './style.css'
import { capitalize, formatCurrency } from './utils'

const descriptionInput = document.getElementById('description')
const amountInput = document.getElementById('amount')
const addBtn = document.getElementById('add')
const expensesContainer = document.getElementById('expenses')

const EXPENSES_KEY = 'expenses'

let expenses = JSON.parse(localStorage.getItem(EXPENSES_KEY)) ?? [];
renderExpenses();

// add event listener to add button
addBtn.addEventListener('click', () => {
  const description = descriptionInput.value.trim();
  const amount = parseFloat(amountInput.value);

  if (description === '' || isNaN(amount) || amount <= 0) return;

  expenses.push({
    description,
    amount,
    date: DateTime.now().toISO(),
  });

  localStorage.setItem(EXPENSES_KEY, JSON.stringify(expenses));

  renderExpenses();

  descriptionInput.value = '';
  amountInput.value = '';
});


function renderExpenses() {
  expensesContainer.innerHTML = '';

  expenses.forEach(expenses => {
    const li = document.createElement('li');
    // li.classList.add('flex', 'justify-between', 'items-center', 'p-2', 'border-b', 'border-green-200');
    li.className = 'flex justify-between items-center p-2 border-b border-red-200';
    li.innerHTML = `
      <div class="flex items-center gap-2">
        <span class="font-bold text-gray-600">${capitalize(expenses.description)}</span>
        <span class="text-gray-500">${DateTime.fromISO(expenses.date).toLocaleString(DateTime.DATE_MED)}</span>
      </div>
      <span class="font-bold text-red-600">${formatCurrency(expenses.amount)}</span>
    `;
    expensesContainer.appendChild(li);
  })
}