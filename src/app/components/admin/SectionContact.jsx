import React from 'react'

function Contact() {
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
                    </div>
                </div>
            </div>

            <div class="col-sm-6">
                <div class="card">
                    <div class="card-body">
                        <h3>Contact Information</h3>
                        <div class="form-group">
                            <label for="title-contact">Title</label>
                            <input type="text" class="form-control" id="title-contact" placeholder="Contact Information" />
                        </div>
                        <div class="form-group">
                            <label for="sub-title-contact">Sub Title</label>
                            <input type="text" class="form-control" id="sub-title-contact" placeholder="Find me here" />
                        </div>
                        <div class="form-group">
                            <label for="address">Address</label>
                            <input type="text" class="form-control" id="address" placeholder="Address" />
                        </div>
                        <div class="form-group">
                            <label for="phone">Phone(s)</label>
                            {/* ONE */}
                            <input type="text" class="form-control" id="phone" placeholder="(+84) 343 989 364" />
                        </div>
                        <div class="form-group">
                            <label for="email">Email(s)</label>
                            {/* ONE */}
                            <input type="text" class="form-control" id="email" placeholder="ngdai0402@gmail.com" />
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-sm-6">
                <div class="card">
                    <div class="card-body">
                        <h3>Social(s)</h3>
                        <div class="form-group">
                            <label for="professional-title">Title</label>
                            <input type="text" class="form-control" id="professional-title" placeholder="Follow Me" />
                        </div>
                        {/* ONE ITEM */}
                        <div class="form-group">
                            <label for="social-title">Title</label>
                            <input type="text" class="form-control" id="social-title" placeholder="Facebook" />
                        </div>
                        <div class="form-group">
                            <label for="social-date">Icon</label>
                            <input type="text" class="form-control" id="social-date" placeholder="lnr lnr-code" />
                        </div>
                        <div class="form-group">
                            <label for="social-link">Link</label>
                            <input type="text" class="form-control" id="social-link" placeholder="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export const SectionContact = Contact;