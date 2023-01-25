import React, { useState, useEffect } from "react";
import Container from '@mui/material/Container';
import "./style.css";

import CustomerService from "../../components/CustomerService";
import OrderProductCard from "../../components/OrderProductCard";
import * as global from "../../models/global";
import { useWallet } from "@solana/wallet-adapter-react";

export default function YourOrders() {
    const [orderInfos, setOrderInfo] = useState([]);

    const wallet = useWallet();

    useEffect(() => {
        if (wallet.publicKey) {
            getOrders();
        }
    }, [wallet]);

    const getOrders = async () => {
        const _Infos = await global.getInfoResponse(global.SERVER_URL + "/shop/get_orders?account_id=" + wallet.publicKey + "&status=shipping");
        if (!_Infos || !_Infos.data.result) return;

        setOrderInfo(_Infos.data.data);
    }

    return (
        <Container className="shopping-cart-container">
            <div className="shopping-cart-wrapper">
                <div className="shopping-cart">
                    <h1>Your Orders</h1>
                    <div className="article-view">
                        <h2>{orderInfos.length} Orders</h2>
                        {orderInfos.map((order, index) => {
                            return <><OrderProductCard orderDetail={order} />
                                <div className="grey-splitter" style={{ width: "90%" }} /></>
                        })}

                    </div>
                </div>
                <div className="customer-service">
                    <CustomerService customerServiceDetail={customerServiceDetail} key="CustomerService4" />
                </div>
            </div>
        </Container >
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