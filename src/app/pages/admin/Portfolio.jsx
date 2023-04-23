import React from 'react'
import { LayoutAdmin } from '../../layouts/Admin'
import { SectionPortfolio } from '../../components/admin/SectionPortfolio'

function Portfolio (props) {
    return (
        <LayoutAdmin>
            <SectionPortfolio></SectionPortfolio>
        </LayoutAdmin>
    );
}

export const ConnectedPortfolio = Portfolio;