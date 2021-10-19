module.exports = ( sequelize, DataTypes ) => {
    const Comment = sequelize.define('Comment', {
      comment: DataTypes.STRING,
      type: DataTypes.STRING,
      dateStart: DataTypes.DATE,
      dateEnd: DataTypes.DATE,
    })
    return Comment
  }
