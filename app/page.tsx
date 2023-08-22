import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Contact } from "../types/contact"
import { ContactsComp } from "./contacts"
import Image from "next/image"
import logo from './resonate-horizontal-color.webp'



export default async function Home() {
  
  async function getContacts() : Promise<Contact[]> {
    const res = await fetch('https://jsonplaceholder.typicode.com/users')

    if (!res.ok) {
      throw new Error('Failed to fetch contacts')
    }

    return res.json()
  }

  const contacts = await getContacts();

  return (
    <div className="flex flex-col h-screen bg-secondary">
      <div className="flex flex-row p-8 bg-primary text-white">
        <div className="bg-white rounded-lg pl-3 pr-3 pt-3 mr-4">
          <Image src={logo} width={200} height={100} alt={""}/>
        </div>
        <div className="flex-auto text-6xl font-medium">
          <h1>Contacts</h1>
        </div>
        <div className="text-xl mt-5 mr-2 hover:underline">
          <label className="cursor-pointer">Darin H</label>
        </div>
        <div className="mt-3 text-end ml-2">
          <Avatar className="mb-0">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback> 
          </Avatar>
        </div>
      </div>
      <ContactsComp contacts={contacts}/>
    </div>
  )
}



