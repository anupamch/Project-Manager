module.exports =function(sequelize, DataTypes) {


    return sequelize.define('group', {
        id: { type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        group:DataTypes.STRING,
        created_by:DataTypes.INTEGER
    }, {
        timestamps: false,
        underscored: true
    });
}