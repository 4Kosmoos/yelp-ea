package com.esiea.yelpeaapi.controller;

import com.esiea.yelpeaapi.entity.Restaurant;
import com.esiea.yelpeaapi.service.RestaurantService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;


@WebMvcTest(RestaurantController.class)
@ExtendWith(MockitoExtension.class)
public class RestaurantControllerTest {

//    @Autowired
//    private RestaurantController restaurantController;
//
//    @InjectMocks
//    private RestaurantService restaurantService;
//
//    private Restaurant restaurant1;
//    private Restaurant restaurant2;
//
//    @BeforeEach
//    void setUp() {
//        restaurant1 = new Restaurant();
//        restaurant1.setId(1);
//        restaurant1.setName("Resto A");
//        restaurant1.setAddress("Address A");
//        restaurant1.setRating(3.5);
//
//        restaurant2 = new Restaurant();
//        restaurant2.setId(2);
//        restaurant2.setName("Resto B");
//        restaurant2.setAddress("Address B");
//        restaurant2.setRating(4.2);
//    }
//    @Test
//    void getAllRestaurants() {
//        when(restaurantService.getAll()).thenReturn(Arrays.asList(restaurant1, restaurant2));
//        ResponseEntity<?> response = restaurantController.getAllRestaurants();
//        assertEquals(200, response.getStatusCodeValue());
//        assertTrue(response.getBody() instanceof List);
//        List<?> list = (List<?>) response.getBody();
//        assertEquals(2, list.size());
//        verify(restaurantService, times(1)).getAll();
//    }
//    @Test
//    void getRestaurantById() {
//        when(restaurantService.get(1)).thenReturn(restaurant1);
//        ResponseEntity<Restaurant> response = restaurantController.getMethodName(1);
//        assertEquals(200, response.getStatusCodeValue());
//        assertNotNull(response.getBody());
//        assertEquals(restaurant1, response.getBody());
//        verify(restaurantService, times(1)).get(1);
//    }
//    @Test
//    void createRestaurantForOwner() {
//        when(restaurantService.addRestaurantForOwner(eq(10), any(Restaurant.class))).thenReturn(restaurant1);
//        ResponseEntity<?> response = restaurantController.createRestaurantForOwner(10, restaurant1);
//        assertEquals(200, response.getStatusCodeValue());
//        assertEquals(restaurant1, response.getBody());
//        verify(restaurantService, times(1)).addRestaurantForOwner(eq(10), any(Restaurant.class));
//    }
//    @Test
//    void updateRestaurant() {
//        restaurant1.setName("Updated Resto");
//        when(restaurantService.update(eq(1), any(Restaurant.class))).thenReturn(restaurant1);
//        ResponseEntity<Restaurant> response = restaurantController.updateRestaurant(1, restaurant1);
//        assertEquals(200, response.getStatusCodeValue());
//        assertNotNull(response.getBody());
//        assertEquals("Updated Resto", response.getBody().getName());
//        verify(restaurantService, times(1)).update(eq(1), any(Restaurant.class));
//    }
//    @Test
//    void deleteRestaurant() {
//        doNothing().when(restaurantService).delete(1);
//        ResponseEntity<String> response = restaurantController.deleteRestaurant(1);
//        assertEquals(200, response.getStatusCodeValue());
//        assertEquals("restaurant supprimé avec succès !", response.getBody());
//        verify(restaurantService, times(1)).delete(1);
//    }
//    @Test
//    void getRestaurantsRatedByUser() {
//        when(restaurantService.getRestaurantsRatedByUser(5))
//                .thenReturn(Collections.singletonList(restaurant2));
//        ResponseEntity<List<Restaurant>> response = restaurantController.getRestaurantsRatedByUser(5);
//        assertEquals(200, response.getStatusCodeValue());
//        List<Restaurant> list = response.getBody();
//        assertNotNull(list);
//        assertEquals(1, list.size());
//        verify(restaurantService, times(1)).getRestaurantsRatedByUser(5);
//    }
}
