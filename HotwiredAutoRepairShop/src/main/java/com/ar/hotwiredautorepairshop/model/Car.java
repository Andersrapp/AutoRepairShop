package com.ar.hotwiredautorepairshop.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

/**
 *
 * @author Anders
 */
@Entity
public class Car implements Serializable {

    @Id
    private String licensePlate;
    private String brand;
    private String model;
    private String productionYear;
    private String fuelType;
    private Integer mileage;
    @OneToMany(fetch = FetchType.EAGER)
    private List<ServiceOrder> services = new ArrayList<>();

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getProductionYear() {
        return productionYear;
    }

    public void setProductionYear(String productionYear) {
        this.productionYear = productionYear;
    }

    public String getLicensePlate() {
        return licensePlate;
    }

    public void setLicensePlate(String licensePlate) {
        this.licensePlate = licensePlate;
    }

    public String getFuelType() {
        return fuelType;
    }

    public void setFuelType(String fuelType) {
        this.fuelType = fuelType;
    }

    public Integer getMileage() {
        return mileage;
    }

    public void setMileage(Integer mileage) {
        this.mileage = mileage;
    }

    public List<ServiceOrder> getServices() {
        return services;
    }

    public void setServices(List<ServiceOrder> services) {
        this.services = services;
    }

    @Override
    public String toString() {
        return "Car{" + "licensePlate=" + licensePlate + ", brand=" + brand + ", model=" + model + ", productionYear=" + productionYear + ", fuelType=" + fuelType + ", mileage=" + mileage + ", services=" + services + '}';
    }
}
