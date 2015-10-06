package com.ar.hotwiredautorepairshop.repository;

import com.ar.hotwiredautorepairshop.model.Customer;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Anders
 */
@Repository
public interface CustomerRepository extends CrudRepository<Customer, String> {

    @Query("SELECT customer FROM Customer customer JOIN customer.ownedCars AS cc WHERE cc.licensePlate = :licensePlate")
    public Customer getCustomerByLicensePlate(@Param(value = "licensePlate") String licensePlate);

    @Query("SELECT customer.socialSecurityNumber FROM Customer customer JOIN customer.ownedCars AS cc WHERE cc.licensePlate = :licensePlate")
    public String getCustomerSocialSecurityNumberByLicensePlate(@Param(value = "licensePlate") String licensePlate);

    @Query("Select count(customer) FROM Customer customer where gender = 'male'")
    public Integer getTotalNumberOfMales();

    @Query("Select count(customer) FROM Customer customer where gender = 'female'")
    public Integer getTotalNumberOfFemales();

    @Query("Select count(customer) FROM Customer customer")
    public Integer getTotalNumberOfCustomers();
}
