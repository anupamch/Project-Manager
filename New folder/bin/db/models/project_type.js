module.exports =function(sequelize, DataTypes) {


    return sequelize.define('project_type', {
        id: { type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        projecttype: DataTypes.STRING
    }, {
        timestamps: false,
        underscored: true
    });
}