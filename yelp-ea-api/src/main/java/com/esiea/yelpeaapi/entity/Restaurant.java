package com.esiea.yelpeaapi.entity;

import com.esiea.yelpeaapi.RestaurantCategories;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "restaurants")
public class Restaurant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String address;

    @Column(nullable = true)
    private String phone;
    private String description;

    @ElementCollection
    @CollectionTable(name = "restaurant_categories", joinColumns = @JoinColumn(name = "restaurant_id"))
    @Column(name = "category", nullable = true)
    @Enumerated(EnumType.STRING)
    private List<RestaurantCategories> categories;

    @Column(nullable = true)
    private float rating;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<RestaurantCategories> getCategories() {
        return categories;
    }

    public void setCategories(List<RestaurantCategories> categories) {
        this.categories = categories;
    }

    public float getRating() {
        return rating;
    }

    public void setRating(float rating) {
        this.rating = rating;
    }

    public Restaurant() {
    }
    public Restaurant(int id, String name, String address, String phone, String description, List<RestaurantCategories> categories, float rating) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.phone = phone;
        this.description = description;
        this.categories = categories;
        this.rating = rating;
    }
}

