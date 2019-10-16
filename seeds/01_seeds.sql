INSERT INTO users (id, name, email, password)
VALUES  (1, 'Frank Zou', 'franky@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
(2, 'Andrew Ko', 'andy@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
(3, 'William Ling', 'lingy@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, street, parking_spaces, 
number_of_bathrooms, number_of_bedrooms, country, city, province, post_code, active)
Values (1, 'Tuscany Patio', 'description', 'https://previews.123rf.com/images/siraphol/siraphol1404/siraphol140406821/27799225-tuscany-house.jpg', 'http://www.house-and-houses-tuscany.com/wp-content/uploads/2017/05/home4.jpg',
800, '560 Tusco', 1, 1, 2, 'Canada', 'Calgary', 'Alberta', 't3n 9s6', TRUE),
(2, 'Hawkystone', 'description', 'https://previews.123rf.com/images/siraphol/siraphol1404/siraphol140406821/27799225-tuscany-house.jpg', 'http://www.house-and-houses-tuscany.com/wp-content/uploads/2017/05/home4.jpg',
600, '213 Hawk', 2, 3, 2, 'Canada', 'Calgary', 'Alberta', 't3ne9s1', TRUE),
(3, 'ArbourLane', 'description', 'https://previews.123rf.com/images/siraphol/siraphol1404/siraphol140406821/27799225-tuscany-house.jpg', 'http://www.house-and-houses-tuscany.com/wp-content/uploads/2017/05/home4.jpg',
1300, '20 Lane Drive', 6, 9, 4, 'Canada', 'Calgary', 'Alberta', 'n0a 9s6', TRUE);

INSERT INTO reservations (id, start_date, end_date, property_id, guest_id) 
VALUES (1, '2019-01-18', '2019-02-21', 1, 2),
(2, '2019-03-08', '2019-02-16', 1, 1),
(3, '2019-03-18', '2019-04-01', 2, 2),
(4, '2019-01-12', '2019-01-18', 3, 3),
(5, '2019-08-09', '2019-09-21', 1, 3);

INSERT INTO property_reviews (id, guest_id, reservation_id, property_id, rating, message)
VALUES (1, 2, 1, 1, 7, 'message'),
(2, 1, 2, 2, 9, 'message'),
(3, 2, 3, 2, 7, 'message'),
(4, 3, 4, 3, 7, 'message'),
(5, 3, 5, 1, 7, 'message');

