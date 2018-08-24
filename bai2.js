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
let fileName = 'config.txt';
let content = 'Log at ' + getTime();
let fileConfigPath = `${public}/${fileName}`;

// read folder sync
let folderContent = readFolder(public);
console.log(folderContent);

// check file
if (checkFileExist(fileConfigPath)) {
    let newFileName = 'cauhinh.txt';
    renameFile(fileConfigPath, `${public}/${newFileName}`);

    fileConfigPath = `${public}/${fileName}`;
    appendFile(fileConfigPath, content);
} else {
    writeFile(fileConfigPath, content);
}

// read file sync
let fileContent = readFile(fileConfigPath);
console.log(fileContent);

if(deleteFile(fileConfigPath)){
    console.log(`đã xóa file ${fileConfigPath}`);
} else {
    console.log(`xóa file ${fileConfigPath} thất bại`);
}

function getTime() {
    return (new Date()).toString();
}

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

function writeFile(path, content) {
    try {
        fs.writeFileSync(path, content);
    } catch (e) {
        return false;
    }
    return false;
}

function appendFile(path, content) {
    try {
        fs.appendFileSync(path, `\n${content}`);
    } catch (e) {
        return false;
    }
    return true;
}

function renameFile(path, newPath) {
    try {
        fs.renameSync(path, newPath);
    } catch (e) {
        return false;
    }
    return true;

}


function deleteFile(path) {
    try {
        fs.unlinkSync(path);
    } catch (e) {
        return false;
    }
    return true;

}

function checkFileExist(path) {
    try {
        fs.statSync(path);
    } catch (e) {
        return false;
    }
    return true;
}
