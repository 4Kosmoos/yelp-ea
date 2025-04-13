package com.esiea.yelpeaapi.service;

import com.esiea.yelpeaapi.RestaurantCategories;
import com.esiea.yelpeaapi.UserRole;
import com.esiea.yelpeaapi.entity.Restaurant;
import com.esiea.yelpeaapi.entity.User;
import com.esiea.yelpeaapi.repository.RestaurantRepository;
import com.esiea.yelpeaapi.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Collections;
import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.any;

@ExtendWith(MockitoExtension.class)
class RestaurantServiceTest {

    @Mock
    private RestaurantRepository repo;

    @Mock
    private UserRepository userRepo;

    @InjectMocks
    private RestaurantService restaurantService;

    @Test
    void getAll() {
        Restaurant resto1 = new Restaurant();
        resto1.setId(1);
        resto1.setName("resto 1");
        Restaurant resto2 = new Restaurant();
        resto2.setId(2);
        resto2.setName("resto 2");

        List<Restaurant> restoList = List.of(resto1,resto2);
        when(repo.findAll()).thenReturn(restoList);

        List<Restaurant> result = restaurantService.getAll();

        assertEquals(2, result.size());
        assertEquals(restoList.getFirst(), restoList.getFirst());
        assertEquals(restoList.getLast(), restoList.getLast());
        verify(repo, times(1)).findAll();
    }

    @Test
    void get() {
        Restaurant resto = new Restaurant();
        resto.setId(1);
        resto.setName("Restaurant 1");
        resto.setAddress("Address");
        resto.setPhone("Phone");
        resto.setDescription("Description");
        resto.setCategories(List.of(RestaurantCategories.Chinois));
        User customer = new User(1, "customer", "pass", UserRole.customer, Map.of(1, 5), null);
        User customer2 = new User(2, "customer2", "pass", UserRole.customer, Map.of(1, 3), null);

        when(repo.findById(1)).thenReturn(Optional.of(resto));
        when(userRepo.findAll()).thenReturn(List.of(customer,customer2));

        Restaurant result = restaurantService.get(1);

        assertNotNull(result);
        assertEquals(resto.getId(), result.getId());
        assertEquals(resto.getName(), result.getName());
        assertEquals(resto.getAddress(), result.getAddress());
        assertEquals(resto.getPhone(), result.getPhone());
        assertEquals(resto.getDescription(), result.getDescription());
        assertEquals(resto.getRating(), result.getRating());
        verify(repo, times(1)).findById(1);
    }

    @Test
    void GetNotFound() {
        when(repo.findById(1)).thenReturn(Optional.empty());

        Exception exception = assertThrows(RuntimeException.class, () -> restaurantService.get(1));
        assertEquals("Restaurant non trouvé", exception.getMessage());
        verify(repo, times(1)).findById(1);
    }

    @Test
    void getRestaurantsForOwner() {
        int ownerId = 10;
        User owner = new User();
        owner.setId(ownerId);
        owner.setRole(UserRole.owner);
        owner.setResto(List.of(1, 2));
        when(userRepo.findById(ownerId)).thenReturn(Optional.of(owner));

        Restaurant resto1 = new Restaurant();
        resto1.setId(1);
        resto1.setName("Resto 1");
        Restaurant resto2 = new Restaurant();
        resto2.setId(2);
        resto2.setName("Resto 2");

        when(repo.findById(1)).thenReturn(Optional.of(resto1));
        when(repo.findById(2)).thenReturn(Optional.of(resto2));

        when(userRepo.findAll()).thenReturn(Collections.emptyList());

        List<Restaurant> result = restaurantService.getRestaurantsForOwner(ownerId);
        assertEquals(2, result.size());
        assertEquals(resto1, result.getFirst());
        assertEquals(resto2, result.getLast());
        verify(repo, times(1)).findById(1);
        verify(repo, times(1)).findById(2);
    }

    @Test
    void GetRestaurantsForOwnerWith0Restos() {
        int ownerId = 10;
        User owner = new User();
        owner.setId(ownerId);
        owner.setRole(UserRole.owner);
        owner.setResto(Collections.emptyList());
        when(userRepo.findById(ownerId)).thenReturn(Optional.of(owner));

        List<Restaurant> restaurants = restaurantService.getRestaurantsForOwner(ownerId);
        assertTrue(restaurants.isEmpty());
    }

    @Test
    void addRestaurantForOwner() {
        int ownerId = 1;
        User owner = new User(ownerId, "owner", "pass", UserRole.owner, null, null);
        when(userRepo.findById(ownerId)).thenReturn(Optional.of(owner));

        Restaurant newResto = new Restaurant(1, "Resto", "Address", "Phone", "Description",List.of(RestaurantCategories.Chinois,RestaurantCategories.libanais),3.2f);
        Restaurant savedResto = new Restaurant(2, "Resto", "Address", "Phone", "Description",List.of(RestaurantCategories.Chinois,RestaurantCategories.libanais),3.2f);

        when(repo.save(newResto)).thenReturn(savedResto);
        owner.setResto(new ArrayList<>(List.of(newResto.getId())));

        Restaurant result = restaurantService.addRestaurantForOwner(ownerId, newResto);
        assertNotNull(result);
        assertEquals(2, result.getId());
        assertTrue(owner.getResto().contains(2));
        verify(userRepo, times(1)).findById(ownerId);
        verify(repo, times(1)).save(newResto);
        verify(userRepo, times(1)).save(owner);
    }

