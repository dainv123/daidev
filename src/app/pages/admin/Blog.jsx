import React from 'react'
import { LayoutAdmin } from '../../layouts/Admin'
import { SectionBlog } from '../../components/admin/SectionBlog'

function Blog (props) {
    return (
        <LayoutAdmin>
            <SectionBlog></SectionBlog>
        </LayoutAdmin>
    );
}

export const ConnectedBlog = Blog;