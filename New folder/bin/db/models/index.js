var db=require('../connection.js')
var DataTypes = require("sequelize");

// load models
var models = [
     'user','user_type','group','project_type','project','project_document','comment'
];


models.forEach(function(model) {

    module.exports[model] = db.import(__dirname + '/' + model);
});

// describe relationships
(function(m) {
    m.user.belongsTo(m.user_type)
    m.user.belongsTo(m.group)
    m.project.belongsTo(m.project_type,{foreignKey:'project_type_id'}),
    m.project.belongsTo(m.user,{foreignKey:'client_id'})
    m.project.belongsTo(m.user,{foreignKey:'pm_id'})
    m.project.belongsTo(m.user,{foreignKey:'introduce_by'})
    m.project_document.belongsTo(m.project,{foreignKey:'project_id'})
    m.project_document.belongsTo(m.user,{foreignKey:'upload_by'})
    m.comment.belongsTo(m.user,{foreignKey:'owner_id'})
    m.comment.belongsTo(m.project,{foreignKey:'project_id'})

})(module.exports);

// export connection
module.exports.db = db;