'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // for 1:m -- hasMany is what we put on the 1. belongsTo is for 'm' 
      // each comment belongs to a single user
      // each comment has a fk that references a pk 
      // this relationship says that each comment "belongs to" a single user. This means that each comment has a foreign key field that references the primary key of a user record, and this relationship is used to retrieve the user associated with a given comment.
      models.comment.belongsTo(models.song)
      models.comment.belongsTo(models.user)
    }
  }
  comment.init({
    userId: DataTypes.INTEGER,
    comment: DataTypes.STRING,
    songId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'comment',
  });
  return comment;
};