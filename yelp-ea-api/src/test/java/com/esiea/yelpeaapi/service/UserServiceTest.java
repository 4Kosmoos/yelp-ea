package com.esiea.yelpeaapi.service;

import com.esiea.yelpeaapi.UserRole;
import com.esiea.yelpeaapi.entity.User;
import com.esiea.yelpeaapi.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.any;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository repo;

    @InjectMocks
    private UserService userService;

    @Test
    void getAll() {
        User user1 = new User(1, "user1", "pass1", UserRole.customer, Map.of(10, 3), null);
        User user2 = new User(2, "user2", "pass2", UserRole.owner, null, List.of(7, 8));
        List<User> list = List.of(user1, user2);
        when(repo.findAll()).thenReturn(list);
        List<User> users = userService.getAll();

        assertEquals(users.getFirst(), list.getFirst());
        assertEquals(users.getLast(), list.getLast());
        assertEquals(users.size(), list.size());
        verify(repo, times(1)).findAll();
    }

    @Test
    void getUserById() {
        User mockedUser = new User(1, "john_doe", "password123", UserRole.owner,  null, List.of(5, 6));

        when(repo.findById(1)).thenReturn(Optional.of(mockedUser));

        User user = userService.get(1);

        assertNotNull(user);
        assertEquals(mockedUser.getLogin(), user.getLogin());
        assertEquals(mockedUser.getPassword(), user.getPassword());
        assertEquals(mockedUser.getRole(), user.getRole());
        assertEquals(mockedUser.getResto(), user.getResto());
        assertEquals(mockedUser.getNotes(), user.getNotes());
        verify(repo, times(1)).findById(1);
    }

    @Test
    void getUserNotFound() {
        when(repo.findById(1)).thenReturn(Optional.empty());

        Exception exception = assertThrows(RuntimeException.class, () -> userService.get(1));
        assertEquals("Utilisateur non trouvé", exception.getMessage());
        verify(repo, times(1)).findById(1);
    }

    @Test
    void add() {
        User newUser = new User(3, "new_user", "new_pass", UserRole.owner, null, List.of(5, 6));
        User savedUser = new User(5, "new_user", "new_pass", UserRole.owner, null, List.of(5, 6));

        when(repo.save(newUser)).thenReturn(savedUser);

        User result = userService.add(newUser);

        assertNotNull(result);
        assertEquals(savedUser.getId(), result.getId());
        assertEquals(savedUser.getLogin(), result.getLogin());
        assertEquals(savedUser.getPassword(), result.getPassword());
        assertEquals(savedUser.getRole(), result.getRole());
        assertEquals(savedUser.getResto(), result.getResto());
        assertEquals(savedUser.getNotes(), result.getNotes());
        verify(repo, times(1)).save(newUser);
    }

    @Test
    void updateUser() {
        User existingUser = new User(1, "old_login", "old_pass", UserRole.owner, null, List.of(5, 6));
        User updateData = new User();
        updateData.setLogin("new_login");
        updateData.setPassword("new_pass");
        User updatedUser  = new User(1, "new_login", "new_pass", UserRole.owner, null, List.of(5, 6));

        when(repo.findById(1)).thenReturn(Optional.of(existingUser));
        when(repo.save(existingUser)).thenReturn(updatedUser);

        User result = userService.update(1, updateData);

        assertNotNull(result);
        assertEquals(updateData.getLogin(), result.getLogin());
        assertEquals(updateData.getPassword(), result.getPassword());
        verify(repo, times(1)).findById(1);
        verify(repo, times(1)).save(existingUser);
    }

    @Test
    void updateUserNotFound() {
        when(repo.findById(1)).thenReturn(Optional.empty());

        User updateData = new User();
        updateData.setLogin("new_login");
        updateData.setPassword("new_password");

        Exception exception = assertThrows(RuntimeException.class, () -> userService.update(1, updateData));
        assertEquals("Utilisateur non trouvé", exception.getMessage());

        verify(repo, times(1)).findById(1);
        verify(repo, never()).save(any(User.class));
    }

    @Test
    void deleteUser() {
        int userId = 1;
        when(repo.existsById(userId)).thenReturn(true);
        userService.delete(userId);

        verify(repo, times(1)).existsById(userId);
        verify(repo, times(1)).deleteById(userId);
    }

    @Test
    void deleteUserNotFound() {
        int userId = 1;
        when(repo.existsById(userId)).thenReturn(false);

        Exception exception = assertThrows(RuntimeException.class, () -> userService.delete(userId));
        assertTrue(exception.getMessage().contains("Utilisateur non trouvé avec l'ID : " + userId));

        verify(repo, times(1)).existsById(userId);
        verify(repo, never()).deleteById(anyInt());
    }

    @Test
    void addRating() {
        int userId = 1;
        int restaurantId = 20;
        int rating = 5;

        User customer = new User(userId, "customer", "password", UserRole.customer, null, null);
        when(repo.findById(userId)).thenReturn(Optional.of(customer));

        Map<Integer, Integer> newNotes = new HashMap<>();
        newNotes.put(restaurantId, rating);
        customer.setNotes(newNotes);

        when(repo.save(customer)).thenReturn(customer);

        User result = userService.addRating(userId, restaurantId, rating);

        assertNotNull(result);
        assertEquals(rating, result.getNotes().get(restaurantId));
        verify(repo, times(1)).findById(userId);
        verify(repo, times(1)).save(customer);
    }

    @Test
    void addRatingForNonCustomer() {
        int userId = 2;
        int restaurantId = 20;
        int rating = 5;
        User owner = new User(userId, "owner", "pass", UserRole.owner, null, List.of(1,2));
        when(repo.findById(userId)).thenReturn(Optional.of(owner));

        Exception exception = assertThrows(RuntimeException.class, () -> userService.addRating(userId, restaurantId, rating));
        assertTrue(exception.getMessage().contains("Seul un utilisateur de type CUSTOMER"));
        verify(repo, times(1)).findById(userId);
        verify(repo, never()).save(any());
    }
}
