import React from 'react';
import banner from '../assets/img/huns-main-new.png';
import omino from '../assets/img/information/huns-3.png';
// import strategy1 from '../assets/img/strategy/7.png';
// import strategy2 from '../assets/img/strategy/4.png';
// import strategy3 from '../assets/img/strategy/20.png';
// import gift1 from '../assets/img/gifts/gft-1.png';
// import gift2 from '../assets/img/gifts/gft-2.png';
// import gift3 from '../assets/img/gifts/gft-3.png';
// import gift4 from '../assets/img/gifts/gft-4.png';
import team1 from '../assets/img/team/img.png';
import team2 from '../assets/img/team/img-1.png';
import bannerFinale from '../assets/img/team/img-3.png';
import video from '../assets/img/full.mp4'
 
import menu from '../assets/img/menu/img.png'



class Home extends React.Component{
    render(){
        return(
        <div>

<div className="fixed-menu fixed-menu__bottom">
  <ul>
    
    {/* <li show-on-mobile="true"><a href=".roadmap" style={{color: "white"}} className="js-anchor">Roadmap</a></li> */}
     <li show-on-mobile="true"><a href="#" className="js-popup-open" style={{color: "white"}}  data-popup="#js-menu-popup">Social</a></li> 
  </ul>
</div>
<div className="container-fluid">
  <div className="main-screen " >
    <div className="main-screen__preview  " >
      <picture className="picture">
      <img src={banner} alt="" />
      </picture>
    </div>
    <div className="main-screen__content">
      <div className="main-screen__title">Welcome to <br />THE FOOLS!</div>
      <a href="https://discord.gg/" rel="noreferrer noopener" className="active   main-screen__subtitle" style={{color: "white"}} target="_blank"><span><span>Join our Discord</span></span></a>
      <a href="/Mint" className="button button--telesto" style={{borderRadius: "50px"}} target="_blank"><span><span>Mint</span></span></a>
      <div className="main-screen__description">
      The Fools was designed with 100 rare traits<br />on the Polygon Blockchain
      </div>
    </div>
  </div>
  <div className="information-section section">
    <div className="information-blocks">
      <div className="information-item">
        <div className="information-item-preview">
          <picture className="picture" >
          <img src={omino} alt="" />
          </picture>
        </div>
        <div className="information-item-content">
          <div className="information-item-tag">
            Collections
          </div>
          <div className="information-item-title">
            200 unique fools <br />people who unite together <br />on the Polygon Blockchain.
          </div>
          <div className="information-item-text">
            The Fools collection is not an automatically generated collection, each Fools is hand-assembled by artist Leonardo Pericoli, the collection  has strokes of very rare . <br /> We tend to support by drawing and coloring a better world using digital art.
            Contribute together with the fools and everything will be better
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
{/* <div className="strategy section reset-top-padding">
  <div className="section-header">
    <div className="section-tag">Ideology</div>
    <div className="title">
      By creating art we want to involve the public to have fun together, express our thoughts as best we can... FUCK WAR!
    </div>
  </div>
  <div className="section-content">
    <div className="strategy-list">
      <div className="strategy-item">
        <div className="strategy-item-img">
          <picture className="picture">
          <img src={strategy1} alt="" />
          </picture>
        </div>
        <div className="strategy-item-text">
          The Fools will be hidden and mysterious until the end of the presale.<br /> After you will be able to see your Fools and its rarity.
        </div>
      </div>
      <div className="strategy-item">
        <div className="strategy-item-img">
          <picture className="picture">
          <img src={strategy2} alt="" />
          </picture>
        </div>
        <div className="strategy-item-text">
          Guarantee yourself a place on the White-List and participate in our pre-sale. <br /> We will be a fantastic crew!
        </div>
      </div>
      <div className="strategy-item">
        <div className="strategy-item-img">
          <picture className="picture">
          <img src={strategy3} alt="" />
          </picture>
        </div>
        <div className="strategy-item-text">
          Time devoted to The Fools will reward you... <br /> Many awards for the owners supporting the project!
        </div>
      </div>
    </div>
  </div>
</div> */}
<div className="video-section">
  <div className="video-container">
    <div className="video-preload" data-video={video} />
  </div>
  <div className="play-btn js-open-fullscreen-video" data-video={video} />
</div>
{/* <div className="steps section roadmap" id="roadmap">
  <div className="section-header with-arrows">                                                                                    
    <div className="section-tag">Roadmap</div>
    <div className="title">
      Here is what we have <br />planned for this project.
    </div>
    <div className="arrows">
      <div className="arrow prev" />
      <div className="arrow next" />
    </div>
  </div>
  <div className="section-content">
    <div className="steps-slider">
      <div className="steps-item selected">
        <div className="steps-item__number">01</div>
        <div className="steps-item__title">The Preparation</div>
        <div className="steps-item__text">
          We will finalize our website making it final.
          <br /><br />
          We will finish preparing The Fools collection in every aspect
          <br /><br />
          Creation of social media to interact with the crew, be always updated and receive the white list to enter pre-sale
          <br /><br />
          Deploy the NFT mint application with extension to the decentralized portfolio.
          <br /><br />
          Don't miss your chance The Fools are ready!</div>
      </div>
      <div className="steps-item with-image">
        <div className="steps-item__number">02</div>
        <div className="steps-item__title">Let's go</div>
        <div className="steps-item__text">
          We plan to give 1000 seats in the White-List to the supporters of the project, the seats are limited only the true supporters will be able to enter the whitelist and mint their own nft at a lower price than the public sale.
          <br /><br />
          We will start the Presale exclusively for whitelist holders, you can mint your nft at 0.027 ETH.Good luck!
          <br /><br />
          We will start the Public Sale as soon as the presale is completed. Each user will be able to mint his nft at 0.0469 ETH.
          <br /><br />
          The Fools at this point on the roadmap no one will stop them!
        </div>
      </div>
      <div className="steps-item with-image">
        <div className="steps-item__number">03</div>
        <div className="steps-item__title">10% Sold out</div>
        <div className="steps-item__text">
          We will do a lottery among all NFT Fools owners. Free 5 Sony Playstation 5 stylized and signed THE FOOLS!!
          <br />(5 unique playstation 5 The Fools, around the world!)
        </div>
        <div className="steps-item__image">
          <picture className="picture image-cover">
          <img src={gift1} alt="" />
          </picture>
        </div>
      </div>
      <div className="steps-item with-image">
        <div className="steps-item__number">04</div>
        <div className="steps-item__title">30% Sold out</div>
        <div className="steps-item__text">
          We will do a lottery among all NFT Fools owners. 10 latest model iPhones, stylized and signed THE FOOLS as a gift!! 
          <br />(10 unique Iphone's The Fools around the world!)
        </div>
        <div className="steps-item__image">
          <picture className="picture image-cover">
          <img src={gift2} alt="" />
          </picture>
        </div>
      </div>
      <div className="steps-item with-image">
        <div className="steps-item__number">05</div>
        <div className="steps-item__title">50% Sold out</div>
        <div className="steps-item__text">
          We will do a lottery among all NFT Fools holders. 10 Macbooks as a gift, the latest stylized models and signed THE FOOLS!
          <br />(10 unique Macbooks The Fools around the world!)
        </div>
        <div className="steps-item__image">
          <picture className="picture image-cover">
          <img src={gift3} alt="" />
          </picture>
        </div>
      </div>
      <div className="steps-item with-image">
        <div className="steps-item__number">06</div>
        <div className="steps-item__title">100% Sold out</div>
        <div className="steps-item__text">
          We will raffle between all Fools holders a new Tesla!!!!! 
          <br />(OBVIOUSLY STYLIZED)
        </div>
        <div className="steps-item__image">
          <picture className="picture image-cover">
          <img src={gift4} alt="" />
          </picture>
        </div>
      </div>
      <div className="steps-item with-image">
        <div className="steps-item__number">07</div>
        <div className="steps-item__title">After sold out</div>
        <div className="steps-item__text">
          800 fools are selected which allow their owners immediate access to the whitelist of the new project.
        </div>
      </div>
    </div>
  </div>
</div>  */}
<div className="team section reset-top-padding">
  <div className="section-header">
    <div className="section-tag">Team</div>
    <div className="title">
      We gathered the coolest guys to create <br />the coolest fools in the world... <br />COOL!
    </div>
  </div>
  
  <div className="section-content">
    <div className="team-list">
      <div className="team-item">
        <div className="team-item__image">
          <picture className="picture image-cover">
          <img src={team1} alt="" />
          </picture>
        </div>
        <div className="team-item__info">
          <p>
            <span style={{color: '#fff'}}>Leonardo Pericoli</span> – Founder &amp;<br /> Digital Artist 
          </p>
          <a href="https://twitter.com/Oden_Lab" className="fa fa-twitter" />
          <a href="https://www.instagram.com/v91lp" className="fa fa-instagram" />
        </div>
      </div>
      <div className="team-item ">
        <div className="team-item__image">
          <picture className="picture image-cover ">
          <img src={team2} alt="" />
          </picture>
          <div className="team-item__info">
            <p>
              <span style={{color: '#fff'}}>Juri Moretti</span> – Founder &amp; Development
            </p>
            <a href="https://twitter.com/WhitePa04193831" className="fa fa-twitter" />
            <a href="https://github.com/PixelPunkNFT" className="fa fa-github" />
          </div>
        </div>
      </div>
    </div>
  </div>   

    
    {/* <div className="accordion section">
      <div className="wrap">
        <div className="wrap-inner">
          <div className="section-header with-arrows">
            <div className="section-tag">FAQ</div>
            <div className="title">
              Frequently Asked <br />Questions.
            </div>
          </div>
          <div className="section-content">
            <ol className="accordion-list">
              <li className="accordion-item">
                <div className="accordion-item-header">
                  <span>I want to buy Fools, how do I do it?</span>
                </div>
                <div className="accordion-item-body">
                  <p>
                    Fools is an NFT and he is being sold for cryptocurrency (ETH)... To purchase, you need to have a crypto wallet. We recommend Metamask. You can do this directly on the OpenSea website when registering... The link to the collection is on the main screen, good luck!
                  </p>
                </div>
              </li>
              <li className="accordion-item">
                <div className="accordion-item-header">
                  <span>Why does NFT have one price specified, but asks for more from the wallet?</span>
                </div>
                <div className="accordion-item-body">
                  <p>
                    When performing any actions on the Ethereal network, area (gas) is charged... This is the commission that goes to the miners who provide the Ethereal network with computing power. It is the cost of the commission that is added when making a transaction.
                  </p>
                </div>
              </li>
              <li className="accordion-item">
                <div className="accordion-item-header">
                  <span>Is the price of gas always this high?</span>
                </div>
                <div className="accordion-item-body">
                  <p>
                    The lowest gas price is in the morning (For Europe) If the gas is high, the network is simply overloaded and you need to wait.
                  </p>
                </div>
              </li>
              <li className="accordion-item">
                <div className="accordion-item-header">
                  <span>How can I get the whitelist?</span>
                </div>
                <div className="accordion-item-body">
                  <p>
                    You will have to be updated on every social network, that's where we publish the whitelists, the most acclaimed supporters of the project will certainly be evaluated with better eyes..
                  </p>
                </div>
              </li>
              <li className="accordion-item">
                <div className="accordion-item-header">
                  <span>When will the Pre-Sale start??</span>
                </div>
                <div className="accordion-item-body">
                  <p>
                    The presale begins as soon as the 1000 whitelists are sold out, the public sale will begin immediately afterwards. presale price - 0.027 ETH. Price publicsale-0.0469 ETH
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div> */}
    <picture className="picture image-cover">
    <img src={bannerFinale} alt="" />
    </picture>
    <div className="footer">
      <div className="wrap">
        <div className="wrap-inner">
          <div className="title">Join the Fools</div>
          <div className="text">Join to community right now!</div>
          <a href="https://discord.gg/" rel="noreferrer noopener"  className="button button--telesto" style={{borderRadius: 0}} target="noopener"><span><span>join our discord</span></span></a>
          <div className="links">
            
            <a href="https://twitter.com/" target="noopener">Twitter</a>
            <a href="https://opensea.io/collection/the-fools-2" target="noopener">Opensea</a>
          </div>
          <div className="text coopyr">© 2021-2022 The Fools | All Rights Reserved</div>
        </div>
      </div>
    </div>
  </div>
  <div className="popup-section menu-section menu-wrap" id="js-menu-popup">
    <div className="popup-section-wrap">
      <div className="tiles">
        <div className="tiles__line">
          <div className="tiles__line-img tiles__line-img--large" style={{backgroundImage: 'url(img/menu/img.png)'}} />
          <div className="tiles__line-img" ></div>  <img src={menu} alt=""   /> 
          <div className="tiles__line-img" ></div><img src={menu} alt="" /> 
          <div className="tiles__line-img tiles__line-img--large"></div><img src={menu} alt=""   />
          <div className="tiles__line-img" ></div><img src={menu-1} alt="" />
          <div className="tiles__line-img" ></div><img src={menu} alt="" />
          <div className="tiles__line-img" ></div><img src={menu} alt="" />
          <div className="tiles__line-img" ></div><img src={menu} alt="" />
        </div>
        <div className="tiles__line">
          <div className="tiles__line-img" ></div><img src={menu-7} alt="a" />
          <div className="tiles__line-img" ></div><img src={menu-8} alt="" />
          <div className="tiles__line-img tiles__line-img--large" style={{backgroundImage: 'url(img/menu/img-6.png)'}} />
          <div className="tiles__line-img" style={{backgroundImage: 'url(img/menu/img-7.png)'}} />
          <div className="tiles__line-img" style={{backgroundImage: 'url(img/menu/img-4.png)'}} />
          <div className="tiles__line-img tiles__line-img--large" style={{backgroundImage: 'url(img/menu/img-5.png)'}} />
          <div className="tiles__line-img" style={{backgroundImage: 'url(img/menu/img-6.png)'}} />
          <div className="tiles__line-img" style={{backgroundImage: 'url(img/menu/img-7.png)'}} />
        </div>
        <div className="tiles__line">
          <div className="tiles__line-img" style={{backgroundImage: 'url(img/menu/img-8.png)'}} />
          <div className="tiles__line-img tiles__line-img--large" style={{backgroundImage: 'url(img/menu/img-9.png)'}} />
          <div className="tiles__line-img" style={{backgroundImage: 'url(img/menu/img-10.png)'}} />
          <div className="tiles__line-img" style={{backgroundImage: 'url(img/menu/img-11.png)'}} />
          <div className="tiles__line-img tiles__line-img--large" style={{backgroundImage: 'url(img/menu/img-8.png)'}} />
          <div className="tiles__line-img" style={{backgroundImage: 'url(img/menu/img-9.png)'}} />
          <div className="tiles__line-img" style={{backgroundImage: 'url(img/menu/img-10.png)'}} />
          <div className="tiles__line-img" style={{backgroundImage: 'url(img/menu/img-11.png)'}} />
        </div>
      </div>
    </div>
    
    <div className="popup-section-inner">
    <div className="popup-close js-popup-close button-close">close</div>
      <ul>
        <li><a href="https://opensea.io/collection/the-fools-2" target="noopener">Opensea</a></li>
        <li><a href="https://discord.gg/" target="noopener">Discord</a></li>
        
        <li><a href="https://twitter.com" target="noopener">Twitter</a></li>
        <li><a href=".roadmap" className="js-anchor in-menu">Roadmap</a></li>
      </ul>
    </div>
  </div>
</div>
 
 )
}
}

export default Home;