package com.esiea.yelpeaapi.repository;

import com.esiea.yelpeaapi.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Integer> {
    List<User> findByNom(String nom);


}
