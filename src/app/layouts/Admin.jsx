import React, { useEffect } from 'react'
import useStyle from '../hooks/useStyle'
import useScript from '../hooks/useScript'
import { SectionTopbar } from '../components/admin/SectionTopbar'
import { SectionSidebar } from '../components/admin/SectionSidebar'
import { SectionLogoutPopup } from '../components/admin/SectionLogoutPopup'
import { connect } from 'react-redux'
import * as mutations from '../store/mutations'

function Layout(props) {
    const user = props.users[0] || {};
    useEffect(() => { props.auth() }, []);
    useStyle('https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i');
    useStyle('/assets_admin/vendor/fontawesome-free/css/all.min.css');
    useStyle('/assets_admin/css/sb-admin-2.min.css');
    useScript('/assets_admin/vendor/jquery/jquery.min.js');
    useScript('/assets_admin/vendor/bootstrap/js/bootstrap.bundle.min.js');
    useScript('/assets_admin/vendor/jquery-easing/jquery.easing.min.js');
    useScript('/assets_admin/js/sb-admin-2.min.js');

    return (
        <div id="admin-page">
            <div id="wrapper">
                <SectionSidebar />
                <div id="content-wrapper" class="d-flex flex-column">
                    <div id="content">
                        <SectionTopbar user="user" />
                        { props.children }
                    </div>
                </div>
                <SectionLogoutPopup />
            </div>
        </div>
    );
}

const mapStateToProps = ({ users }) => ({ users });

const mapDispatchToProps = dispatch => ({
    auth() {
        dispatch(mutations.auth());
    }
})

export const LayoutAdmin = connect(mapStateToProps, mapDispatchToProps)(Layout);

// export const LayoutAdmin = Layout;