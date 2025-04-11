package com.esiea.yelpeaapi.controller;

import com.esiea.yelpeaapi.RestaurantCategories;
import com.esiea.yelpeaapi.entity.Restaurant;
import com.esiea.yelpeaapi.service.RestaurantService;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(RestaurantController.class)
@ExtendWith({SpringExtension.class, MockitoExtension.class})
public class RestaurantControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private RestaurantService restaurantService;

    @Test
    void getAllRestaurants() throws Exception {
        Restaurant rest1 = new Restaurant(
                1,
                "Resto 1",
                "Address 1",
                "Phone 1",
                "Description 1",
                List.of(RestaurantCategories.Chinois),
                4.5f);
        Restaurant rest2 = new Restaurant(
                2,
                "Resto 2",
                "Address 2",
                "Phone 2",
                "Description 2",
                List.of(RestaurantCategories.Fast_food,RestaurantCategories.Vegan),
                3.8f);
        when(restaurantService.getAll()).thenReturn(List.of(rest1, rest2));

        String category1resto1 = rest1.getCategories().getFirst().toString();
        String category1resto2 = rest2.getCategories().getFirst().toString();
        String category2resto2 = rest2.getCategories().get(1).toString();

        mockMvc.perform(get("/restaurants/all")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))

                .andExpect(jsonPath("$[0].id").value(rest1.getId()))
                .andExpect(jsonPath("$[0].name").value(rest1.getName()))
                .andExpect(jsonPath("$[0].address").value(rest1.getAddress()))
                .andExpect(jsonPath("$[0].phone").value(rest1.getPhone()))
                .andExpect(jsonPath("$[0].description").value(rest1.getDescription()))
                .andExpect(jsonPath("$[0].categories").value(category1resto1))
                .andExpect(jsonPath("$[0].rating").value(rest1.getRating()))

                .andExpect(jsonPath("$[1].id").value(rest2.getId()))
                .andExpect(jsonPath("$[1].name").value(rest2.getName()))
                .andExpect(jsonPath("$[1].address").value(rest2.getAddress()))
                .andExpect(jsonPath("$[1].phone").value(rest2.getPhone()))
                .andExpect(jsonPath("$[1].description").value(rest2.getDescription()))
                .andExpect(jsonPath("$[1].categories[0]").value(category1resto2))
                .andExpect(jsonPath("$[1].categories[1]").value(category2resto2))
                .andExpect(jsonPath("$[1].rating").value(rest2.getRating()));
        verify(restaurantService, times(1)).getAll();
    }

    @Test
    void getRestaurantById() throws Exception {
        Restaurant rest = new Restaurant(
                3,
                "Resto 1",
                "Address 1",
                "Phone 1",
                "Description 1",
                List.of(RestaurantCategories.libanais),
                3.2f);
        when(restaurantService.get(3)).thenReturn(rest);

        String category1 = rest.getCategories().getFirst().toString();

        mockMvc.perform(get("/restaurants/3")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(rest.getId()))
                .andExpect(jsonPath("$.name").value(rest.getName()))
                .andExpect(jsonPath("$.address").value(rest.getAddress()))
                .andExpect(jsonPath("$.phone").value(rest.getPhone()))
                .andExpect(jsonPath("$.description").value(rest.getDescription()))
                .andExpect(jsonPath("$.categories[0]").value(category1))
                .andExpect(jsonPath("$.rating").value(rest.getRating()));
        verify(restaurantService, times(1)).get(3);
    }

    @Test
    void getRestaurantsForOwner() throws Exception {
        Restaurant rest1 = new Restaurant(
                4,
                "Resto 1",
                "Address 1",
                "Phone 1",
                "Desc 1",
                List.of(RestaurantCategories.Chinois),
                3.9f);
        Restaurant rest2 = new Restaurant(
                5,
                "Resto 2",
                "Address 2",
                "Phone 2",
                "Desc 2",
                List.of(RestaurantCategories.italien),
                4.2f);
        when(restaurantService.getRestaurantsForOwner(2)).thenReturn(List.of(rest1, rest2));

        mockMvc.perform(get("/restaurants/owner/2")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].id").value(rest1.getId()))
                .andExpect(jsonPath("$[1].id").value(rest2.getId()));
        verify(restaurantService, times(1)).getRestaurantsForOwner(2);
    }

    @Test
    void createRestaurantForOwner() throws Exception {
        Restaurant newRestaurant = new Restaurant(
                6,
                "New Resto",
                "New Address",
                "New Phone",
                "New Desc",
                List.of(RestaurantCategories.Chinois),
                0f);
        Restaurant savedRestaurant = new Restaurant(
                7,
                "New Resto",
                "New Address",
                "New Phone",
                "New Desc",
                List.of(RestaurantCategories.Chinois),
                0f);
        when(restaurantService.addRestaurantForOwner(eq(1), any(Restaurant.class))).thenReturn(savedRestaurant);

        String category1 = savedRestaurant.getCategories().getFirst().toString();

        mockMvc.perform(post("/restaurants/owner/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(newRestaurant)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(savedRestaurant.getId()))
                .andExpect(jsonPath("$.name").value(savedRestaurant.getName()))
                .andExpect(jsonPath("$.address").value(savedRestaurant.getAddress()))
                .andExpect(jsonPath("$.phone").value(savedRestaurant.getPhone()))
                .andExpect(jsonPath("$.description").value(savedRestaurant.getDescription()))
                .andExpect(jsonPath("$.categories").value(category1))
                .andExpect(jsonPath("$.rating").value(savedRestaurant.getRating()));
        verify(restaurantService, times(1)).addRestaurantForOwner(eq(1), any(Restaurant.class));
    }

    @Test
    void updateRestaurant() throws Exception {
        Restaurant oldResto = new Restaurant(
                8,
                "Old Resto",
                "Old Address",
                "Old Phone",
                "Old Desc",
                List.of(RestaurantCategories.Chinois),
                3.5f);
        Restaurant updateData = new Restaurant();
        updateData.setName("Updated Resto");
        updateData.setAddress("Updated Address");
        updateData.setPhone("Updated Phone");
        updateData.setDescription("Updated Desc");
        updateData.setCategories(List.of(RestaurantCategories.libanais));

        Restaurant updatedResto = new Restaurant(
                8,
                "Updated Resto",
                "Updated Address",
                "Updated Phone",
                "Updated Desc",
                List.of(RestaurantCategories.libanais),
                4.0f);

        when(restaurantService.update(eq(oldResto.getId()), any(Restaurant.class))).thenReturn(updatedResto);

        String category1 = updatedResto.getCategories().getFirst().toString();

        mockMvc.perform(put("/restaurants/{id}", oldResto.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updateData)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(updatedResto.getId()))
                .andExpect(jsonPath("$.name").value(updatedResto.getName()))
                .andExpect(jsonPath("$.address").value(updatedResto.getAddress()))
                .andExpect(jsonPath("$.phone").value(updatedResto.getPhone()))
                .andExpect(jsonPath("$.description").value(updatedResto.getDescription()))
                .andExpect(jsonPath("$.categories").value(category1))
                .andExpect(jsonPath("$.rating").value(updatedResto.getRating()));

        verify(restaurantService, times(1)).update(eq(oldResto.getId()), any(Restaurant.class));
    }


    @Test
    void deleteRestaurant() throws Exception {
        int restaurantId = 9;
        mockMvc.perform(delete("/restaurants/{id}", restaurantId))
                .andExpect(status().isOk())
                .andExpect(content().string("restaurant supprimé avec succès !"));
        verify(restaurantService, times(1)).delete(restaurantId);
    }

    @Test
    void getRestaurantsRatedByUser() throws Exception {
        int userId = 12;
        Restaurant rest1 = new Restaurant(
                10,
                "Resto 1",
                "Addr 1",
                "Phone 1",
                "Desc 1",
                List.of(RestaurantCategories.Kebab),
                4.0f,
                5);
        Restaurant rest2 = new Restaurant(
                11,
                "Resto 2",
                "Addr 2",
                "Phone 2",
                "Desc 2",
                List.of(RestaurantCategories.Grec),
                3.5f,
                4);
        when(restaurantService.getRestaurantsRatedByUser(userId)).thenReturn(List.of(rest1, rest2));

        mockMvc.perform(get("/restaurants/ratedBy/{userId}", userId)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].id").value(rest1.getId()))
                .andExpect(jsonPath("$[0].noteFromCustomer").value(rest1.getNoteFromCustomer()))
                .andExpect(jsonPath("$[1].id").value(rest2.getId()))
                .andExpect(jsonPath("$[1].noteFromCustomer").value(rest2.getNoteFromCustomer()));
        verify(restaurantService, times(1)).getRestaurantsRatedByUser(userId);
    }
}
