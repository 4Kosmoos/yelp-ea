package com.esiea.yelpeaapi.service;

import com.esiea.yelpeaapi.UserRole;
import com.esiea.yelpeaapi.entity.Restaurant;
import com.esiea.yelpeaapi.entity.User;
import com.esiea.yelpeaapi.repository.RestaurantRepository;
import com.esiea.yelpeaapi.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class RestaurantServiceTest {

//    @Mock
//    private RestaurantRepository repository;
//
//    @Mock
//    private UserRepository userRepository;
//
//    @InjectMocks
//    private RestaurantService restaurantService;
//
//    private Restaurant resto1;
//    private Restaurant resto2;
//    private User owner;
//    private User customer;
//
//    @BeforeEach
//    void setUp() {
//        resto1 = new Restaurant();
//        resto1.setId(1);
//        resto1.setName("Resto One");
//        resto1.setAddress("Address One");
//
//        resto2 = new Restaurant();
//        resto2.setId(2);
//        resto2.setName("Resto Two");
//        resto2.setAddress("Address Two");
//
//        owner = new User();
//        owner.setId(100);
//        owner.setRole(UserRole.owner);
//        owner.setResto(new ArrayList<>());
//
//        customer = new User();
//        customer.setId(200);
//        customer.setRole(UserRole.customer);
//        Map<Integer, Integer> notes = new HashMap<>();
//        notes.put(1, 8);
//        notes.put(2, 6);
//        customer.setNotes(notes);
//    }
//
//    @Test
//    void getAll() {
//        when(repository.findAll()).thenReturn(Arrays.asList(resto1, resto2));
//        when(userRepository.findAll()).thenReturn(Collections.singletonList(customer));
//
//        List<Restaurant> restaurants = restaurantService.getAll();
//
//        assertEquals(2, restaurants.size());
//        assertEquals(8.0, restaurants.get(0).getRating());
//        assertEquals(6.0, restaurants.get(1).getRating());
//        verify(repository, times(1)).findAll();
//        verify(userRepository, times(1)).findAll();
//    }
//
//    @Test
//    void get() {
//        when(repository.findById(1)).thenReturn(Optional.of(resto1));
//        when(userRepository.findAll()).thenReturn(Collections.singletonList(customer));
//
//        Restaurant restaurant = restaurantService.get(1);
//
//        assertNotNull(restaurant);
//        assertEquals(8.0, restaurant.getRating());
//        verify(repository, times(1)).findById(1);
//        verify(userRepository, times(1)).findAll();
//    }
//
//    @Test
//    void getRestaurantsForOwner() {
//        List<Integer> restoIds = new ArrayList<>(Arrays.asList(1, 2));
//        owner.setResto(restoIds);
//        when(userRepository.findById(100)).thenReturn(Optional.of(owner));
//        when(repository.findById(1)).thenReturn(Optional.of(resto1));
//        when(repository.findById(2)).thenReturn(Optional.of(resto2));
//        when(userRepository.findAll()).thenReturn(Collections.singletonList(customer));
//
//        List<Restaurant> restaurants = restaurantService.getRestaurantsForOwner(100);
//        assertEquals(2, restaurants.size());
//        for (Restaurant r : restaurants) {
//            if (r.getId() == 1) {
//                assertEquals(8.0, r.getRating());
//            } else if (r.getId() == 2) {
//                assertEquals(6.0, r.getRating());
//            }
//        }
//        verify(userRepository, times(1)).findById(100);
//        verify(repository, times(1)).findById(1);
//        verify(repository, times(1)).findById(2);
//    }
//
//    @Test
//    void addRestaurantForOwner() {
//        when(userRepository.findById(100)).thenReturn(Optional.of(owner));
//
//        Restaurant newResto = new Restaurant();
//        newResto.setName("New Resto");
//        newResto.setAddress("New Address");
//        Restaurant savedResto = new Restaurant();
//        savedResto.setId(10);
//        savedResto.setName("New Resto");
//        savedResto.setAddress("New Address");
//        when(repository.save(newResto)).thenReturn(savedResto);
//
//        Restaurant result = restaurantService.addRestaurantForOwner(100, newResto);
//        assertNotNull(result);
//        assertEquals(10, result.getId());
//        assertTrue(owner.getResto().contains(10));
//        verify(userRepository, times(1)).findById(100);
//        verify(repository, times(1)).save(newResto);
//        verify(userRepository, times(1)).save(owner);
//    }
//
//    @Test
//    void update() {
//        when(repository.findById(1)).thenReturn(Optional.of(resto1));
//        Restaurant updated = new Restaurant();
//        updated.setName("Updated Resto");
//        updated.setAddress("Updated Address");
//        when(repository.save(any(Restaurant.class))).thenReturn(updated);
//
//        Restaurant result = restaurantService.update(1, updated);
//        assertNotNull(result);
//        assertEquals("Updated Resto", result.getName());
//        assertEquals("Updated Address", result.getAddress());
//        verify(repository, times(1)).findById(1);
//        verify(repository, times(1)).save(any(Restaurant.class));
//    }
//
//    @Test
//    void delete() {
//        when(repository.existsById(1)).thenReturn(true);
//        doNothing().when(repository).deleteById(1);
//
//        assertDoesNotThrow(() -> restaurantService.delete(1));
//        verify(repository, times(1)).existsById(1);
//        verify(repository, times(1)).deleteById(1);
//    }
//
//    @Test
//    void getRestaurantsRatedByUser() {
//        Map<Integer, Integer> notes = new HashMap<>();
//        notes.put(1, 8);
//        notes.put(2, 6);
//        customer.setNotes(notes);
//        when(userRepository.findById(200)).thenReturn(Optional.of(customer));
//        when(repository.findById(1)).thenReturn(Optional.of(resto1));
//        when(repository.findById(2)).thenReturn(Optional.of(resto2));
//        when(userRepository.findAll()).thenReturn(Collections.singletonList(customer));
//
//        List<Restaurant> ratedRestaurants = restaurantService.getRestaurantsRatedByUser(200);
//        assertEquals(2, ratedRestaurants.size());
//        for (Restaurant r : ratedRestaurants) {
//            if (r.getId() == 1) {
//                assertEquals(8.0, r.getRating());
//            } else if (r.getId() == 2) {
//                assertEquals(6.0, r.getRating());
//            }
//        }
//        verify(userRepository, times(1)).findById(200);
//        verify(repository, times(1)).findById(1);
//        verify(repository, times(1)).findById(2);
//    }
//
//    @Test
//    void testRatingCalcul() {
//        User customer1 = new User(201, "customer1", "pass", UserRole.customer, Map.of(1, 7), null);
//        User customer2 = new User(202, "customer2", "pass", UserRole.customer, Map.of(1, 9), null);
//        when(userRepository.findAll()).thenReturn(Arrays.asList(customer1, customer2));
//
//        double rating = restaurantService.ratingCalcul(1);
//        assertEquals(8.0, rating);
//        verify(userRepository, times(1)).findAll();
//    }
}