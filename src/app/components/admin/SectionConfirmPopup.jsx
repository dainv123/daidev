import React from 'react'

function ConfirmPopup({ confirm }) {
    return (
        <div className="modal fade" id="confirmModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Ready to Continue?</h5>
                        <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" type="button" data-dismiss="modal">No</button>
                        <button onClick={confirm} className="btn btn-primary">Yes</button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export const SectionConfirmPopup = ConfirmPopup;
