function date(format = 'd/m/y') {
    var d = new Date(),
        year = twoChar(d.getFullYear()),
        month = twoChar(d.getMonth()) + 1,
        day = twoChar(d.getDay()),
        hour = twoChar(d.getHours()),
        minute = twoChar(d.getMinutes()),
        second = twoChar(d.getSeconds());

    return format.replace(/y/i, year)
        .replace(/m/i, month)
        .replace(/d/i, day)
        .replace(/h/i, hour)
        .replace(/i/i, minute)
        .replace(/s/i, second);
}

function twoChar(n) {
    n = parseInt(n);
    return (n < 10) ? `0${n}` : n;
}


let str = date('Y, m/d h : i : s');
console.log(str);