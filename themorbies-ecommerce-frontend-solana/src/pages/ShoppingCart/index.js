import React, { useState, useEffect } from "react";
import Container from '@mui/material/Container';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import "./style.css";

import * as global from "../../models/global";
import { useWallet } from "@solana/wallet-adapter-react";
import * as web3 from '@solana/web3.js';
import { clusterApiUrl, Connection, LAMPORTS_PER_SOL, Transaction } from '@solana/web3.js';
import { createMint, Token, TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID, createTransferCheckedInstruction } from '@solana/spl-token';

import CustomerService from "../../components/CustomerService";
import Dialog from '@mui/material/Dialog';
import ShoppingCartProductCard from "../../components/ShoppingCartProductCard";
import Address from "../../pages/Address"
import { useDispatch, useSelector } from "react-redux";
import { setDetailData } from "../../store/detailslice";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./style.css";
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function ShoppingCart() {
    const wallet = useWallet();
    const dispatch = useDispatch();
    const [orderInfos, setOrderInfo] = useState([]);
    const [shipInfo, setShipInfo] = useState([]);
    const [sumPrice, setSumInfo] = useState([{ Sol: 0, Puff: 0 }]);
    const [loadingView, setLoadingView] = useState(false);
    const [loadingAddressDialog, setLoadingAddressDialog] = useState(false);

    useEffect(() => {
        console.log('[log] => ', wallet ? 'Connected' : 'Not connected');
        console.log('[log] => wallet address: ', wallet);
        getOrders();
    }, [wallet]);

    const transferSOLAndToken = async (sol, puff) => {

        if (wallet.publicKey == null) {
            toast.info("Connect Wallet!");
            return;
        }

        try {
            setLoadingView(true);
            sol = sol.toFixed(3);
            puff = parseFloat(puff.toFixed(3));
            //const mainNetRPC = web3.clusterApiUrl(global.ORDER_NETWORK);
            // Establishing connection
            var connection = new web3.Connection(
                global.ORDER_RPC_URL
            );

            var recieverWallet = new web3.PublicKey(global.ORDER_TEASURE);

            /*****************Token*****************/
            const fromWallet = wallet.publicKey;
            const toWallet = new web3.PublicKey(global.ORDER_TEASURE);

            console.log(fromWallet, toWallet);
            // Create new token mint
            const mint = new web3.PublicKey(global.ORDER_MINT_ADDRESS);


            const fromTokenAddress = await Token.getAssociatedTokenAddress(
                ASSOCIATED_TOKEN_PROGRAM_ID,
                TOKEN_PROGRAM_ID,
                mint,
                fromWallet);


            const toTokenAddress = await Token.getAssociatedTokenAddress(
                ASSOCIATED_TOKEN_PROGRAM_ID,
                TOKEN_PROGRAM_ID,
                mint,
                toWallet);
            /*****************Token*****************/
            var transaction = new web3.Transaction().add(
                web3.SystemProgram.transfer({
                    fromPubkey: wallet.publicKey,
                    toPubkey: recieverWallet,
                    lamports: web3.LAMPORTS_PER_SOL * sol//Investing 1 SOL. Remember 1 Lamport = 10^-9 SOL.
                }),
            );

            transaction.add(Token.createTransferInstruction(
                TOKEN_PROGRAM_ID,
                fromTokenAddress,
                toTokenAddress,
                fromWallet,
                [],
                puff * global.LAMPORT_PER_TOKEN
            ));

            // Setting the variables for the transaction
            transaction.feePayer = await wallet.publicKey;
            let blockhashObj = await connection.getRecentBlockhash();
            transaction.recentBlockhash = await blockhashObj.blockhash;

            // Transaction constructor initialized successfully
            if (transaction) {
                console.log("Txn created successfully");
            }

            // Request creator to sign the transaction (allow the transaction)
            let signed = await wallet.signTransaction(transaction);
            // The signature is generated
            let signature = await connection.sendRawTransaction(signed.serialize());
            // Confirm whether the transaction went through or not
            await connection.confirmTransaction(signature);

            //Print the signature here
            console.log("Signature: ", signature, sol);
            toast.success("Success: " + sol + " Sol " + puff + " PBP" + " sent");

            const _Infos = await global.postInfoResponse(global.SERVER_URL + "/shop/update_order", { query: { status: "cart" }, set: { status: "shipping" } });
            if (!_Infos) return;
            if (!_Infos.data.result) return;

            updateOrder();
        }
        catch (e) {
            console.log(">>>>>>>>>>>>>Error", e);
        }

        setLoadingView(false);
    }

    const updateOrder = () => {
        getOrders();
    }

    const handleOrder = () => {
        transferSOLAndToken(sumPrice.Sol + global.ORDER_SHIP_PRICE.Sol, sumPrice.Puff + global.ORDER_SHIP_PRICE.Puff);
        // console.log(">>>>>>>>>>>>>>>>>Transter:", sumPrice);       //transferToken(sumPrice.Puff);
    }

    const getOrders = async () => {
        console.log(">>>>>>>>>>>>>>>>getOrders:", wallet.publicKey);
        const price = { Sol: 0, Puff: 0 };
        const conditionQuery = "/shop/get_orders_with_product?account_id=";

        // if(global.ORDER_TEASURE == wallet.publicKey){
        //     conditionQuery =  "/shop/get_orders_with_product";
        // }

        const _Infos = await global.getInfoResponse(global.SERVER_URL + conditionQuery + wallet.publicKey + "&status=cart");

        if (!wallet.publicKey || wallet.disconnecting || !_Infos || !_Infos.data.result) {
            setOrderInfo([]);
            setSumInfo(price);
            return;
        }

        const tempInfo = _Infos.data.data;

        dispatch(setDetailData(tempInfo.length));

        console.log(wallet.publicKey, tempInfo);
        let flag = false;
        tempInfo.map((order, index) => {
            price.Sol += parseFloat(order.productRef[0].price_sol) * parseFloat(order.product_count);
            price.Puff += parseFloat(order.productRef[0].price_puff) * parseFloat(order.product_count);
            if (order.shipping_info != "" && !flag) {
                setShipInfo(JSON.parse(order.shipping_info));
                flag = true;
            }
        });
        // console.log(shipInfo);
        setOrderInfo(tempInfo);
        setSumInfo(price);

    }

    const handleAddress = () =>{
        setLoadingAddressDialog(true);
    }

    const closeAddressDialog = () =>{
        setLoadingAddressDialog(false);
    }

    return (
        <Container className="shopping-cart-container">
            <div className="shopping-cart-wrapper">
                <div className="shopping-cart">
                    <h1>Shopping Cart</h1>
                    <Grid container>
                        <Grid item xs={12} md={7}>
                            <div className="article-view">
                                <h2>{orderInfos.length} Articles</h2>
                                {orderInfos.length > 0 && orderInfos.map((order, index) => {
                                    return <><ShoppingCartProductCard orderDeatil={order} updateOrder={updateOrder} key={"ShoppingProductCard" + index} />
                                        <div className="grey-splitter" style={{ width: "90%" }} /></>
                                })}
                            </div>
                        </Grid>
                        {orderInfos.length && <Grid item xs={12} md={5}>
                            <div className="price-view">
                                <h2>Sum Amount</h2>
                                <div className="flex-row-space" style={{ marginTop: "20px" }}>
                                    <p>Sum Products</p>
                                    <p>{String(sumPrice.Sol && (sumPrice.Sol).toFixed(3)) + " SOL" + " + " + String(sumPrice.Puff && (sumPrice.Puff).toFixed(3)) + " PBP"}</p>
                                </div>
                                <div className="flex-row-space">
                                    <p>Shipping</p>
                                    <p>{String((global.ORDER_SHIP_PRICE.Sol).toFixed(3)) + " SOL" + " + " + String(global.ORDER_SHIP_PRICE.Puff && (global.ORDER_SHIP_PRICE.Puff).toFixed(3)) + " PBP"}</p>
                                </div>
                                <div className="grey-splitter" />
                                <div className="flex-row-space">
                                    <p>Total</p>
                                    <p>{(sumPrice.Sol + global.ORDER_SHIP_PRICE.Sol).toFixed(3) + " SOL" + " + " + (sumPrice.Puff + global.ORDER_SHIP_PRICE.Puff).toFixed(3) + " PBP"}</p>
                                </div>


                                <h2>Shipping</h2>
                                <div className="css-liz">
                                    {shipInfo.firstName != undefined && <>
                                        <p className="chakra-text css-13ih39a">{shipInfo.firstName ? shipInfo.firstName : "" + ", " + shipInfo.lastName ? shipInfo.lastName : ""}</p>
                                        <p className="chakra-text css-1m2twwy">{shipInfo.street + ", " + shipInfo.addressInformation}</p>
                                        <p className="chakra-text css-1m2twwy">{shipInfo.city + ", " + shipInfo.email}</p>
                                        <p className="chakra-text css-1m2twwy"></p> <br></br>
                                    </>}
                                    <Button variant="contained" style={{marginTop: "30px"}} onClick={() => handleAddress()}>
                                        TAP TO SET ADDRESS
                                    </Button>
                                </div>
                                <Button variant="contained" style={{ width: "100%", marginTop: "50px", marginBottom: "10px" }} onClick={() => handleOrder()}>Place Order</Button>
                                <div className="flex-row-space" style={{ justifyContent: "left", margin: "5px 0px 20px" }}>
                                    <p style={{ fontSize: "12px" }}>By ordering you accept the</p>
                                    <p style={{ fontSize: "12px", textDecoration: "underline", margin: "0 5px" }}>Privacy Policy</p>
                                    <p style={{ fontSize: "12px" }}>and</p>
                                    <p style={{ fontSize: "12px", textDecoration: "underline", margin: "0 5px" }}>Return Policy.</p>
                                </div>
                            </div>
                        </Grid>}
                    </Grid>

                </div>
                <div className="customer-service">
                    <CustomerService customerServiceDetail={customerServiceDetail} key="CustomerService2" />
                </div>
            </div>

            <Dialog open={loadingAddressDialog} className="addressDialog" onClose={closeAddressDialog}>
                <Address onClose={closeAddressDialog}/>
            </Dialog>
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
    }]