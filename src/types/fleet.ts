export interface AgentData {
    accountId: string
    symbol: string
    headquarters: string
    credits: number
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

  export interface ShipData {
    fuel: Fuel
    nav: Nav
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
    shipSymbol: string
    yield: Yield
  }

  export interface Yield {
    symbol: string
    units: number
  }

  export interface Cooldown {
    shipSymbol: string
    totalSeconds: number
    remainingSeconds: number
    expiration: string
  }

  export interface Transaction {
    waypointSymbol: string
    shipSymbol: string
    tradeSymbol: string
    type: string
    units: number
    pricePerUnit: number
    totalPrice: number
    timestamp: string
  }