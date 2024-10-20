
const db = require("../config/db");

const FinanceModel = {
  calculateDayRevenueCustomer: (date) => {
    return new Promise((resolve, reject) => {
      const queryDate = date ? `'${date}'` : 'CURDATE()';
  
      const query = `
        SELECT 
          DATE(b.Time) as Date, 
          SUM(b.TotalPrice) as TotalRevenue,
          SUM(t.Ability) as TotalCustomers
        FROM 
          bill b
        JOIN 
          \`table\` t
        ON 
          b.TableID = t.TableID
        WHERE 
          DATE(b.Time) = ${queryDate}
        GROUP BY 
          DATE(b.Time);
      `;
  
      db.query(query, (err, result) => {
        if (err) return reject(err);
        resolve(result[0]);
      });
    });
  },
  

  calculateDailyRevenueAndCustomers: () => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT 
          DATE(b.Time) as Date, 
          SUM(b.TotalPrice) as TotalRevenue,
          SUM(t.Ability) as TotalCustomers
        FROM 
          bill b
        JOIN 
          \`table\` t
        ON 
          b.TableID = t.TableID
        WHERE 
          b.Time >= CURDATE() - INTERVAL 12 DAY
          AND b.Time < CURDATE() + INTERVAL 1 DAY
        GROUP BY 
          DATE(b.Time)
        ORDER BY 
          Date ASC;
      `;
  
      db.query(query, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },

  calculateWeeklyRevenueAndCustomers: () => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT 
          YEARWEEK(b.Time, 1) as Week, 
          SUM(b.TotalPrice) as TotalRevenue,
          SUM(t.Ability) as TotalCustomers
        FROM 
          bill b
        JOIN 
          \`table\` t
        ON 
          b.TableID = t.TableID
        WHERE 
          b.Time >= CURDATE() - INTERVAL 12 WEEK
          AND b.Time < CURDATE() + INTERVAL 1 DAY
        GROUP BY 
          YEARWEEK(b.Time, 1)  -- Group by week
        ORDER BY 
          Week ASC;
      `;

      db.query(query, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },
  
  calculateMonthlyRevenueAndCustomers: () => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT 
          DATE_FORMAT(b.Time, '%Y-%m') as Month, 
          SUM(b.TotalPrice) as TotalRevenue,
          SUM(t.Ability) as TotalCustomers
        FROM 
          bill b
        JOIN 
          \`table\` t
        ON 
          b.TableID = t.TableID
        WHERE 
          b.Time >= CURDATE() - INTERVAL 12 MONTH
          AND b.Time < CURDATE() + INTERVAL 1 DAY
        GROUP BY 
          DATE_FORMAT(b.Time, '%Y-%m')  -- Group by month
        ORDER BY 
          Month ASC;
      `;

      db.query(query, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },

}

module.exports = FinanceModel;
  