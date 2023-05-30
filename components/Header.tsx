import Loader from "./Loader";
import Image from "next/image";
import currency from "currency-formatter"
import { useContractContext } from "@/context/Provider";
const Header = () => {
  const {state: {contract, loading, price}} = useContractContext(); 
  return (
    <header className="border p-5 rounded">
      {loading ? <Loader /> : <div>
        <div className="flex items-center space-x-2">
          <div className="relative w-6 h-6 overflow-hidden">
            <Image src="/eth.png" fill className="w-full h-full object-contain rounded-full" alt="eth logo" />
          </div>
          <span className="block text-lg font-semibold text-black capitalize">ethereum</span>
          <span className="text-xs font-normal uppercase text-gray-500 block">eth</span>
        </div>
        <span className="text-[40px] font-bold text-black">{currency.format(Number(price), {code: 'USD'})}</span>
        </div>}
    </header>
  )
}

export default Header