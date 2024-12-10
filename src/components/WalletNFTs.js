import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { CHAIN_ID, NETWORK_URLS, SMART_CONTRACT } from "../config";

const DEFAULT_CONFIG = {
  nftsPerPage: 16,
  cardStyles: {
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(20px)",
    borderRadius: "20px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.2)",
    maxWidth: "250px",
    transition: "all 0.3s ease"
  },
  imageContainerHeight: "200px",
  titleGradient: "linear-gradient(45deg, #FF6B6B, #4ECDC4)",
  buttonStyles: {
    base: {
      padding: "0.6rem 1rem",
      fontSize: "0.85rem",
      fontWeight: "600",
      border: "none",
      borderRadius: "12px",
      transition: "all 0.3s ease",
      backdropFilter: "blur(10px)",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px"
    },
    opensea: {
      background: "linear-gradient(135deg, rgba(32, 129, 226, 0.9), rgba(21, 178, 229, 0.9))",
      boxShadow: "0 4px 15px rgba(32, 129, 226, 0.3)",
      color: "white",
      border: "1px solid rgba(255, 255, 255, 0.1)"
    },
    contract: {
      background: "linear-gradient(135deg, rgba(123, 97, 255, 0.9), rgba(156, 70, 255, 0.9))",
      boxShadow: "0 4px 15px rgba(123, 97, 255, 0.3)",
      color: "white",
      border: "1px solid rgba(255, 255, 255, 0.1)"
    }
  },
  paginationStyles: {
    activeBackground: "linear-gradient(45deg, rgba(255, 107, 107, 0.9), rgba(78, 205, 196, 0.9))",
    inactiveBackground: "rgba(255, 255, 255, 0.05)",
    buttonSize: "40px",
    borderRadius: "12px",
    transition: "all 0.3s ease"
  }
};

const PLACEHOLDER_IMAGE = "https://via.placeholder.com/200x200?text=NFT+Image";

