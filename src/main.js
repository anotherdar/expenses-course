import { DateTime } from 'luxon';
import Chart from 'chart.js/auto';
import './style.css'
import { 
  descriptionInput,
  amountInput,
  addBtn,
  expensesContainer,
  categoryInput,
  CATEGORIES,
  capitalize,
  formatCurrency,
  getBadgeClass
} from './utils'
import { expensesStore } from './store';

let charts;

const store = expensesStore;
// initial render
renderExpenses();

// subscribe to store changes
store.subscribe(renderExpenses);

// add event listener to add button
addBtn.addEventListener('click', () => {
  const description = descriptionInput.value.trim();
  const amount = parseFloat(amountInput.value);

  if (description === '' || isNaN(amount) || amount <= 0 || categoryInput.value === 'select') return;

  store.getState().add(
    {
      description,
      amount,
      date: DateTime.now().toISO(),
      category: {
        id: categoryInput.value,
        name: CATEGORIES[categoryInput.value],
      },
    }
  )

  renderExpenses();

  descriptionInput.value = '';
  amountInput.value = '';
  categoryInput.value = '';
});

function renderExpenses() {
  if (store.getState().expenses.length === 0) {
    expensesContainer.innerHTML = `
      <div class="flex flex-col items-center justify-center h-full">
        <div class="rounded-full bg-red-400 animate-bounce w-6 h-6"></div>
        <h1 class="text-center text-red-500 font-bold">No expenses yet</h1>
        <p class="text-center text-gray-500 font-semibold">Add your first expense to get started</p>
      </div>
    `;
    return;
  }

  expensesContainer.innerHTML = '';

  store.getState().expenses.forEach((expenses, index) => {
    const li = document.createElement('li');
    // li.classList.add('flex', 'justify-between', 'items-center', 'p-2', 'border-b', 'border-green-200');
    li.className = 'flex justify-between items-center p-2 border-b border-red-200';
    li.innerHTML = `
      <div class="flex items-center gap-2">
        <span class="font-bold text-gray-600">${capitalize(expenses.description)}</span>
        <span class="text-gray-500">${DateTime.fromISO(expenses.date).toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS)}</span>
        <span class="${getBadgeClass(expenses?.category?.id)} rounded-full px-2 py-1 text-xs">${(expenses?.category?.name)}</span>
      </div>
      <div class="flex items-center gap-4">
        <span class="font-bold text-red-600 ">${formatCurrency(expenses.amount)}</span>
        <button class="text-red-600 bg-red-200 rounded-full p-0.5 cursor-pointer hover:bg-red-300 active:bg-red-400 transition-colors duration-300 active:text-white" id="remove-${index}">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      `;

    const removeBtn = li.querySelector(`#remove-${index}`);

    removeBtn.addEventListener('click', () => {
      store.getState().remove(index);
    });

    expensesContainer.appendChild(li);
  });

  renderChart();
}

// current chart
function renderChart() {
  const totals = {};
  store.getState().expenses.forEach(expense => {
    const date = DateTime.fromISO(expense.date).toLocaleString('dd LLL');
    // hoy = 10
    // hoy = hoy + 10 = 20
    // hoy = hoy + 10 = 30
    // totals.hoy = 10
    // totals.hoy = (totals.hoy || 0) + 10 = 20 // 0 + 10 = 10 // 10 + 10 = 20
    totals[date] = (totals[date] || 0) + expense.amount;
  });

  const labels = Object.keys(totals);
  const data = Object.values(totals);

  if (charts) charts.destroy();
  const chart = document.getElementById('chart');
  charts = new Chart(chart, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        { label: "Expenses", data, backgroundColor: 'red' }
      ]
    }
  });
}

renderChart();