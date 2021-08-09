function orderDetail(req, res, next) {
    if (req.isAuthenticated() && req.session.cart) {
        next();
    } else {
        return res.redirect('/');
    }
}

export default orderDetail;