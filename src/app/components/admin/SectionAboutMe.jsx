import React from 'react'

function AboutMe() {
    return (
        <div class="row ml-4 mr-4">
            <div class="col-sm-12 mb-4">
                <div class="card">
                    <div class="card-body">
                        <h3>Configuration</h3>
                        <div class="form-group">
                            <label for="title">Title</label>
                            <input type="text" class="form-control" id="title" placeholder="ABOUT ME" />
                        </div>
                        <div class="form-group">
                            <label for="sub-title">Sub Title</label>
                            <input type="text" class="form-control" id="sub-title" placeholder="WHAT DO YOU WANT TO KNOW ABOUT ME?" />
                        </div>
                        <div class="form-group">
                            <label for="question">Question</label>
                            <input type="text" class="form-control" id="question" placeholder="WHY YOU HIRE ME?" />
                        </div>
                        <div class="form-group">
                            <label for="answer">Answer</label>
                            <input type="text" class="form-control" id="answer" placeholder="I AM THE BEST FRONT END EXPERT IN THE CREATIVE LAND" />
                        </div>
                        <div class="form-group">
                            <label for="link">Link</label>
                            <input type="text" class="form-control" id="link" placeholder="" />
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-sm-4">
                <div class="card">
                    <div class="card-body">
                        <h3>Me</h3>
                        <div class="form-group">
                            <label for="avatar">Avatar</label>
                            <input type="file" class="form-control-file" id="avatar" />
                        </div>
                        <div class="form-group">
                            <label for="my-name">Name</label>
                            <input type="text" class="form-control" id="my-name" placeholder="My Name" />
                        </div>
                        <div class="form-group">
                            <label for="address">Address</label>
                            <input type="text" class="form-control" id="address" placeholder="Address" />
                        </div>
                        <div class="form-group">
                            <label for="greeting">Greeting</label>
                            <input type="text" class="form-control" id="greeting" placeholder="Hello, I'm ..." />
                        </div>
                        <div class="form-group">
                            <label for="roles">Job Roles</label>
                            {/* ONES */}
                            <input type="text" class="form-control" id="roles" placeholder="Senior Web Developer" />
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-sm-4">
                <div class="card">
                    <div class="card-body">
                        <h3>Services</h3>
                        <div class="form-group">
                            <label for="professional-title">Title</label>
                            <input type="text" class="form-control" id="professional-title" placeholder="What Actually I Do" />
                        </div>
                        <div class="form-group">
                            <label for="work-history">Sub Title</label>
                            <input type="text" class="form-control" id="work-history" placeholder="My Services" />
                        </div>
                        {/* ONE ITEM */}
                        <div class="form-group">
                            <label for="history-title">Title</label>
                            <input type="text" class="form-control" id="history-title" placeholder="DEVELOPER" />
                        </div>
                        <div class="form-group">
                            <label for="history-date">Icon</label>
                            <input type="text" class="form-control" id="history-date" placeholder="lnr lnr-code" />
                        </div>
                        <div class="form-group">
                            <label for="history-description">Description</label>
                            <textarea class="form-control" id="history-description" rows="3"></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-4">
                <div class="card">
                    <div class="card-body">
                        <h3>Achievement</h3>
                        {/* ONE ITEM */}
                        <div class="form-group">
                            <label for="history-title">Title</label>
                            <input type="text" class="form-control" id="history-title" placeholder="DEVELOPER" />
                        </div>
                        <div class="form-group">
                            <label for="history-date">Icon</label>
                            <input type="text" class="form-control" id="history-date" placeholder="lnr lnr-code" />
                        </div>
                        <div class="form-group">
                            <label for="history-description">Description</label>
                            <textarea class="form-control" id="history-description" rows="3"></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export const SectionAboutMe = AboutMe;