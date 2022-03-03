const knex = require('./env');

const dbQueries = {

  selectAll: async (table) => {
    try {
      return await knex.select().from(table); 
    } catch (err) {
      return null;
    }
  },

  selectById: async (table, id) => {
    try {
      const data = await knex.where({id: id}).select().from(table);
      if(data.length > 0) {
        return data;
      } else {
        return null;
      }
    } catch (err) {
      return null;
    }
  },

  post: async (table, input) => {
    try {
      return await knex(table).insert(input);
    } catch (err) {
      return 'Invalid argument provided';
    }
  },

  put: async (table, id, input) => {
    try {
      const data = await knex(table).where({id: id}).update(input);
      if(data === 1) {
        return 'Success';
      } else {
        return 'Invalid argument provided';
      }
    } catch (err) {
        return 'Invalid argument provided';
    }
  },

  delete: async (table, id) => {
    try {
      const data = await knex(table).where({id: id}).del();
      if(data === 1) {
        return 'Success';
      } else {
        return 'Invalid argument provided';
      }
    } catch (err) {
      return 'Invalid argument provided';
    }
  }
};

module.exports = dbQueries;