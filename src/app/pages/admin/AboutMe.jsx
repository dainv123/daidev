import React from 'react'
import { LayoutAdmin } from '../../layouts/Admin'
import { SectionAboutMe } from '../../components/admin/SectionAboutMe'

function AboutMe (props) {
    return (
        <LayoutAdmin>
            <SectionAboutMe></SectionAboutMe>
        </LayoutAdmin>
    );
}

export const ConnectedAboutMe = AboutMe;