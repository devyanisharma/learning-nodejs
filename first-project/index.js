const express = require('express');
console.log("HI");
const app = express();
const http = require('http');
const fs = require('fs');

const port = 5000
const server = http.createServer(app)
server.listen(port, () => {
    console.log(`Listening on ${port}`)
});

//app.use(express.json());//it is a middleware used to parse request body(request body is in json format)
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage })

let userData = [{ userId: 99, userName: "Shivang", userAge: 22, userEmail: "as@email.com", userImage: "icecream.jpeg" },
{ userId: 90, userName: "Devyani", userAge: 25, userEmail: "de@email.com", userImage: "icecream.jpeg" }];
let gallery = [{ userId: 99, userGallery: [] }]

app.use(express.static("uploads"));

app.get('/images', (req, res) => {
    const userId = req.query.id;
    const userIndex = gallery.findIndex((value, index, obj) => {
        return value.userId == userId;
    });
    
    
    const imagePaths=[];
    const galleryArr = gallery[userIndex].userGallery
    galleryArr.forEach(element=>{
        const fileName = './uploads/' + element;
        imagePaths.push(fileName)
    })
    console.log(imagePaths)
    res.setHeader('Content-Type', 'image/jpeg');
  
    const streamPipeline = multipipe(...imagePaths.map((imagePath) => fs.createReadStream(imagePath)));

    res.set('Content-Type', 'multipart/x-mixed-replace; boundary=--myboundary');
  
    streamPipeline.on('data', (chunk) => {
      res.write(`\n--myboundary\nContent-Type: image/jpeg\nContent-Length: ${chunk.length}\n\n`);
      res.write(chunk);
    });
  
    streamPipeline.on('end', () => {
      res.end('\n--myboundary--');
    });
  
  });

app.get('/getImg', (req, res, next) => {
    const userId = req.query.id;
    const userIndex = userData.findIndex((value, index, obj) => {
        return value.userId == userId;
    });
    const fileName = userData[userIndex].userImage;

    res.setHeader('Content-Type', 'image/jpeg');
    const readStream = fs.createReadStream('./uploads/' + fileName)
    readStream.pipe(res);


    res.sendFile(__dirname + "/uploads/" + fileName, (err) => {
        if (err) {
            throw err;
        }
        console.log("Success")
    });

    res.download(__dirname + "/uploads/" + fileName, (err) => {
        if (err) {
            throw err;
        }
        console.log(err);
    })

})


app.post('/profileImg/:id',upload.single('image'), function (req, res, next) {
    const userId = req.params.id;
    
    console.log(userIndex)
    userData[userIndex].userImage = req.file.filename;
    console.log(req.file);
    res.send('upload successfully')
})

// app.post('/multipleImg/:id', upload.array('photos', 3), function (req, res, next) {
//     const userId = req.params.id;
//     const userIndex = gallery.findIndex((value,index,obj)=>{
//         return value.userId == userId;
//         });
//     const fileObj = req.files;
//     fileObj.forEach(element => {
//         gallery[userIndex].userGallery.push(element.filename);
//       });
//      console.log(gallery)
//     res.send('multiple upload successfully')
// })



// onst images = upload.fields([{ name: 'image', maxCount: 1 }, { name: 'photos', maxCount: 8 }])
// app.post('/images', images, function (req, res, next) {c
//     console.log(req.files)
//     res.send('All images upload successfully')
// })

// app.post('/profile', upload.none(), function (req, res, next) {
//     console.log(req.file);
//     res.send('upload successfully')
//   })


app.get('/api/users', (req, res, next) => {
    res.status(200).json(getUser());

});

app.post('/api/users', (req, res, next) => {
    //console.log("request body", req);
    const name = req.body.name;
    const age = req.body.age;
    const email = req.body.email;

    if (name.length > 3 && age > 0 && email.includes('@') && email.includes(".")) {
        const user = addUser(name, age, email);
        res.status(201).json({
            "message": "user created successfully",
            "user": user
        }
        )
    } else {
        res.status(401).json("forbideen request");
    }

});

app.put('/api/users/:id', (req, res, next) => {
    console.log("put request", req.body, req.params.id);
    const id = req.params.id;
    const name = req.body.name;
    const age = req.body.age;
    const email = req.body.email;
    if (name.length > 3 && age > 0 && email.includes('@') && email.includes(".")) {
        const user = update(id, name, age, email);
        res.status(201).json({
            "message": "user updated successfully",
            "user": user
        }
        )
    } else {
        res.status(401).json("forbideen request");
    }
})


app.patch('/api/users/:id', patchValidationMiddleware, (req, res, next) => {
    const originalUser = req.originalUser;
    console.log(originalUser);
    const patchObject = req.body;
    partialUpdate(originalUser, patchObject);
    res.status(201).json({
        "message": "partially updated successfully"
    })

})


app.delete('/api/users/:id', (req, res, next) => {
    console.log(req.params.id);
    const id = req.params.id;
    const user = deleteUser(id);
    res.status(200).json({
        "message": "user deleted successfully",
        "user": user
    })
})


function getUser() {
    return userData;
}

function addUser(name, age, email) {
    const id = Math.floor(Math.random() * 101);
    const users = { userId: id, userName: name, userAge: age, userEmail: email };
    userData.push(users)
    return users;
}

function update(id, name, age, email) {
    for (let i = 0; i < userData.length; i++) {
        if (userData[i].userId == id) {
            userData[i].userName = name;
            userData[i].userAge = age;
            userData[i].userEmail = email;
            console.log(userData[i]);
            return userData;
        }
    }

}

function partialUpdate(originalUser, patchObject) {

    Object.assign(originalUser, patchObject);
}

function deleteUser(id) {
    for (let i = 0; i < userData.length; i++) {
        if (userData[i].userId == id) {
            userData.pop(userData[i])
            return userData;
        }
    }
}

function patchValidationMiddleware(req, res, next) {
    const userId = req.params.id;
    let originalUser = userData.find((value, index, obj) => {
        console.log(value, index, obj)
        if (value.userId == userId) {
            return true;
        }
        return false;
    });

    const patchObject = req.body;
    for (var key in patchObject) {
        if (!originalUser.hasOwnProperty(key)) {
            const data = {
                "message": "error"
            }
            return data;
        }
    }
    req.originalUser = originalUser;
    next();
};





app.patch('/api/user', middleware, (req, res, next) => {

})

function middleware(req, res, next) {
    return res.status(401).json({
        "message": "bad request"
    })
    next();
}





