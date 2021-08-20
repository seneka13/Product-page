"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get404 = void 0;
var get404 = function (req, res, next) {
    return res.status(404).render('404', { pageTitle: '404 haha', path: '' });
};
exports.get404 = get404;
