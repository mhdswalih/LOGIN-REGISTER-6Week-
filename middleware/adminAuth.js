const isLogin = async (req, res, next) => {
    try {
      if (req.session.admin) {
        next();
      } else {
        res.redirect("/admin/login");
      }
    } catch (err) {
      console.log(err);
    }
  };
  
  const isLogout = async (req, res, next) => {
    try {
      if (!req.session.admin) {
        next();
      } else {
        res.redirect("/admin/dashboard");
      }
    } catch (err) {
      console.log(err);
    }
  };
  
  module.exports = {
    isLogin,
    isLogout,
  };
  