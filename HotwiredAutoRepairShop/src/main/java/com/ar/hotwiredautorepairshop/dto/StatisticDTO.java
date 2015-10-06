package com.ar.hotwiredautorepairshop.dto;

import java.math.BigDecimal;

/**
 *
 * @author Anders
 */
public class StatisticDTO {

    private double customerTotalCount;
    private double customerPeriodCount;
    private BigDecimal femalePercentage;
    private BigDecimal malePercentage;
    private BigDecimal maleUnder30Percentage;
    private BigDecimal maleUnder50Percentage;
    private BigDecimal maleOver50Percentage;
    private BigDecimal femaleUnder30Percentage;
    private BigDecimal femaleUnder50Percentage;
    private BigDecimal femaleOver50Percentage;
    private Integer numberOfServiceOrders;
    private Integer carCount;
    private Integer totalIncome;
    private Integer chosenWorkTypeCount;

    public double getCustomerTotalCount() {
        return customerTotalCount;
    }

    public void setCustomerTotalCount(double customerTotalCount) {
        this.customerTotalCount = customerTotalCount;
    }

    public double getCustomerPeriodCount() {
        return customerPeriodCount;
    }

    public void setCustomerPeriodCount(double customerPeriodCount) {
        this.customerPeriodCount = customerPeriodCount;
    }

    public BigDecimal getFemalePercentage() {
        return femalePercentage;
    }

    public void setFemalePercentage(BigDecimal femalePercentage) {
        this.femalePercentage = femalePercentage;
    }

    public BigDecimal getMalePercentage() {
        return malePercentage;
    }

    public void setMalePercentage(BigDecimal malePercentage) {
        this.malePercentage = malePercentage;
    }

    public BigDecimal getMaleUnder30Percentage() {
        return maleUnder30Percentage;
    }

    public void setMaleUnder30Percentage(BigDecimal maleUnder30Percentage) {
        this.maleUnder30Percentage = maleUnder30Percentage;
    }

    public BigDecimal getMaleUnder50Percentage() {
        return maleUnder50Percentage;
    }

    public void setMaleUnder50Percentage(BigDecimal maleUnder50Percentage) {
        this.maleUnder50Percentage = maleUnder50Percentage;
    }

    public BigDecimal getMaleOver50Percentage() {
        return maleOver50Percentage;
    }

    public void setMaleOver50Percentage(BigDecimal maleOver50Percentage) {
        this.maleOver50Percentage = maleOver50Percentage;
    }

    public BigDecimal getFemaleUnder30Percentage() {
        return femaleUnder30Percentage;
    }

    public void setFemaleUnder30Percentage(BigDecimal femaleUnder30Percentage) {
        this.femaleUnder30Percentage = femaleUnder30Percentage;
    }

    public BigDecimal getFemaleUnder50Percentage() {
        return femaleUnder50Percentage;
    }

    public void setFemaleUnder50Percentage(BigDecimal femaleUnder50Percentage) {
        this.femaleUnder50Percentage = femaleUnder50Percentage;
    }

    public BigDecimal getFemaleOver50Percentage() {
        return femaleOver50Percentage;
    }

    public void setFemaleOver50Percentage(BigDecimal femaleOver50Percentage) {
        this.femaleOver50Percentage = femaleOver50Percentage;
    }

    public void setNumberOfServiceOrders(Integer numberOfServiceOrders) {
        this.numberOfServiceOrders = numberOfServiceOrders;
    }

    public Integer getNumberOfServiceOrders() {
        return numberOfServiceOrders;
    }

    public Integer getCarCount() {
        return carCount;
    }

    public void setCarCount(Integer carCount) {
        this.carCount = carCount;
    }

    public Integer getTotalIncome() {
        return totalIncome;
    }

    public void setTotalIncome(Integer totalIncome) {
        this.totalIncome = totalIncome;
    }

    public Integer getChosenWorkTypeCount() {
        return chosenWorkTypeCount;
    }

    public void setChosenWorkTypeCount(Integer chosenWorkTypeCount) {
        this.chosenWorkTypeCount = chosenWorkTypeCount;
    }

}