package com.ar.hotwiredautorepairshop.model;

import java.io.Serializable;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;
//import lombok.Data;

/**
 *
 * @author Anders
 */
@Entity
//@Data
public class ServiceOrder implements Serializable {

    @Id
    @GeneratedValue
    private Integer id;
    @ManyToOne
    private Car car;
    @ManyToOne
    private Customer customer;
    @ManyToOne
    private Mechanic mechanic;
    private Date registrationDate;
    @ManyToMany
    @Cascade(CascadeType.ALL)
    @JoinTable(name = "ServiceOrderWorkType",
            joinColumns = {
                @JoinColumn(name = "ServiceOrder_id", referencedColumnName = "id")},
            inverseJoinColumns = {
                @JoinColumn(name = "WorkType_id", referencedColumnName = "id")}
    )
    private List<WorkType> workTypes = new ArrayList<>();
    private Date serviceDate;
    private Date pickupDate;
    private Integer totalPrice;
    private boolean active;
    @OneToOne
    private Complaint complaint;

    public Integer getId() {
        return id;
    }

    public Car getCar() {
        return car;
    }

    public void setCar(Car car) {
        this.car = car;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Mechanic getMechanic() {
        return mechanic;
    }

    public void setMechanic(Mechanic mechanic) {
        this.mechanic = mechanic;
    }

    public Date getRegistrationDate() {
        return registrationDate;
    }

    public void setRegistrationDate(Date registrationDate) {
        this.registrationDate = registrationDate;
    }

    public Date getServiceDate() {
        return serviceDate;
    }

    public void setServiceDate(Date serviceDate) {
        this.serviceDate = serviceDate;
    }

    public Date getPickupDate() {
        return pickupDate;
    }

    public void setPickupDate(Date pickupDate) {
        this.pickupDate = pickupDate;
    }

    public Integer getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Integer totalPrice) {
        this.totalPrice = totalPrice;
    }

    public List<WorkType> getWorkTypes() {
        return workTypes;
    }

    public void setWorkTypes(List<WorkType> workTypes) {
        this.workTypes = workTypes;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public Complaint getComplaint() {
        return complaint;
    }

    public void setComplaint(Complaint complaint) {
        this.complaint = complaint;
    }
}
