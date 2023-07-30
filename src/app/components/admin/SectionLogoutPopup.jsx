import React from 'react'
import { connect } from 'react-redux'
import * as mutations from '../../store/mutations'

function LogoutPopup({ logout }) {
    return (
        <div className="modal fade" id="logoutModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                        <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                        <button onClick={logout} className="btn btn-primary">Logout</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({ }) => ({});

const mapDispatchToProps = dispatch => ({
    logout() {
        dispatch(mutations.logout())
    }
})

export const SectionLogoutPopup = connect(mapStateToProps, mapDispatchToProps)(LogoutPopup);
