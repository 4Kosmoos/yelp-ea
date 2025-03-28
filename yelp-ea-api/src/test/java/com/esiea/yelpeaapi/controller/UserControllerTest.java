package com.esiea.yelpeaapi.controller;

import com.esiea.yelpeaapi.UserRole;
import com.esiea.yelpeaapi.entity.User;
import com.esiea.yelpeaapi.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserControllerTest {

//    @Mock
//    private UserService userService;
//
//    @InjectMocks
//    private UserController userController;
//
//    @BeforeEach
//    void setUp() {
//        MockitoAnnotations.openMocks(this);
//    }
//
//    @Test
//    void getAllUsers() {
//        User user1 = new User(1, "john_doe", "password123", UserRole.customer, Map.of(10, 4), null);
//        User user2 = new User(2, "jane_doe", "password123", UserRole.owner, null, List.of(5, 6));
//        when(userService.getAll()).thenReturn(List.of(user1, user2));
//        ResponseEntity<?> response = userController.getAllUsers();
//        assertEquals(200, response.getStatusCodeValue());
//        assertTrue(response.getBody() instanceof List);
//        assertEquals(2, ((List<?>) response.getBody()).size());
//        verify(userService, times(1)).getAll();
//    }
//
//    @Test
//    void getUserById() {
//        int userId = 1;
//        User user = new User(userId, "john_doe", "password123", UserRole.customer, Map.of(10, 5), null);
//        when(userService.get(userId)).thenReturn(user);
//        ResponseEntity<User> response = userController.getUserById(userId);
//        assertEquals(200, response.getStatusCodeValue());
//        assertNotNull(response.getBody());
//        assertEquals(user, response.getBody());
//        assertEquals(Map.of(10, 5), response.getBody().getNotes());
//        assertNull(response.getBody().getResto()); // Doit être null car c'est un customer
//        verify(userService, times(1)).get(userId);
//    }
//
//    @Test
//    void createCustomer() {
//        User newUser = new User(3, "new_customer", "password123", UserRole.customer, Map.of(8, 3, 12, 5), null);
//        when(userService.add(newUser)).thenReturn(newUser);
//        ResponseEntity<User> response = userController.createUser(newUser);
//        assertEquals(200, response.getStatusCodeValue());
//        assertNotNull(response.getBody());
//        assertEquals(UserRole.customer, response.getBody().getRole());
//        assertEquals(Map.of(8, 3, 12, 5), response.getBody().getNotes());
//        assertNull(response.getBody().getResto());
//        verify(userService, times(1)).add(newUser);
//    }
//
//    @Test
//    void createOwner() {
//        User newOwner = new User(4, "restaurant_owner", "password123", UserRole.owner, null, List.of(7, 9));
//        when(userService.add(newOwner)).thenReturn(newOwner);
//        ResponseEntity<User> response = userController.createUser(newOwner);
//        assertEquals(200, response.getStatusCodeValue());
//        assertNotNull(response.getBody());
//        assertEquals(UserRole.owner, response.getBody().getRole());
//        assertEquals(List.of(7, 9), response.getBody().getResto());
//        assertNull(response.getBody().getNotes()); // Doit être null car c'est un owner
//        verify(userService, times(1)).add(newOwner);
//    }
//
//    @Test
//    void updateUser() {
//        int userId = 1;
//        User updatedUser = new User(userId, "john_doe", "newpassword", UserRole.customer, Map.of(11, 4), null);
//        when(userService.update(userId, updatedUser)).thenReturn(updatedUser);
//        ResponseEntity<User> response = userController.updateUser(userId, updatedUser);
//        assertEquals(200, response.getStatusCodeValue());
//        assertEquals(updatedUser, response.getBody());
//        verify(userService, times(1)).update(userId, updatedUser);
//    }
//
//    @Test
//    void deleteUser() {
//        int userId = 1;
//        doNothing().when(userService).delete(userId);
//        ResponseEntity<String> response = userController.deleteUser(userId);
//        assertEquals(200, response.getStatusCodeValue());
//        assertEquals("Utilisateur supprimé avec succès !", response.getBody());
//        verify(userService, times(1)).delete(userId);
//    }
//
//    @Test
//    void rateRestaurant() {
//        int userId = 1;
//        int restaurantId = 10;
//        int rating = 8;
//        User updatedUser = new User(userId, "john_doe", "password123", UserRole.customer, Map.of(restaurantId, rating), null);
//        when(userService.addRating(userId, restaurantId, rating)).thenReturn(updatedUser);
//        ResponseEntity<User> response = userController.rateRestaurant(userId, restaurantId, rating);
//        assertEquals(200, response.getStatusCodeValue());
//        assertNotNull(response.getBody());
//        assertEquals(updatedUser, response.getBody());
//        verify(userService, times(1)).addRating(userId, restaurantId, rating);
//    }
}
