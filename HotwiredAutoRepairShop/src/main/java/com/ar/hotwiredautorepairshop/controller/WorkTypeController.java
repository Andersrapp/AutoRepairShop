package com.ar.hotwiredautorepairshop.controller;

import com.ar.hotwiredautorepairshop.model.ServiceOrder;
import com.ar.hotwiredautorepairshop.model.WorkType;
import com.ar.hotwiredautorepairshop.repository.ServiceOrderRepository;
import com.ar.hotwiredautorepairshop.repository.WorkTypeRepository;
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
public class WorkTypeController {

    @Autowired
    WorkTypeRepository workTypeRepository;

    @Autowired
    ServiceOrderRepository serviceOrderRepository;

    @RequestMapping(value = "/workTypes", method = RequestMethod.GET)
    public Iterable<WorkType> getAll() {
//        System.out.println(workTypeRepository.findAll());
        return workTypeRepository.findAll();
    }

    @RequestMapping(value = "/workTypes/deleteById/{workTypeId}", method = RequestMethod.DELETE)
    public boolean deleteOneById(@PathVariable(value = "workTypeId") Integer workTypeId) {

        List<ServiceOrder> serviceOrderByWorkTypeId = serviceOrderRepository.getAllServiceOrdersByWorkTypeId(workTypeId);

        if (serviceOrderByWorkTypeId.size() == 0) {
            WorkType workType = workTypeRepository.findOne(workTypeId);
            workTypeRepository.delete(workType);
            return true;
        }
        return false;
    }

    @RequestMapping(value = "/workTypes/register/new", method = RequestMethod.POST)
    public WorkType registerWorkType(
            @RequestParam(value = "description") String description,
            @RequestParam(value = "price") Integer price) {

        WorkType workType = new WorkType();
        workType.setDescription(description);
        workType.setPrice(price);
        workTypeRepository.save(workType);
        return workType;
    }

    @RequestMapping(value = "/workTypes/update", method = RequestMethod.PUT)
    public WorkType updateWorkType(@RequestBody WorkType workType
    ) {
        WorkType updatedWorkType = workTypeRepository.findOne(workType.getId());
        updatedWorkType.setDescription(workType.getDescription());
        updatedWorkType.setPrice(workType.getPrice());
        workTypeRepository.save(updatedWorkType);
        return workType;
    }

    @RequestMapping(value = "/workTypes/check/{workTypeId}", method = RequestMethod.GET)
    public Boolean checkIfWorkTypeExists(@PathVariable Integer workTypeId) {
        return workTypeRepository.exists(workTypeId);
    }

    @RequestMapping(value = "/workTypes/find/{workTypeId}", method = RequestMethod.GET)
    public WorkType getWorkTypeById(@PathVariable Integer workTypeId) {
        return workTypeRepository.findOne(workTypeId);
    }

    @RequestMapping(value = "/workTypes/ids", method = RequestMethod.GET)
    public Iterable<Integer> getAllWorkTypeIds() {
        return workTypeRepository.getAllWorkTypeIds();
    }
}
