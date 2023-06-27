const { userData } = require('../dao/datastore.js');
const {userDetail} = require('../dao/datastore.js');
const multer = require('multer')

module.exports = {
    patchValidationMiddleware:function(req,res,next){
        const userId = req.params.id;
        let originalUser = userData.find(function (value, index, obj) {
           return value.userId == userId;
        });
        if (originalUser == undefined){
            return res.status(400).json({
                "message": "Id not found"
            })
        }
        const patchObject = req.body;
        for (var key in patchObject) {
            if (!originalUser.hasOwnProperty(key)) {
                return res.status(401).json({
                    "message": "incorrect key"
                })
            }
        }
        req.originalUser = originalUser;
        next();
    },

    configureMulterMiddleware: function() {
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, './uploads')
            },
            filename: function (req, file, cb) {
                cb(null, Date.now() + '-' + file.originalname)
            }
        });

        const upload = multer({ storage: storage })
        let images = upload.fields([{ name: 'image', maxCount: 1 }, { name: 'images', maxCount: 8 },{name: 'resume',maxCount:1}])

        console.log("multer instance middleware")
        return images;
    },

    imageValidationMiddleware: function(request,response,next){
        const userId = request.params.id;
        const userIndex = userData.findIndex((value, index, obj) => {
            return value.userId == userId;
        });
        if (userIndex == -1) {
            return response.status(401).json({
                "message": "User id not found",
                

            });
        }
         if(!request.body.key == 'image'|| !request.body.key == 'images'||!request.body.key == 'resume'){
            console.log("validation middleware - inside key")
            return response.status(401).json({
                "message": "incorrect key",
                

            }); 
            
         }
         console.log("validation middleware")
         next();
        }   
}