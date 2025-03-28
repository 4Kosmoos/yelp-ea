package com.esiea.yelpeaapi.controller;

import com.esiea.yelpeaapi.entity.Restaurant;
import com.esiea.yelpeaapi.service.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;



import java.util.List;

@RestController
@RequestMapping("/restaurants")
@CrossOrigin(origins = "*")
public class RestaurantController {

    @Autowired
    private final RestaurantService service;

    public RestaurantController(RestaurantService service) {
        this.service = service;
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllRestaurants() {
        try {
            return ResponseEntity.ok(service.getAll());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Erreur : " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Restaurant> getMethodName(@PathVariable int id) {
        try{
            return ResponseEntity.ok(service.get(id));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }

    @GetMapping("/owner/{ownerId}")
    public ResponseEntity<List<Restaurant>> getRestaurantsForOwner(@PathVariable int ownerId) {
        try {
            List<Restaurant> restaurants = service.getRestaurantsForOwner(ownerId);
            return ResponseEntity.ok(restaurants);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }

    @PostMapping("/owner/{ownerId}")
    public ResponseEntity<?> createRestaurantForOwner(
            @PathVariable int ownerId,
            @RequestBody Restaurant restaurant) {
        try {
            Restaurant created = service.addRestaurantForOwner(ownerId, restaurant);
            return ResponseEntity.ok(created);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Restaurant> updateRestaurant(
            @PathVariable int id,
            @RequestBody Restaurant updatedRestaurant) {
        try {
            return ResponseEntity.ok(service.update(id, updatedRestaurant));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteRestaurant(@PathVariable int id) {
        try{
            service.delete(id);
            return ResponseEntity.ok("restaurant supprimé avec succès !");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Erreur : " + e.getMessage());
        }
    }
    @GetMapping("/ratedBy/{userId}")
    public ResponseEntity<List<Restaurant>> getRestaurantsRatedByUser(@PathVariable int userId) {
        try {
            List<Restaurant> restaurants = service.getRestaurantsRatedByUser(userId);
            return ResponseEntity.ok(restaurants);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }
}
