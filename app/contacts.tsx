'use client'

import { ScrollArea } from "@/components/ui/scroll-area"
import { Contact, ContactsListProp } from "../types/contact"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Briefcase, Globe, Mail, Map, Phone } from "lucide-react"
import { MouseEventHandler, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"

import profilePic from './profile-icon-design-free-vector.jpg'

export function ContactsComp({ contacts } : ContactsListProp) {
    const [contactsState, setContactsState] = useState(contacts);

    contacts.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    })

    const [detailContact, setDetailContact] = useState(contacts[0]);

    let prevLetter = '$';
    const contactGroups = []
    for (const contact of contactsState) {
      const letter = contact.name.slice(0, 1).toUpperCase();
      if (!contact.name.startsWith(prevLetter)) {
        contactGroups.push((
          <Badge className="w-8 ml-2 mt-4">
            {letter}
          </Badge>
        ))
      }
      contactGroups.push((
        <div onClick={() => setDetailContact(contact)}>
          <ContactCard {...contact}/>
        </div>
      ))
      prevLetter = letter
    }

    return (
      <div className="flex flex-row">
        <div className='basis-2/3'>
          <ScrollArea className="h-[80vh] m-2">
            {contactGroups.map((ele) => (
              <div className="flex flex-col">
                {ele}
              </div>
            ))}
          </ScrollArea>
        </div>
        <div className='basis-1/3'>
          <ContactDetails {...detailContact}/>
        </div>
      </div>
    )
}


function ContactCard(contact: Contact) {
  return (
    <Card className="m-1 align-middle flex flex-row gap-4 hover:bg-accent hover:text-accent-foreground shadow-md">
      <CardHeader className="flex flex-row gap-4 flex-grow">
        <Avatar className="mt-1">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback> 
        </Avatar>
        <div className="flex flex-col">
          <CardTitle className="font-normal">{contact.name}</CardTitle>
          <CardDescription>{contact.company.name}</CardDescription>
        </div>
      </CardHeader>
      <Button variant='default' className="text-end mt-7">
        <Phone/>
      </Button>
      <Button variant='default' className="text-end mt-7">
        <Mail/>
      </Button>
      <Button variant='default' className="text-end mt-7 mr-10">
        <Globe/>
      </Button>
    </Card>
  );
}
  
function ContactDetails(contact : Contact) {
    
    return (
      <Card className="m-2 shadow-md">
        <CardHeader>
          <CardTitle className="font-normal">Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center m-auto flex justify-center">
            <Image src={profilePic} width={300} height={300} alt={""}/>
          </div>
          <div className="flex flex-col m-1 gap-2">
            <div className="flex flex-col mb-2">
              <label className="text-xl">
                {contact.name}
              </label>
              <label className="">
                @{contact.username}
              </label>
            </div>
            <label>
              <Phone className="inline mr-3"/>
              {contact.phone}
            </label>
            <label>
              <Mail className="inline mr-3"/>
              {contact.email}
            </label>
            <label>
              <Globe className="inline mr-3"/>
              {contact.website}
            </label>
            <label>
              <Briefcase className="inline mr-3"/>
              {contact.company.name}
            </label>
            <div className="flex flex-row">
              <Map className="mr-3"/>
              <div className="flex flex-col">
                <div>{contact.address.suite}</div>
                <div>{contact.address.street}</div>
                <div>{contact.address.city}</div>
                <div>{contact.address.zipcode}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
}