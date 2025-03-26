package com.esiea.yelpeaapi.entity;

import com.esiea.yelpeaapi.UserRole;

import java.util.Collections;
import java.util.List;
import java.util.Map;

public class User {
    private int id;
    private String login;
    private String password;
    private UserRole role;
    private Map<Integer, Integer> notes;
    private List<Integer> resto;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public UserRole getRole() {
        return role;
    }

    public void setRole(UserRole role) {
        this.role = role;
    }

    public Map<Integer, Integer> getNotes() {
        return notes;
    }

    public void setNotes(Map<Integer, Integer> notes) {
        if (role == UserRole.customer) {
            this.notes = notes;
        } else {
            this.notes = null;
        }
    }

    public List<Integer> getResto() {
        return resto;
    }

    public void setResto(List<Integer> resto) {
        if (role == UserRole.owner) {
            this.resto = resto;
        } else {
            this.resto = null;
        }
    }

    public User() {
    }

    public User(int id, String login, String password, UserRole role, Map<Integer, Integer> notes, List<Integer> resto) {
        this.id = id;
        this.login = login;
        this.password = password;
        this.role = role;
        this.notes = (role == UserRole.customer) ? notes : null;
        this.resto = (role == UserRole.owner) ? resto : null;
    }
}
