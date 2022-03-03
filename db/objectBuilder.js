module.exports = {

  envelope: (data) => {
    if(data.name && data.balance) {
      if(data.balance > 0) {
        return {name: data.name, balance: data.balance};
      }
    }
    return null;
  },
  
  transaction: (data) => {
    let response
    if(data.deduction && data.source && data.amount && data.envelope_id) {
      if(data.amount > 0) {
        response = {
          deduction: data.deduction,
          source: data.source,
          amount: data.amount,
          envelope_id: data.envelope_id,
          datetime: new Date()
        }
      }
      if(data.description) {
        response.description = data.description;
      }
      return response
    }
    return null;
  }
};
