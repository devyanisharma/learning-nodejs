const { userData } = require('../dao/userDao_mysql');
const { userDetail } = require('../dao/datastore.js');
const multer = require('multer')
const jwt = require('jsonwebtoken');


module.exports = {
    registerValidation: function (req, res, next) {
        console.log(req.body);
        const firstname = req.body.firstname;
        const lastname = req.body.lastname
        const phonenumber = req.body.Number
        const password = req.body.password
        const confirmPassword = req.body.confirmPassword;
        const email = req.body.email
        console.log(password == confirmPassword);
        if (firstname.length > 3 && lastname.length > 3 && email.includes('.') && email.includes('@')
            && password.length >= 6 && (password == confirmPassword)) {
            next();
        } else {
            res.status(401).json({ "message": "validation not matched" })
        }
    },

    cookieValidation: function (req, res, next) {
        console.log("cookie", req.cookies);
        if (req.cookies.hasOwnProperty('userData')) {
            const decoded = req.cookies.userData;//in case of cookie
            //    const deco = jwt.verify(req.cookies.userData,"PrivateKey");
            //const decoded = deco.user;
            //    console.log("decoded",decoded)
            if (decoded.hasOwnProperty('email')) {
                console.log("authenticated")
                next();
            }
            else {
                console.log("un authenticated")
                res.status(401).json({
                    "message": "unauthorized"
                })
            }
        } else {

            res.status(440).json({
                "message": "session expired"
            })
        }
    },

    patchValidationMiddleware: function (req, res, next) {
        const userId = req.params.id;
        let originalUser = userData[0]
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

    configureMulterMiddleware: function () {
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, './uploads')
            },
            filename: function (req, file, cb) {
                cb(null, Date.now() + '-' + file.originalname)
            }
        });

        const upload = multer({ storage: storage })
        let images = upload.fields([{ name: 'image', maxCount: 1 }, { name: 'images', maxCount: 8 }, { name: 'resume', maxCount: 1 }])
        console.log("multer instance middleware")
        return images;
    },

    imageValidationMiddleware: function (request, response, next) {
        if (!request.body.key == 'image' || !request.body.key == 'images' || !request.body.key == 'resume') {
            console.log("validation middleware - inside key")
            return response.status(401).json({
                "message": "incorrect key",
            });
        }
        console.log("validation middleware")
        next();
    }
}