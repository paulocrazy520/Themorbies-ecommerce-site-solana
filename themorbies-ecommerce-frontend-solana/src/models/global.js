import axios from "axios";

export const SERVER_URL = "http://95.217.98.125:80/api";

export const ORDER_STATUS_CART = "cart"
export const ORDER_STATUS_PROCEDDING = "shipping"
export const ORDER_STATUS_ORDERD = "success"
export const ORDER_SHIP_PRICE = { Sol: 0.002, Puff: 1.05 }
export const ORDER_TEASURE = "5NtZfAeGcYY7dmTfeMAdFXPoqFadEh1ituBmNFYjwnuF" //main
// export const ORDER_NETWORK = "devnet"
export const ORDER_NETWORK = "mainnet-beta"
export const ORDER_RPC_URL = "https://api.metaplex.solana.com"
export const ORDER_MINT_ADDRESS = "GAAALMNFsdCict5syLGmDyLhjEshEYEKHQYNhs2qAutp"
export const LAMPORT_PER_TOKEN = 1000;

export const getInfoResponse = async (urlStr_) => {
    try {
        return await axios.get(urlStr_);
    } catch (error) {
        console.log(error);
    }
};

// axios post
export const postInfoResponse = async (urlStr_, postData_) => {
    let _response = await axios
        .post(urlStr_, postData_)
        .catch((error) => console.log('Error: ', error));
    if (_response && _response.data) {
        // console.log(_response);
        return _response;
    }
}
