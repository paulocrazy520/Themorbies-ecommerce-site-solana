import React, { useEffect, useState } from "react";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import "./style.css";
import * as global from "../../models/global";

import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import { useDispatch } from "react-redux";
import { setDetailData } from "../../store/detailslice";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./style.css";

const ShoppingCartProductCard = ({ orderDeatil, updateOrder }) => {

    const [productInfo, setProductInfo] = useState([]);
    const [loadingView, setLoadingView] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (orderDeatil.product_id) {
            getProduct();
        }
    }, []);

    const getProduct = async () => {
        const _Infos = await global.getInfoResponse(global.SERVER_URL + "/shop/get_products?_id=" + orderDeatil.product_id);
        if (!_Infos) return;
        if (!_Infos.data.result) return;
        setProductInfo(_Infos.data.data[0]);
    }

    const removeCart = async () => {
        setLoadingView(true);
        const _Infos = await global.postInfoResponse(global.SERVER_URL + "/shop/delete_order", { _id: orderDeatil._id });
        console.log(">>>>>>>>>>>>>>>removeCard", _Infos);
        if (!_Infos) return;
        if (!_Infos.data.result) {
            setLoadingView(false);
            // toast("Order delete failed.");
            return;
        }
        setLoadingView(false);
        //toast("Order successfully removed from ShoppingCart.");

        const _orderInfos = await global.getInfoResponse(global.SERVER_URL + "/shop/get_orders?account_id=" + orderDeatil.account_id + "&status=cart");
        console.log(">>>>>>>>>>>>>>>removeCard", _orderInfos);

        if (!_orderInfos || !_orderInfos.data.result) {
            dispatch(setDetailData(0));
        }
        else {
            const length = _orderInfos.data.data.length;
            dispatch(setDetailData(length));
        }
        updateOrder();
    }

    return (
        <div className="shopping-product-card-wrapper">
            <div className="product-image">
                <img
                    src={productInfo.product_image}
                    // src="/images/PbPEvolutionMarble.gif"
                    alt=""
                />
            </div>
            <div className="product-info">
                <div className="product-price">
                    <p>{orderDeatil.product_count + " " + productInfo.product_name}</p>
                    <p>{(productInfo.price_sol > 0 ? productInfo.price_sol + " SOL" + " + " : "") + productInfo.price_puff + " PBP"}</p>
                </div>
                <div className="remove-btn" onClick={() => removeCart()}>
                    <DeleteOutlineIcon />
                    <p>Remove</p>
                </div>
            </div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loadingView}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <ToastContainer />
        </div >
    );
}

export default ShoppingCartProductCard;