package com.ar.hotwiredautorepairshop.controller;

import com.ar.hotwiredautorepairshop.dto.ServiceOrderDTO;
import com.ar.hotwiredautorepairshop.model.Car;
import com.ar.hotwiredautorepairshop.model.Complaint;
import com.ar.hotwiredautorepairshop.model.Customer;
import com.ar.hotwiredautorepairshop.model.Mechanic;
import com.ar.hotwiredautorepairshop.model.ServiceOrder;
import com.ar.hotwiredautorepairshop.model.WorkType;
import com.ar.hotwiredautorepairshop.repository.CarRepository;
import com.ar.hotwiredautorepairshop.repository.ComplaintRepository;
import com.ar.hotwiredautorepairshop.repository.CustomerRepository;
import com.ar.hotwiredautorepairshop.repository.MechanicRepository;
import com.ar.hotwiredautorepairshop.repository.ServiceOrderRepository;
import com.ar.hotwiredautorepairshop.repository.WorkTypeRepository;
import java.sql.Date;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Anders
 */
@RestController
public class ServiceOrderController {

    @Autowired
    ServiceOrderRepository serviceOrderRepository;

    @Autowired
    CarRepository carRepository;

    @Autowired
    CustomerRepository customerRepository;

    @Autowired
    MechanicRepository mechanicRepository;

    @Autowired
    WorkTypeRepository workTypeRepository;

    @Autowired
    ComplaintRepository complaintRepository;

    @RequestMapping(value = "/serviceOrders", method = RequestMethod.GET)
    public Iterable<ServiceOrder> getAll() {
        return serviceOrderRepository.findAll();
    }

    @RequestMapping(value = "/serviceOrders/register/new", method = RequestMethod.POST)
    public ServiceOrder registerServiceOrder(
            @RequestParam(value = "customerSSN") String customerSSN,
            @RequestParam(value = "licensePlate") String licensePlate,
            @RequestParam(value = "mechanicSSN") String mechanicSSN,
            @RequestParam(value = "serviceDate") String serviceDate,
            @RequestParam(value = "pickupDate") String pickupDate,
            @RequestParam(value = "workTypeIds") List<String> workTypeIds,
            @RequestParam(value = "complaintId") Integer complaintId
    ) {
        ServiceOrder newServiceOrder = new ServiceOrder();
        java.util.Date utilDate = new java.util.Date();
        Date registrationDate = new Date(utilDate.getTime());
        newServiceOrder.setRegistrationDate(registrationDate);

        Customer customer = customerRepository.findOne(customerSSN);
        Mechanic mechanic = mechanicRepository.findOne(mechanicSSN);
        Car car = carRepository.findOne(licensePlate);

        if (!mechanic.getCarsInProgress().contains(car)) {
            mechanic.getCarsInProgress().add(car);
        }

        if (complaintId != null) {
            newServiceOrder.setComplaint(complaintRepository.findOne(complaintId));
        }

        newServiceOrder.setCustomer(customer);
        newServiceOrder.setCar(car);

        newServiceOrder.setMechanic(mechanic);
        newServiceOrder.setServiceDate(Date.valueOf(serviceDate));
        newServiceOrder.setPickupDate(Date.valueOf(pickupDate));
        int totalPrice = 0;

        for (String workTypeId : workTypeIds) {
            WorkType workType = workTypeRepository.findOne(Integer.parseInt(workTypeId));
            newServiceOrder.getWorkTypes().add(workType);
            totalPrice += workType.getPrice();
        }
        newServiceOrder.setTotalPrice(totalPrice);
        newServiceOrder.setActive(true);
        serviceOrderRepository.save(newServiceOrder);

        return newServiceOrder;
    }

