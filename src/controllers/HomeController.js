class HomeController {
  index(req, res) {
    res.status(401).json({
      okay: true,
    });
  }
}

export default new HomeController();
