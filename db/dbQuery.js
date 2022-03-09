const knex = require('./db-config');

const dbQueries = {

  selectAll: async (table) => {
    try {
      return await knex.select().from(table); 
    } catch (err) {
      return null;
    }
  },

  selectById: async (table, id, idType = 'id') => {
    try {
      const data = await knex.where({[idType]: id}).select().from(table);
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
      const data = await knex(table).insert(input);
      if(data.rowCount === 1) {
        return 'Success';
      } else {
        return 'Invalid argument provided';
      }
    } catch (err) {
      console.log(err);
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
  },

  updateBalance: async (id, amount, deduction) => {
    try {
      let envelope = await knex.where({id: id}).select().from('envelopes');
      if(deduction) {
        envelope[0].balance -= amount;
      } else {
        envelope[0].balance += amount;
      }
      const data = await knex('envelopes').where({id: id}).update({balance: envelope[0].balance});
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
