const dashboardController = {
  getDashboard: (req, res) => {
    return res.render('dashboard', { title: "Dashboard" });
  }
}

module.exports = dashboardController;