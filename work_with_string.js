const capitalizeFirstLetter = (str) => {
    str = str.trim();
    let firstLetter = str.charAt(0).toUpperCase();
    let lastString = str.slice(1);
    return firstLetter + lastString;
}

const strTitle = (str) => {
    str = str.trim().split(' ');
    let arr = str.map(item => {
        return capitalizeFirstLetter(item);
    });

    return arr.join(' ');
}

const strLowerCase = (str) => {
    return str.toLowerCase();
}

const strUpperCase = (str) => {
    return str.toUpperCase();
}

/** ************************************************ */

var str = "apple banana kiwi";
str = strTitle(str);

console.log(str);
console.log(strLowerCase(str));
console.log(strUpperCase(str));