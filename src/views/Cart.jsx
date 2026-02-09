import { useState, useEffect, useRef } from "react";
import { Link } from "react-router"
const {VITE_API_BASE, VITE_API_PATH} = import.meta.env;
import axios from "axios";
import { useForm } from "react-hook-form";
import { Circles } from "react-loader-spinner";
import * as bootstrap from "bootstrap";
import SingleProductModal from "../components/SingleProductModal";



function Cart() {
    const [cart, setCart] = useState([]);
    const [product, setProduct] = useState({});
    const [loadingCart, setLoadingCart] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [loadingProduct, setLoadingProduct] = useState(null);
    const productModalRef = useRef(null);

    const {
        register,
        handleSubmit,
        formState: { errors },   
    } = useForm({
        mode: "onBlur"
    });

    const getCart = async () => {
            try {
                const res = await axios.get(`${VITE_API_BASE}/api/${VITE_API_PATH}/cart`);
                setCart(res.data.data);
            } catch (error) {
                console.log(error.response)
            } finally {
                setIsLoading(false);
            }
        };

    useEffect(() => {
        
        getCart();

        productModalRef.current = new bootstrap.Modal("#productModal", {
            keyboard: false
        });
        document
        .querySelector("#productModal")
        .addEventListener("hide.bs.modal", () => {
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }
        });
    }, []);

    const getProduct = async (id) => {
        setLoadingProduct(id);
        try {
            const res = await axios.get(`${VITE_API_BASE}/api/${VITE_API_PATH}/product/${id}`);
        setProduct(res.data.product);
        productModalRef.current.show();
        } catch (error) {
            console.log(error.response)
        } finally {
            setLoadingProduct(null);
        };
    };

    const closeModal = () => {
        productModalRef.current.hide();
    };

     const addCart = async (id, qty) => {
        setLoadingCart(id);
        try {
            const data = {
                product_id: id,
                qty
            }
            await axios.post(`${VITE_API_BASE}/api/${VITE_API_PATH}/cart`, {data});
            await getCart();
            alert("已加入購物車");
        } catch (error) {
            console.log(error.response);
        } finally {
            setLoadingCart(null);
        }
    };

    const updateQty = async (cartId, productId, qty=1) => {
        try {
            const data ={
                product_id: productId,
                qty
            }
            const res = await axios.put(`${VITE_API_BASE}/api/${VITE_API_PATH}/cart/${cartId}`, {data});
            const res2 = await axios.get(`${VITE_API_BASE}/api/${VITE_API_PATH}/cart`);
            setCart(res2.data.data);
        } catch (error) {
            console.log(error.response)
        };
    };

    const deleteQty = async (cartId) => {
        setLoadingProduct(cartId);
        try {
            const res = await axios.delete(`${VITE_API_BASE}/api/${VITE_API_PATH}/cart/${cartId}`);
            const res2 = await axios.get(`${VITE_API_BASE}/api/${VITE_API_PATH}/cart`);
            setCart(res2.data.data);
        } catch (error) {
            console.log(error.response)
        } finally {
            setLoadingProduct(null);
        };
    };

    const deleteCart = async () => {
        try {
            const res = await axios.delete(`${VITE_API_BASE}/api/${VITE_API_PATH}/carts`);
            const res2 = await axios.get(`${VITE_API_BASE}/api/${VITE_API_PATH}/cart`);
            setCart(res2.data.data);
        } catch (error) {
            console.log(error.response)
        };
    };

    const onSubmit = async (formData) => {
        console.log(formData);
        try {
            const data = {
                user: formData,
                message: formData.message,
            };
            const res = await axios.post(`${VITE_API_BASE}/api/${VITE_API_PATH}/order`, {
                data,
            });
            console.log(res.data);
            const res2 = await axios.get(`${VITE_API_BASE}/api/${VITE_API_PATH}/cart`);
            console.log(res2.data.data);
            setCart(res2.data.data);
        } catch (error) {
            console.log(error.response)
        };
    }

    return (<>
    
    {
        isLoading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "200px" }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <span className="ms-2 h4 mb-0">載入中...</span>
            </div>
        ) : (<>
            {cart?.carts?.length > 0 ? (<>
                <div className="mb-3 d-flex justify-content-between">
                    <h2>購物車</h2>
                    <div><button className="btn btn-outline-danger me-3"
                    onClick={() => deleteCart()}>清空購物車</button></div>
                </div>
                
                <table className="table align-middle">
                    <thead>
                        <tr>
                            <th>產品名稱</th>
                            <th>單位</th>
                            <th>數量</th>
                            <th>售價</th>
                            <th>小計</th>
                            <th>編輯</th>
                        </tr>
                    </thead>
                    <tbody>
                        { cart?.carts?.map(item => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.product.title}</td>
                                    <td>{item.product.unit}</td>
                                    <td>
                                        <input type="number" min="1" max="10" 
                                        value={item.qty}
                                        onChange={(e) => updateQty(item.id, item.product.id, Number(e.target.value))} />
                                    </td>
                                    <td>{item.product.price}</td>
                                    <td>{item.final_total}</td>
                                    <td>
                                        <button className="btn btn-outline-secondary"
                                        onClick={() => getProduct(item.product.id)}
                                        disabled={loadingProduct === item.product.id}>
                                        {
                                            loadingProduct === item.product.id ? (
                                                <Circles width="65" height="25" color="gray"/>
                                            ) : ('查看更多')
                                        }
                                        </button>
                                        <button className="btn btn-outline-danger"
                                        onClick={() => deleteQty(item.id)}
                                        disabled={loadingProduct === item.id}>
                                        {
                                            loadingProduct === item.id ? (
                                                <Circles width="35" height="25" color="#f44336"/>
                                            ) : ('刪除')
                                        }
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                    <tfoot>
                        <tr className="h5">
                            <th colSpan="4" className="text-end"><strong>結帳總金額：</strong></th>
                            <th className="text-danger">{cart.final_total}</th>
                            {/* <th><button className="btn btn-success h4">結帳去</button></th> */}
                        </tr>
                    </tfoot>
                </table>
                <div className="my-5">
                <form className="col-md-6 mx-auto" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                            收件者姓名
                        </label>
                        <input 
                            id="name" 
                            name="name"
                            type="text" 
                            className="form-control" 
                            placeholder="請輸入收件者姓名"
                            defaultValue="王小明"
                            {...register("name",{
                                required: "請輸入收件者姓名",
                                minLength: { 
                                    value: 2, 
                                    message: "姓名至少 2 個字" 
                                },
                            })} />
                            {errors.name && (
                                <p className="text-danger">{errors.name.message}</p>
                            )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            聯絡信箱
                        </label>
                        <input 
                            id="email" 
                            name="email"
                            type="email" 
                            className="form-control" 
                            placeholder="請輸入 E-mail"
                            defaultValue="wang@gmail.com"
                            {...register("email",{
                                required: "請輸入 E-mail",
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: "Email 格式不正確",
                                },
                            })} />
                            {errors.email && (
                                <p className="text-danger">{errors.email.message}</p>
                            )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tel" className="form-label">
                            聯絡電話
                        </label>
                        <input 
                            id="tel" 
                            name="tel"
                            type="tel" 
                            className="form-control" 
                            placeholder="請輸入聯絡電話"
                            defaultValue="0912345678"
                            {...register("tel", {
                                required: "請輸入聯絡電話",
                                pattern: {
                                    value: /^\d+$/,
                                    message: "電話僅能輸入數字",
                                },
                                minLength: { 
                                    value: 8, 
                                    message: "電話至少 8 碼" 
                                },
                            })} />
                            {errors.tel && (
                                <p className="text-danger">{errors.tel.message}</p>
                            )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">
                            收件地址
                        </label>
                        <input 
                            id="address" 
                            name="address"
                            type="text" 
                            className="form-control" 
                            placeholder="請輸入收件地址"
                            defaultValue="台北市大安區忠孝東路四段123號"
                            {...register("address",{
                                required: "請輸入收件地址",
                            })} />
                            {errors.address && (
                                <p className="text-danger">{errors.address.message}</p>
                            )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="message" className="form-label">
                            留言
                        </label>
                        <textarea 
                            id="message" 
                            className="form-control" 
                            cols="10"
                            rows="5"
                            placeholder="若有任何額外需求，請在此輸入"
                            defaultValue="免附餐具"
                            {...register("message")} />
                    </div>
                    
                    
                    <button type="submit" className="btn btn-primary">送出訂單</button>
                </form>
                </div>
                
                </>
            ) : (<>
                <div className="my-3">
                    <h2>購物車</h2>
                    <div className="text-center">購物車空空如也，趕緊去把喜歡的甜點帶回家吧！
                    <Link className="btn btn-outline-success h4 align-center" to="/products">去逛逛</Link></div>
                </div>
            </>)}
        </>)
    }
    
    <SingleProductModal 
    product={product} addCart={addCart} closeModal={closeModal} />
    
    </>)
};
export default Cart;