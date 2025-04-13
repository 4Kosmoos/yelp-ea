package com.esiea.yelpeaapi.service;

import com.esiea.yelpeaapi.UserRole;
import com.esiea.yelpeaapi.entity.User;
import com.esiea.yelpeaapi.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAll() {
        return userRepository.findAll();
    }

    public User get(int id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
    }

    public User add(User user) {
        return userRepository.save(user);
    }

    public User update(int id, User updatedUser) {
        User existingUser = get(id);
        if (updatedUser.getLogin() != null) {
            existingUser.setLogin(updatedUser.getLogin());
        }
        if (updatedUser.getPassword() != null) {
            existingUser.setPassword(updatedUser.getPassword());
        }
        return userRepository.save(existingUser);
    }

    public void delete(int id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("Utilisateur non trouvé avec l'ID : " + id);
        }
        userRepository.deleteById(id);
    }

    public User addRating(int userId, int restaurantId, int rating) {
        User user = get(userId);
        if (user.getRole() != UserRole.customer) {
            throw new RuntimeException("Seul un utilisateur de type CUSTOMER peut attribuer une note.");
        }
        Map<Integer, Integer> notes = user.getNotes();
        if (notes == null) {
            notes = new HashMap<>();
        }
        notes.put(restaurantId, rating);
        user.setNotes(notes);
        return userRepository.save(user);
    }
}
