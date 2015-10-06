package com.ar.hotwiredautorepairshop.controller;

import com.ar.hotwiredautorepairshop.dto.ComplaintDTO;
import com.ar.hotwiredautorepairshop.model.Complaint;
import com.ar.hotwiredautorepairshop.model.ServiceOrder;
import com.ar.hotwiredautorepairshop.model.WorkType;
import com.ar.hotwiredautorepairshop.repository.ComplaintRepository;
import com.ar.hotwiredautorepairshop.repository.ServiceOrderRepository;
import com.ar.hotwiredautorepairshop.repository.WorkTypeRepository;
import java.util.ArrayList;
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
public class ComplaintController {

    @Autowired
    ComplaintRepository complaintRepository;

    @Autowired
    ServiceOrderRepository serviceOrderRepository;

    @Autowired
    WorkTypeRepository workTypeRepository;

    @RequestMapping(value = "/complaints", method = RequestMethod.GET)
    public List<ComplaintDTO> getAll() {
        List<ComplaintDTO> complaintDTOs = new ArrayList<>();
        for (Complaint complaint : complaintRepository.findAll()) {
            complaintDTOs.add(new ComplaintDTO(complaint));
        }
        return complaintDTOs;
    }

//    @RequestMapping(value = "/complaints/update", method = RequestMethod.PUT)
//    public @ResponseBody
//    Complaint updateServiceOrder(
//            @RequestBody ComplaintDTO complaintDTO
//    ) {
//        Complaint complaintToBeUpdated = complaintRepository.findOne(complaintDTO.getId());
//
//        ServiceOrder serviceOrder = serviceOrderRepository.findOne(complaintDTO.getIncompleteServiceOrderId());
//        complaintToBeUpdated.setIncompleteServiceOrder(serviceOrder);
//        complaintToBeUpdated.setWorkTypes(serviceOrder.getWorkTypes());
//
//        complaintRepository.save(complaintToBeUpdated);
//        return complaintToBeUpdated;
//    }
    @RequestMapping(value = "/complaints/deleteById/{id}", method = RequestMethod.DELETE)
    public void deleteOneById(@PathVariable(value = "id") Integer id) {
        Complaint complaint = complaintRepository.findOne(id);
        complaint.getWorkTypes().clear();
        complaint.setIncompleteServiceOrder(null);
        complaintRepository.delete(complaint);
    }

    @RequestMapping(value = "/complaints/register/new", method = RequestMethod.POST)
    public ComplaintDTO registerComplaint(
            @RequestParam(value = "serviceOrderId") Integer serviceOrderId,
            @RequestParam(value = "workTypeIds") List<Integer> workTypeIds
    ) {
        Complaint complaint = new Complaint();
        complaint.setIncompleteServiceOrder(serviceOrderRepository.findOne(serviceOrderId));

        for (Integer workTypeId : workTypeIds) {
            WorkType workType = workTypeRepository.findOne(workTypeId);
            complaint.getWorkTypes().add(workType);
        }
        complaint.setActive(true);
        complaintRepository.save(complaint);
        return new ComplaintDTO(complaint);
    }

    @RequestMapping(value = "/complaints/findWorkTypesByComplaintId/{complaintId}", method = RequestMethod.GET)
    public Iterable<WorkType> getWorkTypesByComplaintId(@PathVariable Integer complaintId) {
        Complaint complaint = complaintRepository.findOne(complaintId);
        Integer serviceOrderId = complaint.getIncompleteServiceOrder().getId();

        return serviceOrderRepository.getWorkTypesByServiceOrderId(serviceOrderId);
    }

    @RequestMapping(value = "/complaints/find/{complaintId}", method = RequestMethod.GET)
    public ComplaintDTO getOneComplaintById(@PathVariable Integer complaintId) {

        return new ComplaintDTO(complaintRepository.findOne(complaintId));
    }

    @RequestMapping(value = "/complaints/check/complaint/{complaintId}", method = RequestMethod.GET)
    public Boolean checkIfComplaintExists(@PathVariable Integer complaintId) {
        return complaintRepository.exists(complaintId);
    }

    @RequestMapping(value = "/complaints/check/serviceOrder/{serviceOrderId}", method = RequestMethod.GET)
    public Integer checkIfComplaintExistsByServiceOrderId(@PathVariable Integer serviceOrderId) {

        boolean serviceOrderExists = serviceOrderRepository.exists(serviceOrderId);
        boolean complaintExists = complaintRepository.getComplaintByServiceOrderId(serviceOrderId) != null;
//        boolean complaint
        if (serviceOrderExists && !complaintExists) {
            return 1;
        } else if (serviceOrderExists && complaintExists) {
            return 2;
        } else {
            return 3;
        }
    }

    @RequestMapping(value = "/complaints/update", method = RequestMethod.PUT)
    public void updateServiceOrder(
            @RequestBody ComplaintDTO complaintDTO
    ) {
        Complaint complaintToBeUpdated = complaintRepository.findOne(complaintDTO.getId());

        ServiceOrder serviceOrder = serviceOrderRepository.findOne(complaintDTO.getIncompleteServiceOrderId());
        complaintToBeUpdated.setIncompleteServiceOrder(serviceOrder);
        complaintToBeUpdated.setWorkTypes(complaintDTO.getWorkTypes());
        complaintToBeUpdated.setActive(complaintDTO.isActive());

        complaintRepository.save(complaintToBeUpdated);
    }

    @RequestMapping(value = "/complaints/findByServiceOrderId/{serviceOrderId}", method = RequestMethod.GET)
    public ComplaintDTO getComplaintByServiceOrderId(
            @PathVariable(value = "serviceOrderId") Integer serviceOrderId) {
        try {

            return new ComplaintDTO(complaintRepository.getComplaintByServiceOrderId(serviceOrderId));
        } catch (NullPointerException e) {
            return new ComplaintDTO();
        }
    }

//    @RequestMapping(value = "/complaints/update/{id}", method = RequestMethod.PUT)
//    public Complaint updateComplaint(@RequestBody Complaint complaint
//    //            @RequestParam(value = "description") String description,
//    //            @RequestParam(value = "price") Integer price
//    ) {
//
//        Complaint updatedComplaint = new Complaint();
//        updatedComplaint.setDescription(complaint.getDescription());
//        updatedComplaint.setPrice(complaint.getPrice());
//        complaintRepository.save(updatedComplaint);
//        return complaint;
//    }
}
