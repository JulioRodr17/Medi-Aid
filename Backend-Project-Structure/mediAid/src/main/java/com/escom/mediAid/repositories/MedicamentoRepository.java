package com.escom.mediAid.repositories;

import com.escom.mediAid.models.Medicamento;

import jakarta.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MedicamentoRepository extends JpaRepository<Medicamento, Integer> {

	@Query("SELECT m FROM Medicamento m " +
		       "WHERE m.activo = true " +
		       "AND (:search = '' OR LOWER(m.nombreMedicamento) LIKE LOWER(CONCAT('%', :search, '%'))) " +
		       "AND (:categoryId IS NULL OR m.categoria.id = :categoryId)")
		Page<Medicamento> findByFilters(@Param("search") String search,
		                                @Param("categoryId") Integer categoryId,
		                                Pageable pageable);

    
    
    // Soft delete
    @Modifying
    @Transactional
    @Query("UPDATE Medicamento m SET m.activo = false WHERE m.id = :id")
    void softDeleteById(@Param("id") Integer id);
}
  