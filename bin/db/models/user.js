module.exports =function(sequelize, DataTypes) {


    return sequelize.define('user', {
        id: { type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        fname: DataTypes.STRING,
        lname: DataTypes.STRING,
        email:DataTypes.STRING,
		gender:DataTypes.STRING,
		dob:DataTypes.DATE,
        password: DataTypes.STRING,
        user_type_id: DataTypes.INTEGER,
        address:DataTypes.STRING(500),
        phone_no:DataTypes.STRING,
        prof_image:DataTypes.STRING,
        group_id:DataTypes.INTEGER,
        created_by:DataTypes.INTEGER,
		user_status:{type:DataTypes.INTEGER,defaultValue:1}
    }, {
        timestamps: false,
        underscored: true
    });
}


