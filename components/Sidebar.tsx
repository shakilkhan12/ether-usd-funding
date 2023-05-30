import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useContractContext } from "@/context/Provider"
import { ethers } from "ethers"
import { ChangeEvent, useState } from "react"

export default function Sidebar() {
  const {state: {price, contract}} = useContractContext();
  console.log(Number(price))
  const [state, setState] = useState({
    amount: 0,
    name: ''
  })
  const onChange = (e:ChangeEvent<HTMLInputElement>) => {
     setState({...state, [e.target.name]: e.target.value})
  }
  
  const createDonation = async () => {
    try {
      const data = await contract?.call("donate", [state.name],{
        value: ethers.utils.parseEther(state.amount.toString())
      })
      console.log('contract response => ', data)
      
    } catch (err) {
      console.error("contract call failure", err);
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="default">Donate</Button>
      </SheetTrigger>
      <SheetContent position="left" size="sm">
        <SheetHeader>
          <SheetTitle>Donate</SheetTitle>
          <SheetDescription>
            Fill out the below form for donation, and help the poor families
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-6">
          <div className="">
            <Label htmlFor="name" className="mb-1.5 block">
              ETH Amount
            </Label>
            <Input id="name" value={state.amount} name="amount" onChange={onChange} className="col-span-3" placeholder="ETH amount" />
            {state.amount && <span className="block mt-1.5 font-medium text-sm">${state.amount * parseFloat((Number(price)).toFixed(2))}</span>}
            
          </div>
          <div className="mt-2">
            <Label htmlFor="username" className="block mb-1.5">
              Name
            </Label>
            <Input id="username" name="name" value={state.name} onChange={onChange} className="col-span-3" placeholder="Name eg. Shakil Khan" />
          </div>
        </div>
        <SheetFooter>
          <Button type="submit" onClick={createDonation}>Save Donation</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
