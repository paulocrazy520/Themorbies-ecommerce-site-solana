import React, { useState, useEffect } from "react";
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { default as MLINK } from '@mui/material/Link';
import LinearProgress from '@mui/material/LinearProgress';
import GlobalStyles from '@mui/material/GlobalStyles';
import Backdrop from '@mui/material/Backdrop';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';
import { Link } from "react-router-dom";

import * as global from "../../models/global";
import "./style.css";

import { flexbox, styled } from "@mui/system";
import { useWallet } from "@solana/wallet-adapter-react";
import {
    WalletDialogProvider as MaterialUIWalletDialogProvider,
    WalletMultiButton as MaterialUIWalletMultiButton,
    WalletConnectButton
} from '@solana/wallet-adapter-material-ui';

import { useSelector, useDispatch } from "react-redux";
import { setDetailData } from "../../store/detailslice";

const WalletButton = styled("div")(() => ({
    display: 'flex',
    flexDirection: 'row-reverse'
}))

export default function NavigationBar() {
    const wallet = useWallet();
    const dispatch = useDispatch();
    const count = useSelector((state) => (state.detail.data));
    const [orderCount, setOrderCount] = useState(0);
    const [shippingCount, setShippingCount] = useState(0);
    const [successCount, setSuccessCount] = useState(0);
    const [loadingView, setLoadingView] = useState(false);

    useEffect(() => {
        if (wallet.publicKey)
            getOrderCount();
    }, []);

    useEffect(() => {
        if (!wallet.publicKey) {
            setOrderCount(0);
        }
        else {
            //setOrderCount(count);
            getOrderCount();
        }
    }, [count, wallet])

    const getOrderCount = async (id) => {

        const _Infos = await global.getInfoResponse(global.SERVER_URL + "/shop/get_orders?account_id=" + wallet.publicKey);
        if (!_Infos || !_Infos.data.result) return;

        console.log(">>>>>>>>>>>>>>getOrderCount", _Infos) ;

        setOrderCount(_Infos.data.data.filter((item, index) => item.status == "cart").length);
        setShippingCount(_Infos.data.data.filter((item, index) => item.status == "shipping").length);
        setSuccessCount(_Infos.data.data.filter((item, index) => item.status == "success").length);
    }

    return (
        <React.Fragment>
            <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
            <CssBaseline />
            <AppBar position="static" color="default" elevation={0} sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }} >
                <Toolbar sx={{ flexWrap: 'wrap' }}>
                    <div className="main-logo">
                        <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                            <MLINK variant="h6" color="inherit" noWrap sx={{ textDecoration: 'none' }}>
                                <Link to="/">
                                    <img style={{ width: "80px", margin: "0px 20px" }} alt="" src="/images/logo.png" />
                                </Link>
                            </MLINK>
                        </Typography>
                    </div>
                    <nav className='main-links'>
                        <MLINK className='single-link' variant="button" color="text.primary" underline="none" sx={{ my: 1, mx: 1.5 }} >
                            <Link to="/mint"> Mint </Link></MLINK>
                        <MLINK className='single-link' variant="button" color="text.primary" underline="none" sx={{ my: 1, mx: 1.5 }} >
                            <Link to="/store"> Store </Link></MLINK>
                        <MLINK className='single-link' variant="button" color="text.primary" underline="none" sx={{ my: 1, mx: 1.5 }} >
                            <Link to="/orders">Your Orders</Link> </MLINK>
                        <MLINK className='single-link' variant="button" color="text.primary" underline="none" sx={{ my: 1, mx: 1.5 }} >
                            <Link to="/cart"> Shopping Cart </Link>
                        </MLINK>
                        <MLINK className='single-link' variant="button" color="text.primary" underline="none" sx={{ my: 1, mx: 1.5 }} href="https://stake.cardinal.so/7hJXvCZvRpyDzi8cz3YBxbfPoYPyTHwfpoBV8fcDXXkA">
                            Staking
                        </MLINK>
                    </nav>
                    <div className='main-notification'>
                        <Link className="main-cart" to="/cart">
                            <ShoppingCartCheckoutOutlinedIcon  style={{color:"white", scale:"1.5"}}/>
                            {orderCount > 0 && <div className="cart-count"><p>{orderCount}</p></div>}
                        </Link>
                      
                      <Link className="purchase-cart" to="/orders">
                        <LocalShippingOutlinedIcon style={{color:"white", scale:"1.5"}}/>
                        {shippingCount > 0 && <div className="cart-count"><p>{shippingCount}</p></div>}
                        </Link>
                        <Link className="complete-cart" to="/order">
                            <CheckCircleOutlineOutlinedIcon style={{color:"white", scale:"1.5"}}/>
                            {successCount > 0 && <div className="cart-count"><p>{successCount}</p></div>}
                        </Link>
                        <WalletButton>
                            <MaterialUIWalletMultiButton variant="text" style={{
                                border: "1px solid white",
                                fontWeight: 900,
                                background: "transparent",
                                borderRadius: '10px',
                                color: 'white',
                                marginRight: "20px", backgroundColor: "#393e46"
                            }} />
                        </WalletButton>
                    </div>
                </Toolbar>
            </AppBar>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loadingView}
            >
                <img alt="" src="/images/loading.gif" />
            </Backdrop>
            {/* <LinearProgress color="secondary" /> */}
        </React.Fragment >
    );
}