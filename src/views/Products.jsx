import { Outlet, Link } from "react-router";
import axios from "axios";
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/all.css'
import { Circles } from "react-loader-spinner";


const {VITE_API_BASE, VITE_API_PATH} = import.meta.env;

function Products() {
    const [products, setProducts] = useState([]);
    const [loadingCart, setLoadingCart] = useState(null);


    useEffect(() => {
        (async () => {
            const res = await axios.get(`${VITE_API_BASE}/api/${VITE_API_PATH}/products/all`);
            setProducts(res.data.products);
        })();
    }, []);

    const addCart = async (id, qty=1) => {
        setLoadingCart(id);
        try {
            const data = {
                product_id: id,
                qty
            }
            const res = await axios.post(`${VITE_API_BASE}/api/${VITE_API_PATH}/cart`, {data});
            alert("已加入購物車");
        } catch (error) {
            console.log(error.response);
        } finally {
            setLoadingCart(null);
        }
    };

    return (<div>
        <h2>產品列表</h2>
        <div className="container">
            <div className="row">
                <div className="sidebar col-md-3">
                    {/* <h3>產品分類</h3> */}
                    <nav className="nav nav-tabs flex-column">
                        <Link className="nav-item nav-link" to="/products">所有產品</Link>
                        <Link className="nav-item nav-link disabled" >泡芙類</Link>
                        <Link className="nav-item nav-link disabled" >塔類</Link>
                        <Link className="nav-item nav-link disabled" >常溫蛋糕類</Link>
                        <Link className="nav-item nav-link disabled" >冷藏蛋糕類</Link>
                        <Link className="nav-item nav-link disabled" >小點心</Link>
                    </nav>
                </div>
                <div className="main col-md-9">
                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        {products.map((product) => {
                            return (<div className="col" key={product.id}>
                                <div className="card h-100">
                            <img src={product.imageUrl} className="card-img-top mainimage" alt="" />
                            <div className="card-body">
                                <h5 className="card-title">{product.title}</h5>
                                <div className="d-flex justify-content-between align-items-center">
                                    <span className="badge bg-info text-dark ms-1">{product.tags}</span>
                                    <div>{[...Array(5)].map((_, index) => (
                                            <span key={index} className={index < product.stars ? "text-warning" : "text-muted"}>
                                                ★
                                            </span>
                                        ))}</div>
                                </div>
                                <div className="d-flex mt-3 justify-content-center align-items-center">
                                    <p className="card-text text-secondary"><del>{product.origin_price}</del>元
                                    / <span className="card-text text-danger h3">{product.price} </span>元</p>
                                </div>
                            </div>
                            <div className="card-footer d-flex justify-content-between">
                                <Link to={`/product/${product.id}`} className="btn btn-outline-primary">
                                    查看細節
                                </Link>
                                <button 
                                    className="btn btn-danger d-flex justify-content-center align-items-center" 
                                    onClick={() => addCart(product.id)}
                                    disabled={loadingCart === product.id}
                                >
                                    {
                                    loadingCart === product.id ? (
                                        <Circles width="80" height="20" color="#ffffff"/>
                                    ) : ('加入購物車')
                                    }
                                    
                                </button>

                            </div>
                            </div></div>)
                        })}
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
};
export default Products;