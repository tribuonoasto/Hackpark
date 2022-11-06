const Rating = require("../models/rating");

class RatingController {
  static async insertRating(req, res, next) {
    try {
      const { UserId, VenueId, rating } = req.body;

      const checkUserRating = await Rating.findAll({ UserId, VenueId });

      if (checkUserRating.length > 0) {
        throw { name: "already_rate" };
      }

      const resp = await Rating.insertOne({
        UserId,
        VenueId,
        rating,
      });

      if (!resp.acknowledged)
        throw {
          name: "invalid_rating",
          msg: "Error when rating venue",
        };

      res.status(200).json({ message: "Rating Success" });
    } catch (error) {
      next(error);
    }
  }

  static async showAllRatings(req, res, next) {
    try {
      const ratings = await Rating.findAll();

      if (!ratings || ratings.length <= 0) throw { name: "rating_not_found" };
      res.status(200).json(ratings);
    } catch (error) {
      next(error);
    }
  }

  static async showOneRating(req, res, next) {
    try {
      const { id } = req.params;

      const rating = await Rating.findOne(id);

      if (!rating) throw { name: "rating_not_found" };

      res.status(200).json(rating);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = RatingController;