    @Test
    void AddRestaurantForOthers() {
        int userId = 10;
        User otherUser = new User(userId, "otherUser", "pass", UserRole.customer, null, null);
        when(userRepo.findById(userId)).thenReturn(Optional.of(otherUser));

        Restaurant restaurant = new Restaurant();
        Exception exception = assertThrows(RuntimeException.class,
                () -> restaurantService.addRestaurantForOwner(userId, restaurant));
        assertTrue(exception.getMessage().contains("n'est pas un propriétaire"));
        verify(userRepo, times(1)).findById(userId);
        verify(repo, never()).save(any(Restaurant.class));
    }

    @Test
    void update() {
        int restaurantId = 1;
        Restaurant oldResto = new Restaurant();
        oldResto.setId(restaurantId);
        oldResto.setName("old name");
        oldResto.setAddress("old Adress");
        oldResto.setPhone("old phone");
        oldResto.setDescription("old description");
        oldResto.setCategories(List.of());
        when(repo.findById(restaurantId)).thenReturn(Optional.of(oldResto));
        when(userRepo.findAll()).thenReturn(Collections.emptyList());

        Restaurant updatedData = new Restaurant();
        updatedData.setName("new name");
        updatedData.setAddress("new Adresse");
        updatedData.setPhone("new phone");
        updatedData.setDescription("new description");
        updatedData.setCategories(List.of());

        Restaurant newResto = new Restaurant();
        newResto.setId(restaurantId);
        newResto.setName("new name");
        newResto.setAddress("new Adresse");
        newResto.setPhone("new phone");
        newResto.setDescription("new description");
        newResto.setCategories(List.of());
        when(repo.save(oldResto)).thenReturn(newResto);

        Restaurant result = restaurantService.update(restaurantId, updatedData);
        assertNotNull(result);
        assertEquals(newResto.getName(), result.getName());
        assertEquals(newResto.getAddress(), result.getAddress());
        assertEquals(newResto.getPhone(), result.getPhone());
        assertEquals(newResto.getDescription(), result.getDescription());
        assertEquals(newResto.getCategories(), result.getCategories());
        verify(repo, times(1)).findById(restaurantId);
        verify(repo, times(1)).save(oldResto);
    }

    @Test
    void testUpdateNotFound() {
        when(repo.findById(1)).thenReturn(Optional.empty());

        Restaurant updatedInfo = new Restaurant();
        updatedInfo.setName("New name");
        Exception exception = assertThrows(RuntimeException.class, () -> restaurantService.update(1, updatedInfo));
        assertEquals("Restaurant non trouvé", exception.getMessage());
        verify(repo, times(1)).findById(1);
        verify(repo, never()).save(any(Restaurant.class));
    }

    @Test
    void delete() {
        int restaurantId = 1;
        when(repo.existsById(restaurantId)).thenReturn(true);
        restaurantService.delete(restaurantId);
        verify(repo, times(1)).existsById(restaurantId);
        verify(repo, times(1)).deleteById(restaurantId);
    }
    @Test
    void DeleteNotFound() {
        int restaurantId = 1;
        when(repo.existsById(restaurantId)).thenReturn(false);
        Exception exception = assertThrows(RuntimeException.class, () -> restaurantService.delete(restaurantId));
        assertTrue(exception.getMessage().contains("Utilisateur non trouvé avec l'ID : " + restaurantId));
        verify(repo, times(1)).existsById(restaurantId);
        verify(repo, never()).deleteById(anyInt());
    }

    @Test
    void RatingCalcul() {
        int restaurantId = 1;
        User customer1 = new User(1, "customer1", "pass", UserRole.customer, Map.of(restaurantId, 7), null);
        User customer2 = new User(2, "customer2", "pass", UserRole.customer, Map.of(restaurantId, 9), null);
        when(userRepo.findAll()).thenReturn(List.of(customer1, customer2));

        double rating = restaurantService.ratingCalcul(restaurantId);
        assertEquals(8.0, rating);
        verify(userRepo, times(1)).findAll();
    }

    @Test
    void RatingCalculNoRatings() {
        int restaurantId = 1;
        User customer = new User(1, "customer1", "pass", UserRole.customer, null, null);
        when(userRepo.findAll()).thenReturn(List.of(customer));

        double rating = restaurantService.ratingCalcul(restaurantId);
        assertEquals(0.0, rating);
    }
}