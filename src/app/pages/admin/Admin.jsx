import React from 'react'
import { LayoutAdmin } from '../../layouts/Admin'
import { SectionHome } from '../../components/admin/SectionHome'
// import { connect } from 'react-redux'
// import * as mutations from '../store/mutations'

function Admin (props) {
    return (
        <LayoutAdmin>
            <SectionHome></SectionHome>
        </LayoutAdmin>
    );
}

// const mapStateToProps = ({ users }) => ({ users });

// const mapDispatchToProps = dispatch => ({
//     auth() {
//         dispatch(mutations.auth());
//     }
// })

// export const ConnectedAdmin = connect(mapStateToProps, mapDispatchToProps)(Admin);

export const ConnectedAdmin = Admin;