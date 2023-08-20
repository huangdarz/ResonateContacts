import { Contact } from "../types/contact"
import { ContactsComp } from "./contacts"



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
    <div className="flex flex-col">
      <div className="text-6xl font-medium m-8">
        <h1>Contacts</h1>
      </div>
      <ContactsComp contacts={contacts}/>
    </div>
  )
}



