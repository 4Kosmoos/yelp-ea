package com.esiea.yelpeaapi.service;

import com.esiea.yelpeaapi.UserRole;
import com.esiea.yelpeaapi.entity.Restaurant;
import com.esiea.yelpeaapi.entity.User;
import com.esiea.yelpeaapi.repository.RestaurantRepository;
import com.esiea.yelpeaapi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@Service
public class RestaurantService {

    @Autowired
    private final RestaurantRepository repository;

    @Autowired
    private final UserRepository userRepository;

    public RestaurantService(RestaurantRepository repository, UserRepository userRepository) {
        this.repository = repository;
        this.userRepository = userRepository;

    }

    public List<Restaurant> getAll(){
        List<Restaurant> restaurants = repository.findAll();
        for (Restaurant restaurant : restaurants) {
            double rating = ratingCalcul(restaurant.getId());
            restaurant.setRating(rating);
        }
        return restaurants;
    }

    public Restaurant get(int id) {
        Restaurant restaurant = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Restaurant non trouvé"));
        double rating = ratingCalcul(restaurant.getId());
        restaurant.setRating(rating);
        return restaurant;
    }


    public List<Restaurant> getRestaurantsForOwner(int ownerId) {
        User owner = userRepository.findById(ownerId)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé avec l'ID : " + ownerId));
        if(owner.getRole() != UserRole.owner) {
            throw new RuntimeException("L'utilisateur avec l'ID " + ownerId + " n'est pas un propriétaire.");
        }
        List<Integer> restaurantIds = owner.getResto();
        if(restaurantIds == null || restaurantIds.isEmpty()) {
            return Collections.emptyList();
        }
        List<Restaurant> restaurants = new ArrayList<>();
        for (Integer restId : restaurantIds) {
            repository.findById(restId).ifPresent(restaurant -> {
                double rating = ratingCalcul(restaurant.getId());
                restaurant.setRating(rating);
                restaurants.add(restaurant);
            });
        }
        return restaurants;
    }

    public Restaurant addRestaurantForOwner(int id, Restaurant restaurant) {
        User owner = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé avec l'ID : " + id));
        if (owner.getRole() != UserRole.owner) {
            throw new RuntimeException("L'utilisateur ID " + id + " n'est pas un propriétaire !");
        }
        Restaurant savedRestaurant = repository.save(restaurant);
        List<Integer> restoIds = owner.getResto();
        if (restoIds == null) {
            restoIds = new ArrayList<>();
        }
        restoIds.add(savedRestaurant.getId());

        userRepository.save(owner);

        return savedRestaurant;
    }

    public Restaurant update(int id, Restaurant updatedRestaurant) {
        Restaurant existing = get(id);
        existing.setName(updatedRestaurant.getName());
        existing.setAddress(updatedRestaurant.getAddress());
        existing.setPhone(updatedRestaurant.getPhone());
        existing.setDescription(updatedRestaurant.getDescription());
        existing.setCategories(updatedRestaurant.getCategories());
        return repository.save(existing);
    }

    public void delete(int id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Utilisateur non trouvé avec l'ID : " + id);
        }
        repository.deleteById(id);
    }

    public List<Restaurant> getRestaurantsRatedByUser(int userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé avec l'ID : " + userId));
        Map<Integer, Integer> notes = user.getNotes();
        if (notes == null || notes.isEmpty()) {
            return Collections.emptyList();
        }
        List<Restaurant> ratedRestaurants = new ArrayList<>();
        for (Map.Entry<Integer, Integer> entry : notes.entrySet()) {
            Integer restaurantId = entry.getKey();
            Integer noteFromCustomer = entry.getValue();

            repository.findById(restaurantId).ifPresent(restaurant -> {
                double rating = ratingCalcul(restaurant.getId());
                restaurant.setRating(rating);
                restaurant.setNoteFromCustomer(noteFromCustomer);
                ratedRestaurants.add(restaurant);
            });
        }
        return ratedRestaurants;
    }

    public double ratingCalcul(int restaurantId) {
        List<User> users = userRepository.findAll();
        int sum = 0;
        int count = 0;
        for (User user : users) {
            Map<Integer, Integer> notes = user.getNotes();
            if (notes != null && notes.containsKey(restaurantId)) {
                sum += notes.get(restaurantId);
                count++;
            }
        }
        return count > 0 ? (double) sum / count : 0.0;
    }
}
