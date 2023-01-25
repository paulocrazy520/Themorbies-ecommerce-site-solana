import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import StickyFooter from './components/Footer';
import NavigationBar from './components/NavigationBar';
import { Routes, Route, BrowserRouter } from "react-router-dom"
import { Provider } from 'react-redux';
import { createBrowserHistory } from "history";
import { Router } from 'react-router'; // notice I'm importing from 'react-router'
import Product from './pages/Product';
import Address from './pages/Address';
import Store from './pages/Store';
import Mint from './pages/Mint';
import ShoppingCart from './pages/ShoppingCart';
import YourOrders from './pages/YourOrders';


let history = createBrowserHistory({forceRefresh:true});

export default function App() {
  return (
    <BrowserRouter history={history}>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', }} >
        <CssBaseline />
        <NavigationBar />
        <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
          <Routes>
            <Route path="/" element={<Store />} />
            <Route path="mint" element={<Mint />} />
            <Route path="store" element={<Store />} />
            <Route path="orders" element={<YourOrders />} />
            <Route path="cart" element={<ShoppingCart />} />
            <Route path="address" element={<Address />} />
            <Route path="product/:id" element={<Product />} />
            <Route path="address/edit/:id" element={<Product />} />
          </Routes>
        </Container>
        <StickyFooter />
      </Box>
    </BrowserRouter>
  );
}