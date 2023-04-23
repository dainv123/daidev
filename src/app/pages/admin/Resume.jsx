import React from 'react'
import { LayoutAdmin } from '../../layouts/Admin'
import { SectionResume } from '../../components/admin/SectionResume'

function Resume (props) {
    return (
        <LayoutAdmin>
            <SectionResume></SectionResume>
        </LayoutAdmin>
    );
}

export const ConnectedResume = Resume;