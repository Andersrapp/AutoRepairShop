package com.ar.hotwiredautorepairshop.model;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 *
 * @author Anders
 */
@Entity
public class Mechanic extends Person {

    private Integer salary;

    @OneToMany(fetch = FetchType.EAGER)
    private List<Car> carsInProgress = new ArrayList<>();

    public Integer getSalary() {
        return salary;
    }

    public void setSalary(Integer salary) {
        this.salary = salary;
    }

    public List<Car> getCarsInProgress() {
        return carsInProgress;
    }

    public void setCarsInProgress(List<Car> carsInProgress) {
        this.carsInProgress = carsInProgress;
    }
}
