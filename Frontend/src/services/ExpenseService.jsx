import axios from 'axios';

const API_URL = 'http://localhost:8080/api/expense'; // Replace with your actual API endpoint
const ExpenseService = {
    fetchExpenses: async () => {
        const response = await axios.get(API_URL);
        return response.data;
    },

    createExpense: async (expense) => {
        return await axios.post(API_URL, expense);
    },

    updateExpense: async (expense) => {
        return await axios.put(`${API_URL}/${expense.id}`, expense);
    },

    deleteExpense: async (id) => {
        return await axios.delete(`${API_URL}/${id}`);
    },
};

export default ExpenseService;

