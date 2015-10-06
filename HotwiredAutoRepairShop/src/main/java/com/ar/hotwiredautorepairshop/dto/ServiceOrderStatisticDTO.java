package com.ar.hotwiredautorepairshop.dto;

import java.math.BigDecimal;

/**
 *
 * @author Anders
 */
public class ServiceOrderStatisticDTO {

    private double serviceOrderTotalCount;
    private double serviceOrderPeriodCount;
    private Integer totalIncome;

    public double getServiceOrderTotalCount() {
        return serviceOrderTotalCount;
    }

    public void setServiceOrderTotalCount(double serviceOrderTotalCount) {
        this.serviceOrderTotalCount = serviceOrderTotalCount;
    }

    public double getServiceOrderPeriodCount() {
        return serviceOrderPeriodCount;
    }

    public void setServiceOrderPeriodCount(double serviceOrderPeriodCount) {
        this.serviceOrderPeriodCount = serviceOrderPeriodCount;
    }

    public Integer getTotalIncome() {
        return totalIncome;
    }

    public void setTotalIncome(Integer totalIncome) {
        this.totalIncome = totalIncome;
    }
}
