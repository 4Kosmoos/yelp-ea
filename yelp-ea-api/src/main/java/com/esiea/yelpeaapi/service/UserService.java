package com.esiea.yelpeaapi.service;

import com.esiea.yelpeaapi.entity.User;
import com.esiea.yelpeaapi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private final UserRepository repository;

    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    public List<User> getAll(){
        return repository.findAll();
    }

    public User get(int index) {
        return repository.findById(index).orElseThrow(() -> new RuntimeException("Show not found"));
    }
}
