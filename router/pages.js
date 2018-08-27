exports.actionHome = (req, res) => {
    res.render('./layouts/home', {
        url: '/',
        pageTitle: 'Home page',
        pageContent: 'Hello, this is Home page'
    });
};

exports.actionAbout = (req, res) => {
    res.render('./layouts/about', {
        url: '/about',
        pageTitle: 'About page',
        pageContent: 'Hello, this is About page'
    });
};

exports.actionError = (req, res) => {
    res.render('./layouts/error', {
        url: '/error',
        pageTitle: 'Page Not Found',
        pageContent: 'Sorry the page you are looking for could not be found'
    });
};