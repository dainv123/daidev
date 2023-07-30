import React from 'react'

function Resume() {
    return (
        <div className="row ml-4 mr-4">
            <div className="col-sm-12 mb-4">
                <div className="card">
                    <div className="card-body">
                        <h3>Configuration</h3>
                        <div className="form-group">
                            <label for="title">Title</label>
                            <input type="text" className="form-control" id="title" placeholder="RESUME" />
                        </div>
                        <div className="form-group">
                            <label for="sub-title">Sub Title</label>
                            <input type="text" className="form-control" id="sub-title" placeholder="ALL MY BACKGROUND" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-sm-6 mb-4">
                <div className="card">
                    <div className="card-body">
                        <h3>Work History</h3>
                        <div className="form-group">
                            <label for="professional-title">Title</label>
                            <input type="text" className="form-control" id="professional-title" placeholder="My Professional" />
                        </div>
                        <div className="form-group">
                            <label for="work-history">Sub Title</label>
                            <input type="text" className="form-control" id="work-history" placeholder="Work History" />
                        </div>
                        <div className="form-group">
                            <label for="download-button-name">Download Button Name</label>
                            <input type="text" className="form-control" id="download-button-name" placeholder="Download Resume" />
                        </div>
                        {/* ONE ITEM */}
                        <div className="form-group">
                            <label for="history-title">Title</label>
                            <input type="text" className="form-control" id="history-title" placeholder="DEVELOPER" />
                        </div>
                        <div className="form-group">
                            <label for="history-date">Date</label>
                            <input type="text" className="form-control" id="history-date" placeholder="Aug 2018 - Till Now" />
                        </div>
                        <div className="form-group">
                            <label for="history-description">Description</label>
                            <textarea className="form-control" id="history-description" rows="3"></textarea>
                        </div>
                        <div className="form-group">
                            <label for="history-image">Image</label>
                            <input type="file" className="form-control-file" id="history-image" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-sm-6 mb-4">
                <div className="card">
                    <div className="card-body">
                        <h3>Education</h3>
                        <div className="form-group">
                            <label for="professional-title">Title</label>
                            <input type="text" className="form-control" id="professional-title" placeholder="My Education" />
                        </div>
                        <div className="form-group">
                            <label for="work-history">Sub Title</label>
                            <input type="text" className="form-control" id="work-history" placeholder="Background History" />
                        </div>
                        {/* ONE ITEM */}
                        <div className="form-group">
                            <label for="history-title">Title</label>
                            <input type="text" className="form-control" id="history-title" placeholder="DEVELOPER" />
                        </div>
                        <div className="form-group">
                            <label for="history-date">Date</label>
                            <input type="text" className="form-control" id="history-date" placeholder="Aug 2018 - Till Now" />
                        </div>
                        <div className="form-group">
                            <label for="history-description">Description</label>
                            <textarea className="form-control" id="history-description" rows="3"></textarea>
                        </div>
                        <div className="form-group">
                            <label for="history-image">Image</label>
                            <input type="file" className="form-control-file" id="history-image" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-sm-6 mb-4">
                <div className="card">
                    <div className="card-body">
                        <h3>Work Skills</h3>
                        <div className="form-group">
                            <label for="professional-title">Title</label>
                            <input type="text" className="form-control" id="professional-title" placeholder="My Professional" />
                        </div>
                        <div className="form-group">
                            <label for="work-history">Sub Title</label>
                            <input type="text" className="form-control" id="work-history" placeholder="Work Skills" />
                        </div>
                        {/* ONE ITEM */}
                        <label>Skill(s)</label>
                        <div className="row">
                            <div className="form-group col-sm-6">
                                <input type="text" className="form-control" placeholder="Algorithm" />
                            </div>
                            <div className="form-group col-sm-6">
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="%" />
                                    <div className="input-group-append">
                                        <span className="input-group-text">%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-sm-6 mb-4">
                <div className="card">
                    <div className="card-body">
                        <h3>Language Skills</h3>
                        <div className="form-group">
                            <label for="language-title">Title</label>
                            <input type="text" className="form-control" id="language-title" placeholder="My Professional" />
                        </div>
                        <div className="form-group">
                            <label for="language-history">Sub Title</label>
                            <input type="text" className="form-control" id="language-history" placeholder="Language Skills" />
                        </div>
                        {/* ONE ITEM */}
                        <label>Skill(s)</label>
                        <div className="row">
                            <div className="form-group col-sm-6">
                                <input type="text" className="form-control" placeholder="Vietnamese" />
                            </div>
                            <div className="form-group col-sm-6">
                                <select className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export const SectionResume = Resume;