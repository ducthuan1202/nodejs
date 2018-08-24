/**
 * Bài 2: Làm việc với file
 * Mục tiêu: 
 * - Tạo mới 1 file
 * - Đọc nội dung 1 file đã tồn tại
 * - Ghi đè 1 file đã có nội dung
 * - Thêm nội dung vào 1 file 
 * - Đổi tên 1 file
 * - Xóa 1 file
 */

const fs = require('fs');
const public = './public';
const pathLogs = public + '/logs/2018/08';

try {

    let path = (`${pathLogs}/` + Date.now() + `.txt`);

    // kiểm tra file
    if (!checkFileExist(path)) {
        let folder = getFolderPath(path);

        // nếu thư mục chưa tồn tại thì tạo thư mục
        if (!checkFolderExist(folder)) {
            createMultiLevelFolder(folder);
        }

        // tạo file
        let content = 'Log at ' + getTime();
        appendFile(path, content);

    }
} catch (e) {
    console.log(e.message);
}

/* get time string */
function getTime() {
    return (new Date()).toString();
}

/* scan folder */
function readFolder(path) {
    try {
        return {
            success: !0,
            data: fs.readdirSync(path),
        };
    } catch (e) {
        return {
            success: !1,
            data: []
        };
    }
}

/* đọc nội dung đồng bộ */
function readFile(path) {
    try {
        return {
            success: !0,
            data: fs.readFileSync(path),
        };
    } catch (e) {
        return {
            success: !1,
            data: new Buffer(0),
        };
    }
}

function createFolder(path) {
    try {
        fs.mkdirSync(path);
    } catch (e) {
        return false;
    }
    return true;
}

function createMultiLevelFolder(path) {
    const slug = path.split('/');
    var pathRunning = [];

    slug.forEach((item) => {
        pathRunning.push(item);
        let str = pathRunning.join('/');
        (!checkFolderExist(str) && createFolder(str));
    })
}

/* tạo 1 file trống đồng bộ */
function createNewFileEmpty(path) {
    try {
        fs.openSync(path, 'w');
    } catch (e) {
        return false;
    }
    return true;
}

/* ghi nội dung file đồng bộ */
function writeFile(path, content) {
    try {
        fs.writeFileSync(path, content);
    } catch (e) {
        return false;
    }
    return false;
}

/* thêm nội dung vào file đồng bộ */
function appendFile(path, content) {
    try {
        fs.appendFileSync(path, `\n${content}`);
    } catch (e) {
        return false;
    }
    return true;
}

/* đổi tên file đồng bộ */
function renameFile(path, newPath) {
    try {
        fs.renameSync(path, newPath);
    } catch (e) {
        return false;
    }
    return true;

}

/* xóa file đồng bộ */
function deleteFile(path) {
    try {
        fs.unlinkSync(path);
    } catch (e) {
        return false;
    }
    return true;

}

/* kiểm tra file tồn tại đồng bộ */
function checkFileExist(path) {
    try {
        fs.statSync(path);
    } catch (e) {
        return false;
    }
    return true;
}

/* kiểm tra thư mục tồn tại đồng bộ */
function checkFolderExist(path) {
    try {
        return fs.existsSync(path);
    } catch (e) {
        return false;
    }
}

/* get đường dẫn thư mục từ link file */
function getFolderPath(path) {
    let arr = path.split('/');
    arr.splice(-1, 1);
    path = arr.join('/');
    return path;
}