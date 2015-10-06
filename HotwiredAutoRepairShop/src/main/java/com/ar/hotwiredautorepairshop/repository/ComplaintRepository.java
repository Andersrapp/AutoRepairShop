package com.ar.hotwiredautorepairshop.repository;

import com.ar.hotwiredautorepairshop.model.Complaint;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author Anders
 */
public interface ComplaintRepository extends CrudRepository<Complaint, Integer> {
    
    @Query("SELECT complaint FROM Complaint complaint Join complaint.incompleteServiceOrder ciso WHERE ciso.id = :serviceOrderId")
    public Complaint getComplaintByServiceOrderId(@Param(value = "serviceOrderId") Integer serviceOrderId);

}