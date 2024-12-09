import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { connect } from "../redux/blockchain/blockchainActions";
// import { blockchainReducer } from "../redux/blockchain/blockchainReducer";
// import detectEthereumProvider from '@metamask/detect-provider';
// import { fetchData } from "./redux/data/dataActions";
// import blockchainReducer from "../redux/blockchain/blockchainReducer";
import store from "../redux/store";
// import { setData } from "./redux/blockchain/blockchainActions";
import {
    SMART_CONTRACT,
    COST,
    openseaCollectionURL,
  } from "../config";
 
  import { fetchData } from "../redux/data/dataActions";
  import banner from '../assets/img/huns-main-new.png';
function Mint() {

    const dispatch = useDispatch();
    // const [chain, setChain] = useState("");
    const [blockchain, setBlockchain] = useState();
    const data = useSelector((state) => state.data);
    const [feedback, setFeedback] = useState();
    const [claimingNft, setClaimingNft] = useState(false);

    useEffect(() => {

      const state = store.getState();

      if (!state.blockchain.account) {
  
        store.subscribe(() => {

          const bc = store.getState();
          setBlockchain(bc.blockchain);

      });
  
      } else {
        
        setBlockchain(state.blockchain);
  
      }

      }, []);

      const getData = () => {
        if (blockchain.account && blockchain.smartContract) {
          dispatch(fetchData(blockchain.account));
        }
      };

      const claimNFTs = (_amount) => {
        if (_amount <= 0) {
          return;
        }
        setFeedback("Minting your The Fools...");
        setClaimingNft(true);
        blockchain.smartContract.methods
          .mint(blockchain.account, _amount)
          .send({
            gas: "400000",
            maxPriorityFeePerGas: null,
            maxFeePerGas: null,
            to: SMART_CONTRACT,
            from: blockchain.account,
            value: blockchain.web3.utils.toWei(
              (COST * _amount).toString(),
              "ether"
            ),
          })
          .once("error", (err) => {
            // console.log(err);
            setFeedback("Sorry, something went wrong please try again later.");
            setClaimingNft(false);
          })
          .then((receipt) => {
            setFeedback(
              "WOW, you now own a The Fools. go visit Opensea.io to view it."
            );
            setClaimingNft(false);
            dispatch(fetchData(blockchain.account));
          });
        }


  return (
    
  
              <div className="container-fluid" >
  <div className="main-screen" style={{  padding: "8%" }} >
    <div className="main-screen__preview" >
      <picture className="picture">
      <img src={banner} alt="" />
      </picture>
    </div>
    <div className="main-screen__content">
      <div className="main-screen__title" style={{padding: "2%" }}>THE FOOLS D'app </div>
      
      
      
        
        <div className="container">
          
                {!blockchain?.account ? (
                  <div className="text-center" style={{ color: "" }}>
                    Connect your <u>METAMASK WALLET</u> to the{" "}
                    <u>Ethereum NETWORK</u> and then on the <u>WEBSITE</u> to see
                    the remaning supply and <u>MINT</u> your NFT.
                  </div>
                ) : (
                  <div
                    className="row justify-content-center text-right" style={{ fontSize: "34px" }}>
                      <h1>Minted</h1>
                    {!data.totalSupply ? (
                      <div style={{ fontSize: "12px"  }}>Connecting...</div>
                    ) : data.totalSupply < 200 ? (
                      <div className="col">
                        <div>{data.totalSupply}/200</div>
                        
                        {!claimingNft ? (
                          
                          <div
                            
                            className="button button--telesto "style={{ fontSize: "25px", width: "50% ", borderRadius: "20px"}}
                            disabled={claimingNft ? 1 : 0}
                            onClick={(e) => {
                              e.preventDefault();
                              claimNFTs(1);
                              getData();
                            }}
                            target="_blank"><span><span>Mint</span></span>
                            MINT
                            
                          </div>
                          
                        ) : null}
                        <div className="mt-2">{feedback}</div>
                        <div className="mt-2 " style={{float:"right"}}>
                          Costs 25 MATIC excluding gas fee
                        </div>
                      </div>
                    ) : (
                      <div className="mt-2">
                        <div>
                          There are no more The FoolsS available for minting.
                        </div>
                        <div>
                          You can still find The Foolss on{" "}
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={openseaCollectionURL}
                          >
                            OPENSEA
                          </a>
                        </div>
                      </div>
    
       
          
            
  
                    )}
                  </div>
                )}
              </div>
            </div>
            </div>
            </div>
            
     
   
    
  );
}

export default Mint;
