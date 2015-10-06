package com.ar.hotwiredautorepairshop.repository;

import com.ar.hotwiredautorepairshop.model.Mechanic;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Anders
 */
@Repository
public interface MechanicRepository extends CrudRepository<Mechanic, String>{
    
}