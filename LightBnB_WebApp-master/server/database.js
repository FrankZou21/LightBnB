const {Pool} = require('pg');
const pool = new Pool({
  user: 'vagrant',
  host: 'localhost',
  database: 'lightbnb',
  password: '123'
})

module.exports = {
/// Users
/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
getUserWithEmail : function(email) {
  return pool.query(`
  SELECT *
  FROM users
  WHERE email = $1
  `, [email])
    .then(res => {
      return res.rows[0];
    })
    .catch(error => {
      return error;
    })
},

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
getUserWithId : function(id) {
  return pool.query(`
  SELECT * 
  FROM users
  WHERE id = $1 
  `, [id])
    .then(res => {
      return res.rows[0];
    })
},

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
addUser :  function(user) {
  const value = [user.name, user.email, user.password];
  return pool.query(`
  INSERT INTO users(name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *
  `, value)
    .then(res => {
      return res.rows[0];
    })
},

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
getAllReservations : function(guest_id, limit = 10) {
  return pool.query(`
  SELECT reservations.*, properties.*, AVG(property_reviews.rating) AS average_rating
  FROM properties
  JOIN reservations ON properties.id = reservations.property_id
  JOIN property_reviews ON properties.id = property_reviews.property_id
  WHERE reservations.guest_id = $1
  AND now()::date >= reservations.end_date
  GROUP BY reservations.id, properties.id
  ORDER BY reservations.start_date
  LIMIT $2;
  `, [guest_id, limit])
    .then(res => {
      return res.rows;
    })
},

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

getAllProperties : function(options, limit = 10) {
  const queryParams = [];
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_reviews.property_id
  `;

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length}`;
  }

  if (queryParams[0]) {
    if (options.owner_id) {
      queryParams.push(`${options.owner_id}`);
      queryString += ` AND owner_id = $${queryParams.length}`;
    }
  } else {
    if (options.owner_id) {
      queryParams.push(`${options.owner_id}`);
      queryString += `WHERE owner_id = $${queryParams.length}`;
    }
  }

  
  if (queryParams[0]) {
    if (options.minimum_price_per_night) {
      queryParams.push(Number(options.minimum_price_per_night) * 100);
      queryString += ` AND cost_per_night > $${queryParams.length}`;
    }
  } else {
    if (options.minimum_price_per_night) {
      queryParams.push(Number(options.minimum_price_per_night) * 100);
      queryString += `WHERE cost_per_night > $${queryParams.length}`;
    }
  }

  if (queryParams[0]) {
    if (options.maximum_price_per_night) {
      queryParams.push(Number(options.maximum_price_per_night) * 100);
      queryString += ` AND cost_per_night < $${queryParams.length}`;
    }
  } else {
    if (options.maximum_price_per_night) {
      queryParams.push(Number(options.maximum_price_per_night) * 100);
      queryString += `WHERE cost_per_night <= $${queryParams.length}`;
    }
  }

  queryString += `
  GROUP BY properties.id
  `;
  
  if (options.minimum_rating) {
    queryParams.push(Number(options.minimum_rating));
    queryString += `HAVING avg(property_reviews.rating) >= $${queryParams.length}`;
  }
  
  queryParams.push(limit);
  queryString += `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  return pool.query(queryString, queryParams)
  .then(res => {
    return res.rows});
},

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
addProperty : function(property) {
  const value = [Number(property.owner_id), property.title, property.description, property.thumbnail_photo_url, property.cover_photo_url,
    Number(property.cost_per_night), property.street, Number(property.parking_spaces), Number(property.number_of_bathrooms), Number(property.number_of_bedrooms), 
    property.country, property.city, property.province, property.post_code];

    let queryString = `
    INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, street, parking_spaces, 
    number_of_bathrooms, number_of_bedrooms, country, city, province, post_code)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    RETURNING *;
    `

    return pool.query(queryString, value)
      .then(res => {
        return res.rows;
      })
  }
}