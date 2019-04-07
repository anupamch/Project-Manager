"use strict";
module.exports=function(db) {


    var crypto = require('crypto');
    var shasum = crypto.createHash('sha1');
    shasum.update('12345678');
    var password = shasum.digest('hex');
	
	db.user_type.bulkCreate([{'usertype':'Admin'},{'usertype':'Developer'},{'usertype':'Designer'},{'usertype':'HTML Coder'},{'usertype':'SEO Member'},{'usertype':'Project Manager'},{'usertype':'Client'}])
	            .then(function(data){
	            	
		            	   db.user.create({

						        fname: 'Admin',
						        lname: 'admin',
						        email: 'admin@g.com',
						        password: password,
						        phone_no: '12345678952',
						        
						        user_type_id: '1'

						    }).then(function (data) {


						    }, function (data) {
						        console.log(data)
						    })
						    
						   db.project_type.bulkCreate([
						                            {'projecttype':'Core PHP'},
						                            {'projecttype':'Codeigniter'},
						                            {'projecttype':'Laravel'},
						                            {'projecttype':'Angular'},
						                            {'projecttype':'IOS'},
						                            {'projecttype':'Android'},
						                            {'projecttype':'HTML'},
						                            {'projecttype':'Design'},
						                            {'projecttype':'SEO'}
						                        ]).then(function(data){})
    
})
}