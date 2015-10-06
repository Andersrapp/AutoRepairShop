package com.ar.hotwiredautorepairshop.controller;

import com.ar.hotwiredautorepairshop.dto.CarStatisticDTO;
import com.ar.hotwiredautorepairshop.dto.CustomerStatisticDTO;
import com.ar.hotwiredautorepairshop.dto.ServiceOrderStatisticDTO;
import com.ar.hotwiredautorepairshop.model.Customer;
import com.ar.hotwiredautorepairshop.repository.CarRepository;
import com.ar.hotwiredautorepairshop.repository.ComplaintRepository;
import com.ar.hotwiredautorepairshop.repository.CustomerRepository;
import com.ar.hotwiredautorepairshop.repository.MechanicRepository;
import com.ar.hotwiredautorepairshop.repository.ServiceOrderRepository;
import com.ar.hotwiredautorepairshop.repository.WorkTypeRepository;
import java.math.BigDecimal;
import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Anders
 */
@RestController
public class StatisticsController {

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

    CustomerStatisticDTO customerStatisticDTO = new CustomerStatisticDTO();
    ServiceOrderStatisticDTO serviceOrderStatisticDTO = new ServiceOrderStatisticDTO();
    CarStatisticDTO carStatisticDTO = new CarStatisticDTO();

    @RequestMapping(value = "/statistics/customer", method = RequestMethod.GET)
    public CustomerStatisticDTO getCustomerStatisticsByDate(
            @RequestParam(value = "startDate") Date startDate,
            @RequestParam(value = "endDate") Date endDate
    ) {

        Iterable<Customer> allCustomers = customerRepository.findAll();

        for (Customer customer : allCustomers) {
            customer.setAge(calculateCustomerAge(customer.getSocialSecurityNumber()));
        }

        List<Customer> listOfMaleCustomersByDate = serviceOrderRepository.getCustomersByDateAndGender(startDate, endDate, "male");
        List<Customer> listOfFemaleCustomersByDate = serviceOrderRepository.getCustomersByDateAndGender(startDate, endDate, "female");

        double males = listOfMaleCustomersByDate.size();
        double females = listOfFemaleCustomersByDate.size();
        double genderPeriodTotal = males + females;
        float maleFloatPercentage = (float) (males / genderPeriodTotal) * 100;
        float femaleFloatPercentage = (float) (females / genderPeriodTotal) * 100;
        BigDecimal malePercentage;
        BigDecimal femalePercentage;
        
        try {
            malePercentage = new BigDecimal(Float.toString(maleFloatPercentage));
            malePercentage = malePercentage.setScale(1, BigDecimal.ROUND_HALF_UP);
        } catch (NumberFormatException e) {
            malePercentage = new BigDecimal(0.0);
        }

        try {
            femalePercentage = new BigDecimal(Float.toString(femaleFloatPercentage));
            femalePercentage = femalePercentage.setScale(1, BigDecimal.ROUND_HALF_UP);
        } catch (NumberFormatException ex) {

            femalePercentage = new BigDecimal(0.0);
        }

        customerStatisticDTO.setFemalePercentage(femalePercentage);
        customerStatisticDTO.setMalePercentage(malePercentage);

        double maleUnder30 = 0;
        double maleUnder50 = 0;
        double maleOver50 = 0;

        for (Customer customer : listOfMaleCustomersByDate) {
            Integer age = customer.getAge();
            if (age < 30) {
                maleUnder30++;
            }
            if (age >= 30 && age < 50) {
                maleUnder50++;
            }
            if (age >= 50) {
                maleOver50++;
            }
        }

        double totalMales = maleUnder30 + maleUnder50 + maleOver50;

        float maleUnder30FloatPercentage = (float) (maleUnder30 / totalMales) * 100;
        float maleUnder50FloatPercentage = (float) (maleUnder50 / totalMales) * 100;
        float maleOver50FloatPercentage = (float) (maleOver50 / totalMales) * 100;
        BigDecimal maleUnder30Percentage;
        BigDecimal maleUnder50Percentage;
        BigDecimal maleOver50Percentage;
        try {
            maleUnder30Percentage = new BigDecimal(Float.toString(maleUnder30FloatPercentage));
            maleUnder30Percentage = maleUnder30Percentage.setScale(1, BigDecimal.ROUND_HALF_UP);
            maleUnder50Percentage = new BigDecimal(Float.toString(maleUnder50FloatPercentage));
            maleUnder50Percentage = maleUnder50Percentage.setScale(1, BigDecimal.ROUND_HALF_UP);
            maleOver50Percentage = new BigDecimal(Float.toString(maleOver50FloatPercentage));
            maleOver50Percentage = maleOver50Percentage.setScale(1, BigDecimal.ROUND_HALF_UP);
        } catch (NumberFormatException e) {
            maleUnder30Percentage = new BigDecimal(0.0);
            maleUnder50Percentage = new BigDecimal(0.0);
            maleOver50Percentage = new BigDecimal(0.0);
        }
        customerStatisticDTO.setMaleUnder30Percentage(maleUnder30Percentage);
        customerStatisticDTO.setMaleUnder50Percentage(maleUnder50Percentage);
        customerStatisticDTO.setMaleOver50Percentage(maleOver50Percentage);

        double femaleUnder30 = 0;
        double femaleUnder50 = 0;
        double femaleOver50 = 0;

        for (Customer customer : listOfFemaleCustomersByDate) {
            Integer age = customer.getAge();
            if (age >= 50) {
                femaleOver50++;
            }
            if (age >= 30 && age < 50) {
                femaleUnder50++;
            }
            if (age < 30) {
                femaleUnder30++;
            }
        }

        double totalfemales = femaleUnder30 + femaleUnder50 + femaleOver50;

        float femaleUnder30FloatPercentage = (float) (femaleUnder30 / totalfemales) * 100;
        float femaleUnder50FloatPercentage = (float) (femaleUnder50 / totalfemales) * 100;
        float femaleOver50FloatPercentage = (float) (femaleOver50 / totalfemales) * 100;
        BigDecimal femaleUnder30Percentage;
        BigDecimal femaleUnder50Percentage;
        BigDecimal femaleOver50Percentage;
        try {
            femaleUnder30Percentage = new BigDecimal(Float.toString(femaleUnder30FloatPercentage));
            femaleUnder30Percentage = femaleUnder30Percentage.setScale(1, BigDecimal.ROUND_HALF_UP);
            femaleUnder50Percentage = new BigDecimal(Float.toString(femaleUnder50FloatPercentage));
            femaleUnder50Percentage = femaleUnder50Percentage.setScale(1, BigDecimal.ROUND_HALF_UP);
            femaleOver50Percentage = new BigDecimal(Float.toString(femaleOver50FloatPercentage));
            femaleOver50Percentage = femaleOver50Percentage.setScale(1, BigDecimal.ROUND_HALF_UP);
        } catch (NumberFormatException e) {
            femaleUnder30Percentage = new BigDecimal(0.0);
            femaleUnder50Percentage = new BigDecimal(0.0);
            femaleOver50Percentage = new BigDecimal(0.0);
        }
        Integer customerPeriodTotal = serviceOrderRepository.getDistinctCustomersByDate(startDate, endDate);
        Integer customerTotal = customerRepository.getTotalNumberOfCustomers();
        customerStatisticDTO.setCustomerTotalCount(customerTotal);

        customerStatisticDTO.setFemaleUnder30Percentage(femaleUnder30Percentage);
        customerStatisticDTO.setFemaleUnder50Percentage(femaleUnder50Percentage);
        customerStatisticDTO.setFemaleOver50Percentage(femaleOver50Percentage);

        customerStatisticDTO.setCustomerPeriodCount(customerPeriodTotal);
        return customerStatisticDTO;
    }

