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
import Country from "../../components/Country"
import { useParams } from "react-router-dom";
import { useWallet } from "@solana/wallet-adapter-react";
import { Form } from 'semantic-ui-react';
import { useForm } from "react-hook-form";
import { createBrowserHistory } from 'history';
import { Link } from "react-router-dom";

import 'react-country-dropdown/dist/index.css'


export default function Address({onClose}) {
    const { id } = useParams();
    console.log("product_id", id);
    
    const [loadingView, setLoadingView] = useState(false);
    const [country, setSelectedCountry] = useState(false);

    const handleClick = async () => {
        setLoadingView(true);
        setLoadingView(false);
    }

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        data["country"] = country.label;
        setLoadingView(true);

        const shippingInfo = JSON.stringify(data);
        const _Infos = await global.postInfoResponse(global.SERVER_URL + "/shop/update_order", { query: { status: "cart" }, set: { shipping_info: shippingInfo, status: "cart" } });
        if (!_Infos) return;
        if (!_Infos.data.result) return;

        setLoadingView(false);
        toast.info("Shipping address set success");
        onClose();
        // createBrowserHistory({forceRefresh:true}).push("/cart");
    }

    return (
        <Container className="product-view-container">
            <div className="product-view-wrapper">
                <div className="product-view">
                    <h1 style={{ fontWeight: "600", fontSize: "36px" }}>Where should we ship your order?</h1>
                    <div>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <div className="div-row">
                                <Form.Field>
                                    <label>First Name<p style={{ color: "#f00", display: "contents" }}>*</p></label>
                                    <input
                                        placeholder='First Name'
                                        type="text"
                                        required
                                        {...register("firstName")}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>Last Name<p style={{ color: "#f00", display: "contents" }}>*</p></label>
                                    <input
                                        placeholder='Last Name'
                                        type="text"
                                        required
                                        {...register("lastName")}
                                    />
                                </Form.Field>
                            </div>
                            <div className="div-row">
                                <Form.Field>
                                    <label>Street and Number<p style={{ color: "#f00", display: "contents" }}>*</p></label>
                                    <input
                                        placeholder='Street'
                                        type="text"
                                        required
                                        {...register("street")}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>Additional address information</label>
                                    <input
                                        placeholder='AddressInformation'
                                        type="text"
                                        required
                                        {...register("addressInformation")}
                                    />
                                </Form.Field>
                            </div>
                            <div className="div-row">
                                <Form.Field>
                                    <label>City<p style={{ color: "#f00", display: "contents" }}>*</p></label>
                                    <input
                                        placeholder='City'
                                        type="text"
                                        required
                                        {...register("city")}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>Country<p style={{ color: "#f00", display: "contents" }}>*</p></label>
                                    <Country register={(e) => setSelectedCountry(e)} />
                                </Form.Field>
                            </div>
                            <div className="div-row">
                                <Form.Field>
                                    <label>Email<p style={{ color: "#f00", display: "contents" }}>*</p></label>
                                    <input
                                        placeholder='Email'
                                        type="email"
                                        {...register("email")}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>Phone</label>
                                    <input
                                        placeholder='PhoneNumber'
                                        type="number"
                                        {...register("phoneNumber")}
                                    />
                                </Form.Field>
                            </div>
                            <Button  variant="contained"  style={{width:"100%"}} type='submit'>Use this address</Button>
                        </Form>
                    </div>

                </div>
                {/* <div className="customer-service">
                    <CustomerService customerServiceDetail={customerServiceDetail} key="CustomerService0" />
                </div> */}
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

// const customerServiceDetail = [
//     {
//         title: "How Can I pay?",
//         detail: "Depending on the product, they are available in PBP, SOL or a combination of both. We are also working on integrating credit card support, which will drop soon."
//     },
//     {
//         title: "How long does it take to get my products?",
//         detail: "Products are dispatched and then sent to you by our fulfilment partners. From order to arrival this takes about 2-3 weeks."
//     },
//     {
//         title: "Shipping Costs?",
//         detail: "Shipping costs are added at the checkout."
//     },
//     {
//         title: "Where is Moon Fuel CBD produced?",
//         detail: "All Moon Fuel products are 100% made in Switzerland. It was important for us to find the best producers for the highest quality. We have managed to do that."
//     },
//     {
//         title: "Returns?",
//         detail: "We have a 30-day return policy, which means if you don't love something or if it doesn’t fit you the way as you expected you can send it back to us within 30 days of receiving it. We can now provide you with a return shipping label. The shipping fee is fully payable in Solana. All returned items must be unused and sent back in it's original packaging so they can be resold. You'll be refunded as soon as your package is accepted by our returns department at the warehouse. Once it has been accepted it can take up to 5 working days for the money to reach your original payment method.You have to cover the costs for the return shipping. For returns fill out this form: https://forms.gle/XDxNp6T7RiDWGE8n8"
//     },
//     {
//         title: "Exchanges?",
//         detail: "We don’t process exchanges. Instead, you can return any un-wanted items for a refund and re-purchase any size/color option that you would like."
//     }
// ]