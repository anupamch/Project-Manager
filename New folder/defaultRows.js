"use strict";
module.exports=function(db) {


    var crypto = require('crypto');
    var shasum = crypto.createHash('sha1');
    shasum.update('12345678');
    var password = shasum.digest('hex');
    db.user.create({

        fname: 'Admin',
        lname: 'admin',
        email: 'admin@g.com',
        password: password,
        phone_no: '12345678952',
        user_type: '1'

    }).then(function (data) {


    }, function (data) {
        console.log(data)
    })
}