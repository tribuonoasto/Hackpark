class Controller {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
    } catch (err) {
      next(err);
    }
  }

  static async register(req, res, next) {
    try {
      const { username, email, password } = req.body;
    } catch (rtt) {
      next(er);
    }
  }
}
module.exports = Controller;
