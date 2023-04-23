import React from 'react'

function Resume() {
    return (
        <div class="row ml-4 mr-4">
            <div class="col-sm-12 mb-4">
                <div class="card">
                    <div class="card-body">
                        <h3>Configuration</h3>
                        <div class="form-group">
                            <label for="title">Title</label>
                            <input type="text" class="form-control" id="title" placeholder="RESUME" />
                        </div>
                        <div class="form-group">
                            <label for="sub-title">Sub Title</label>
                            <input type="text" class="form-control" id="sub-title" placeholder="ALL MY BACKGROUND" />
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-sm-4">
                <div class="card">
                    <div class="card-body">
                        <h3>Work History</h3>
                        <div class="form-group">
                            <label for="professional-title">Title</label>
                            <input type="text" class="form-control" id="professional-title" placeholder="My Professional" />
                        </div>
                        <div class="form-group">
                            <label for="work-history">Sub Title</label>
                            <input type="text" class="form-control" id="work-history" placeholder="Work History" />
                        </div>
                        <div class="form-group">
                            <label for="download-button-name">Download Button Name</label>
                            <input type="text" class="form-control" id="download-button-name" placeholder="Download Resume" />
                        </div>
                        {/* ONE ITEM */}
                        <div class="form-group">
                            <label for="history-title">Title</label>
                            <input type="text" class="form-control" id="history-title" placeholder="DEVELOPER" />
                        </div>
                        <div class="form-group">
                            <label for="history-date">Date</label>
                            <input type="text" class="form-control" id="history-date" placeholder="Aug 2018 - Till Now" />
                        </div>
                        <div class="form-group">
                            <label for="history-description">Description</label>
                            <textarea class="form-control" id="history-description" rows="3"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="history-image">Image</label>
                            <input type="file" class="form-control-file" id="history-image" />
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-sm-4">
                <div class="card">
                    <div class="card-body">
                        <h3>Education</h3>
                        <div class="form-group">
                            <label for="professional-title">Title</label>
                            <input type="text" class="form-control" id="professional-title" placeholder="My Education" />
                        </div>
                        <div class="form-group">
                            <label for="work-history">Sub Title</label>
                            <input type="text" class="form-control" id="work-history" placeholder="Background History" />
                        </div>
                        {/* ONE ITEM */}
                        <div class="form-group">
                            <label for="history-title">Title</label>
                            <input type="text" class="form-control" id="history-title" placeholder="DEVELOPER" />
                        </div>
                        <div class="form-group">
                            <label for="history-date">Date</label>
                            <input type="text" class="form-control" id="history-date" placeholder="Aug 2018 - Till Now" />
                        </div>
                        <div class="form-group">
                            <label for="history-description">Description</label>
                            <textarea class="form-control" id="history-description" rows="3"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="history-image">Image</label>
                            <input type="file" class="form-control-file" id="history-image" />
                        </div>

                        <h3>Work Skills</h3>
                        <div class="form-group">
                            <label for="professional-title">Title</label>
                            <input type="text" class="form-control" id="professional-title" placeholder="My Professional" />
                        </div>
                        <div class="form-group">
                            <label for="work-history">Sub Title</label>
                            <input type="text" class="form-control" id="work-history" placeholder="Work Skills" />
                        </div>
                        {/* ONE ITEM */}
                        <label>Skill(s)</label>
                        <div class="row">
                            <div class="form-group col-sm-6">
                                <input type="text" class="form-control" placeholder="Algorithm" />
                            </div>
                            <div class="form-group col-sm-6">
                                <div class="input-group mb-3">
                                    <input type="text" class="form-control" placeholder="%" />
                                    <div class="input-group-append">
                                        <span class="input-group-text">%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-sm-4">
                <div class="card">
                    <div class="card-body">
                        <h3>Language Skills</h3>
                        <div class="form-group">
                            <label for="language-title">Title</label>
                            <input type="text" class="form-control" id="language-title" placeholder="My Professional" />
                        </div>
                        <div class="form-group">
                            <label for="language-history">Sub Title</label>
                            <input type="text" class="form-control" id="language-history" placeholder="Language Skills" />
                        </div>
                        {/* ONE ITEM */}
                        <label>Skill(s)</label>
                        <div class="row">
                            <div class="form-group col-sm-6">
                                <input type="text" class="form-control" placeholder="Vietnamese" />
                            </div>
                            <div class="form-group col-sm-6">
                                <select class="form-control">
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