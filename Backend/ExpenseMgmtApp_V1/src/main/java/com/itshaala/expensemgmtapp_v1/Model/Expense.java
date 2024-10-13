package com.itshaala.expensemgmtapp_v1.Model;

import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
@Builder
@Entity
@Table(name = "expense")
public class Expense {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "expense_id")
    private long id;
    @Column(name = "expense_name")
    private String name;
    @Column(name = "expense_description")
    private String description;
    @Column(name = "expense_category")
    private String category;
    @Column(name = "expense_amount")
    private double amount;
    @Column(name = "expense_date")
    private String date;
}
