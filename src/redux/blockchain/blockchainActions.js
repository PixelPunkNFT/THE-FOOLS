// constants
import Web3EthContract from "web3-eth-contract";
import Web3 from "web3";
import SmartContract from "../../contracts/SmartContract.json";
// log
import { fetchData } from "../data/dataActions";
import { SMART_CONTRACT, CHAIN_ID, CHAIN_LIST } from "../../config.js";

const connectRequest = () => {
  return {
    type: "CONNECTION_REQUEST",
  };
};

const connectSuccess = (payload) => {
  return {
    type: "CONNECTION_SUCCESS",
    payload: payload,
  };
};

const connectFailed = (payload) => {
  return {
    type: "CONNECTION_FAILED",
    payload: payload,
  };
};

const updateAccountRequest = (payload) => {
  return {
    type: "UPDATE_ACCOUNT",
    payload: payload,
  };
};

export const setData = (data) => {
  return {
    type: "SET_BLOCKCHAIN_DATA",
    payload: data,
  };
};

const getNetworkName = (chainId) => {
  const network = CHAIN_LIST.find(chain => chain.id === chainId);
  return network ? network.name : 'unknown network';
};

export const connect = () => {
  return async (dispatch) => {
    dispatch(connectRequest());
    const { ethereum } = window;
    const metamaskIsInstalled = ethereum && ethereum.isMetaMask;
    if (metamaskIsInstalled) {
      Web3EthContract.setProvider(ethereum);
      let web3 = new Web3(ethereum);
      try {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        const networkId = await ethereum.request({
          method: "net_version",
        });
        
        if (networkId === CHAIN_ID) {
          const SmartContractObj = new Web3EthContract(
            SmartContract,
            SMART_CONTRACT
          );
          dispatch(
            connectSuccess({
              account: accounts[0],
              smartContract: SmartContractObj,
              web3: web3,
            })
          );
          // Add listeners start
          ethereum.on("accountsChanged", (accounts) => {
            dispatch(updateAccount(accounts[0]));
          });
          ethereum.on("chainChanged", () => {
            window.location.reload();
          });
          // Add listeners end
        } else {
          const requiredNetwork = getNetworkName(CHAIN_ID);
          dispatch(connectFailed(`Please switch to ${requiredNetwork.charAt(0).toUpperCase() + requiredNetwork.slice(1)}.`));
          
          // Try to switch to the correct network
          try {
            await ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: `0x${Number(CHAIN_ID).toString(16)}` }],
            });
          } catch (switchError) {
            // This error code indicates that the chain has not been added to MetaMask
            if (switchError.code === 4902) {
              try {
                const networkConfig = {
                  "1": {
                    chainName: 'Ethereum Mainnet',
                    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
                    rpcUrls: ['https://mainnet.infura.io/v3/'],
                    blockExplorerUrls: ['https://etherscan.io']
                  },
                  "137": {
                    chainName: 'Polygon Mainnet',
                    nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
                    rpcUrls: ['https://polygon-rpc.com/'],
                    blockExplorerUrls: ['https://polygonscan.com']
                  }
                };

                if (networkConfig[CHAIN_ID]) {
                  await ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [{
                      chainId: `0x${Number(CHAIN_ID).toString(16)}`,
                      ...networkConfig[CHAIN_ID]
                    }],
                  });
                }
              } catch (addError) {
                console.log('Error adding network:', addError);
              }
            }
          }
        }
      } catch (err) {
        dispatch(connectFailed("Something went wrong."));
      }
    } else {
      dispatch(connectFailed("Install Metamask."));
    }
  };
};

export const updateAccount = (account) => {
  return async (dispatch) => {
    dispatch(updateAccountRequest({ account: account }));
    dispatch(fetchData(account));
  };
};
