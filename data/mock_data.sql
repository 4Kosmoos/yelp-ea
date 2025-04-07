-- Utilisateurs
INSERT INTO users (id, login, password, role) VALUES
(1, 'admin', 'adminpass', 'admin'),
(2, 'user', 'userpass', 'customer'),
(3, 'user2', 'user2pass', 'customer'),
(4, 'owner', 'ownerpass', 'owner'),
(5, 'owner2', 'owner2pass', 'owner');

-- Restaurants
INSERT INTO restaurants (id, address, description, name, phone) VALUES
(1, '123 Rue du Goût', 'Un petit bistrot sympa', 'Le Gourmet Parisien', '0102030105'),
(2, '45 Avenue du Soleil', 'Ambiance chaleureuse et plats faits maison', 'Chez Mamie', '0203040506'),
(3, '78 Boulevard Urbain', 'Le meilleur kebab de la ville', 'Le Kebab Royal', '0304050607');

-- Association propriétaires-restaurants
INSERT INTO user_resto (user_id, resto) VALUES
(4, 1),
(4, 3),
(5, 2);

-- Notes données par les utilisateurs
INSERT INTO user_notes (user_id, notes, notes_key) VALUES
(2, 4, 1),
(2, 5, 2),
(2, 3, 3),
(3, 1, 1),
(3, 2, 2);

INSERT INTO restaurant_categories (restaurant_id, category) VALUES
(1, 'Grec'),
(1, 'libanais'),
(2, 'japonais'),
(2, 'Thai'),
(3, 'Fast_food'),
(3, 'Kebab');
