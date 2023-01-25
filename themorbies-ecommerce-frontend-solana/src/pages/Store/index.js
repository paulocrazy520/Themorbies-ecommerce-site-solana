import React, { useState, useEffect } from "react";
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Grid } from '@mui/material';
import "./style.css";

import * as global from "../../models/global";

import SmallCard from '../../components/SmallCard';
import ProductCard from '../../components/ProductCard';
import CustomerService from "../../components/CustomerService";
import { useWallet } from "@solana/wallet-adapter-react";
import Backdrop from '@mui/material/Backdrop';

const MAX_WRAPPER_WIDTH = 1230;
const PRODUCT_CARD_WIDTH = 360;

export default function Store() {

    const wallet = useWallet();
    const [loadingView, setLoadingView] = useState(false);
    const [filterValue, setFilterValue] = useState(productFilterList[0]);
    const [categoryInfo, setCategoryInfo] = useState([]);
    const [productInfo, setProductInfo] = useState([]);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [productCardRowCount, setProductCardRowCount] = useState(parseInt((window.innerWidth - 50) > MAX_WRAPPER_WIDTH ?
        parseInt(MAX_WRAPPER_WIDTH / PRODUCT_CARD_WIDTH) : parseInt((window.innerWidth - 50) / PRODUCT_CARD_WIDTH)));

    useEffect(() => {
        setLoadingView(true);
        getCategories();
        getProducts();
        setLoadingView(false);

    }, []);

    useEffect(() => {
        function handleResize() {
            const _tempWindowWidth = window.innerWidth;
            console.log(_tempWindowWidth);
            setWindowWidth(_tempWindowWidth);
            setProductCardRowCount(parseInt((_tempWindowWidth - 50) > MAX_WRAPPER_WIDTH ?
                parseInt(MAX_WRAPPER_WIDTH / PRODUCT_CARD_WIDTH) : parseInt((_tempWindowWidth - 50) / PRODUCT_CARD_WIDTH)));
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [windowWidth]);

    const getCategories = async () => {
        const _Infos = await global.getInfoResponse(global.SERVER_URL + "/shop/get_categories");

        if (!_Infos) return;
        if (!_Infos.data.result) return;
        console.log(_Infos.data.data);
        setCategoryInfo(_Infos.data.data);
    }

    const getProducts = async () => {

        const _Infos = await global.getInfoResponse(global.SERVER_URL + "/shop/get_products");
        console.log(_Infos.data.data);
        if (!_Infos) return;
        if (!_Infos.data.result) return;

        setProductInfo(_Infos.data.data);
    }

    return (
        <Container className="order-container">
            <div className="order-wrapper">
                <div className="banner-wrapper">
                    <h1>Store</h1>
                </div>

                <div className='middle-view'>
                    <div className='product-small-disp-wrapper'>
                        {categoryInfo.length > 0 && categoryInfo.map((item, index) => {
                            return <SmallCard imageUrl={item.category_image} productDetail={item.category_title} key={"SmallCard" + index} />
                        })}
                    </div>

                    <div className='select-choice'>
                        <p>Filter Products for Community</p>
                        <Autocomplete
                            value={filterValue}
                            disablePortal
                            onChange={(event, newValue) => { setFilterValue(newValue) }}
                            id="combo-box-demo"
                            options={productFilterList}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <p>Some products are only available for certain NFT holders</p>
                    </div>
                </div>

                {(filterValue == productFilterList[0]) && <>
                    <div className='product-view'>
                        {categoryInfo.length > 0 && categoryInfo.map((category_item, category_index) => {
                            return <>
                                <h1>{category_item.category_title}</h1>
                                <Grid container key={"CAGrid" + category_index}>
                                    {productInfo.length > 0 && productInfo.map((product_item, product_index) => {
                                        return category_item._id == product_item.category_id && <Grid item xs={12} md={12 / productCardRowCount}>
                                            <ProductCard imageUrl={product_item.product_image} productDetail={product_item} key={"ProductCard" + product_index} />
                                        </Grid>
                                    })}
                                </Grid></>
                        })}
                    </div>
                </>}

                <div className="customer-service">
                    <CustomerService customerServiceDetail={customerServiceDetail} key="CustomerService3" />
                </div>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={loadingView}
                >
                    <img alt="" src="/images/loading.gif" />
                </Backdrop>
            </div>
        </Container>
    );
}

const productFilterList = [
    "All Communities",
    "SAC Holders",
    "Nuked Ape Holders"
];

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