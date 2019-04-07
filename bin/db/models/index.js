var db=require('../connection.js')
var DataTypes = require("sequelize");

// load models
var models = [
     'user','user_type','group','project_type','project','project_document','comment','comment_document'
];


models.forEach(function(model) {

    module.exports[model] = db.import(__dirname + '/' + model);
});

// describe relationships
(function(m) {
    m.user.belongsTo(m.user_type,{foreignKey:'user_type_id'})
    m.user.belongsTo(m.group)
    m.project.belongsTo(m.project_type,{foreignKey:'project_type_id'}),
    m.project.belongsTo(m.user,{foreignKey:{name:'client_id',allowNull: true},constraints: false,as: 'client'})
    m.project.belongsTo(m.user,{foreignKey:{name:'pm_id',allowNull: true},constraints: false,as: 'pm'})
    m.project.belongsTo(m.user,{foreignKey:{name:'introduce_by'},as: 'introduced'})
    m.project.belongsTo(m.user,{foreignKey:{name:'edited_by'},as: 'editedby'})
    m.project_document.belongsTo(m.project,{foreignKey:{name:'project_id'}})
    m.project.hasMany(m.project_document)
    m.project_document.belongsTo(m.user,{foreignKey:'upload_by'})
    m.comment.belongsTo(m.user,{foreignKey:'owner_id'})
    m.comment.belongsTo(m.project,{foreignKey:'project_id'})
	m.project.belongsToMany(m.user, {through: 'user_project'});
    m.user.belongsToMany(m.project, {through: 'user_project'});
    m.comment_document.belongsTo(m.comment,{foreignKey:'comment_id'})
    m.comment.hasMany(m.comment_document)
})(module.exports);

// export connection
module.exports.db = db;