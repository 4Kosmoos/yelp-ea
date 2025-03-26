package com.esiea.yelpeaapi.controller;

import com.esiea.yelpeaapi.entity.User;
import com.esiea.yelpeaapi.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllUsers() {
        try {
            System.out.println("⚡ Récupération de tous les utilisateurs...");
            return ResponseEntity.ok(service.getAll());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Erreur : " + e.getMessage());
        }
    }

    // Lire un utilisateur par ID
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable int id) {
        try{
            System.out.println("⚡ Récupération de l'utilisateur avec l'ID : " + id);
            return ResponseEntity.ok(service.get(id));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }

    // Ajouter un nouvel utilisateur
    @PostMapping("/add")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        try {
            System.out.println("⚡ Ajout d'un nouvel utilisateur...");
            return ResponseEntity.ok(service.add(user));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }

    //  Mettre à jour un utilisateur
    @PutMapping("/update/{id}")
    public ResponseEntity<User> updateUser(@PathVariable int id, @RequestBody User updatedUser) {
        try {
            System.out.println("⚡ Mise à jour de l'utilisateur avec l'ID : " + id);
            return ResponseEntity.ok(service.update(id, updatedUser));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }

    // Supprimer un utilisateur
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable int id) {
        try{
            System.out.println("⚡ Suppression de l'utilisateur avec l'ID : " + id);
            service.delete(id);
            return ResponseEntity.ok("Utilisateur supprimé avec succès !");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Erreur : " + e.getMessage());
        }
    }

}

