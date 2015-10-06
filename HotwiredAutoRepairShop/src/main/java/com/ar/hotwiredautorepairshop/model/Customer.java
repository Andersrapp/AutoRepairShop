package com.ar.hotwiredautorepairshop.model;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;

/**
 *
 * @author Anders
 */
@Entity
public class Customer extends Person {

    @OneToMany(fetch = FetchType.EAGER)
    private List<Car> ownedCars = new ArrayList<>();
    @Column
    private Integer age;

    public List<Car> getOwnedCars() {
        return ownedCars;
    }

    public void setOwnedCars(List<Car> ownedCars) {
        this.ownedCars = ownedCars;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }
}