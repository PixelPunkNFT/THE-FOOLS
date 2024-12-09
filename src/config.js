// config
export const SMART_CONTRACT = "0x401eC1012427D8570Ec260F914E213d642F53bEc";
export const CHAIN_ID = "137"; // POLYGON MAINNET
export const COST = 25;
export const MANTEINANCE_MODE = false;

// Network URLs
export const NETWORK_URLS = {
  explorer: {
    "137": "https://polygonscan.com/address/",
    "80001": "https://mumbai.polygonscan.com/address/",
    "1": "https://etherscan.io/address/",
    "3": "https://ropsten.etherscan.io/address/",
    "4": "https://rinkeby.etherscan.io/address/",
    "420": "https://goerli.etherscan.io/address/",
    "56": "https://bscscan.com/address/",
    "97": "https://testnet.bscscan.com/address/",
    "25": "https://cronoscan.com/address/",
    "338": "https://testnet.cronoscan.com/address/"
  },
  opensea: {
    "137": "https://opensea.io/assets/matic/",
    "80001": "https://testnets.opensea.io/assets/mumbai/",
    "1": "https://opensea.io/assets/ethereum/",
    "3": "https://testnets.opensea.io/assets/ropsten/",
    "4": "https://testnets.opensea.io/assets/rinkeby/",
    "420": "https://testnets.opensea.io/assets/goerli/",
    "56": "https://opensea.io/assets/bsc/",
    "97": "https://testnets.opensea.io/assets/bsc-testnet/",
    "25": "https://opensea.io/assets/cronos/",
    "338": "https://testnets.opensea.io/assets/cronos-testnet/"
  }
};

// chain id map
export const CHAIN_LIST = [
    { id: "137", name: "polygon" },
    { id: "80001", name: "mumbai" },
    { id: "1", name: "ethereum" },
    { id: "3", name: "ropsten" },
    { id: "4", name: "rinkeby" },
    { id: "420", name: "goerli" },
    { id: "56", name: "binance smart chain" },
    { id: "97", name: "binance smart chain testnet" },
    { id: "25", name: "cronos" },
    { id: "338", name: "cronos testnet" }
];

// menu items
export const MENU_ELEMENTS = [
  {
    displayName: "Home",
    navLink: "/",
  },
  {
    displayName: "Minted FOOLS",
    navLink: "/minted-nfts",
  },
  {
    displayName: "My FOOLS",
    navLink: "/my-nfts",
  }
];

// links
export const openseaCollectionURL = 'https://opensea.io/collection/crypto-cows-nft';
export const twitterURL = 'https://twitter.com/CryptoCowsNFT';
export const githubURL = 'https://github.com/Crypto-Cows';
export const telegramUrl = 'https://t.me/cryptocowsnft';
export const discordUrl = 'https://discord.gg/su7fqSrhby';
export const instagramUrl = 'https://www.instagram.com/crypto_cows_nft';

// api
//export const SERVER_API_URL = "https://www.crypto-cows.com";
// local
 export const SERVER_API_URL = "http://localhost:5000";
