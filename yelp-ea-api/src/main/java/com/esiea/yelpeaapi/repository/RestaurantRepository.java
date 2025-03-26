package com.esiea.yelpeaapi.repository;

import com.esiea.yelpeaapi.entity.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Integer> {
    List<Restaurant> findByNom(String nom);
}