    @RequestMapping(value = "/serviceOrders/register/newFromComplaint", method = RequestMethod.POST)
    public ServiceOrder registerServiceOrderFromComplaint(
            @RequestParam(value = "serviceOrderId") Integer serviceOrderId,
            @RequestParam(value = "complaintId") Integer complaintId
    ) {
        ServiceOrder oldServiceOrder = serviceOrderRepository.findOne(serviceOrderId);
        ServiceOrder newServiceOrder = new ServiceOrder();

        java.util.Date utilDate = new java.util.Date();
        Date registrationDate = new Date(utilDate.getTime());
        newServiceOrder.setRegistrationDate(registrationDate);

        String customerSSN = oldServiceOrder.getCustomer().getSocialSecurityNumber();
        String mechanicSSN = oldServiceOrder.getMechanic().getSocialSecurityNumber();
        String licensePlate = oldServiceOrder.getCar().getLicensePlate();
        Customer customer = customerRepository.findOne(customerSSN);
        Mechanic mechanic = mechanicRepository.findOne(mechanicSSN);
        Car car = carRepository.findOne(licensePlate);

        if (!mechanic.getCarsInProgress().contains(car)) {
            mechanic.getCarsInProgress().add(car);
        }

        Complaint complaint = complaintRepository.findOne(complaintId);
        complaint.setActive(false);
        newServiceOrder.setComplaint(complaint);

        newServiceOrder.setCustomer(customer);
        newServiceOrder.setCar(car);
        newServiceOrder.setMechanic(mechanic);

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(registrationDate);
        calendar.add(Calendar.DATE, 7);

        Date serviceDate = new Date(calendar.getTimeInMillis());

        calendar.setTime(serviceDate);
        calendar.add(Calendar.DATE, 7);

        Date pickUpDate = new Date(calendar.getTimeInMillis());

        newServiceOrder.setServiceDate(serviceDate);
        newServiceOrder.setPickupDate(pickUpDate);
        int totalPrice = 0;

        for (WorkType workType : complaint.getWorkTypes()) {
            newServiceOrder.getWorkTypes().add(workType);
            totalPrice += workType.getPrice();
        }
        newServiceOrder.setTotalPrice(totalPrice);
        newServiceOrder.setActive(true);
        serviceOrderRepository.save(newServiceOrder);

        return newServiceOrder;
    }

    @RequestMapping(value = "/serviceOrders/find/{serviceOrderId}", method = RequestMethod.GET)
    public ServiceOrderDTO getOneServiceOrderById(@PathVariable Integer serviceOrderId) {
        ServiceOrder serviceOrder = serviceOrderRepository.findOne(serviceOrderId);

        ServiceOrderDTO serviceOrderDTO = new ServiceOrderDTO(serviceOrder);

        return serviceOrderDTO;
    }

    @RequestMapping(value = "/serviceOrders/deleteByServiceOrderId/{serviceOrderId}", method = RequestMethod.DELETE)
    public void deleteOneServiceOrderById(@PathVariable Integer serviceOrderId) {

        ServiceOrder serviceOrderToBeDeleted = serviceOrderRepository.findOne(serviceOrderId);
        Mechanic mechanic = serviceOrderToBeDeleted.getMechanic();
        mechanic.getCarsInProgress().remove(serviceOrderToBeDeleted.getCar());
        serviceOrderToBeDeleted.getWorkTypes().clear();
        serviceOrderRepository.delete(serviceOrderId);
    }

    @RequestMapping(value = "/serviceOrders/check/{serviceOrderId}", method = RequestMethod.GET)
    public Boolean checkIfServiceOrderExists(@PathVariable Integer serviceOrderId) {
        return serviceOrderRepository.exists(serviceOrderId);
    }

    @RequestMapping(value = "/serviceOrders/findbylicenseplate/{licensePlate}", method = RequestMethod.GET)
    public List<ServiceOrder> getAllServiceOrdersByLicensePlate(@PathVariable String licensePlate) {

        return serviceOrderRepository.getServiceOrdersByLicensePlate(licensePlate);
    }

    @RequestMapping(value = "/serviceOrders/findCustomerByServiceOrderId/{serviceOrderId}", method = RequestMethod.GET)
    public Customer getCustomerByServiceOrderId(@PathVariable Integer serviceOrderId) {

        return serviceOrderRepository.getCustomerByServiceOrderId(serviceOrderId);
    }

    @RequestMapping(value = "/serviceOrders/findMechanicByServiceOrderId/{serviceOrderId}", method = RequestMethod.GET)
    public Mechanic getMechanicByServiceOrderId(@PathVariable Integer serviceOrderId) {

        return serviceOrderRepository.getMechanicByServiceOrderId(serviceOrderId);
    }

