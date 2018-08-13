const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'laravel_videos'
});

exports.connect = function () {
    return pool;
}

exports.getAll = function (req, res) {

    let queryString = 'SELECT * FROM categories';

    pool.query(queryString, (error, results) => {
        if (error) renderError(res);
        if (!results) renderEmpty(res);

        let categories = [];
        results.map((item) => {
            categories.push({
                id: item.id,
                title: item.title,
                slug: item.slug,
                excerpt: item.excerpt,
                videos_count: item.videos_count,
                created_at: item.created_at,
                updated_at: item.updated_at,
            });
        })
        renderSuccess(res, categories);
    });
}

exports.getOne = function (id) {
    return new Promise((resolve, reject) => {
        let queryString = 'SELECT * FROM categories WHERE id=' + id + ' LIMIT 1';

        pool.query(queryString, (error, results) => {
            if (error) {
                resolve(returnData(400, 'error', []));
            };
            if (!results) {
                resolve(returnData(200, 'empty', []));
            }

            let categories = [];
            results.map((item) => {
                categories.push({
                    id: item.id,
                    title: item.title,
                    slug: item.slug,
                    excerpt: item.excerpt,
                    videos_count: item.videos_count,
                    created_at: item.created_at,
                    updated_at: item.updated_at,
                });
            })

            resolve(returnData(200, 'success', categories));
        });
    })

}

/**
 * ***********************************************
 * Function 
 *************************************************
 */
function returnData(status, message, data) {
    return {
        status: status,
        message: message,
        data: data
    }
}

function render(res, data) {
    res.send(data);
}

function renderError(res) {
    const result = returnData(400, 'error', []);
    render(res, result);
}

function renderEmpty(res) {
    const result = returnData(200, 'empty', []);
    render(res, result);
}

function renderSuccess(res, data) {
    const result = returnData(200, 'success', data);
    render(res, result);
}