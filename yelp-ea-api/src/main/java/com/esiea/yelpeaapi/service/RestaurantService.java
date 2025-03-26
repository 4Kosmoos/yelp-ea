package com.esiea.yelpeaapi.service;

import com.esiea.yelpeaapi.entity.Restaurant;
import com.esiea.yelpeaapi.repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RestaurantService {

    @Autowired
    private final RestaurantRepository repository;

    public RestaurantService(RestaurantRepository repository) {
        this.repository = repository;
    }

    public List<Restaurant> getAll(){
        return repository.findAll();
    }

    public Restaurant get(int index) {
        return repository.findById(index).orElseThrow(() -> new RuntimeException("Show not found"));
    }


}
