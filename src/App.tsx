import { useState, useEffect } from 'react';
import './App.css';
import { AgentData, Cargo, Inventory } from './types';
import Fleet from './components/Fleet';

const initialFleetData = {
  cargo: {capacity: 0, inventory: [], units: 0}, shipData: null, symbol: ""
}

const [fleetData, setFleetData] = useState(initialFleetData);

const options = {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWVyIjoiUFVSUExFX0pFTExZIiwiaWF0IjoxNjgzNjczNTQ3LCJzdWIiOiJhZ2VudC10b2tlbiJ9.TuO2BcA7o-0XYpQbwsQmreYDj2ODtailPhtO2PBO2dokqe_glvIajMSIE__L4eCaFLPn4B94B8RaTBUxEafFdurNhNsTZwXpYturI_jrzr1UtP2Nxz99SH_TIUGLuawqXsow0ohl6szHBSF1ihBzziY576Wy5Ah7GKuhYbsFw-MR9qLzmtWd-fO0bCqW4PRg-B8JyG__-ohV9Jka4lPhAsmupu7ujjsCGxahbzg2Tsyt5LAO_nyIAoi1BdJzBDP17UZf3FcviAqIxgFKKClDAfwLF9W_wAg_-FNNscy-mkBDGqO2CTtcCaw5AV_fAqgJrHngcZqmzwGis9KQRsrxG-PPwWwU9uo3yGJQSw1THRuYdA68Woq0gqilrP18Y0Je0UyVP3cI5598bG34cwgdOwZHcGhsA1fxJgf7zUgeV9JutOd5s57a641digRDB9FZvBIBTDKHzkbXaUNgdid2ZxsdqdCsR2DE5ifqOBVGJbwY_nr9u-JhcEjM08zXKAfs'
  },
};

const postOptions = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWVyIjoiUFVSUExFX0pFTExZIiwiaWF0IjoxNjgzNjczNTQ3LCJzdWIiOiJhZ2VudC10b2tlbiJ9.TuO2BcA7o-0XYpQbwsQmreYDj2ODtailPhtO2PBO2dokqe_glvIajMSIE__L4eCaFLPn4B94B8RaTBUxEafFdurNhNsTZwXpYturI_jrzr1UtP2Nxz99SH_TIUGLuawqXsow0ohl6szHBSF1ihBzziY576Wy5Ah7GKuhYbsFw-MR9qLzmtWd-fO0bCqW4PRg-B8JyG__-ohV9Jka4lPhAsmupu7ujjsCGxahbzg2Tsyt5LAO_nyIAoi1BdJzBDP17UZf3FcviAqIxgFKKClDAfwLF9W_wAg_-FNNscy-mkBDGqO2CTtcCaw5AV_fAqgJrHngcZqmzwGis9KQRsrxG-PPwWwU9uo3yGJQSw1THRuYdA68Woq0gqilrP18Y0Je0UyVP3cI5598bG34cwgdOwZHcGhsA1fxJgf7zUgeV9JutOd5s57a641digRDB9FZvBIBTDKHzkbXaUNgdid2ZxsdqdCsR2DE5ifqOBVGJbwY_nr9u-JhcEjM08zXKAfs'
  },
};

function getAgentData<AgentData>(): Promise<AgentData> {
  return fetch('https://api.spacetraders.io/v2/my/agent', options)
  .then(response => response.json())
  .then(response => {
    return response.data as AgentData;
  });
}

function getShipData(): Promise<any> {
  return fetch('https://api.spacetraders.io/v2/my/ships', options)
  .then(response => response.json())
  .then(response => {
    console.log(response.data);
    //setFleetData(response.)
    return response.data;
  });
}

// extract the ore
async function extractOre(): Promise<any> {
  fetch('https://api.spacetraders.io/v2/my/ships/PURPLE_JELLY-2/extract', postOptions)
  .then(response => response.json())
  .then(response => {
    console.log(response);
  });
}

// once full, get cargo list. check if only item is contract item
function getCargo<Cargo>(): Promise<Cargo> {
  return fetch('https://api.spacetraders.io/v2/my/ships/PURPLE_JELLY-2', options)
  .then(response => response.json())
  .then(response => {
    console.log(response.data.cargo);
    return response.data.cargo as Cargo;
  });
}

// dock ship
async function dockShip(): Promise<any> {
  fetch('https://api.spacetraders.io/v2/my/ships/PURPLE_JELLY-2/dock', postOptions)
  .then(response => response.json())
  .then(response => {
    console.log(response);
  });
}

// for everything in list, except contract item (aluminum ore), sell it
const initialCargo: Cargo = {
  capacity: 0,
  inventory: [],
  units: 0,
}


// orbit ship
function orbitShip() {
  fetch('https://api.spacetraders.io/v2/my/ships/PURPLE_JELLY-2/orbit', postOptions)
  .then(response => response.json())
  .then(response => {
    console.log(response);
  });
}

// once full on contract item (maybe ~25/30) go to delivery waypoint

// deliver contract goods

