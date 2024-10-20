import React, { useState, useEffect } from 'react';
import ExpenseService from '../services/ExpenseService';
import "./ExpenseApp.css";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'; 
ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseApp = () => {
    const [expenses, setExpenses] = useState([]);
    const [expense, setExpense] = useState({ id: '', name: '', amount: '', category: '' });
    const [total, setTotal] = useState(0);
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {
        const result = await ExpenseService.fetchExpenses();
        setExpenses(result);
        calculateTotal(result);
        prepareChartData(result);
    };

    const calculateTotal = (expenses) => {
        const totalAmount = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);
        setTotal(totalAmount);
    };

    const prepareChartData = (expenses) => {
        const categoryMap = {};
        expenses.forEach(exp => {
            categoryMap[exp.category] = (categoryMap[exp.category] || 0) + Number(exp.amount);
        });
        setChartData({
            labels: Object.keys(categoryMap),
            datasets: [
                {
                    label: 'Expense Distribution',
                    data: Object.values(categoryMap),
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40', '#4BC0C0'],
                },
            ],
        });
    };

    const addOrUpdateExpense = async (e) => {
        e.preventDefault();
        if (expense.id) {
            await ExpenseService.updateExpense(expense);
        } else {
            await ExpenseService.createExpense(expense);
        }
        fetchExpenses();
        setExpense({ id: '', name: '', amount: '', category: '' });
    };

    const editExpense = (expense) => {
        setExpense(expense);
    };

    const deleteExpense = async (id) => {
        await ExpenseService.deleteExpense(id);
        fetchExpenses();
    };

    return (
        <div className="expense-app">
            <h2>Total Expenses: Rs.{total}</h2>
            <Pie data={chartData} />
            <form onSubmit={addOrUpdateExpense}>
                <input
                    type="text"
                    placeholder="Expense Name"
                    value={expense.name}
                    onChange={(e) => setExpense({ ...expense, name: e.target.value })}
                    required
                />
                <input
                    type="number"
                    placeholder="Amount"
                    value={expense.amount}
                    onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Category"
                    value={expense.category}
                    onChange={(e) => setExpense({ ...expense, category: e.target.value })}
                    required
                />
                <button type="submit">{expense.id ? 'Update' : 'Add'} Expense</button>
            </form>
            <ul>
                {expenses.map((exp) => (
                    <li key={exp.id}>
                        {exp.name}: Rs.{exp.amount} (Category: {exp.category})
                        <button onClick={() => editExpense(exp)}>Edit</button>
                        <button onClick={() => deleteExpense(exp.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ExpenseApp;

