import React from 'react'

function ConfirmPopup({ confirm }) {
    return (
        <div class="modal fade" id="confirmModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Ready to Continue?</h5>
                        <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" type="button" data-dismiss="modal">No</button>
                        <button onClick={confirm} class="btn btn-primary">Yes</button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export const SectionConfirmPopup = ConfirmPopup;
