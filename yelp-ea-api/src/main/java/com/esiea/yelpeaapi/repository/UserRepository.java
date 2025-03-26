package com.esiea.yelpeaapi.repository;

import com.esiea.yelpeaapi.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
}
