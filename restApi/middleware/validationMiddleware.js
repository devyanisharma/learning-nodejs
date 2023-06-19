const { userData } = require('../dao/datastore.js');
module.exports = {
    patchValidationMiddleware:function(req,res,next){
        const userId = req.params.id;
        let originalUser = userData.find((value, index, obj) => {
           // console.log(value, index, obj)
            if (value.userId == userId) {
                return true;
            }
            return false;
        });
    
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
    }
}