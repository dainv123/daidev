import React from 'react'

function Portfolio() {
    return (
        <div className="row ml-4 mr-4">
            <div className="col-sm-12 mb-4">
                <div className="card">
                    <div className="card-body">
                        <h3>Configuration</h3>
                        <div className="form-group">
                            <label for="title">Title</label>
                            <input type="text" className="form-control" id="title" placeholder="PORTFOLIO" />
                        </div>
                        <div className="form-group">
                            <label for="sub-title">Sub Title</label>
                            <input type="text" className="form-control" id="sub-title" placeholder="SAMPLES OF SOME OF MY WORK FROM THE PAST YEAR." />
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-sm-6">
                <div className="card">
                    <div className="card-body">
                        <h3>Website</h3>
                        {/* ONE ITEM */}
                        <div className="form-group">
                            <label for="web-title">Title</label>
                            <input type="text" className="form-control" id="web-title" placeholder="Project Name" />
                        </div>
                        <div className="form-group">
                            <label for="web-description">Description</label>
                            <textarea className="form-control" id="web-description" rows="3"></textarea>
                        </div>
                        <div className="form-group">
                            <label for="web-date">Link</label>
                            <input type="text" className="form-control" id="web-date" placeholder="" />
                        </div>
                        {/* ONE IMAGE */}
                        <div className="form-group">
                            <label for="web-image">Image</label>
                            <input type="file" className="form-control-file" id="web-image" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-sm-6">
                <div className="card">
                    <div className="card-body">
                        <h3>Mobile</h3>
                        {/* ONE ITEM */}
                        <div className="form-group">
                            <label for="mb-title">Title</label>
                            <input type="text" className="form-control" id="mb-title" placeholder="Project Name" />
                        </div>
                        <div className="form-group">
                            <label for="mb-description">Description</label>
                            <textarea className="form-control" id="mb-description" rows="3"></textarea>
                        </div>
                        <div className="form-group">
                            <label for="mb-date">Link</label>
                            <input type="text" className="form-control" id="mb-date" placeholder="" />
                        </div>
                        {/* ONE IMAGE */}
                        <div className="form-group">
                            <label for="mb-image">Image</label>
                            <input type="file" className="form-control-file" id="mb-image" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export const SectionPortfolio = Portfolio;