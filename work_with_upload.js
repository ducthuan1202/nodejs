const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');


// khai báo thư mục
const PATHS = {
    PUBLIC: 'public',
    UPLOADS: 'uploads',
    VIEWS: 'views',
};


// thông báo
const MESSAGE = {
    ERROR_INVALID: 'Error: Images Only!',
    ERROR_NO_SELECTED: 'Error: No File Selected!',
    SUCCESS_UPLOADED: 'File Uploaded!',
};


// cấu hình flash
app.use(cookieParser());
app.use(session({
    secret: 'ndt1202',
    saveUninitialized: true,
    resave: true
}));
app.use(flash());

// cấu hình multer lưu trữ file
const storage = multer.diskStorage({
    destination: path.join(__dirname, PATHS.PUBLIC, PATHS.UPLOADS),
    filename: (req, file, cb) => {
        let fieldname = file.fieldname;
        let timeNow = Date.now();
        let extension = path.extname(file.originalname).toLowerCase();
        let fileName = `${fieldname}_${timeNow}_${extension}`;
        cb(null, fileName);
    }
});

// cấu hình upload, có kiểm tra limit size và kiểu file
const upload = multer({
    storage: storage,
    limits: { fileSize: 1e6 },
    fileFilter: (req, file, cb) => checkFileType(file, cb)
}).single('myImage');

// hàm kiểm tra input file
const checkFileType = (file, cb) => {

    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(MESSAGE.ERROR_INVALID);
    }
}

// set kiểu file engine và thư mục chứa
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, PATHS.VIEWS));

// khai báo thư mục public chứa tài nguyên tĩnh
app.use(express.static(path.join(__dirname, PATHS.PUBLIC)));

// đường dẫn 
app.get('/', (req, res) => {
    const
        success = req.flash('success'),
        message = req.flash('message'),
        file = req.flash('file');

    res.render('form-upload', { success, message, file })
});

app.post('/', (req, res) => {

    upload(req, res, (err) => {
        console.log(req.files);

        // nếu có lỗi
        if (err) {
            req.flash('success', 'false');
            req.flash('message', err);
            res.redirect('/');
            return !1;
        }

        // nếu không có lỗi
        if (req.file === undefined) {
            req.flash('success', 'false');
            req.flash('message', MESSAGE.ERROR_NO_SELECTED);
            res.redirect('/');
            return !1;
        }

        // nếu upload thành công
        req.flash('success', 'true');
        req.flash('message', MESSAGE.SUCCESS_UPLOADED);
        req.flash('file', path.join(PATHS.UPLOADS, req.file.filename));
        res.redirect('/');

    }); // kết thúc hàm upload

});


// cấu hình
const port = 3000;
const host = '127.0.0.1';
app.listen(port, host, () => console.log(`Server started at <http://${host}:${port}>`));
