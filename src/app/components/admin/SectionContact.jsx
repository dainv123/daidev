import React from 'react'

function Contact(
    setting,
    social,
    updateValue
) {
    return (
        <div className="row ml-4 mr-4">
            <div className="col-sm-12 mb-4">
                <div className="card">
                    <div className="card-body">
                        <h3>Configuration</h3>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input type="text" className="form-control" id="title" placeholder="ABOUT ME" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="sub-title">Sub Title</label>
                            <input type="text" className="form-control" id="sub-title" placeholder="WHAT DO YOU WANT TO KNOW ABOUT ME?" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-sm-6">
                <div className="card">
                    <div className="card-body">
                        <h3>Contact Information</h3>
                        <div className="form-group">
                            <label htmlFor="title-contact">Title</label>
                            <input type="text" className="form-control" id="title-contact" placeholder="Contact Information" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="sub-title-contact">Sub Title</label>
                            <input type="text" className="form-control" id="sub-title-contact" placeholder="Find me here" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <input type="text" className="form-control" id="address" placeholder="Address" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone(s)</label>
                            {/* ONE */}
                            <input type="text" className="form-control" id="phone" placeholder="(+84) 343 989 364" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email(s)</label>
                            {/* ONE */}
                            <input type="text" className="form-control" id="email" placeholder="ngdai0402@gmail.com" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-sm-6">
                <div className="card">
                    <div className="card-body">
                        <h3>Social(s)</h3>
                        <div className="form-group">
                            <label htmlFor="professional-title">Title</label>
                            <input type="text" className="form-control" id="professional-title" placeholder="Follow Me" />
                        </div>
                        {/* ONE ITEM */}
                        <div className="form-group">
                            <label htmlFor="social-title">Title</label>
                            <input type="text" className="form-control" id="social-title" placeholder="Facebook" value={social.title} onChange={(event) => updateValue('social', 'title', event.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="social-date">Icon</label>
                            <input type="text" className="form-control" id="social-date" placeholder="lnr lnr-code" value={social.icon} onChange={(event) => updateValue('social', 'icon', event.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="social-link">Link</label>
                            <input type="text" className="form-control" id="social-link" placeholder="" value={social.link} onChange={(event) => updateValue('social', 'link', event.target.value)}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export const SectionContact = Contact;