const WalletNFTs = () => {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const blockchain = useSelector((state) => state.blockchain);

  const getExplorerURL = () => NETWORK_URLS.explorer[CHAIN_ID];
  const getOpenSeaURL = () => NETWORK_URLS.opensea[CHAIN_ID];

  const convertIpfsToHttp = useCallback((ipfsUrl) => {
    if (!ipfsUrl || typeof ipfsUrl !== 'string') {
      console.log("Invalid IPFS URL:", ipfsUrl);
      return PLACEHOLDER_IMAGE;
    }

    try {
      if (ipfsUrl.startsWith('ipfs://')) {
        const convertedUrl = `https://nftstorage.link/ipfs/${ipfsUrl.replace('ipfs://', '')}`;
        console.log("Converted IPFS URL:", ipfsUrl, "to:", convertedUrl);
        return convertedUrl;
      }
      return ipfsUrl;
    } catch (error) {
      console.error("Error converting IPFS URL:", error);
      return PLACEHOLDER_IMAGE;
    }
  }, []);

  const fetchMetadataInBatch = useCallback(async (tokenIds) => {
    try {
      console.log("Fetching metadata for token IDs:", tokenIds);
      
      // Otteniamo gli URI dei token dal contratto
      const tokenURIs = await Promise.all(
        tokenIds.map(id => blockchain.smartContract.methods.tokenURI(id).call())
      );
      console.log("Token URIs from contract:", tokenURIs);

      // Recuperiamo i metadata per ogni URI
      const metadataPromises = tokenURIs.map(async uri => {
        try {
          const formattedUri = convertIpfsToHttp(uri);
          console.log("Fetching metadata from:", formattedUri);
          
          const response = await fetch(formattedUri);
          const metadata = await response.json();
          console.log("Received metadata:", metadata);
          
          // Convertiamo l'URL dell'immagine se necessario
          const imageUrl = metadata.image || metadata.image_url;
          const convertedImageUrl = convertIpfsToHttp(imageUrl);
          console.log("Converted image URL:", convertedImageUrl);
          
          return convertedImageUrl;
        } catch (err) {
          console.error("Error fetching individual metadata:", err);
          return PLACEHOLDER_IMAGE;
        }
      });

      const images = await Promise.all(metadataPromises);
      console.log("Final processed images:", images);
      return images;
      
    } catch (err) {
      console.error("Error in batch metadata fetch:", err);
      return tokenIds.map(() => PLACEHOLDER_IMAGE);
    }
  }, [blockchain.smartContract, convertIpfsToHttp]);

  useEffect(() => {
    const fetchNFTs = async () => {
      if (blockchain.smartContract && blockchain.account) {
        try {
          setNfts([]); // Reset NFTs
          setLoadingProgress(0);
          
          // Get all NFTs owned by the connected wallet
          const tokenIds = await blockchain.smartContract.methods.walletOfOwner(blockchain.account).call();
          console.log("Found token IDs:", tokenIds);
          
          const totalTokens = tokenIds.length;
          if (totalTokens === 0) {
            setLoading(false);
            return;
          }
          
          const batchSize = 5;
          const nftData = [];
          
          for (let i = 0; i < totalTokens; i += batchSize) {
            const batch = tokenIds.slice(i, i + batchSize);
            
            try {
              // Fetch metadata in parallel
              const images = await fetchMetadataInBatch(batch);
              console.log("Fetched images:", images);
              
              // Create NFT objects
              const batchNFTs = batch.map((id, index) => ({
                id,
                imageUrl: images[index] || PLACEHOLDER_IMAGE,
                owner: blockchain.account
              }));
              
              nftData.push(...batchNFTs);
              
              const progress = Math.min(((i + batch.length) / totalTokens) * 100, 100);
              setLoadingProgress(progress);
              setNfts(prev => [...prev, ...batchNFTs]);
            } catch (err) {
              console.error(`Error processing batch starting at ${i}:`, err);
            }
          }
          
          setLoading(false);
        } catch (err) {
          console.error("Error fetching wallet NFTs:", err);
          setLoading(false);
        }
      }
    };

    fetchNFTs();
  }, [blockchain.smartContract, blockchain.account, fetchMetadataInBatch]);

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
        fontSize: "2.8rem",
        fontWeight: "700",
        background: DEFAULT_CONFIG.titleGradient,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        textShadow: "2px 2px 4px rgba(0,0,0,0.1)"
      }}>Your NFT Fools</h2>
      <div className="row g-4" style={{ margin: "0 2rem" }}>
        {currentNFTs.map((nft) => (
          <div key={nft.id} className="col-md-3">
            <div className="card h-100" style={{
              ...DEFAULT_CONFIG.cardStyles,
              transform: "translateY(0)",
              opacity: 0.95
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-10px) scale(1.02)";
              e.currentTarget.style.opacity = "1";
              e.currentTarget.style.boxShadow = "0 12px 40px rgba(31, 38, 135, 0.3)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.opacity = "0.95";
              e.currentTarget.style.boxShadow = DEFAULT_CONFIG.cardStyles.boxShadow;
            }}
            >
              <div style={{
                height: DEFAULT_CONFIG.imageContainerHeight,
                overflow: "hidden",
                borderRadius: "20px 20px 0 0",
                position: "relative"
              }}>
                <img 
                  src={nft.imageUrl}
                  alt={`NFT #${nft.id}`}
                  className="card-img-top"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.3s ease"
                  }}
                  onError={(e) => {
                    console.error("Image load error for NFT:", nft.id, nft.imageUrl);
                    e.target.onerror = null;
                    e.target.src = PLACEHOLDER_IMAGE;
                  }}
                />
                <div style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.5))",
                  opacity: 0,
                  transition: "opacity 0.3s ease"
                }}></div>
              </div>
              <div className="card-body" style={{ 
                padding: "1.2rem",
                background: "rgba(255, 255, 255, 0.02)"
              }}>
                <h3 className="card-title mb-3" style={{
                  fontSize: "1.3rem",
                  fontWeight: "700",
                  color: "#fff",
                  textShadow: "1px 1px 2px rgba(0,0,0,0.2)"
                }}>NFT #{nft.id}</h3>
                <div className="d-flex flex-column gap-3">
                  <a 
                    href={`${getOpenSeaURL()}${SMART_CONTRACT}/${nft.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn"
                    style={{
                      ...DEFAULT_CONFIG.buttonStyles.base,
                      ...DEFAULT_CONFIG.buttonStyles.opensea
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = "0 6px 20px rgba(32, 129, 226, 0.4)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 4px 15px rgba(32, 129, 226, 0.3)";
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M45 0C20.151 0 0 20.151 0 45C0 69.849 20.151 90 45 90C69.849 90 90 69.849 90 45C90 20.151 69.858 0 45 0ZM22.203 46.512L22.392 46.206L34.101 27.891C34.272 27.63 34.677 27.657 34.803 27.945C36.756 32.328 38.448 37.782 37.656 41.175C37.323 42.57 36.396 44.46 35.352 46.206C35.217 46.458 35.073 46.71 34.911 46.953C34.839 47.061 34.713 47.124 34.578 47.124H22.545C22.221 47.124 22.032 46.773 22.203 46.512ZM74.376 52.812C74.376 52.983 74.277 53.127 74.133 53.19C73.224 53.577 70.119 55.008 68.832 56.799C65.538 61.38 63.027 67.932 57.402 67.932H33.948C25.632 67.932 18.9 61.173 18.9 52.83V52.56C18.9 52.344 19.08 52.164 19.305 52.164H32.373C32.634 52.164 32.823 52.398 32.805 52.659C32.706 53.505 32.868 54.378 33.273 55.17C34.047 56.745 35.658 57.726 37.395 57.726H43.866V52.677H37.467C37.143 52.677 36.945 52.299 37.134 52.029C37.206 51.921 37.278 51.813 37.368 51.687C37.971 50.823 38.835 49.491 39.699 47.97C40.284 46.944 40.851 45.846 41.31 44.748C41.4 44.55 41.472 44.343 41.553 44.145C41.679 43.794 41.805 43.461 41.895 43.137C41.985 42.858 42.066 42.57 42.138 42.3C42.354 41.364 42.444 40.374 42.444 39.348C42.444 38.943 42.426 38.52 42.39 38.124C42.372 37.683 42.318 37.242 42.264 36.801C42.228 36.414 42.156 36.027 42.084 35.631C41.985 35.046 41.859 34.461 41.715 33.876L41.661 33.651C41.553 33.246 41.454 32.868 41.328 32.463C40.959 31.203 40.545 29.97 40.095 28.818C39.933 28.359 39.753 27.918 39.564 27.486C39.294 26.82 39.015 26.217 38.763 25.65C38.628 25.389 38.52 25.155 38.412 24.912C38.286 24.642 38.16 24.372 38.025 24.111C37.935 23.913 37.827 23.724 37.755 23.544L36.963 22.086C36.855 21.888 37.035 21.645 37.251 21.708L42.201 23.049H42.219C42.228 23.049 42.228 23.049 42.237 23.049L42.885 23.238L43.605 23.436L43.866 23.508V20.574C43.866 19.152 45 18 46.413 18C47.115 18 47.754 18.288 48.204 18.756C48.663 19.224 48.951 19.863 48.951 20.574V24.939L49.482 25.083C49.518 25.101 49.563 25.119 49.599 25.146C49.725 25.236 49.914 25.38 50.148 25.56C50.337 25.704 50.535 25.884 50.769 26.073C51.246 26.46 51.822 26.955 52.443 27.522C52.605 27.666 52.767 27.81 52.92 27.963C53.721 28.71 54.621 29.583 55.485 30.555C55.728 30.834 55.962 31.104 56.205 31.401C56.439 31.698 56.7 31.986 56.916 32.274C57.213 32.661 57.519 33.066 57.798 33.489C57.924 33.687 58.077 33.894 58.194 34.092C58.554 34.623 58.86 35.172 59.157 35.721C59.283 35.973 59.409 36.252 59.517 36.522C59.85 37.26 60.111 38.007 60.273 38.763C60.327 38.925 60.363 39.096 60.381 39.258V39.294C60.435 39.51 60.453 39.744 60.471 39.987C60.543 40.752 60.507 41.526 60.345 42.3C60.273 42.624 60.183 42.93 60.075 43.263C59.958 43.578 59.85 43.902 59.706 44.217C59.427 44.856 59.103 45.504 58.716 46.098C58.59 46.323 58.437 46.557 58.293 46.782C58.131 47.016 57.96 47.241 57.816 47.457C57.609 47.736 57.393 48.024 57.168 48.285C56.97 48.555 56.772 48.825 56.547 49.068C56.241 49.437 55.944 49.779 55.629 50.112C55.449 50.328 55.251 50.553 55.044 50.751C54.846 50.976 54.639 51.174 54.459 51.354C54.144 51.669 53.892 51.903 53.676 52.11L53.163 52.569C53.091 52.641 52.992 52.677 52.893 52.677H48.951V57.726H54.054C55.107 57.726 56.079 57.339 56.826 56.61C57.213 56.241 58.716 54.93 60.435 53.055C60.471 53.019 60.516 52.992 60.57 52.983L73.386 49.527C73.629 49.455 73.872 49.644 73.872 49.896V52.812H74.376Z" fill="white"/>
                    </svg>
                    View on OpenSea
                  </a>
                  <a 
                    href={`${getExplorerURL()}${SMART_CONTRACT}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn"
                    style={{
                      ...DEFAULT_CONFIG.buttonStyles.base,
                      ...DEFAULT_CONFIG.buttonStyles.contract
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = "0 6px 20px rgba(123, 97, 255, 0.4)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 4px 15px rgba(123, 97, 255, 0.3)";
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 8H17V6C17 3.24 14.76 1 12 1C9.24 1 7 3.24 7 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8ZM12 17C10.9 17 10 16.1 10 15C10 13.9 10.9 13 12 13C13.1 13 14 13.9 14 15C14 16.1 13.1 17 12 17ZM15.1 8H8.9V6C8.9 4.29 10.29 2.9 12 2.9C13.71 2.9 15.1 4.29 15.1 6V8Z" fill="white"/>
                    </svg>
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
            <ul className="pagination" style={{ gap: "10px" }}>
              {Array.from({ length: totalPages }, (_, i) => (
                <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => paginate(i + 1)}
                    style={{
                      width: DEFAULT_CONFIG.paginationStyles.buttonSize,
                      height: DEFAULT_CONFIG.paginationStyles.buttonSize,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: currentPage === i + 1 ? DEFAULT_CONFIG.paginationStyles.activeBackground : DEFAULT_CONFIG.paginationStyles.inactiveBackground,
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: DEFAULT_CONFIG.paginationStyles.borderRadius,
                      color: currentPage === i + 1 ? "white" : "rgba(255, 255, 255, 0.8)",
                      fontWeight: "600",
                      transition: DEFAULT_CONFIG.paginationStyles.transition,
                      backdropFilter: "blur(10px)",
                      cursor: "pointer"
                    }}
                    onMouseOver={(e) => {
                      if (currentPage !== i + 1) {
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow = "0 4px 15px rgba(255, 255, 255, 0.1)";
                      }
                    }}
                    onMouseOut={(e) => {
                      if (currentPage !== i + 1) {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "none";
                      }
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
