module.exports =function(sequelize, DataTypes) {


    return sequelize.define('user_type', {
        id: { type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        usertype:DataTypes.STRING
       
    }, {
        timestamps: false,
        underscored: true
    });
}