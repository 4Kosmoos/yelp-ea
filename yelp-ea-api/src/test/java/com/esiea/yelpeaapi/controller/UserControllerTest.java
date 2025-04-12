package com.esiea.yelpeaapi.controller;

import com.esiea.yelpeaapi.UserRole;
import com.esiea.yelpeaapi.entity.User;
import com.esiea.yelpeaapi.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.Map;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;


@WebMvcTest(UserController.class)
@ExtendWith(MockitoExtension.class)
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private UserService userService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void getAllUsers() throws Exception {
        User mockedUser1 = new User(1, "john_doe", "password123", UserRole.customer, Map.of(10, 4), null);
        User mockedUser2 = new User(2, "jane_doe", "password123", UserRole.owner, null, List.of(5, 6));
        when(userService.getAll()).thenReturn(List.of(mockedUser1, mockedUser2));
        mockMvc.perform(get("/users/all")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].id").value(mockedUser1.getId()))
                .andExpect(jsonPath("$[0].login").value(mockedUser1.getLogin()))
                .andExpect(jsonPath("$[0].password").value(mockedUser1.getPassword()))
                .andExpect(jsonPath("$[0].role").value(mockedUser1.getRole().toString()))
                .andExpect(jsonPath("$[1].id").value(mockedUser2.getId()))
                .andExpect(jsonPath("$[1].login").value(mockedUser2.getLogin()))
                .andExpect(jsonPath("$[1].password").value(mockedUser2.getPassword()))
                .andExpect(jsonPath("$[1].role").value(mockedUser2.getRole().toString()));
        verify(userService, times(1)).getAll();
    }

    @Test
    void getUserById() throws Exception {

        User mockedUser = new User(1, "john_doe", "password123", UserRole.owner,  null, List.of(5, 6));
        when(userService.get(1)).thenReturn(mockedUser);

        int resto1 = mockedUser.getResto().get(0);
        int resto2 = mockedUser.getResto().get(1);

        mockMvc.perform(get("/users/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(mockedUser.getId()))
                .andExpect(jsonPath("$.login").value(mockedUser.getLogin()))
                .andExpect(jsonPath("$.password").value(mockedUser.getPassword()))
                .andExpect(jsonPath("$.role").value(mockedUser.getRole().toString()))
                .andExpect(jsonPath("$.resto[0]").value(resto1))
                .andExpect(jsonPath("$.resto[1]").value(resto2));
        verify(userService, times(1)).get(1);

    }

    @Test
    void createCustomer() throws Exception{
        User mockedNewUser = new User(3, "new_customer", "password123", UserRole.customer, Map.of(8, 3, 12, 5), null);
        User mockedSavedUser = new User(4, "john_doe", "password123", UserRole.customer, Map.of(10, 4), null);
        when(userService.add(any(User.class))).thenReturn(mockedSavedUser);

        mockMvc.perform(post("/users/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(mockedNewUser)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(mockedSavedUser.getId()))
                .andExpect(jsonPath("$.login").value(mockedSavedUser.getLogin()))
                .andExpect(jsonPath("$.password").value(mockedSavedUser.getPassword()))
                .andExpect(jsonPath("$.role").value(mockedSavedUser.getRole().toString()))
                .andExpect(jsonPath("$.resto").value(mockedSavedUser.getResto()));
        verify(userService, times(1)).add(any(User.class));
    }

    @Test
    void createOwner() throws Exception {

        User mockednewOwner = new User(5, "john_doe", "password123", UserRole.owner, null, List.of(5, 6));
        User mockedsavedOwner = new User(6, "john_doe", "password123", UserRole.owner, null, List.of(5, 6));
        when(userService.add(any(User.class))).thenReturn(mockedsavedOwner);

        int resto1 = mockedsavedOwner.getResto().get(0);
        int resto2 = mockedsavedOwner.getResto().get(1);

        mockMvc.perform(post("/users/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(mockednewOwner)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(mockedsavedOwner.getId()))
                .andExpect(jsonPath("$.login").value(mockedsavedOwner.getLogin()))
                .andExpect(jsonPath("$.password").value(mockedsavedOwner.getPassword()))
                .andExpect(jsonPath("$.role").value(mockedsavedOwner.getRole().toString()))
                .andExpect(jsonPath("$.notes").value(mockedsavedOwner.getNotes()))
                .andExpect(jsonPath("$.resto[0]").value(resto1))
                .andExpect(jsonPath("$.resto[1]").value(resto2));
        verify(userService, times(1)).add(any(User.class));

    }

    @Test
    void updateUser() throws Exception {

        User mockedInitialUser = new User(7, "login1", "password1", UserRole.customer, Map.of(10, 4), null);
        User mockedUserUpdater = new User();
        mockedUserUpdater.setLogin("login2");
        mockedUserUpdater.setPassword("password2");
        User mockedUpdatedUser = new User(7, "login2", "password2", UserRole.customer, Map.of(10, 4), null);
        when(userService.update(eq(mockedInitialUser.getId()), any(User.class))).thenReturn(mockedUpdatedUser);

        mockMvc.perform(put("/users/update/{id}", mockedInitialUser.getId())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(mockedUserUpdater)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(mockedUpdatedUser.getId()))
                .andExpect(jsonPath("$.login").value(mockedUpdatedUser.getLogin()))
                .andExpect(jsonPath("$.password").value(mockedUpdatedUser.getPassword()));
        verify(userService, times(1)).update(eq(mockedInitialUser.getId()), any(User.class));
    }

    @Test
    void deleteUser() throws Exception {
        mockMvc.perform(delete("/users/delete/8"))
                .andExpect(status().isOk())
                .andExpect(content().string("Utilisateur supprimé avec succès !"));
        verify(userService, times(1)).delete(8);
    }


    @Test
    void rateRestaurant() throws Exception {
        int userId = 9;
        int restaurantId = 10;
        int rating = 4;
        User mockedFinalUser = new User(userId, "john_doe", "password123", UserRole.customer, Map.of(restaurantId, rating), null);
        when(userService.addRating(userId, restaurantId, rating)).thenReturn(mockedFinalUser);

        mockMvc.perform(post("/users/9/rate/10")
                .param("rating", String.valueOf(rating))
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(mockedFinalUser.getId()))
                .andExpect(jsonPath("$.login").value(mockedFinalUser.getLogin()))
                .andExpect(jsonPath("$.password").value(mockedFinalUser.getPassword()))
                .andExpect(jsonPath("$.role").value(mockedFinalUser.getRole().toString()))
                .andExpect(jsonPath("$.notes['" + restaurantId + "']").value(rating));
        verify(userService, times(1)).addRating(userId, restaurantId, rating);
    }
}
