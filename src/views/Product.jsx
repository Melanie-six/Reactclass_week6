import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/all.css'

const {VITE_API_BASE, VITE_API_PATH} = import.meta.env;

function Product() {
    const [product, setProduct] = useState({});
    const [qty, setQty] = useState(1);
    
    const params = useParams();
    const { id } = params;
    useEffect(() => {
        (async () => {
            const res = await axios.get(`${VITE_API_BASE}/api/${VITE_API_PATH}/product/${id}`);
            setProduct(res.data.product);
        })();
    }, [id]);

    const addCart = async (id, qty=1) => {
        try {
            const data = {
                product_id: id,
                qty
            }
            const res = await axios.post(`${VITE_API_BASE}/api/${VITE_API_PATH}/cart`, {data});
            alert("已加入購物車");
        } catch (error) {
            console.log(error.response);
        }
    };

    return (<div className="m-3">
        <div className="d-flex">
            <h5>產品資訊</h5>
            <Link to="/products" className="ms-auto link-secondary">{`<返回產品列表`}</Link>
        </div>
        
        <div className="row">
            <div className="col-md-6">
                <div className="row justify-content-center m-3">
                    <div className="col-10">
                        <img src={product.imageUrl} className="mainimage img-fluid" alt="主圖" />
                    </div>
                </div>
                <div className="d-flex">
                {
                    product.imagesUrl && product.imagesUrl.map((url, index) => (
                        <img key={index} src={url} className="images m-1" alt="更多圖片" />
                    ))
                }
                </div>
            </div>
            <div className="col-md-6">
                <div className="card-body">
                    <h2 className="my-3">{product.title}</h2>
                    <div className="row my-4 h4">
                        <div className="col-md-4">
                            <span className="badge rounded-pill bg-info text-dark ms-3">{product.category}</span>
                        </div>
                        <div className="col-md-4">
                            {[...Array(5)].map((_, index) => (
                                <span key={index} className={index < product.stars ? "text-warning" : "text-muted"}>
                                    ★
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="my-3">
                        <table className="table align-middle">
                            <tbody>
                                <tr>
                                    <td>售價：</td>
                                    <td className="d-flex">
                                        <p className="text-secondary m-0"><del>{product.origin_price}</del></p>元 / 
                                        <p className="text-danger m-0">{product.price}</p> 元
                                    </td>
                                </tr>
                                <tr>
                                    <td>單位：</td>
                                    <td>{product.unit}</td>
                                </tr>
                                <tr>
                                    <td>數量：</td>
                                    <td><input 
                                        type="number" 
                                        min="1" 
                                        max="10" 
                                        value={qty} 
                                        onChange={(e) => setQty(Number(e.target.value))}
                                        className="form-control" /></td>
                                </tr>
                            </tbody>
                        </table>
                        
                    </div>
                    <div className="my-3 d-flex justify-content-end">
                        <button className="btn btn-danger" onClick={() => addCart(product.id, qty)}>加入購物車</button>
                    </div>
                </div>
            </div>
        </div>
        <dl className="my-3 mx-3 row">
            <dt className="col-md-2">
                商品描述：
            </dt>
            <dd className="col-md-10">
                <p className="card-text">{product.description}</p>
            </dd>
            <dt className="col-md-2">
                商品內容：
            </dt>
            <dd className="col-md-10">
                <p className="card-text">{product.content}</p>
            </dd>
        </dl>
    </div>
    )
};
export default Product;