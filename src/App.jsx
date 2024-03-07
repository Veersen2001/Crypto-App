import { useEffect, useState } from 'react'

import './App.css'
import axios from 'axios';
import Coins from './Coins';

function App() {
  const [coins,setCoins] = useState([]);
  const[search,setSearch] = useState('');

  useEffect(()=>{
     axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=market_cap_desc&per_page=100&page=1&sparkline=false')
      .then(res=>{
        setCoins(res.data);
        console.log(res.data);
      }) 
      .catch(error=>console.log("error"+error));
    
  },[])

    // searching

    const handleChange = e =>{
      setSearch(e.target.value);
    }

    // using filter for searching

  const filterCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  )



  return (
    
    <div className="coin-App">
       <div className="coin-search">
             <form action="">
               <input type="text" className='coin-input' placeholder='Search Coin' onChange={handleChange} />
             </form>
             
       </div>

       {filterCoins.map(coin=>{
        return(
          <Coins
            key={coin.id}
            name={coin.name}
            image={coin.image}
            symbol={coin.symbol}
            marketcap={coin.market_cap}
            price={coin.current_price}
            pricechange={coin.price_change_percentage_24h}
          />
        )
       })}
       
    </div> 

    
  )
}

export default App
