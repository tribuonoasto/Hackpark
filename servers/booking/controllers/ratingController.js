const Rating = require("../models/rating");

class RatingController {
  static async insertRating(req, res, next) {
    try {
      const { UserId, VenueId, rating } = req.body;

      if (!UserId || !VenueId || !rating) {
        throw { name: "invalid_input" };
      }

      const checkUserRating = await Rating.findAll({
        UserId: +UserId,
        VenueId,
      });

      if (checkUserRating.length > 0) {
        throw { name: "already_rate" };
      }

      await Rating.insertOne({
        UserId: +UserId,
        VenueId,
        rating,
      });

      res.status(201).json({ message: "Rating Success" });
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
      console.log(error, "<<<<<<<<<<<<<<<<<<<<<<<<");
      next(error);
    }
  }
}

module.exports = RatingController;
