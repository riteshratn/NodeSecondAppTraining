exports.checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
  };
  
  exports.showIndex = (req, res) => {
    res.render('index.ejs', { name: req.user.name });
  };
  
