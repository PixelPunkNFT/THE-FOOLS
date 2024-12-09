import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CHAIN_ID, NETWORK_URLS, SMART_CONTRACT } from "../config";

const DEFAULT_CONFIG = {
  nftsPerPage: 16,
  cardStyles: {
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    borderRadius: "15px",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
    maxWidth: "250px"
  },
  imageContainerHeight: "200px",
  titleGradient: "linear-gradient(45deg, #FF6B6B, #4ECDC4)",
  buttonStyles: {
    opensea: {
      background: "linear-gradient(45deg, #2081E2, #15B2E5)"
    },
    contract: {
      background: "linear-gradient(45deg, #7B61FF, #9C46FF)"
    }
  },
  paginationStyles: {
    activeBackground: "linear-gradient(45deg, #FF6B6B, #4ECDC4)",
    inactiveBackground: "rgba(255, 255, 255, 0.1)"
  }
};

const WalletNFTs = () => {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const blockchain = useSelector((state) => state.blockchain);

  const getExplorerURL = () => NETWORK_URLS.explorer[CHAIN_ID];
  const getOpenSeaURL = () => NETWORK_URLS.opensea[CHAIN_ID];

  const fetchMetadataInBatch = async (uris) => {
    try {
      const responses = await Promise.all(
        uris.map(uri => 
          fetch(uri)
            .then(res => res.json())
            .catch(err => {
              console.log("Error fetching metadata:", err);
              return null;
            })
        )
      );
      return responses.map(metadata => metadata?.image || metadata?.image_url || null);
    } catch (err) {
      console.log("Error in batch metadata fetch:", err);
      return uris.map(() => null);
    }
  };

  useEffect(() => {
    const fetchNFTs = async () => {
      if (blockchain.smartContract && blockchain.account) {
        try {
          setNfts([]); // Reset NFTs
          setLoadingProgress(0);
          
          // Get all NFTs owned by the connected wallet
          const tokenIds = await blockchain.smartContract.methods.walletOfOwner(blockchain.account).call();
          const totalTokens = tokenIds.length;
          
          const batchSize = 10;
          const nftData = [];
          
          for (let i = 0; i < totalTokens; i += batchSize) {
            const batch = tokenIds.slice(i, i + batchSize);
            
            try {
              // Fetch URIs in parallel
              const tokenURIs = await Promise.all(
                batch.map(id => blockchain.smartContract.methods.tokenURI(id).call())
              );
              
              // Fetch metadata in parallel
              const images = await fetchMetadataInBatch(tokenURIs);
              
              // Create NFT objects
              const batchNFTs = batch.map((id, index) => ({
                id,
                imageUrl: images[index],
                owner: blockchain.account
              }));
              
              nftData.push(...batchNFTs);
              
              const progress = Math.min(((i + batch.length) / totalTokens) * 100, 100);
              setLoadingProgress(progress);
              setNfts(prev => [...prev, ...batchNFTs]);
            } catch (err) {
              console.log(`Error processing batch starting at ${i}:`, err);
            }
          }
          
          setLoading(false);
        } catch (err) {
          console.log("Error fetching wallet NFTs:", err);
          setLoading(false);
        }
      }
    };

    fetchNFTs();
  }, [blockchain.smartContract, blockchain.account]);

  // Get current NFTs for pagination
  const indexOfLastNFT = currentPage * DEFAULT_CONFIG.nftsPerPage;
  const indexOfFirstNFT = indexOfLastNFT - DEFAULT_CONFIG.nftsPerPage;
  const currentNFTs = nfts.slice(indexOfFirstNFT, indexOfLastNFT);
  const totalPages = Math.ceil(nfts.length / DEFAULT_CONFIG.nftsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (!blockchain.account) {
    return (
      <div className="container mt-5">
        <div className="text-center p-5" style={{
          background: DEFAULT_CONFIG.cardStyles.background,
          borderRadius: "20px",
          backdropFilter: "blur(10px)"
        }}>
          <h2 className="mb-4">Please connect your wallet to view your NFTs</h2>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="text-center p-5" style={{
          background: DEFAULT_CONFIG.cardStyles.background,
          borderRadius: "20px",
          backdropFilter: "blur(10px)"
        }}>
          <h2 className="mb-4">Loading Your NFTs...</h2>
          <div className="progress" style={{ height: "25px" }}>
            <div 
              className="progress-bar progress-bar-striped progress-bar-animated" 
              role="progressbar" 
              style={{
                width: `${loadingProgress}%`,
                background: DEFAULT_CONFIG.titleGradient
              }}
              aria-valuenow={loadingProgress}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {Math.round(loadingProgress)}%
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (nfts.length === 0) {
    return (
      <div className="container mt-5">
        <div className="text-center p-5" style={{
          background: DEFAULT_CONFIG.cardStyles.background,
          borderRadius: "20px",
          backdropFilter: "blur(10px)"
        }}>
          <h2 className="mb-4">No NFTs found in your wallet</h2>
          <p>Connected Address: {blockchain.account}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5">
      <h2 className="text-center mb-5" style={{
        fontSize: "2.5rem",
        fontWeight: "bold",
        background: DEFAULT_CONFIG.titleGradient,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent"
      }}>Your NFT Collection</h2>
      <div className="row g-5" style={{ margin: "0 2rem" }}>
        {currentNFTs.map((nft) => (
          <div key={nft.id} className="col-md-3">
            <div className="card h-100" style={{
              ...DEFAULT_CONFIG.cardStyles,
              transition: "transform 0.3s ease",
              cursor: "pointer",
              overflow: "hidden",
              margin: "0 auto"
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-10px)"}
            onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              <div style={{
                height: DEFAULT_CONFIG.imageContainerHeight,
                overflow: "hidden",
                borderRadius: "15px 15px 0 0"
              }}>
                <img 
                  src={nft.imageUrl} 
                  alt={`NFT #${nft.id}`}
                  className="card-img-top"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                  }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/200x200?text=NFT+Image";
                  }}
                />
              </div>
              <div className="card-body" style={{ padding: "1rem" }}>
                <h3 className="card-title mb-2" style={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  color: "#fff"
                }}>NFT #{nft.id}</h3>
                <div className="d-flex flex-column gap-2">
                  <a 
                    href={`${getOpenSeaURL()}${SMART_CONTRACT}/${nft.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    style={{
                      ...DEFAULT_CONFIG.buttonStyles.opensea,
                      border: "none",
                      borderRadius: "8px",
                      padding: "0.4rem",
                      fontSize: "0.8rem",
                      fontWeight: "bold"
                    }}
                  >
                    View on OpenSea
                  </a>
                  <a 
                    href={`${getExplorerURL()}${SMART_CONTRACT}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                    style={{
                      ...DEFAULT_CONFIG.buttonStyles.contract,
                      border: "none",
                      borderRadius: "8px",
                      padding: "0.4rem",
                      fontSize: "0.8rem",
                      fontWeight: "bold"
                    }}
                  >
                    View Contract
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-5">
          <nav>
            <ul className="pagination">
              {Array.from({ length: totalPages }, (_, i) => (
                <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => paginate(i + 1)}
                    style={{
                      background: currentPage === i + 1 ? DEFAULT_CONFIG.paginationStyles.activeBackground : DEFAULT_CONFIG.paginationStyles.inactiveBackground,
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: currentPage === i + 1 ? 'white' : 'rgba(255, 255, 255, 0.8)',
                      margin: '0 5px',
                      borderRadius: '8px',
                      minWidth: '40px',
                      height: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default WalletNFTs;
