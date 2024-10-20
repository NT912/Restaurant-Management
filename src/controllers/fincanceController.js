const financeModel = require("../models/financeModel")


const financeController = {
  financeDaily: async (req, res) => {
    try {
      const type = req.query.name || 'daily';
      var result;
      if (type == 'daily'){
        result = await financeModel.calculateDailyRevenueAndCustomers();
      } else
      if (type == 'weekly'){
        result = await financeModel.calculateWeeklyRevenueAndCustomers();
      } else {
        result = await financeModel.calculateMonthlyRevenueAndCustomers();
      } 

      res.status(200).json({ message: "ok", result});
    } catch(err) {
      console.log(err);
    }
  }
};

module.exports = financeController;
