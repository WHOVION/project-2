'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // join table
      // for 1:m -- hasMany is what we put on the 1. Belongs to is for 'm' 
      models.song.belongsToMany(models.user, {through:'users_songs'})
      models.song.hasMany(models.comment)
    }
  }
  song.init({
    songName: DataTypes.STRING,
    genre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'song',
  });
  return song;
};