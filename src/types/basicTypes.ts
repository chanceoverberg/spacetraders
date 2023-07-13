export interface AgentData {
    accountId: string,
    symbol: string,
    headquarters: string,
    credits: number,
    startingFaction: string
  }

  export interface SystemData {
    systemSymbol: string,
    symbol: string,
    type: string,
    x: number,
    y: number,
    orbitals: [ {symbol: string} ],
    traits: [ {symbol: string, name: string, description: string} ],
    chart: { submittedBy: string, submittedOn: string },
    faction: { symbol: string }    
  }

  export interface ContractData {
    accepted: boolean,
    deadlineToAccept: string,
    expiration: string,
    factionSymbol: string,
    fulfilled: boolean,
    id: string,
    terms: { deadline: string, 
      deliver: [{ destinationSymbol: string, tradeSymbol: string, unitsFulfilled: number, unitsRequired: number }],
      payment: { onAccepted: number, onFulfilled: number } },
    type: string,
  }

  export interface FleetData{
    fleet: ShipData[]
  }

  export interface ShipData {
    symbol: string,
    cargo: Cargo,
    fuel: Fuel,
    nav: Nav
  }
  
  export interface Inventory {
    description: string,
    name: string,
    symbol: string,
    units: number,
  }
  
  export interface Cargo {
    capacity: number,
    inventory: Inventory[],
    units: number,
  }
  
  export interface Fuel {
    current: number
    capacity: number
    consumed: Consumed
  }
  
  export interface Consumed {
    amount: number
    timestamp: string
  }
  
  export interface Nav {
    systemSymbol: string
    waypointSymbol: string
    route: Route
    status: string
    flightMode: string
  }
  
  export interface Route {
    destination: Destination
    departure: Departure
    departureTime: string
    arrival: string
  }
  
  export interface Destination {
    symbol: string
    type: string
    systemSymbol: string
    x: number
    y: number
  }
  
  export interface Departure {
    symbol: string
    type: string
    systemSymbol: string
    x: number
    y: number
  }

  export interface Extraction {
    shipSymbol: string,
    yield: Yield,
  }

  export interface Yield {
    symbol: string,
    units: number
  }

  export interface Cooldown {
    shipSymbol: string,
    totalSeconds: number,
    remainingSeconds: number,
    expiration: string,
  }

  export interface Transaction {
    waypointSymbol: string,
    shipSymbol: string,
    tradeSymbol: string,
    type: string,
    units: number,
    pricePerUnit: number,
    totalPrice: number,
    timestamp: string,
  }

  export interface WaypointData {
    systemSymbol: string,
    symbol: string,
    type: string,
    x: number,
    y: number,
    orbitals: [{symbol: string}],
    traits: [{symbol: string, name: string, description: string}],
    chart: {submittedBy: string, submittedOn: string},
    faction: {symbol: string},
  }

  export interface RefuelData {
    agent: AgentData,
    fuel: Fuel,
    transaction: Transaction,
  }

export interface ExtractData {
  extraction: Extraction,
  cooldown: Cooldown,
  cargo: Cargo,
}