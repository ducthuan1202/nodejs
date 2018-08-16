const Response = require('./../render/Response');
const connectPool = global.connectPool;

exports.getAll = (req, res) => {
    const reponse = new Response();
    let queryString = 'SELECT * FROM categories';

    connectPool.query(queryString, (error, results) => {
        let data = {};
        if (error) {
            data = reponse.error();
            res.send(data);
        }

        if (!results) {
            data = reponse.empty();
            res.send(data);
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

        data = reponse.success(categories);
        res.set('Access-Control-Allow-Origin', '*');
        res.send(data);
    });
}

exports.getOne = (id) => {

    return new Promise((resolve, reject) => {
        let queryString = 'SELECT * FROM categories WHERE id=' + id + ' LIMIT 1';

        connectPool.query(queryString, (error, results) => {
            if (error) resolve([]);
            if (!results) resolve([]);

            let categories = {};
            results.map((item) => {
                categories = {
                    id: item.id,
                    title: item.title,
                    slug: item.slug,
                    excerpt: item.excerpt,
                    videos_count: item.videos_count,
                    created_at: item.created_at,
                    updated_at: item.updated_at,
                };
            })
            resolve(categories);
        });
    });
}