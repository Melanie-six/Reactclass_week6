import { useState, useEffect } from 'react';
import '../assets/all.css'

function SingleProductModal ({product, closeModal, addCart}) {
    const [cartQty, setCartQty] = useState(1);

    useEffect(() => {
        setCartQty(1);
    }, [product]);

    const handleAddCart = async () => {
        await addCart(product.id, cartQty);
        closeModal();
    };

    return (
        <div className="modal" id="productModal" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">{product.title}</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div className="modal-body">
                    <div className="col" key={product.id}>
                                <div className="card h-100">
                            <img src={product.imageUrl} className="card-img-top mainimage" alt="" />
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center h4">
                                    <span className="badge bg-info text-dark ms-1">{product.tags}</span>
                                    <div>{[...Array(5)].map((_, index) => (
                                            <span key={index} className={index < product.stars ? "text-warning" : "text-muted"}>
                                                ★
                                            </span>
                                        ))}</div>
                                </div>
                                <div className="d-flex mt-3 justify-content-center align-items-center">
                                    <p className="card-text text-secondary">原價：<del>{product.origin_price}</del>元
                                    / <span className="card-text text-danger h4">特價：{product.price} </span>元</p>
                                </div>
                            </div>
                            <div className="card-footer">
                                <div className="d-flex align-items-center">
                                    <label style={{ width: "600px" }}>購買數量：</label>
                                    <button
                                        className="btn btn-danger"
                                        type="button"
                                        id="button-addon1"
                                        aria-label="Decrease quantity"
                                        onClick={() => setCartQty((pre) => (pre === 1 ? 1 : pre - 1 ))}
                                    >
                                        <i className="fa-solid fa-minus"></i>
                                    </button>
                                    <input
                                        className="form-control"
                                        type="number"
                                        min="1"
                                        max="10"
                                        value={cartQty}
                                        onChange={(e) => setCartQty(Number(e.target.value))}
                                    />
                                    <button
                                        className="btn btn-primary"
                                        type="button"
                                        id="button-addon2"
                                        aria-label="Decrease quantity"
                                        onClick={() => setCartQty((pre) => pre + 1)}
                                    >
                                        <i className="fa-solid fa-plus"></i>
                                    </button>
                                </div>
                            </div>
                            </div></div>
                </div>

                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary"
                    onClick={() => closeModal()} >取消</button>
                    <button type="button" className="btn btn-danger" 
                    onClick={() => handleAddCart()}>加入購物車</button>
                </div>
                </div>
            </div>
        </div>
    )
}

export default SingleProductModal;