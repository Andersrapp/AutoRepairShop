package com.ar.hotwiredautorepairshop.controller;

import com.ar.hotwiredautorepairshop.model.Car;
import com.ar.hotwiredautorepairshop.model.Customer;
import com.ar.hotwiredautorepairshop.model.ServiceOrder;
import com.ar.hotwiredautorepairshop.repository.CarRepository;
import com.ar.hotwiredautorepairshop.repository.CustomerRepository;
import com.ar.hotwiredautorepairshop.repository.ServiceOrderRepository;
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
public class CarController {

    @Autowired
    CarRepository carRepository;

    @Autowired
    CustomerRepository customerRepository;

    @Autowired
    ServiceOrderRepository serviceOrderRepository;

    @RequestMapping(value = "/cars", method = RequestMethod.GET)
    public Iterable<Car> getAll() {
        return carRepository.findAll();
    }

    @RequestMapping(value = "/cars/register/new", method = RequestMethod.POST)
    public boolean registerCar(
            @RequestParam(value = "socialSecurityNumber") String socialSecurityNumber,
            @RequestParam(value = "licensePlate") String licensePlate,
            @RequestParam(value = "brand") String brand,
            @RequestParam(value = "model") String model,
            @RequestParam(value = "productionYear") String productionYear,
            @RequestParam(value = "fuelType") String fuelType,
            @RequestParam(value = "mileage") Integer mileage
    ) 
    {
        Car car = new Car();

        car.setLicensePlate(licensePlate);
        car.setBrand(brand);
        car.setModel(model);
        car.setProductionYear(productionYear);
        car.setFuelType(fuelType);
        car.setMileage(mileage);

        carRepository.save(car);
        Customer customer = customerRepository.findOne(socialSecurityNumber);
        customer.getOwnedCars().add(car);
        customerRepository.save(customer);
        return true;
    }

    @RequestMapping(value = "/cars/update", method = RequestMethod.PUT)
    public Car updateCar(@RequestBody Car car) {
        Car carToBeUpdated = carRepository.findOne(car.getLicensePlate());
        carToBeUpdated.setBrand(car.getBrand());
        carToBeUpdated.setModel(car.getModel());
        carToBeUpdated.setProductionYear(car.getProductionYear());
        carToBeUpdated.setFuelType(car.getFuelType());
        carToBeUpdated.setMileage(car.getMileage());
        carRepository.save(carToBeUpdated);
        return carToBeUpdated;
    }

    @RequestMapping(value = "/cars/check/customer/{socialSecurityNumber}", method = RequestMethod.GET)
    public Boolean checkIfCustomerExistsBySocialSecurityNumber(@PathVariable String socialSecurityNumber) {

        return customerRepository.exists(socialSecurityNumber);
    }

    @RequestMapping(value = "/cars/check/car/{licensePlate}", method = RequestMethod.GET)
    public Boolean checkIfCarExists(@PathVariable String licensePlate) {
        return carRepository.exists(licensePlate);
    }

    @RequestMapping(value = "/cars/check/customercars/{socialSecurityNumber}", method = RequestMethod.GET)
    public Boolean checkIfCustomerHasCars(@PathVariable String socialSecurityNumber) {
        Customer customerToCheckForCars = customerRepository.findOne(socialSecurityNumber);
        if (customerToCheckForCars.getOwnedCars().size() < 1) {
            return false;
        }
        return true;
    }

    @RequestMapping(value = "/cars/findBySocialSecurityNumber/{socialSecurityNumber}", method = RequestMethod.GET)
    public Iterable<Car> getAllCarsBySocialSecurityNumber(@PathVariable String socialSecurityNumber) {
        Customer carOwner = customerRepository.findOne(socialSecurityNumber);

        return carOwner.getOwnedCars();
    }

    @RequestMapping(value = "/cars/findByLicensePlate/{licensePlate}", method = RequestMethod.GET)
    public Car getOneCarByLicensePlate(@PathVariable String licensePlate) {

        return carRepository.findOne(licensePlate);
    }

    @RequestMapping(value = "/cars/delete/{licensePlate}", method = RequestMethod.DELETE)
    public boolean deleteOneCarByLicensePlate(@PathVariable String licensePlate) {
        Customer customer = carRepository.getCustomerByLicensePlate(licensePlate);
        Car carToBeDeleted = carRepository.findOne(licensePlate);
        List<ServiceOrder> serviceOrders = serviceOrderRepository.getServiceOrdersByLicensePlate(licensePlate);
        if (serviceOrders.size() == 0) {
            customer.getOwnedCars().remove(carToBeDeleted);
            customerRepository.save(customer);
            carRepository.delete(carToBeDeleted);
            return true;
        }
        return false;
    }

    @RequestMapping(value = "/cars/delete/all/{socialSecurityNumber}", method = RequestMethod.DELETE)
    public void deleteAllCarsFromCustomer(@PathVariable String licensePlate, String socialSecurityNumber) {

        Customer carOwner = customerRepository.findOne(socialSecurityNumber);

        for (Car c : carOwner.getOwnedCars()) {
            carOwner.getOwnedCars().remove(c);
        }

        customerRepository.save(carOwner);
    }
}