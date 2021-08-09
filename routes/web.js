import { cartController, homeController, loginController, orderController, registerController } from "../app/http/controller";
import guest from '../app/http/middlewares/guest';
import orderDetail from '../app/http/middlewares/orderDetail';
import guestorders from '../app/http/middlewares/orders';
function initRoute(app) {

    // get requests
    app.get('/', homeController().index);
    app.get('/login', guest, loginController().index);
    app.get('/register', guest, registerController().index);

    // post requests
    app.post('/register', registerController().register);
    app.post('/login', loginController().login);
    app.post('/logout', loginController().logout);

    // Customer cart
    app.get('/cart', cartController().index);
    app.post('/update-cart', cartController().update);
    app.post('/delete-cart', cartController().deleteCart);

    // customer orders
    app.get('/place-order', orderDetail, cartController().order);
    app.post('/place-order', orderDetail, cartController().postorder);
    app.get('/customer/orders', guestorders, orderController().index);



}

export default initRoute;