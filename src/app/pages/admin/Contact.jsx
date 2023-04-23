import React from 'react'
import { LayoutAdmin } from '../../layouts/Admin'
import { SectionContact } from '../../components/admin/SectionContact'

function Contact (props) {
    return (
        <LayoutAdmin>
            <SectionContact></SectionContact>
        </LayoutAdmin>
    );
}

export const ConnectedContact = Contact;