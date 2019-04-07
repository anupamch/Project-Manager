module.exports=function(){
var multer = require('multer');
var filename=""
var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, 'public/uploads/')
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
			filename=file.originalname.split('.')[0]+datetimestamp+file.originalname.split('.')[file.originalname.split('.').length -1]
            cb(null, filename)
        }
    });
    var upload = multer({ //multer settings
                    storage: storage
                }).single('file');
    return 	upload			
		
}