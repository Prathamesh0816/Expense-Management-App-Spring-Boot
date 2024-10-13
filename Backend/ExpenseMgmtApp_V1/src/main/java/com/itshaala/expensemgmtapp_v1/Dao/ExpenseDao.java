package com.itshaala.expensemgmtapp_v1.Dao;

import com.itshaala.expensemgmtapp_v1.Model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExpenseDao extends JpaRepository<Expense, Long> {
}
