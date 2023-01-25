import React, { useState, useEffect } from "react";
import Container from '@mui/material/Container';
import { Carousel } from "react-responsive-carousel";
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import ButtonGroup from "@mui/material/Button";

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./style.css";

import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import * as global from "../../models/global";
import CustomerService from "../../components/CustomerService";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setDetailData } from "../../store/detailslice";
import { useWallet } from "@solana/wallet-adapter-react";
export default function Product() {
    const { id } = useParams();
    console.log("product_id", id);
    const dispatch = useDispatch();
    const wallet = useWallet();
    const [productInfo, setProductInfo] = useState([]);
    const [loadingView, setLoadingView] = useState(false);
    const [quantity, setQuantity] = useState(1)
    
    const handleIncrement = () => {
        if (quantity < 20) {
            setQuantity(quantity + 1)
        }
    }
    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    useEffect(() => {
        if (id) {
            getProduct(id);
        }
    }, []);

    const getProduct = async (id) => {
        const _Infos = await global.getInfoResponse(global.SERVER_URL + "/shop/get_products?_id=" + id);
        if (!_Infos) return;
        if (!_Infos.data.result) return;
        console.log(_Infos.data.data[0]);
        setProductInfo(_Infos.data.data[0]);
    }

    const handleClick = async () => {

        if(!wallet.publicKey)
        {
            toast.info("Connect Wallet!");
            return;

        }

        setLoadingView(true);

        const cartItem = { account_id: wallet.publicKey, product_id: id, product_count: quantity, status: global.ORDER_STATUS_CART }
        const _Infos = await global.postInfoResponse(global.SERVER_URL + "/shop/insert_order", cartItem);

        if (!_Infos) return;
        if (!_Infos.data.result) return;
        //toast.info("Your " + quantity + " orders has been successful");
        setLoadingView(false);

        const _orderInfos = await global.getInfoResponse(global.SERVER_URL + "/shop/get_orders?account_id=" + wallet.publicKey + "&status=cart");
        if (!_orderInfos || !_orderInfos.data.result) return;
        const length = _orderInfos.data.data.length;

        dispatch(setDetailData(length));
        // setProductInfo(_Infos.data.data);
    }

    return (
        <Container className="product-view-container">
            <div className="product-view-wrapper">
                <div className="product-view">
                    <Grid container>
                        <Grid item xs={12} md={6}>
                            <div className="product-image-view">
                                <div className="product-carousel-view">
                                    <Carousel showThumbs={false} infiniteLoop={true} autoPlay={true}>
                                        <img className="product-image" alt="..." src={productInfo.product_image} />
                                        <img className="product-image" alt="..." src={productInfo.product_image} />
                                        <img className="product-image" alt="..." src={productInfo.product_image} />
                                        {/* <img className="product-image" alt="..." src={"https://sac-store.s3.us-west-1.amazonaws.com/summer22/cap/01-cap.jpeg"} />
                                        <img className="product-image" alt="..." src={"https://sac-store.s3.us-west-1.amazonaws.com/summer22/cap/01-cap.jpeg"} /> */}
                                    </Carousel>
                                </div>
                                <div className="product-mini-view">
                                    <div className="product-mini-img">
                                        <img className="product-image" alt="..." src={productInfo.product_image} />
                                    </div>
                                    <div className="product-mini-img">
                                        <img className="product-image" alt="..."  src={productInfo.product_image} />
                                    </div>
                                    <div className="product-mini-img">
                                        <img className="product-image" alt="..."  src={productInfo.product_image} />
                                    </div>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <div className="single-product-detail">
                                <p>{productInfo.product_name}</p>
                                <p style={{ marginTop: "10px" }}>{(productInfo.price_sol > 0 ? productInfo.price_sol + " SOL" + " + " : "") + productInfo.price_puff + " PBP"}</p>
                                <p style={{ marginTop: "20px" }}></p>
                                <p style={{ marginTop: "10px" }}></p>
                                <p style={{ marginTop: "30px" }}
                                >Quantity</p>
                                <ButtonGroup size="medium" aria-label="small outlined button group" style={{ display: "block" }}>
                                    <Button style={{ "background-color": "white", "border-radius": "50%", width: "30px", height: "30px", 'min-width': '20px' }} onClick={() => handleDecrement()} ><p >-</p></Button>
                                    <Button disabled c><p>{quantity}</p></Button>
                                    <Button style={{ "background-color": "white", "border-radius": "50%", width: "30px", height: "30px", 'min-width': '20px' }} onClick={() => handleIncrement()} ><p >+</p></Button>
                                </ButtonGroup>
                                <Button style={{ marginTop: "30px", display: "block", width: "50%" }} variant="contained" onClick={() => handleClick()}>Add to Cart</Button>
                            </div>
                        </Grid>
                    </Grid>
                </div>
                <div className="customer-service">
                    <CustomerService customerServiceDetail={customerServiceDetail} key="CustomerService1" />
                </div>
            </div>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loadingView}
            >
            <CircularProgress color="inherit" />
            </Backdrop>
            <ToastContainer />
        </Container>
    );
}

const customerServiceDetail = [
    {
        title: "How Can I pay?",
        detail: "Depending on the product, they are available in PBP, SOL or a combination of both. We are also working on integrating credit card support, which will drop soon."
    },
    {
        title: "How long does it take to get my products?",
        detail: "Products are dispatched and then sent to you by our fulfilment partners. From order to arrival this takes about 2-3 weeks."
    },
    {
        title: "Shipping Costs?",
        detail: "Shipping costs are added at the checkout."
    },
    {
        title: "Where is Moon Fuel CBD produced?",
        detail: "All Moon Fuel products are 100% made in Switzerland. It was important for us to find the best producers for the highest quality. We have managed to do that."
    },
    {
        title: "Returns?",
        detail: "We have a 30-day return policy, which means if you don't love something or if it doesn’t fit you the way as you expected you can send it back to us within 30 days of receiving it. We can now provide you with a return shipping label. The shipping fee is fully payable in Solana. All returned items must be unused and sent back in it's original packaging so they can be resold. You'll be refunded as soon as your package is accepted by our returns department at the warehouse. Once it has been accepted it can take up to 5 working days for the money to reach your original payment method.You have to cover the costs for the return shipping. For returns fill out this form: https://forms.gle/XDxNp6T7RiDWGE8n8"
    },
    {
        title: "Exchanges?",
        detail: "We don’t process exchanges. Instead, you can return any un-wanted items for a refund and re-purchase any size/color option that you would like."
    }
]