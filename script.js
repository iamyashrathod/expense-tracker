let expenses = [];
let totalAmount = 0;
let incomes = [];
let totalIncome = 0;

const categorySelect = document.getElementById('category-select');
const amountInput = document.getElementById('amount-input');
const dateInput = document.getElementById('date-input');
const addBtn = document.getElementById('add-btn');
const expensesTableBody = document.getElementById('expense-table-body');
const totalAmountCell = document.getElementById('total-amount');
const incomeInput = document.getElementById('income-input');
const incomeDateInput = document.getElementById('income-date-input');
const addIncomeBtn = document.getElementById('add-income-btn');
const totalIncomeCell = document.getElementById('total-income');
const netBalanceCell = document.getElementById('net-balance');

// Function to update net balance
function updateNetBalance() {
    const netBalance = totalIncome - totalAmount;
    netBalanceCell.textContent = netBalance;
}

// Add Expense
addBtn.addEventListener('click', function() {
    const category = categorySelect.value;
    const amount = Number(amountInput.value);
    const date = dateInput.value;

    if (category === '') {
        alert('Please select a category');
        return;
    }
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }
    if (date === '') {
        alert('Please select a date');
        return;
    }

    const expense = { category, amount, date };
    expenses.push(expense);

    totalAmount += amount;
    totalAmountCell.textContent = totalAmount;
    updateNetBalance();

    const newRow = expensesTableBody.insertRow();

    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();
    const deleteBtn = document.createElement('button');

    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function() {
        expenses.splice(expenses.indexOf(expense), 1);
        totalAmount -= expense.amount;
        totalAmountCell.textContent = totalAmount;
        updateNetBalance();
        expensesTableBody.removeChild(newRow);
    });

    categoryCell.textContent = expense.category;
    amountCell.textContent = expense.amount;
    dateCell.textContent = expense.date;
    deleteCell.appendChild(deleteBtn);
});

// Add Income
addIncomeBtn.addEventListener('click', function() {
    const incomeAmount = Number(incomeInput.value);
    const incomeDate = incomeDateInput.value;

    if (isNaN(incomeAmount) || incomeAmount <= 0) {
        alert('Please enter a valid income amount');
        return;
    }
    if (incomeDate === '') {
        alert('Please select a date for income');
        return;
    }

    const income = { amount: incomeAmount, date: incomeDate };
    incomes.push(income);

    totalIncome += incomeAmount;
    totalIncomeCell.textContent = totalIncome;
    updateNetBalance();

    incomeInput.value = '';
    incomeDateInput.value = '';
});
