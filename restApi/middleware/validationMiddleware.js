const { userData } = require('../dao/datastore.js');
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

    imageValidationMiddleware: function(req,res,next){
        const userId= req.params.id;
        

    }
}