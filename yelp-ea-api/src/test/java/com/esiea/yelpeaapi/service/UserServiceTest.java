package com.esiea.yelpeaapi.service;

import com.esiea.yelpeaapi.UserRole;
import com.esiea.yelpeaapi.entity.User;
import com.esiea.yelpeaapi.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    private User testUser;

    @BeforeEach
    void setUp() {
        testUser = new User(1, "john_doe", "password123", UserRole.customer, new HashMap<>(), null);
    }

    @Test
    void getAll() {
        when(userRepository.findAll()).thenReturn(List.of(testUser));

        List<User> users = userService.getAll();

        assertEquals(1, users.size());
        assertEquals(testUser, users.get(0));
        verify(userRepository, times(1)).findAll();
    }

    @Test
    void GetOne() {
        when(userRepository.findById(1)).thenReturn(Optional.of(testUser));

        User user = userService.get(1);

        assertNotNull(user);
        assertEquals(testUser, user);
        verify(userRepository, times(1)).findById(1);
    }

    @Test
    void getUser404() {
        when(userRepository.findById(1)).thenReturn(Optional.empty());

        Exception exception = assertThrows(RuntimeException.class, () -> userService.get(1));
        assertEquals("Utilisateur non trouvé", exception.getMessage());
    }

    @Test
    void add() {
        when(userRepository.save(testUser)).thenReturn(testUser);

        User user = userService.add(testUser);

        assertNotNull(user);
        assertEquals(testUser, user);
        verify(userRepository, times(1)).save(testUser);
    }

    @Test
    void updateUser() {
        User updatedUser = new User(1, "new_login", "new_password", UserRole.customer, new HashMap<>(), null);
        when(userRepository.findById(1)).thenReturn(Optional.of(testUser));
        when(userRepository.save(any(User.class))).thenReturn(updatedUser);

        User result = userService.update(1, updatedUser);

        assertNotNull(result);
        assertEquals("new_login", result.getLogin());
        assertEquals("new_password", result.getPassword());
        verify(userRepository, times(1)).findById(1);
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    void updateUser404() {
        User updatedUser = new User(1, "new_login", "new_password", UserRole.customer, null, null);
        when(userRepository.findById(1)).thenReturn(Optional.empty());

        Exception exception = assertThrows(RuntimeException.class, () -> userService.update(1, updatedUser));
        assertEquals("Utilisateur non trouvé", exception.getMessage());
    }

    @Test
    void deleteUser() {
        when(userRepository.existsById(1)).thenReturn(true);
        doNothing().when(userRepository).deleteById(1);

        assertDoesNotThrow(() -> userService.delete(1));
        verify(userRepository, times(1)).existsById(1);
        verify(userRepository, times(1)).deleteById(1);
    }

    @Test
    void deleteUser404() {
        when(userRepository.existsById(1)).thenReturn(false);

        Exception exception = assertThrows(RuntimeException.class, () -> userService.delete(1));
        assertEquals("Utilisateur non trouvé avec l'ID : 1", exception.getMessage());
    }

    @Test
    void addRating() {
        User customer = new User(1, "john_doe", "password123", UserRole.customer, null, null);
        when(userRepository.findById(1)).thenReturn(Optional.of(customer));

        Map<Integer, Integer> updatedNotes = new HashMap<>();
        updatedNotes.put(10, 8);

        User updatedCustomer = new User(1, "john_doe", "password123", UserRole.customer,updatedNotes, null);
        when(userRepository.save(any(User.class))).thenReturn(updatedCustomer);

        User result = userService.addRating(1, 10, 8);
        assertNotNull(result);
        assertEquals(8, result.getNotes().get(10));
        verify(userRepository, times(1)).findById(1);
        verify(userRepository, times(1)).save(any(User.class));
    }
}
