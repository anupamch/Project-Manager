/**
 * Created by Anupam on 6/18/2016.
 */
module.exports =function(sequelize, DataTypes) {


    return sequelize.define('comment', {
        id: { type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        comment: DataTypes.TEXT,
        project_id: DataTypes.INTEGER,
        owner_id: DataTypes.INTEGER,
        comment_date:{type:DataTypes.DATE,defaultValue:DataTypes.NOW}
    }, {
        timestamps: false,
        underscored: true
    });
}
