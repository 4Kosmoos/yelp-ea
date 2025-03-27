package com.esiea.yelpeaapi.controller;

import com.esiea.yelpeaapi.entity.Restaurant;
import com.esiea.yelpeaapi.service.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
            System.out.println("⚡ Récupération de tous les restaurants...");
            return ResponseEntity.ok(service.getAll());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Erreur : " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Restaurant> getMethodName(@PathVariable int id) {
        try{
            System.out.println("⚡ Récupération du restaurant avec l'ID : " + id);
            return ResponseEntity.ok(service.get(id));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }

    @PostMapping
    public ResponseEntity<?> createRestaurant(@RequestBody Restaurant restaurant) {
        try {
            System.out.println("⚡ Ajout d'un nouvel utilisateur...");
            return ResponseEntity.ok(service.add(restaurant));
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
            System.out.println("⚡ Mise à jour du restaurant avec l'ID : " + id);
            return ResponseEntity.ok(service.update(id, updatedRestaurant));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteRestaurant(@PathVariable int id) {
        try{
            System.out.println("⚡ Suppression du restaurant avec l'ID : " + id);
            service.delete(id);
            return ResponseEntity.ok("restaurant supprimé avec succès !");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Erreur : " + e.getMessage());
        }
    }

}
