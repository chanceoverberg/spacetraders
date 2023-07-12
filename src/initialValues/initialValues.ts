import { AgentData, ContractData, ShipData, SystemData, WaypointData } from "../types";


export const initialSystemData: SystemData = {
    systemSymbol: "",
    symbol: "",
    type: "",
    x: 0,
    y: 0,
    orbitals: [ {symbol: ""} ],
    traits: [ {symbol: "", name: "", description: ""} ],
    chart: { submittedBy: "", submittedOn: "" },
    faction: { symbol: "" } 
}

export const initialWaypointData: WaypointData[] = [{
    systemSymbol: "",
    symbol: "",
    type: "",
    x: 0,
    y: 0,
    orbitals: [{symbol: ""}],
    traits: [{symbol: "", name: "", description: ""}],
    chart: {submittedBy: "", submittedOn: ""},
    faction: {symbol: ""},
}]

export const initialContractData: ContractData[] = [{
    id: "",
    factionSymbol: "",
    type: "",
    terms: 
        { deadline: "", 
        deliver: [{ tradeSymbol: "", destinationSymbol: "", unitsRequired: 0, unitsFulfilled: 0 }],
        payment: { onAccepted: 0, onFulfilled: 0 } 
        },
    accepted: false,
    fulfilled: false,
    expiration: "",
    deadlineToAccept: "",
}]

export const initialAgentData: AgentData = {
    accountId: "",
    symbol: "",
    headquarters: "",
    credits: 0,
    startingFaction: ""
  }

  export const initialFleetData: ShipData[] = [
    {
        symbol: "",
        cargo: {
            capacity: 0,
            inventory: [{
                description: "",
                name: "",
                symbol: "",
                units: 0
            }],
            units: 0
        },
        fuel: {
            current: 0,
            capacity: 0,
            consumed: {
                amount: 0,
                timestamp: ""
            }
        },
        nav: {
            systemSymbol: "",
            waypointSymbol: "",
            route: {
                destination: {
                    symbol: "",
                    type: "",
                    systemSymbol: "",
                    x: 0,
                    y: 0
                },
                departure: {
                    symbol: "",
                    type: "",
                    systemSymbol: "",
                    x: 0,
                    y: 0
                },
                departureTime: "",
                arrival: ""
            },
            status: "",
            flightMode: ""
        }
    }
];