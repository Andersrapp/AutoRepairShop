package com.ar.hotwiredautorepairshop.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

/**
 *
 * @author Anders
 */
@Entity
public class WorkType {

    @Id
    @GeneratedValue
    private Integer id;
    private String description;
    private Integer price;
    @ManyToMany(mappedBy = "workTypes")
    @JsonIgnore
    private List<ServiceOrder> serviceOrders;
    @ManyToMany(mappedBy = "workTypes")
    @JsonIgnore
    private List<Complaint> complaints;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public List<ServiceOrder> getServiceOrders() {
        return serviceOrders;
    }

    public void setServiceOrders(List<ServiceOrder> serviceOrders) {
        this.serviceOrders = serviceOrders;
    }

    @Override
    public String toString() {
        return "WorkType{" + "id=" + id + ", description=" + description + ", price=" + price + '}';
    }
}
