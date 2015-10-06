package com.ar.hotwiredautorepairshop.controller;

import com.ar.hotwiredautorepairshop.model.Mechanic;
import com.ar.hotwiredautorepairshop.model.ServiceOrder;
import com.ar.hotwiredautorepairshop.repository.CarRepository;
import com.ar.hotwiredautorepairshop.repository.MechanicRepository;
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
public class MechanicController {

    @Autowired
    MechanicRepository mechanicRepository;

    @Autowired
    CarRepository carRepository;

    @Autowired
    ServiceOrderRepository serviceOrderRepository;

    @RequestMapping(value = "/mechanics", method = RequestMethod.GET)
    public Iterable<Mechanic> getAll() {
        return mechanicRepository.findAll();
    }

    @RequestMapping(value = "/mechanics/register/new", method = RequestMethod.POST)
    public void registerMechanic(
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
        Mechanic newMechanic = new Mechanic();
        newMechanic.setSocialSecurityNumber(socialSecurityNumber);
        newMechanic.setFirstName(firstName);
        newMechanic.setLastName(lastName);
        newMechanic.setStreetAddress(streetAddress);
        newMechanic.setZipCode(zipCode);
        newMechanic.setCity(city);
        newMechanic.setPhoneNumber(phoneNumber);
        newMechanic.setEmail(email);
        newMechanic.setGender(gender);
        mechanicRepository.save(newMechanic);
    }

    @RequestMapping(value = "/mechanics/update", method = RequestMethod.PUT)
    public Mechanic updateMechanic(@RequestBody Mechanic mechanic) {
        Mechanic newMechanic = mechanicRepository.findOne(mechanic.getSocialSecurityNumber());
        newMechanic.setSocialSecurityNumber(mechanic.getSocialSecurityNumber());
        newMechanic.setFirstName(mechanic.getFirstName());
        newMechanic.setLastName(mechanic.getLastName());
        newMechanic.setStreetAddress(mechanic.getStreetAddress());
        newMechanic.setZipCode(mechanic.getZipCode());
        newMechanic.setCity(mechanic.getCity());
        newMechanic.setPhoneNumber(mechanic.getPhoneNumber());
        newMechanic.setEmail(mechanic.getEmail());
        newMechanic.setGender(mechanic.getGender());
        mechanicRepository.save(newMechanic);
        return newMechanic;
    }

    @RequestMapping(value = "/mechanics/check/{socialSecurityNumber}", method = RequestMethod.GET)
    public Boolean checkIfMechanicExistsBySocialSecurityNumber(@PathVariable String socialSecurityNumber) {

        return mechanicRepository.exists(socialSecurityNumber);
    }

    @RequestMapping(value = "/mechanics/find/{socialSecurityNumber}", method = RequestMethod.GET)
    public Mechanic getOneMechanicBySocialSecurityNumber(@PathVariable String socialSecurityNumber) {
        return mechanicRepository.findOne(socialSecurityNumber);
    }

    @RequestMapping(value = "/mechanics/delete/{socialSecurityNumber}", method = RequestMethod.DELETE)
    public boolean deleteMechanicBySocialSecurityNumber(@PathVariable String socialSecurityNumber) {

        boolean customerExists = mechanicRepository.exists(socialSecurityNumber);
        List<ServiceOrder> mechanicServiceOrders = serviceOrderRepository.getServiceOrdersByMechanicSSN(socialSecurityNumber);
        if (customerExists && mechanicServiceOrders.size() == 0) {
            mechanicRepository.delete(socialSecurityNumber);
            return true;
        }
        return false;
    }
}
