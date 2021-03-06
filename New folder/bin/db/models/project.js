/**
 * Created by Anupam on 6/18/2016.
 */
module.exports =function(sequelize, DataTypes) {


    return sequelize.define('project', {
        id: { type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: DataTypes.STRING,

        client_id:DataTypes.INTEGER,
        start_time:DataTypes.DATE ,
        dead_line: DataTypes.DATE,
        price:{type:DataTypes.DOUBLE,defaultValue:null},
        pm_id:DataTypes.INTEGER,
        project_des:DataTypes.STRING,
        created_by:DataTypes.INTEGER,
        status:{type:DataTypes.INTEGER,comment: "0 not start, 1 started,2 complete,3 stoped"},
        introduce_by:DataTypes.INTEGER,
        project_type_id:DataTypes.INTEGER
    }, {
        timestamps: false,
        underscored: true
    });
}



