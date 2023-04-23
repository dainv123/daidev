import React from 'react'
import { connect } from 'react-redux'
import * as mutations from '../../store/mutations'

function LogoutPopup({ logout }) {
    return (
        <div class="modal fade" id="logoutModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                        <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                        <button onClick={logout} class="btn btn-primary" >Logout</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({ }) => ({});

const mapDispatchToProps = dispatch => ({
    logout() {
        // evt.preventDefault();
        console.log(11);
        dispatch(mutations.logout())
    }
})

export const SectionLogoutPopup = connect(mapStateToProps, mapDispatchToProps)(LogoutPopup);


// export const SectionLogoutPopup = LogoutPopup;