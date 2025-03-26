package com.esiea.yelpeaapi.service;

import com.esiea.yelpeaapi.entity.User;
import com.esiea.yelpeaapi.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Lire tous les utilisateurs
    public List<User> getAll() {
        return userRepository.findAll();
    }

    // Lire un utilisateur par ID
    public User get(int id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
    }

    // Ajouter un nouvel utilisateur
    public User add(User user) {
        return userRepository.save(user);
    }

    //  Mettre à jour un utilisateur
    public User update(int id, User updatedUser) {
        User existingUser = get(id);
        existingUser.setLogin(updatedUser.getLogin());
        existingUser.setPassword(updatedUser.getPassword());
        existingUser.setRole(updatedUser.getRole());
        return userRepository.save(existingUser);
    }

    // Supprimer un utilisateur
    public void delete(int id) {
        userRepository.deleteById(id);
    }
}
