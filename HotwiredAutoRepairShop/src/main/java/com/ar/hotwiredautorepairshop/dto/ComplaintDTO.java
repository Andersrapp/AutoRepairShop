package com.ar.hotwiredautorepairshop.dto;

import com.ar.hotwiredautorepairshop.model.Complaint;
import com.ar.hotwiredautorepairshop.model.WorkType;
import java.util.List;

/**
 *
 * @author Anders
 */
public class ComplaintDTO {

    private Integer id;
    private Integer incompleteServiceOrderId;
    private List<WorkType> workTypes;
    private boolean active;

    public ComplaintDTO() {
    }

    public ComplaintDTO(Complaint complaint) {
        this.id = complaint.getId();
        this.incompleteServiceOrderId = complaint.getIncompleteServiceOrder().getId();

        this.workTypes = complaint.getWorkTypes();
        this.active = complaint.isActive();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getIncompleteServiceOrderId() {
        return incompleteServiceOrderId;
    }

    public void setIncompleteServiceOrderId(Integer incompleteServiceOrderId) {
        this.incompleteServiceOrderId = incompleteServiceOrderId;
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