// go back to asteroid (and repeat)
function navigateToAsteroid() {
  const navigateOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWVyIjoiUFVSUExFX0pFTExZIiwiaWF0IjoxNjgzNjczNTQ3LCJzdWIiOiJhZ2VudC10b2tlbiJ9.TuO2BcA7o-0XYpQbwsQmreYDj2ODtailPhtO2PBO2dokqe_glvIajMSIE__L4eCaFLPn4B94B8RaTBUxEafFdurNhNsTZwXpYturI_jrzr1UtP2Nxz99SH_TIUGLuawqXsow0ohl6szHBSF1ihBzziY576Wy5Ah7GKuhYbsFw-MR9qLzmtWd-fO0bCqW4PRg-B8JyG__-ohV9Jka4lPhAsmupu7ujjsCGxahbzg2Tsyt5LAO_nyIAoi1BdJzBDP17UZf3FcviAqIxgFKKClDAfwLF9W_wAg_-FNNscy-mkBDGqO2CTtcCaw5AV_fAqgJrHngcZqmzwGis9KQRsrxG-PPwWwU9uo3yGJQSw1THRuYdA68Woq0gqilrP18Y0Je0UyVP3cI5598bG34cwgdOwZHcGhsA1fxJgf7zUgeV9JutOd5s57a641digRDB9FZvBIBTDKHzkbXaUNgdid2ZxsdqdCsR2DE5ifqOBVGJbwY_nr9u-JhcEjM08zXKAfs'
    },
    body: JSON.stringify({
      waypointSymbol: "X1-DF55-17335A",
    }),
  };

  fetch('https://api.spacetraders.io/v2/my/ships/PURPLE_JELLY-2/navigate', navigateOptions)
  .then(response => response.json())
  .then(response => {
    console.log(response);
  });
}

// refuel
function refuel() {
  fetch('https://api.spacetraders.io/v2/my/ships/PURPLE_JELLY-2/refuel', postOptions)
  .then(response => response.json())
  .then(response => {
    console.log(response);
  });
}

// contract list
function getCurrentContracts() {
  return fetch('https://api.spacetraders.io/v2/my/contracts', options)
  .then(response => response.json())
  .then(response => {
    console.log(response.data);
  });
}

const initialAgentData: AgentData = {
  accountId: "",
  symbol: "",
  headquarters: "",
  credits: 0,
}

function App() {
  //const data: AgentData = getAgentData();
  const [agentData, setAgentData] = useState(initialAgentData);
  

  async function handleClick() {
  setAgentData(await getAgentData());
  console.log(agentData);
  getCargo();
  }

  // for everything in list, except contract item (aluminum ore), sell it
  async function sellAllButContractItem(): Promise<any> {
  const cargo: Cargo = await getCargo();
  const itemsToSell: Inventory[] = cargo.inventory.filter(item => item.symbol !== "ALUMINUM_ORE");
  console.log(itemsToSell);
  
  // Need to figure out how to pause between requests, otherwise get a 409 error
    itemsToSell.forEach(async item => {
      sellItem(item.symbol, item.units);
    });
  }

  return (
    <div className="App">
        <div className="button-group">
        <button onClick={handleClick}> Get Agent Data</button>
        <button onClick={getShipData}>Get Ship Data</button>
        <button onClick={getCargo}>Get Cargo</button>
        <button onClick={extractOreOnClick}> Extract Ore</button>
        <button onClick={dockShip}>Dock Ship</button>
        <button onClick={sellAllButContractItem}>Sell all but contract items</button>
        <button onClick={orbitShip}> Orbit Ship</button>
        <button onClick={navigateToAsteroid}>Go to asteroid</button>
        <button onClick={refuel}>Refuel</button>
        <button onClick={getCurrentContracts}>Get current contracts</button>
      </div>
      <Fleet cargo={fleetData.cargo} symbol={fleetData.symbol} />
    </div>
  );
}

function extractOreOnClick() {
  extractOre();
}

async function sellItem(itemSymbol: string, units: number) {
  const sellOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWVyIjoiUFVSUExFX0pFTExZIiwiaWF0IjoxNjgzNjczNTQ3LCJzdWIiOiJhZ2VudC10b2tlbiJ9.TuO2BcA7o-0XYpQbwsQmreYDj2ODtailPhtO2PBO2dokqe_glvIajMSIE__L4eCaFLPn4B94B8RaTBUxEafFdurNhNsTZwXpYturI_jrzr1UtP2Nxz99SH_TIUGLuawqXsow0ohl6szHBSF1ihBzziY576Wy5Ah7GKuhYbsFw-MR9qLzmtWd-fO0bCqW4PRg-B8JyG__-ohV9Jka4lPhAsmupu7ujjsCGxahbzg2Tsyt5LAO_nyIAoi1BdJzBDP17UZf3FcviAqIxgFKKClDAfwLF9W_wAg_-FNNscy-mkBDGqO2CTtcCaw5AV_fAqgJrHngcZqmzwGis9KQRsrxG-PPwWwU9uo3yGJQSw1THRuYdA68Woq0gqilrP18Y0Je0UyVP3cI5598bG34cwgdOwZHcGhsA1fxJgf7zUgeV9JutOd5s57a641digRDB9FZvBIBTDKHzkbXaUNgdid2ZxsdqdCsR2DE5ifqOBVGJbwY_nr9u-JhcEjM08zXKAfs'
    },
    body: JSON.stringify({
      symbol: itemSymbol,
      units: units,
    }),
  };

  fetch('https://api.spacetraders.io/v2/my/ships/PURPLE_JELLY-2/sell', sellOptions)
  .then(response => response.json())
  .then(response => {
    console.log(response);
  });
}

export default App;