    @RequestMapping(value = "/statistics/serviceOrder", method = RequestMethod.GET)
    public ServiceOrderStatisticDTO getServiceOrderStatistic(@RequestParam(value = "startDate") Date startDate,
            @RequestParam(value = "endDate") Date endDate) {

        Integer serviceOrderPeriodCount = serviceOrderRepository.getNumberOfServiceOrders(startDate, endDate);
        serviceOrderStatisticDTO.setServiceOrderPeriodCount(serviceOrderPeriodCount);

        Integer serviceOrderTotalCount = serviceOrderRepository.getTotalNumberOfServiceOrders();
        serviceOrderStatisticDTO.setServiceOrderTotalCount(serviceOrderTotalCount);

        Integer totalIncome = 0;
        List<Integer> totalPrices = serviceOrderRepository.getTotalIncomeByDate(startDate, endDate);
        for (Integer totalPrice : totalPrices) {
            totalIncome += totalPrice;
        }
        serviceOrderStatisticDTO.setTotalIncome(totalIncome);
        return serviceOrderStatisticDTO;
    }

    @RequestMapping(value = "/statistics/car", method = RequestMethod.GET)
    public CarStatisticDTO getCarStatistic(@RequestParam(value = "startDate") Date startDate,
            @RequestParam(value = "endDate") Date endDate) {

        Integer numberOfCars = carRepository.getTotalNumberOfCars();
        carStatisticDTO.setCarsTotalCount(numberOfCars);

        Integer brandsTotalCount = carRepository.getNumberOfBrands();
        carStatisticDTO.setBrandsTotalCount(brandsTotalCount);

        return carStatisticDTO;
    }

    public Integer calculateCustomerAge(String socialSecurityNumber) {

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
