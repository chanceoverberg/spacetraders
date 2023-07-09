import { FunctionComponent, useEffect, useState } from "react";
import { ContractData } from "../types/index";
import getOptions from "../getOptions";
import postOptions from "../postOptions";

const initialContractData: ContractData[] = [{
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

  async function getContractData<ContractData>(): Promise<ContractData> {
    const response = await fetch(`https://api.spacetraders.io/v2/my/contracts`, getOptions);
    const response_1 = await response.json();
    console.log(response_1.data);
    return response_1.data as ContractData;
  }

  async function acceptContract(contractID: string) {
    const response = await fetch(`https://api.spacetraders.io/v2/my/contracts/${contractID}/accept`, postOptions);
    const response_1 = await response.json();
    console.log(response_1.data);
  }

const ContractCard: FunctionComponent = () => {

    const [contractData, setContractData] = useState(initialContractData);

    async function getContractDataOnLoad() {
        setContractData(await getContractData());
    }

    useEffect(() => {
        getContractDataOnLoad();
    },[]); 

    return (
        <div className="card">
            <h1>Contracts:</h1>
            {contractData.map((contract, index) => {
                return (
                <div key={index}>
                    <h2>Contract {index+1} ({contract.factionSymbol}):</h2>
                    <p>Accepted: {contract.accepted.toString()} | Expiration: {contract.expiration}</p>
                    <h3>Terms:</h3>
                    <ul>
                        <li>Deadline: {contract.terms.deadline}</li>
                        <li>On Accepted: {contract.terms.payment.onAccepted}</li>
                        <li>On Fulfilled: {contract.terms.payment.onFulfilled}</li>
                    </ul>
                    <h4>Delivery requirements:</h4>
                    <ul>
                        {contract.terms.deliver ? contract.terms.deliver.map((req, reqIndex) => {
                            return (
                                <div key={reqIndex+100}>
                                    <li>Delivery destination: {req.destinationSymbol}</li>
                                    <li>Item: {req.tradeSymbol.toLowerCase()} ({contract.type.toLowerCase()})</li>
                                    <li>Units required: {req.unitsRequired}</li>
                                    <li>Units fulfilled: {req.unitsFulfilled}</li>
                                </div>
                            )}) : null}
                    </ul>
                    {!contract.accepted ? <button className="accept-button" onClick={() => acceptContract(contract.id)}>Accept Contract</button> : null}
                </div>);
            })}
        </div>
    );
}

export default ContractCard;