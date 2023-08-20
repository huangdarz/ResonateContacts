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
import { Globe, Mail, Phone } from "lucide-react"
import { useState } from "react"

export function ContactsComp({ contacts } : ContactsListProp) {
    const [detailContact, setDetailContact] = useState(contacts[0]);
  
    return (
      <div className="flex flex-row">
        <div className='basis-2/3'>
          <ScrollArea className="h-[80vh] m-2">
            {contacts.map((contact) => (
              <>
                <Card onClick={() => setDetailContact(contact)} className="m-1 align-middle flex flex-row gap-4 hover:bg-accent hover:text-accent-foreground">
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
              </>
            ))}
          </ScrollArea>
        </div>
        <div className='basis-1/3'>
          <ContactDetails {...detailContact}/>
          <p>{detailContact.name}</p>
        </div>
      </div>
    )
}
  
function ContactDetails(contact : Contact) {
    
    return (
      <Card className="m-2">
        <CardHeader>
          <CardTitle>Details</CardTitle>
        </CardHeader>
        <CardContent>
          <img src='https://static.vecteezy.com/system/resources/previews/005/228/939/original/avatar-man-face-silhouette-user-sign-person-profile-picture-male-icon-black-color-illustration-flat-style-image-vector.jpg' width={400}/>
          <p>{contact.name}</p>
        </CardContent>
      </Card>
    )
}