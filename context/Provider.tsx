import React, { createContext, ReactElement, useContext, useEffect, useState } from "react";
import { SmartContract, ThirdwebSDK } from "@thirdweb-dev/sdk";
import { BaseContract, ethers } from "ethers";
import { useContractRead } from "@thirdweb-dev/react";
import abi from "./abi.json"

interface StateType {
  contract?: SmartContract<BaseContract>;
  price: String;
  loading: boolean;
}
export const initState: StateType = { contract: undefined, price: '', loading: true };
export type UseContractContextType = { state: StateType };

const ContractContext = createContext<UseContractContextType>({ state: initState });
export const useContractContext = () => useContext(ContractContext);

type ChildrenType = { children?: ReactElement | ReactElement[] };

export const ContractProvider = ({ children }: ChildrenType) => {
  const [state, setState] = useState<StateType>(initState);
  const { data, isLoading } = useContractRead(state.contract, "getETHPrice")
  useEffect(() => {
    // Create wallet connection
    async function contractConnection() {
      const sdk = ThirdwebSDK.fromPrivateKey(`${process.env.NEXT_PUBLIC_PRIVATE_KEY}`, // Your wallet's private key (only required for write operations)
      "mumbai",
    );
    const contract = await sdk.getContractFromAbi(`${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}`, abi);
    setState({ ...state, contract })
    }
    contractConnection();
  }, []);
  useEffect(() => {
    if(!isLoading) {
      const response = ethers.utils.formatUnits(data, 18);
      setState({...state, price: response, loading: false})
    }
  }, [isLoading])

  return (
    <ContractContext.Provider value={{ state }}>
      {children}
    </ContractContext.Provider>
  );
};

export default ContractProvider;
