import App from "../App";
import Home from "../views/Home";
import About from "../views/About";
import Products from "../views/Products";
import Product from "../views/Product";
import Cart from "../views/Cart";
import NotFound from "../views/NotFound";
import Login from "../views/Login";

const routes = [
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '',
                element: <Home />
            },
            {
                path: 'about',
                element: <About />
            },
            {
                path: 'products',
                element: <Products />,
            },
            {
                path: '/product/:id',
                element: <Product />
            },
            {
                path: 'cart',
                element: <Cart />,
            },
            {
                path: 'login',
                element: <Login />,
            }
        ]
    },
    {
        path: '*',
        element: <NotFound />
    }
]

export default routes;