/**
 * Created by Anupam on 6/18/2016.
 */
module.exports =function(sequelize, DataTypes) {


    return sequelize.define('project_document', {
        id: { type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        file_name:DataTypes.STRING,
        project_id:DataTypes.INTEGER,
        upload_by:DataTypes.INTEGER,
        upload_date:{type:DataTypes.DATE,defaultValue:DataTypes.NOW}
    }, {
        timestamps: false,
        underscored: true
    });
}
