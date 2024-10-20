package com.itshaala.expensemgmtapp_v1.Controller;

import com.itshaala.expensemgmtapp_v1.Model.Expense;
import com.itshaala.expensemgmtapp_v1.Service.ExpenseService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("/api/expense")
@CrossOrigin(origins = "http://localhost:5173")
public class ExpenseController {
    private ExpenseService expenseService;
    @GetMapping
    public List<Expense> getAllExpenses() {
        return expenseService.getAllExpenses();
    }
    @GetMapping("/{id}")
    public Optional<Expense> getExpenseById(Long id) {
        return expenseService.getExpenseById(id);
    }
    @PostMapping
    public Expense addExpense(@RequestBody Expense expense) {
        return expenseService.addExpense(expense);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Expense> updateExpense(@PathVariable Long id , @RequestBody Expense expense) {
        Expense updateExpense = expenseService.updateExpense(id, expense);
        return ResponseEntity.ok(updateExpense);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Boolean>>deleteExpense(@PathVariable Long id) {
        expenseService.deleteExpense(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

}
