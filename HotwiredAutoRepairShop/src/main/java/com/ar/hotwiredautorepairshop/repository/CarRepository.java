package com.ar.hotwiredautorepairshop.repository;

import com.ar.hotwiredautorepairshop.model.Car;
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
public interface CarRepository extends CrudRepository<Car, String> {

//    @Query("DELETE FROM Customer_Car WHERE CUSTOMER_SOCIALSECURITYNUMBER = :socialSecurityNumber")
//    public void deleteCarBySocialSecurityNumber(
//            @Param(value = "socialSecurityNumber") String socialSecurityNumber);
    @Query("SELECT customer FROM Customer customer JOIN customer.ownedCars WHERE licensePlate = :licensePlate")
    public Customer getCustomerByLicensePlate(@Param(value = "licensePlate") String licensePlate);

    @Query("SELECT count(car) FROM Car car")
    public Integer getTotalNumberOfCars();

    @Query("SELECT count(distinct brand) FROM Car car")
    public Integer getNumberOfBrands();
}
