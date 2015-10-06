package com.ar.hotwiredautorepairshop.repository;

import com.ar.hotwiredautorepairshop.model.Car;
import com.ar.hotwiredautorepairshop.model.Customer;
import com.ar.hotwiredautorepairshop.model.Mechanic;
import com.ar.hotwiredautorepairshop.model.ServiceOrder;
import com.ar.hotwiredautorepairshop.model.WorkType;
import java.sql.Date;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Anders
 */
@Repository
public interface ServiceOrderRepository extends CrudRepository<ServiceOrder, Integer> {

    @Query("SELECT serviceOrder FROM ServiceOrder serviceOrder JOIN serviceOrder.car soc WHERE soc.licensePlate = :licensePlate")
    public List<ServiceOrder> getServiceOrdersByLicensePlate(@Param(value = "licensePlate") String licensePlate);

    @Query("SELECT serviceOrder FROM ServiceOrder serviceOrder JOIN serviceOrder.customer soc WHERE soc.socialSecurityNumber = :customerSSN")
    public List<ServiceOrder> getServiceOrdersByCustomerSSN(@Param(value = "customerSSN") String customerSSN);

    @Query("SELECT serviceOrder FROM ServiceOrder serviceOrder JOIN serviceOrder.mechanic som WHERE som.socialSecurityNumber = :mechanicSSN")
    public List<ServiceOrder> getServiceOrdersByMechanicSSN(@Param(value = "mechanicSSN") String mechanicSSN);

    @Query("SELECT serviceOrder FROM ServiceOrder serviceOrder JOIN serviceOrder.workTypes sow WHERE sow.id = :workTypeId")
    public List<ServiceOrder> getAllServiceOrdersByWorkTypeId(@Param(value = "workTypeId") Integer workTypeId);

    @Query("SELECT serviceOrder.totalPrice FROM ServiceOrder serviceOrder WHERE serviceOrder.pickupDate >= :startDate AND serviceOrder.pickupDate<= :endDate")
    public List<Integer> getServiceOrderPricesForMonth(@Param(value = "startDate") Date startDate, @Param(value = "endDate") Date endDate);

    @Query("SELECT serviceOrder.customer FROM ServiceOrder serviceOrder WHERE serviceOrder.id = :serviceOrderId")
    public Customer getCustomerByServiceOrderId(@Param(value = "serviceOrderId") Integer serviceOrderId);

    @Query("SELECT serviceOrder.mechanic FROM ServiceOrder serviceOrder WHERE serviceOrder.id = :serviceOrderId")
    public Mechanic getMechanicByServiceOrderId(@Param(value = "serviceOrderId") Integer serviceOrderId);

    @Query("SELECT serviceOrder.car FROM ServiceOrder serviceOrder WHERE serviceOrder.id = :serviceOrderId")
    public Car getCarByServiceOrderId(@Param(value = "serviceOrderId") Integer serviceOrderId);

    @Query("SELECT serviceOrder.workTypes FROM ServiceOrder serviceOrder WHERE serviceOrder.id = :serviceOrderId")
    public List<WorkType> getWorkTypesByServiceOrderId(@Param(value = "serviceOrderId") Integer serviceOrderId);

    @Query("SELECT complaint.incompleteServiceOrder.id FROM Complaint complaint WHERE complaint.id = :complaintId")
    public Integer getServiceOrderIdByComplaintId(@Param(value = "complaintId") Integer complaintId);

    @Query("SELECT serviceOrder.id FROM ServiceOrder serviceOrder JOIN serviceOrder.car soc WHERE soc.licensePlate = :licensePlate")
    public Integer getServiceOrderIdByLicensePlate(@Param(value = "licensePlate") String licensePlate);

    @Query("SELECT soc.gender FROM ServiceOrder serviceOrder JOIN serviceOrder.customer soc where serviceOrder.serviceDate > :startDate AND serviceOrder.serviceDate < :endDate")
    public List<String> getAllCustomerGendersFromServiceOrder(@Param(value = "startDate") Date startDate, @Param(value = "endDate") Date endDate);

    @Query("SELECT soc.socialSecurityNumber FROM ServiceOrder serviceOrder JOIN serviceOrder.customer soc where serviceOrder.serviceDate > :startDate AND serviceOrder.serviceDate < :endDate")
    public List<String> getAllSocialSecurityNumbersFromServiceOrder(@Param(value = "startDate") Date startDate, @Param(value = "endDate") Date endDate);

    @Query("SELECT count(serviceOrder) FROM ServiceOrder serviceOrder WHERE serviceOrder.serviceDate > :startDate AND serviceOrder.serviceDate < :endDate")
    public Integer getNumberOfServiceOrders(@Param(value = "startDate") Date startDate, @Param(value = "endDate") Date endDate);

    @Query("SELECT serviceOrder.totalPrice FROM ServiceOrder serviceOrder WHERE serviceOrder.serviceDate > :startDate AND serviceOrder.serviceDate < :endDate")
    public List<Integer> getTotalIncomeByDate(@Param(value = "startDate") Date startDate, @Param(value = "endDate") Date endDate);

    @Query("Select count(customer) FROM ServiceOrder serviceOrder join serviceOrder.customer soc where serviceOrder.pickupDate > :startDate and serviceOrder.pickupDate < :endDate")
    public Integer getTotalNumberOfCustomer();

    @Query("Select soc.socialSecurityNumber FROM ServiceOrder serviceOrder join serviceOrder.customer soc where serviceOrder.pickupDate > :startDate and serviceOrder.pickupDate < :endDate")
    public List<String> getAllSSN(@Param(value = "startDate") Date startDate, @Param(value = "endDate") Date endDate);

    @Query("Select distinct serviceOrder.customer FROM ServiceOrder serviceOrder join serviceOrder.customer soc WHERE soc.gender = :gender AND serviceOrder.pickupDate > :startDate AND serviceOrder.pickupDate < :endDate")
    public List<Customer> getCustomersByDateAndGender(@Param(value = "startDate") Date startDate, @Param(value = "endDate") Date endDate, @Param(value = "gender") String gender);

    @Query("Select count(distinct serviceOrder.customer) FROM ServiceOrder serviceOrder join serviceOrder.customer soc WHERE serviceOrder.pickupDate > :startDate AND serviceOrder.pickupDate < :endDate")
    public Integer getDistinctCustomersByDate(@Param(value = "startDate") Date startDate, @Param(value = "endDate") Date endDate);

    @Query("Select count(serviceOrder) FROM ServiceOrder serviceOrder")
    public Integer getTotalNumberOfServiceOrders();
}
