SELECT reservations.*, properties.*, AVG(property_reviews.rating) AS average_rating
-- SELECT properties.id, properties.title, properties.cost_per_night, reservations.start_date, AVG(property_reviews.rating) AS average_rating
FROM properties
JOIN reservations ON properties.id = reservations.property_id
JOIN property_reviews ON properties.id = property_reviews.property_id
WHERE reservations.guest_id = 1
AND now()::date >= reservations.end_date
GROUP BY reservations.id, properties.id
ORDER BY reservations.start_date
LIMIT 10;
