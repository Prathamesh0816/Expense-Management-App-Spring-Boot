package com.itshaala.expensemgmtapp_v1.Service;

import com.itshaala.expensemgmtapp_v1.Dao.ExpenseDao;
import com.itshaala.expensemgmtapp_v1.Model.Expense;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@AllArgsConstructor
public class ExpenseService {
    private ExpenseDao expenseDao;
    public List<Expense> getAllExpenses() {
        return expenseDao.findAll();
    }
    public Optional<Expense> getExpenseById(Long id) {
        return expenseDao.findById(id);
    }
    public Expense addExpense(Expense expense) {
        return expenseDao.save(expense);
    }
    public Expense updateExpense(Long id, Expense expense) {
        return expenseDao.save(expense);
    }
    public void deleteExpense(Long id) {
        expenseDao.deleteById(id);
    }
}
