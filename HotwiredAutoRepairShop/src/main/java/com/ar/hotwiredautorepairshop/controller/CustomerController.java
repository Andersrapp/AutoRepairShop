package com.ar.hotwiredautorepairshop.controller;

import com.ar.hotwiredautorepairshop.model.Car;
import com.ar.hotwiredautorepairshop.model.Customer;
import com.ar.hotwiredautorepairshop.model.ServiceOrder;
import com.ar.hotwiredautorepairshop.repository.CarRepository;
import com.ar.hotwiredautorepairshop.repository.CustomerRepository;
import com.ar.hotwiredautorepairshop.repository.ServiceOrderRepository;
import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
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
public class CustomerController {

    @Autowired
    CustomerRepository customerRepository;

    @Autowired
    CarRepository carRepository;

    @Autowired
    ServiceOrderRepository serviceOrderRepository;

    @RequestMapping(value = "/customers", method = RequestMethod.GET)
    public Iterable<Customer> getAll() {
        return customerRepository.findAll();
    }

    @RequestMapping(value = "/customers/register/new", method = RequestMethod.POST)
    public boolean registerCustomer(
            @RequestParam(value = "socialSecurityNumber") String socialSecurityNumber,
            @RequestParam(value = "firstName") String firstName,
            @RequestParam(value = "lastName") String lastName,
            @RequestParam(value = "streetAddress") String streetAddress,
            @RequestParam(value = "zipCode") String zipCode,
            @RequestParam(value = "city") String city,
            @RequestParam(value = "phoneNumber") String phoneNumber,
            @RequestParam(value = "email") String email,
            @RequestParam(value = "gender") String gender
    ) {

        Customer newCustomer = new Customer();
        newCustomer.setSocialSecurityNumber(socialSecurityNumber);
        newCustomer.setFirstName(firstName);
        newCustomer.setLastName(lastName);
        newCustomer.setStreetAddress(streetAddress);
        newCustomer.setZipCode(zipCode);
        newCustomer.setCity(city);
        newCustomer.setPhoneNumber(phoneNumber);
        newCustomer.setEmail(email);

        if (gender.equals("male") || gender.equals("female")) {
            newCustomer.setGender(gender);
        } else {
            return false;
        }
        Integer customerAge = calculateAge(socialSecurityNumber);
        newCustomer.setAge(customerAge);
        customerRepository.save(newCustomer);

        return true;
    }

    @RequestMapping(value = "/customers/update", method = RequestMethod.PUT)
    public boolean updateCustomer(@RequestBody Customer customer) {
        Customer customerToBeUpdated = customerRepository.findOne(customer.getSocialSecurityNumber());
        customerToBeUpdated.setSocialSecurityNumber(customer.getSocialSecurityNumber());
        customerToBeUpdated.setFirstName(customer.getFirstName());
        customerToBeUpdated.setLastName(customer.getLastName());
        customerToBeUpdated.setStreetAddress(customer.getStreetAddress());
        customerToBeUpdated.setZipCode(customer.getZipCode());
        customerToBeUpdated.setCity(customer.getCity());
        customerToBeUpdated.setPhoneNumber(customer.getPhoneNumber());
        customerToBeUpdated.setEmail(customer.getEmail());

        String gender = customer.getGender();
        if (gender.equals("male") || gender.equals("female")) {
            customerToBeUpdated.setGender(gender);
        } else {
            return false;
        }

        customerRepository.save(customerToBeUpdated);
        return true;
    }

    @RequestMapping(value = "/customers/check/{socialSecurityNumber}", method = RequestMethod.GET)
    public Boolean checkIfCustomerExistsBySocialSecurityNumber(@PathVariable String socialSecurityNumber) {

        return customerRepository.exists(socialSecurityNumber);
    }

    @RequestMapping(value = "/customers/find/{socialSecurityNumber}", method = RequestMethod.GET)
    public Customer getOneCustomerBySocialSecurityNumber(@PathVariable String socialSecurityNumber) {
        return customerRepository.findOne(socialSecurityNumber);
    }

    @RequestMapping(value = "/customers/findByLicensePlate/{licensePlate}", method = RequestMethod.GET)
    public Customer getCustomerNumberByLicensePlate(@PathVariable String licensePlate) {
        return customerRepository.getCustomerByLicensePlate(licensePlate);
    }

    @RequestMapping(value = "/customers/findCustomerSSNByLicensePlate/{licensePlate}", method = RequestMethod.GET)
    public String getCustomerSSNByLicensePlate(@PathVariable String licensePlate) {
        return customerRepository.getCustomerSocialSecurityNumberByLicensePlate(licensePlate);
    }

    @RequestMapping(value = "/customers/delete/{socialSecurityNumber}", method = RequestMethod.DELETE)
    public boolean deleteCustomerBySocialSecurityNumber(@PathVariable String socialSecurityNumber) {

        Customer customerToBeDeleted = customerRepository.findOne(socialSecurityNumber);
        List<Car> customersOwnedCars = customerToBeDeleted.getOwnedCars();
        boolean customerExists = customerRepository.exists(socialSecurityNumber);
        List<ServiceOrder> customerServiceOrders = serviceOrderRepository.getServiceOrdersByCustomerSSN(socialSecurityNumber);

        if (customerExists && customerServiceOrders.size() == 0) {
            customerRepository.delete(socialSecurityNumber);
            for (Car carToBeDeleted : customersOwnedCars) {
                carRepository.delete(carToBeDeleted);
            }
            return true;
        }
        return false;
    }

    @RequestMapping(value = "/customers/delete/cars/{socialSecurityNumber}", method = RequestMethod.DELETE)
    public void deleteCustomerAndCustomersCars(@PathVariable String socialSecurityNumber) {

        if (customerRepository.exists(socialSecurityNumber)) {
            Customer customerToBeDeleted = customerRepository.findOne(socialSecurityNumber);
            for (Car c : customerToBeDeleted.getOwnedCars()) {
                customerToBeDeleted.getOwnedCars().remove(c);
                carRepository.delete(c);
            }
            customerRepository.delete(customerToBeDeleted);
        }
    }

    private Integer calculateAge(String socialSecurityNumber) {

        socialSecurityNumber = socialSecurityNumber.substring(0, 8);
        java.util.Date dateParsed = new java.util.Date();
        try {
            dateParsed = new SimpleDateFormat("yyyyMMdd").parse(socialSecurityNumber);
        } catch (ParseException e) {
        }
        Date customerDate = new Date(dateParsed.getTime());

        Calendar dateOfBirth = Calendar.getInstance();
        dateOfBirth.setTime(customerDate);
        Calendar today = Calendar.getInstance();
        int age = today.get(Calendar.YEAR) - dateOfBirth.get(Calendar.YEAR);

        if (today.get(Calendar.MONTH) < dateOfBirth.get(Calendar.MONTH)) {
            age--;
        } else if (today.get(Calendar.MONTH) == dateOfBirth.get(Calendar.MONTH)
                && today.get(Calendar.DAY_OF_MONTH) < dateOfBirth.get(Calendar.DAY_OF_MONTH)) {
            age--;
        }
        return age;
    }
}
