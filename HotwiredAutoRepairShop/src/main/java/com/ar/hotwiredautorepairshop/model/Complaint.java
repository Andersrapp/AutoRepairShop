package com.ar.hotwiredautorepairshop.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

/**
 *
 * @author Anders
 */
@Entity
public class Complaint implements Serializable {

    @Id
    @GeneratedValue()
    private Integer id;
    @OneToOne
    @JsonIgnore
    private ServiceOrder incompleteServiceOrder;
    @ManyToMany(fetch = FetchType.EAGER)
     @Cascade(CascadeType.ALL)
    @JoinTable(name = "ComplaintWorkTypes",
            joinColumns = {
                @JoinColumn(name = "Complaint_id", referencedColumnName = "id")},
            inverseJoinColumns = {
                @JoinColumn(name = "WorkType_id", referencedColumnName = "id")}
    )
    private List<WorkType> workTypes = new ArrayList<>();
    private boolean active;

    public Integer getId() {
        return id;
    }

    public ServiceOrder getIncompleteServiceOrder() {
        return incompleteServiceOrder;
    }

    public void setIncompleteServiceOrder(ServiceOrder incompleteServiceOrder) {
        this.incompleteServiceOrder = incompleteServiceOrder;
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
}