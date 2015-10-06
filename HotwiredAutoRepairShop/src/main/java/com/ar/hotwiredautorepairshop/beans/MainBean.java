package com.ar.hotwiredautorepairshop.beans;

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
import org.springframework.stereotype.Component;
import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import javax.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;

/**
 *
 * @author Anders
 */
@Component
public class MainBean {

    @Autowired
    CustomerRepository customerRepository;

    @Autowired
    MechanicRepository mechanicRepository;

    @Autowired
    CarRepository carRepository;

    @Autowired
    ServiceOrderRepository ServiceOrderRepository;

    @Autowired
    WorkTypeRepository workTypeRepository;

    @Autowired
    ComplaintRepository complaintRepository;

    public MainBean() {
    }

    @PostConstruct
    public void init() {

        Customer customer1 = new Customer();
        String socialSecurityNumber1 = "197607261992";
        customer1.setSocialSecurityNumber(socialSecurityNumber1);
        customer1.setFirstName("Anders");
        customer1.setLastName("Rapp");
        customer1.setStreetAddress("Waernsgatan 3C");
        customer1.setZipCode("41670");
        customer1.setCity("Göteborg");
        customer1.setEmail("anders.rapp@gmail.com");
        customer1.setPhoneNumber("+46703305805");
        customer1.setGender("male");
        customer1.setAge(calculateAge(socialSecurityNumber1));

        Customer customer2 = new Customer();
        String socialSecurityNumber2 = "195912017894";
        customer2.setSocialSecurityNumber(socialSecurityNumber2);
        customer2.setFirstName("Johan");
        customer2.setLastName("Rapp");
        customer2.setStreetAddress("Vårbackegatan 31");
        customer2.setZipCode("76584");
        customer2.setCity("Västerås");
        customer2.setEmail("johan.rapp@gmail.com");
        customer2.setPhoneNumber("+46707895623");
        customer2.setGender("male");
        customer2.setAge(calculateAge(socialSecurityNumber2));

        Customer customer3 = new Customer();
        String socialSecurityNumber3 = "197606132905";
        customer3.setSocialSecurityNumber(socialSecurityNumber3);
        customer3.setFirstName("Kristina");
        customer3.setLastName("Nilsson");
        customer3.setStreetAddress("Waernsgatan 3C");
        customer3.setZipCode("41670");
        customer3.setCity("Göteborg");
        customer3.setEmail("kristina.nilsson76@gmail.com");
        customer3.setPhoneNumber("+46706893068");
        customer3.setGender("female");
        customer3.setAge(calculateAge(socialSecurityNumber3));

        Customer customer4 = new Customer();
        String socialSecurityNumber4 = "194711203102";
        customer4.setSocialSecurityNumber(socialSecurityNumber4);
        customer4.setFirstName("Gunborg");
        customer4.setLastName("Rapp");
        customer4.setStreetAddress("Sjöhagavägen 11");
        customer4.setZipCode("51234");
        customer4.setCity("Borghamn");
        customer4.setEmail("gunborg.rapp@gmail.com");
        customer4.setPhoneNumber("+46707252525");
        customer4.setGender("female");
        customer4.setAge(calculateAge(socialSecurityNumber4));

        Customer customer5 = new Customer();
        String socialSecurityNumber5 = "199005114237";
        customer5.setSocialSecurityNumber(socialSecurityNumber5);
        customer5.setFirstName("Benjamin");
        customer5.setLastName("Bengtsson");
        customer5.setStreetAddress("Furuvägen 43");
        customer5.setZipCode("12345");
        customer5.setCity("Vänersborg");
        customer5.setEmail("benjamin.bengtsson@gmail.com");
        customer5.setPhoneNumber("+46707898989");
        customer5.setGender("male");
        customer5.setAge(calculateAge(socialSecurityNumber5));

        Customer customer6 = new Customer();
        String socialSecurityNumber6 = "196206211345";
        customer6.setSocialSecurityNumber(socialSecurityNumber6);
        customer6.setFirstName("Arnold");
        customer6.setLastName("Schwarzenegger");
        customer6.setStreetAddress("GetOutOfTheWay 321");
        customer6.setZipCode("12345");
        customer6.setCity("Lund");
        customer6.setEmail("arnold.schwarzenegger@gmail.com");
        customer6.setPhoneNumber("+465559989");
        customer6.setGender("male");
        customer6.setAge(calculateAge(socialSecurityNumber6));

        Mechanic mechanic1 = new Mechanic();
        mechanic1.setSocialSecurityNumber("197409231998");
        mechanic1.setFirstName("Eric");
        mechanic1.setLastName("Rapp");
        mechanic1.setStreetAddress("Majsgatan 27");
        mechanic1.setZipCode("32165");
        mechanic1.setCity("Ängelholm");
        mechanic1.setEmail("eric.rapp@gmail.com");
        mechanic1.setPhoneNumber("+46702555666");
        mechanic1.setGender("male");

        Mechanic mechanic2 = new Mechanic();
        mechanic2.setSocialSecurityNumber("198707074563");
        mechanic2.setFirstName("Kalle");
        mechanic2.setLastName("Svensson");
        mechanic2.setStreetAddress("Träskvägen 21");
        mechanic2.setZipCode("98765");
        mechanic2.setCity("Uddevalla");
        mechanic2.setEmail("kalle.svensson@gmail.com");
        mechanic2.setPhoneNumber("+46707444555");
        mechanic2.setGender("male");

        Mechanic mechanic3 = new Mechanic();
        mechanic3.setSocialSecurityNumber("198002151111");
        mechanic3.setFirstName("Nina");
        mechanic3.setLastName("Haugen");
        mechanic3.setStreetAddress("Godisvägen 101");
        mechanic3.setZipCode("41625");
        mechanic3.setCity("Göteborg");
        mechanic3.setEmail("nina.haugen@gmail.com");
        mechanic3.setPhoneNumber("+4670799988");
        mechanic3.setGender("female");

        Car car1 = new Car();
        car1.setLicensePlate("AAA111");
        car1.setBrand("Volvo");
        car1.setModel("X90");
        car1.setProductionYear("2008");
        car1.setFuelType("gasoline");
        car1.setMileage(20000);

        Car car2 = new Car();
        car2.setLicensePlate("BBB111");
        car2.setBrand("Ford");
        car2.setModel("Escort");
        car2.setProductionYear("1989");
        car2.setFuelType("gasoline");
        car2.setMileage(500000);

        Car car3 = new Car();
        car3.setLicensePlate("CCC111");
        car3.setBrand("Ford");
        car3.setModel("Ka");
        car3.setProductionYear("2005");
        car3.setFuelType("gasoline");
        car3.setMileage(2000);

        Car car4 = new Car();
        car4.setLicensePlate("DDD111");
        car4.setBrand("SAAB");
        car4.setModel("9-5");
        car4.setProductionYear("1997");
        car4.setFuelType("diesel");
        car4.setMileage(50000);

        Car car5 = new Car();
        car5.setLicensePlate("EEE111");
        car5.setBrand("Rolls Royce");
        car5.setModel("Bentley");
        car5.setProductionYear("2015");
        car5.setFuelType("gasoline");
        car5.setMileage(1500);

        Car car6 = new Car();
        car6.setLicensePlate("FFF111");
        car6.setBrand("Volvo");
        car6.setModel("340");
        car6.setProductionYear("1981");
        car6.setFuelType("gasoline");
        car6.setMileage(700000);

        Car car7 = new Car();
        car7.setLicensePlate("GGG111");
        car7.setBrand("SAAB");
        car7.setModel("9000");
        car7.setProductionYear("1990");
        car7.setFuelType("diesel");
        car7.setMileage(345700);

        Car car8 = new Car();
        car8.setLicensePlate("HHH111");
        car8.setBrand("Volvo");
        car8.setModel("S70");
        car8.setProductionYear("2001");
        car8.setFuelType("gasoline");
        car8.setMileage(150000);

        Car car9 = new Car();
        car9.setLicensePlate("III111");
        car9.setBrand("Lada");
        car9.setModel("russia");
        car9.setProductionYear("1957");
        car9.setFuelType("diesel");
        car9.setMileage(2250000);

        WorkType workType1 = new WorkType();
        workType1.setDescription("change oil");
        workType1.setPrice(150);

        WorkType workType2 = new WorkType();
        workType2.setDescription("change tires");
        workType2.setPrice(455);

        WorkType workType3 = new WorkType();
        workType3.setDescription("change windshield wipers");
        workType3.setPrice(275);

        WorkType workType4 = new WorkType();
        workType4.setDescription("paint job");
        workType4.setPrice(8995);

        WorkType workType5 = new WorkType();
        workType5.setDescription("fender bender");
        workType5.setPrice(4995);

        WorkType workType6 = new WorkType();
        workType6.setDescription("change carborator");
        workType6.setPrice(2495);

        carRepository.save(car1);
        carRepository.save(car2);
        carRepository.save(car3);
        carRepository.save(car4);
        carRepository.save(car5);
        carRepository.save(car6);
        carRepository.save(car7);
        carRepository.save(car8);
        carRepository.save(car9);

        customer1.getOwnedCars().add(car1);
        customer2.getOwnedCars().add(car2);
        customer3.getOwnedCars().add(car3);
        customer4.getOwnedCars().add(car4);
        customer5.getOwnedCars().add(car5);
        customer4.getOwnedCars().add(car6);
        customer5.getOwnedCars().add(car7);
        customer5.getOwnedCars().add(car8);
        customer6.getOwnedCars().add(car9);

        customerRepository.save(customer1);
        customerRepository.save(customer2);
        customerRepository.save(customer3);
        customerRepository.save(customer4);
        customerRepository.save(customer5);
        customerRepository.save(customer6);

        mechanicRepository.save(mechanic1);
        mechanicRepository.save(mechanic2);
        mechanicRepository.save(mechanic3);

        workTypeRepository.save(workType1);
        workTypeRepository.save(workType2);
        workTypeRepository.save(workType3);
        workTypeRepository.save(workType4);
        workTypeRepository.save(workType5);
        workTypeRepository.save(workType6);

        ServiceOrder serviceOrder1 = new ServiceOrder();
        serviceOrder1.setCustomer(customer1);
        serviceOrder1.setCar(car1);
        serviceOrder1.setMechanic(mechanic3);
        serviceOrder1.setRegistrationDate(Date.valueOf("2015-02-11"));
        serviceOrder1.setServiceDate(Date.valueOf("2015-02-18"));
        serviceOrder1.setPickupDate(Date.valueOf("2015-02-25"));
        serviceOrder1.setActive(false);

        ServiceOrder serviceOrder2 = new ServiceOrder();
        serviceOrder2.setCustomer(customer2);
        serviceOrder2.setCar(car2);
        serviceOrder2.setMechanic(mechanic1);
        serviceOrder2.setRegistrationDate(Date.valueOf("2015-02-11"));
        serviceOrder2.setServiceDate(Date.valueOf("2015-02-18"));
        serviceOrder2.setPickupDate(Date.valueOf("2015-02-25"));
        serviceOrder2.setActive(false);

        ServiceOrder serviceOrder3 = new ServiceOrder();
        serviceOrder3.setCustomer(customer3);
        serviceOrder3.setCar(car3);
        serviceOrder3.setMechanic(mechanic2);
        serviceOrder3.setRegistrationDate(Date.valueOf("2015-02-13"));
        serviceOrder3.setServiceDate(Date.valueOf("2015-02-20"));
        serviceOrder3.setPickupDate(Date.valueOf("2015-02-27"));
        serviceOrder3.setActive(false);

        ServiceOrder serviceOrder4 = new ServiceOrder();
        serviceOrder4.setCustomer(customer4);
        serviceOrder4.setCar(car4);
        serviceOrder4.setMechanic(mechanic1);
        serviceOrder4.setRegistrationDate(Date.valueOf("2015-02-15"));
        serviceOrder4.setServiceDate(Date.valueOf("2015-02-22"));
        serviceOrder4.setPickupDate(Date.valueOf("2015-03-01"));
        serviceOrder4.setActive(false);

        ServiceOrder serviceOrder5 = new ServiceOrder();
        serviceOrder5.setCustomer(customer5);
        serviceOrder5.setCar(car5);
        serviceOrder5.setMechanic(mechanic2);
        serviceOrder5.setRegistrationDate(Date.valueOf("2015-02-21"));
        serviceOrder5.setServiceDate(Date.valueOf("2015-02-28"));
        serviceOrder5.setPickupDate(Date.valueOf("2015-03-07"));
        serviceOrder5.setActive(false);

        ServiceOrder serviceOrder6 = new ServiceOrder();
        serviceOrder6.setCustomer(customer4);
        serviceOrder6.setCar(car6);
        serviceOrder6.setMechanic(mechanic3);
        serviceOrder6.setRegistrationDate(Date.valueOf("2015-03-01"));
        serviceOrder6.setServiceDate(Date.valueOf("2015-03-08"));
        serviceOrder6.setPickupDate(Date.valueOf("2015-03-15"));
        serviceOrder6.setActive(false);

        ServiceOrder serviceOrder7 = new ServiceOrder();
        serviceOrder7.setCustomer(customer5);
        serviceOrder7.setCar(car7);
        serviceOrder7.setMechanic(mechanic1);
        serviceOrder7.setRegistrationDate(Date.valueOf("2015-03-12"));
        serviceOrder7.setServiceDate(Date.valueOf("2015-03-19"));
        serviceOrder7.setPickupDate(Date.valueOf("2015-03-26"));
        serviceOrder7.setActive(true);

        ServiceOrderRepository.save(serviceOrder1);
        ServiceOrderRepository.save(serviceOrder2);
        ServiceOrderRepository.save(serviceOrder3);
        ServiceOrderRepository.save(serviceOrder4);
        ServiceOrderRepository.save(serviceOrder5);
        ServiceOrderRepository.save(serviceOrder6);
        ServiceOrderRepository.save(serviceOrder7);

        int totalPriceServiceOrder1 = 0;
        serviceOrder1.getWorkTypes().add(workType1);
        totalPriceServiceOrder1 += workType1.getPrice();
        serviceOrder1.getWorkTypes().add(workType3);
        totalPriceServiceOrder1 += workType3.getPrice();
        serviceOrder1.getWorkTypes().add(workType5);
        totalPriceServiceOrder1 += workType5.getPrice();
        serviceOrder1.getWorkTypes().add(workType6);
        totalPriceServiceOrder1 += workType6.getPrice();
        serviceOrder1.setTotalPrice(totalPriceServiceOrder1);

        int totalPriceServiceOrder2 = 0;
        serviceOrder2.getWorkTypes().add(workType2);
        totalPriceServiceOrder2 += workType2.getPrice();
        serviceOrder2.getWorkTypes().add(workType3);
        totalPriceServiceOrder2 += workType3.getPrice();
        serviceOrder2.getWorkTypes().add(workType5);
        totalPriceServiceOrder2 += workType5.getPrice();
        serviceOrder2.setTotalPrice(totalPriceServiceOrder2);

        int totalPriceServiceOrder3 = 0;
        serviceOrder3.getWorkTypes().add(workType4);
        totalPriceServiceOrder3 += workType4.getPrice();
        serviceOrder3.getWorkTypes().add(workType5);
        totalPriceServiceOrder3 += workType5.getPrice();
        serviceOrder3.getWorkTypes().add(workType6);
        totalPriceServiceOrder3 += workType6.getPrice();
        serviceOrder3.setTotalPrice(totalPriceServiceOrder3);

        int totalPriceServiceOrder4 = 0;
        serviceOrder4.getWorkTypes().add(workType1);
        totalPriceServiceOrder4 += workType1.getPrice();
        serviceOrder4.getWorkTypes().add(workType3);
        totalPriceServiceOrder4 += workType3.getPrice();
        serviceOrder4.setTotalPrice(totalPriceServiceOrder4);

        int totalPriceServiceOrder5 = 0;
        serviceOrder5.getWorkTypes().add(workType1);
        totalPriceServiceOrder5 += workType1.getPrice();
        serviceOrder5.getWorkTypes().add(workType2);
        totalPriceServiceOrder5 += workType2.getPrice();
        serviceOrder5.getWorkTypes().add(workType3);
        totalPriceServiceOrder5 += workType3.getPrice();
        serviceOrder5.setTotalPrice(totalPriceServiceOrder5);

        int totalPriceServiceOrder6 = 0;
        serviceOrder6.getWorkTypes().add(workType3);
        totalPriceServiceOrder6 += workType3.getPrice();
        serviceOrder6.getWorkTypes().add(workType4);
        totalPriceServiceOrder6 += workType4.getPrice();
        serviceOrder6.setTotalPrice(totalPriceServiceOrder6);

        int totalPriceServiceOrder7 = 0;
        serviceOrder7.getWorkTypes().add(workType1);
        totalPriceServiceOrder7 += workType1.getPrice();
        serviceOrder7.getWorkTypes().add(workType3);
        totalPriceServiceOrder7 += workType3.getPrice();
        serviceOrder7.getWorkTypes().add(workType4);
        totalPriceServiceOrder7 += workType4.getPrice();
        serviceOrder7.setTotalPrice(totalPriceServiceOrder7);

        ServiceOrderRepository.save(serviceOrder1);
        ServiceOrderRepository.save(serviceOrder2);
        ServiceOrderRepository.save(serviceOrder3);
        ServiceOrderRepository.save(serviceOrder4);
        ServiceOrderRepository.save(serviceOrder5);
        ServiceOrderRepository.save(serviceOrder6);
        ServiceOrderRepository.save(serviceOrder7);

        Complaint complaint1 = new Complaint();
        complaint1.setIncompleteServiceOrder(serviceOrder5);
        complaint1.setActive(false);

        Complaint complaint2 = new Complaint();
        complaint2.setIncompleteServiceOrder(serviceOrder6);
        complaint2.setActive(false);

        Complaint complaint3 = new Complaint();
        complaint3.setIncompleteServiceOrder(serviceOrder4);
        complaint3.setActive(true);

        complaintRepository.save(complaint1);
        complaintRepository.save(complaint2);
        complaintRepository.save(complaint3);

        complaint1.setWorkTypes(serviceOrder5.getWorkTypes());
        complaint2.getWorkTypes().add(workType3);
        complaint2.getWorkTypes().add(workType4);
        complaint3.getWorkTypes().add(workType3);

        complaintRepository.save(complaint1);
        complaintRepository.save(complaint2);
        complaintRepository.save(complaint3);

        ServiceOrder serviceOrder8 = new ServiceOrder();
        serviceOrder8.setCustomer(customer5);
        serviceOrder8.setCar(car5);
        serviceOrder8.setMechanic(mechanic3);
        serviceOrder8.setRegistrationDate(Date.valueOf("2015-03-14"));
        serviceOrder8.setServiceDate(Date.valueOf("2015-03-21"));
        serviceOrder8.setPickupDate(Date.valueOf("2015-03-28"));
        serviceOrder8.setActive(true);

        ServiceOrder serviceOrder9 = new ServiceOrder();
        serviceOrder9.setCustomer(customer4);
        serviceOrder9.setCar(car6);
        serviceOrder9.setMechanic(mechanic3);
        serviceOrder9.setRegistrationDate(Date.valueOf("2015-03-15"));
        serviceOrder9.setServiceDate(Date.valueOf("2015-03-22"));
        serviceOrder9.setPickupDate(Date.valueOf("2015-03-29"));
        serviceOrder9.setActive(true);

        ServiceOrderRepository.save(serviceOrder8);
        ServiceOrderRepository.save(serviceOrder9);

        int totalPriceServiceOrder8 = 0;
        serviceOrder8.getWorkTypes().add(workType1);
        totalPriceServiceOrder8 += workType1.getPrice();
        serviceOrder8.getWorkTypes().add(workType2);
        totalPriceServiceOrder8 += workType2.getPrice();
        serviceOrder8.getWorkTypes().add(workType3);
        totalPriceServiceOrder8 += workType3.getPrice();
        serviceOrder8.setTotalPrice(totalPriceServiceOrder8);
        serviceOrder8.setComplaint(complaint1);

        int totalPriceServiceOrder9 = 0;
        serviceOrder9.getWorkTypes().add(workType4);
        totalPriceServiceOrder9 += workType4.getPrice();
        serviceOrder9.setTotalPrice(totalPriceServiceOrder9);
        serviceOrder9.setComplaint(complaint2);

        ServiceOrderRepository.save(serviceOrder8);
        ServiceOrderRepository.save(serviceOrder9);
    }

    public Integer calculateAge(String socialSecurityNumber) {

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
