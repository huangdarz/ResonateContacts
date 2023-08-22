'use client'

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
import { Briefcase, Globe, Mail, MapIcon, Phone } from "lucide-react"
import { useRef, useState } from "react"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

import profilePic from './profile-icon-design-free-vector.jpg'
import { Separator } from "@/components/ui/separator"

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

    const letters = new Set<string>();
    const badgeRefs = new Map();
    const scrollRefs = useRef<HTMLDivElement[]>([]);

    let i = 0;

    let firstLetter = contactsState[0].name.slice(0, 1);
    const contactGroupLetter = [];
    let group = [];
    for (const contact of contactsState) {
      if (!contact.name.startsWith(firstLetter)) {
        badgeRefs.set(firstLetter, i);
        const letter = contact.name.slice(0, 1).toUpperCase();
        contactGroupLetter.push((
          <div className="relative">
            <div className="flex flex-row sticky top-0 bg-secondary z-10" key={i} ref={ref => scrollRefs.current.push(ref!)}>
              <Badge className="w-8 ml-2 mt-4 mb-4">
                {firstLetter}
              </Badge>
              <Separator className="mt-[26px] ml-4"/>
            </div>
            {group}
          </div>
        ));
        i++;
        letters.add(firstLetter);
        group = []
        firstLetter = letter;
      } 
      group.push((
        <div onClick={() => setDetailContact(contact)} className="cursor-pointer">
          <ContactCard {...contact}/>
        </div>
      ));
    }
    if (group.length > 0) {
      badgeRefs.set(firstLetter, i);
      
      contactGroupLetter.push((
        <div className="relative">
          <div className="sticky top-0 bg-secondary z-10" key={i} ref={ref => scrollRefs.current.push(ref!)}>
            <Badge className="w-8 ml-2 mt-4 mb-4">
              {firstLetter}
            </Badge>
          </div>
          {group}
        </div>
      ));
      i++;
    }

    const scrollToLetter = (letter: string) => {
      scrollRefs.current[badgeRefs.get(letter)].scrollIntoView({behavior: 'smooth'})
    }

    return (
      <div className="flex flex-row">
        <div className="basis-2/3 flex flex-col">
          <div className="flex flex-row gap-4 mt-8 ml-8 mr-8">
            {Array.from(letters).map((ele) => (
              <div key={ele} className="text-center flex-grow border rounded-lg bg-card cursor-pointer hover:bg-accent hover:text-accent-foreground shadow-sm"
                onClick={() => scrollToLetter(ele)}
              >
                {ele}
              </div>
            ))}
          </div>
          <div className='flex-grow'>
            <div className="h-[75vh] m-2 overflow-auto relative">
              {contactGroupLetter}
            </div>
          </div>
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
        <Avatar className="mt-1 z-0">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback> 
        </Avatar>
        <div className="flex flex-col">
          <CardTitle className="font-normal">{contact.name}</CardTitle>
          <CardDescription>{contact.company.name}</CardDescription>
        </div>
      </CardHeader>
      <Button variant='default' className="text-end mt-7 shadow">
        <a href={`tel:${contact.phone}`}>
          <Phone/>
        </a>
      </Button>
      <Button variant='default' className="text-end mt-7 shadow">
        <a href={`mailto:${contact.email}`}>
          <Mail/>
        </a>
      </Button>
      <Button variant='default' className="text-end mt-7 mr-10 shadow">
        <a href={`https://www.${contact.website}`}>
          <Globe/>
        </a>
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
              <MapIcon className="mr-3"/>
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