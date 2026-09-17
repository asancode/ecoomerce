
import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,"uploads")
    },
    filename:function (req,file,cb){
        cb(null,Date.now() + "-" + file.originalname)
    }
})

const uploads = multer({storage:storage})
export default uploads;

