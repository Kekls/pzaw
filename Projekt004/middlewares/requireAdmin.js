export function requireAdmin(req, res, next) {
    if (!req.session.userId) {
        return res.redirect('/');
    }

    if (!req.session.isAdmin) {
        return res.redirect('/main');
    }

    next();
}