import React, { useEffect, useState } from "react";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import "./style.css";
import * as global from "../../models/global";

const OrderProductCard = ({ orderDetail }) => {

    const [productInfo, setProductInfo] = useState([]);

    useEffect(() => {
        console.log(">>>>>>>>>>>>>OrderProductCard", orderDetail);
        if (orderDetail.product_id) {
           getProduct();
        }
    }, []);

    const getProduct = async () => {
        const _Infos = await global.getInfoResponse(global.SERVER_URL + "/shop/get_products?_id=" + orderDetail.product_id);
        if (!_Infos) return;
        if (!_Infos.data.result) return;
        setProductInfo(_Infos.data.data[0]);
    }
    
    return (
        <div className="order-product-card-wrapper">
            <div className="product-image">
                <img
                    src={productInfo.product_image}
                    // src="/images/PbPEvolutionMarble.gif"
                    alt=""
                />
            </div>
            <div className="product-info">
                <div className="product-sub-info">
                    <p>Card Number</p>
                    <p>{String((orderDetail._id)).substring(4, -1)}</p>
                </div>
                <div className="product-sub-info">
                    <p>Order Date</p>
                    <p>{new Date(orderDetail.createdAt).toDateString()}</p>
                </div>
                <div className="product-sub-info">
                    <p>Status</p>
                    <p>{orderDetail.status}</p>
                </div>
            </div>
        </div >
    );
}

export default OrderProductCard;