    @RequestMapping(value = "/serviceOrders/findCarByServiceOrderId/{serviceOrderId}", method = RequestMethod.GET)
    public Mechanic getCarByServiceOrderId(@PathVariable Integer serviceOrderId) {

        return serviceOrderRepository.getMechanicByServiceOrderId(serviceOrderId);
    }

    @RequestMapping(value = "/serviceOrders/findWorkTypeIdsByServiceOrderId/{serviceOrderId}", method = RequestMethod.GET)
    public List<Integer> getWorkTypeIdsByServiceOrderId(@PathVariable Integer serviceOrderId) {
        List<Integer> workTypeIds = new ArrayList<>();
        List<WorkType> workTypes = serviceOrderRepository.getWorkTypesByServiceOrderId(serviceOrderId);
        for (WorkType workType : workTypes) {
            workTypeIds.add(workType.getId());
        }
        return workTypeIds;
    }

    @RequestMapping(value = "/serviceOrders/findWorkTypesByServiceOrderId/{serviceOrderId}", method = RequestMethod.GET)
    public Iterable<WorkType> getWorkTypesByServiceOrderId(@PathVariable Integer serviceOrderId) {

        return serviceOrderRepository.getWorkTypesByServiceOrderId(serviceOrderId);
    }

    @RequestMapping(value = "/serviceOrders/findWorkTypesByComplaintId/{complaintId}", method = RequestMethod.GET)
    public Iterable<WorkType> getWorkTypesByComplaintId(@PathVariable Integer complaintId) {

        Integer serviceOrderId = serviceOrderRepository.getServiceOrderIdByComplaintId(complaintId);
        return serviceOrderRepository.getWorkTypesByServiceOrderId(serviceOrderId);
    }

    @RequestMapping(value = "/serviceOrders/update", method = RequestMethod.PUT)
    public
            //            @ResponseBody
            ServiceOrderDTO updateServiceOrder(
                    @RequestBody ServiceOrderDTO serviceOrderDTO
            ) {

        Integer serviceOrderId = 0;
        if (serviceOrderDTO.getId() == null) {
            String licensePlate = serviceOrderDTO.getLicensePlate();
            serviceOrderId = serviceOrderRepository.getServiceOrderIdByLicensePlate(licensePlate);
        } else {
            serviceOrderId = serviceOrderDTO.getId();
        }

        ServiceOrder serviceOrderToBeUpdated = serviceOrderRepository.findOne(serviceOrderId);
        if (serviceOrderToBeUpdated.isActive()) {

            boolean active = serviceOrderDTO.isActive();
            serviceOrderToBeUpdated.setServiceDate(serviceOrderDTO.getServiceDate());
            serviceOrderToBeUpdated.setPickupDate(serviceOrderDTO.getPickupDate());
            serviceOrderToBeUpdated.setActive(active);

            int updatedPrice = 0;
            serviceOrderToBeUpdated.getWorkTypes().clear();

            for (Integer workTypeId : serviceOrderDTO.getWorkTypeIds()) {
                WorkType workType = workTypeRepository.findOne(workTypeId);
                serviceOrderToBeUpdated.getWorkTypes().add(workType);
                updatedPrice += workType.getPrice();
            }

            String updatedMechanicSSN = serviceOrderDTO.getMechanicSSN();
            Mechanic currentMechanic = serviceOrderRepository.getMechanicByServiceOrderId(serviceOrderId);
            String currentMechanicSSN = currentMechanic.getSocialSecurityNumber();
            Car car = serviceOrderRepository.getCarByServiceOrderId(serviceOrderId);

            if (!updatedMechanicSSN.equals(currentMechanicSSN)) {
                currentMechanic.getCarsInProgress().remove(car);
                mechanicRepository.save(currentMechanic);

                Mechanic updatedMechanic = mechanicRepository.findOne(updatedMechanicSSN);
                serviceOrderToBeUpdated.setMechanic(updatedMechanic);
                updatedMechanic.getCarsInProgress().add(car);
                mechanicRepository.save(updatedMechanic);
            }

            if (!active) {
                currentMechanic.getCarsInProgress().remove(car);
                mechanicRepository.save(currentMechanic);
            }

            serviceOrderToBeUpdated.setTotalPrice(updatedPrice);
            serviceOrderRepository.save(serviceOrderToBeUpdated);
        }
        return new ServiceOrderDTO(serviceOrderToBeUpdated);
    }
}
