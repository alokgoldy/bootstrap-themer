export default ({user}, res, next) => {
    if (!user) {
      return res.redirect("/dashboard/login");
    }
    next();
  };