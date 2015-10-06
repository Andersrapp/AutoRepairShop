package com.ar.hotwiredautorepairshop.dto;

import com.ar.hotwiredautorepairshop.model.ServiceOrder;
import com.ar.hotwiredautorepairshop.model.WorkType;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Anders
 */
public class ServiceOrderDTO {

    private Integer id;
    private Date registrationDate;
    private String customerSSN;
    private String mechanicSSN;
    private String licensePlate;
    private Integer complaintId;
    private Date serviceDate;
    private Date pickupDate;
    private List<Integer> workTypeIds = new ArrayList<>();
    private boolean active;

    public ServiceOrderDTO() {
    }

    public ServiceOrderDTO(ServiceOrder serviceOrder) {
        this.id = serviceOrder.getId();
        this.registrationDate = serviceOrder.getRegistrationDate();
        this.customerSSN = serviceOrder.getCustomer().getSocialSecurityNumber();
        this.mechanicSSN = serviceOrder.getMechanic().getSocialSecurityNumber();
        this.licensePlate = serviceOrder.getCar().getLicensePlate();
        this.serviceDate = serviceOrder.getServiceDate();
        this.pickupDate = serviceOrder.getPickupDate();
        this.active = serviceOrder.isActive();
        try {
            this.complaintId = serviceOrder.getComplaint().getId();
        } catch (NullPointerException e) {
            this.complaintId = null;
        }
        for (WorkType workType : serviceOrder.getWorkTypes()) {
            this.getWorkTypeIds().add(workType.getId());
        }
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public List<Integer> getWorkTypeIds() {
        return workTypeIds;
    }

    public void setWorkTypeIds(List<Integer> workTypeIds) {
        this.workTypeIds = workTypeIds;
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

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public String getCustomerSSN() {
        return customerSSN;
    }

    public void setCustomerSSN(String customerSSN) {
        this.customerSSN = customerSSN;
    }

    public Integer getComplaintId() {
        return complaintId;
    }

    public void setComplaintId(Integer complaintId) {
        this.complaintId = complaintId;
    }

    public String getMechanicSSN() {
        return mechanicSSN;
    }

    public void setMechanicSSN(String mechanicSSN) {
        this.mechanicSSN = mechanicSSN;
    }

    public String getLicensePlate() {
        return licensePlate;
    }

    public void setLicensePlate(String licensePlate) {
        this.licensePlate = licensePlate;
    }

    public Date getRegistrationDate() {
        return registrationDate;
    }

    public void setRegistrationDate(Date registrationDate) {
        this.registrationDate = registrationDate;
    }
}
