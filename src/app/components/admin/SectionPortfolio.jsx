import React from 'react'

function Portfolio() {
    return (
        <div class="row ml-4 mr-4">
            <div class="col-sm-12 mb-4">
                <div class="card">
                    <div class="card-body">
                        <h3>Configuration</h3>
                        <div class="form-group">
                            <label for="title">Title</label>
                            <input type="text" class="form-control" id="title" placeholder="PORTFOLIO" />
                        </div>
                        <div class="form-group">
                            <label for="sub-title">Sub Title</label>
                            <input type="text" class="form-control" id="sub-title" placeholder="SAMPLES OF SOME OF MY WORK FROM THE PAST YEAR." />
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="card">
                    <div class="card-body">
                        <h3>Website</h3>
                        {/* ONE ITEM */}
                        <div class="form-group">
                            <label for="web-title">Title</label>
                            <input type="text" class="form-control" id="web-title" placeholder="Project Name" />
                        </div>
                        <div class="form-group">
                            <label for="web-description">Description</label>
                            <textarea class="form-control" id="web-description" rows="3"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="web-date">Link</label>
                            <input type="text" class="form-control" id="web-date" placeholder="" />
                        </div>
                        {/* ONE IMAGE */}
                        <div class="form-group">
                            <label for="web-image">Image</label>
                            <input type="file" class="form-control-file" id="web-image" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="card">
                    <div class="card-body">
                        <h3>Mobile</h3>
                        {/* ONE ITEM */}
                        <div class="form-group">
                            <label for="mb-title">Title</label>
                            <input type="text" class="form-control" id="mb-title" placeholder="Project Name" />
                        </div>
                        <div class="form-group">
                            <label for="mb-description">Description</label>
                            <textarea class="form-control" id="mb-description" rows="3"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="mb-date">Link</label>
                            <input type="text" class="form-control" id="mb-date" placeholder="" />
                        </div>
                        {/* ONE IMAGE */}
                        <div class="form-group">
                            <label for="mb-image">Image</label>
                            <input type="file" class="form-control-file" id="mb-image" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export const SectionPortfolio = Portfolio;