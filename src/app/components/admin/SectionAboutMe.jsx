import React from 'react'

function AboutMe({ 
    setting,
    service,
    achievement,
    updateValue
}) {
    return (
        <div className="row ml-4 mr-4">
            <div className="col-sm-12 mb-4">
                <div className="card">
                    <div className="card-body">
                        <h3>Configuration</h3>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input type="text" className="form-control" id="title" placeholder="ABOUT ME" value={setting.title} onChange={(event) => updateValue('setting', 'title', event.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="sub-title">Sub Title</label>
                            <input type="text" className="form-control" id="sub-title" placeholder="WHAT DO YOU WANT TO KNOW ABOUT ME?" value={setting.title} onChange={(event) => updateValue('setting', 'title', event.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="question">Question</label>
                            <input type="text" className="form-control" id="question" placeholder="WHY YOU HIRE ME?" value={setting.title} onChange={(event) => updateValue('setting', 'title', event.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="answer">Answer</label>
                            <input type="text" className="form-control" id="answer" placeholder="I AM THE BEST FRONT END EXPERT IN THE CREATIVE LAND" value={setting.title} onChange={(event) => updateValue('setting', 'title', event.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="link">Link</label>
                            <input type="text" className="form-control" id="link" placeholder="" value={setting.title} onChange={(event) => updateValue('setting', 'title', event.target.value)} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-sm-4">
                <div className="card">
                    <div className="card-body">
                        <h3>Me</h3>
                        <div className="form-group">
                            <label htmlFor="avatar">Avatar</label>
                            <input type="file" className="form-control-file" id="avatar" value={setting.title} onChange={(event) => updateValue('setting', 'title', event.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="my-name">Name</label>
                            <input type="text" className="form-control" id="my-name" placeholder="My Name" value={setting.title} onChange={(event) => updateValue('setting', 'title', event.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <input type="text" className="form-control" id="address" placeholder="Address" value={setting.title} onChange={(event) => updateValue('setting', 'title', event.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="greeting">Greeting</label>
                            <input type="text" className="form-control" id="greeting" placeholder="Hello, I'm ..." value={setting.title} onChange={(event) => updateValue('setting', 'title', event.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="roles">Job Roles</label>
                            {/* ONES */}
                            <input type="text" className="form-control" id="roles" placeholder="Senior Web Developer" value={setting.title} onChange={(event) => updateValue('setting', 'title', event.target.value)} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-sm-4">
                <div className="card">
                    <div className="card-body">
                        <h3>Services</h3>
                        <div className="form-group">
                            <label htmlFor="service-setting-title">Title</label>
                            <input type="text" className="form-control" id="service-setting-title" placeholder="What Actually I Do" value={setting.title} onChange={(event) => updateValue('setting', 'servicesTitle', event.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="service-setting-subtitle">Sub Title</label>
                            <input type="text" className="form-control" id="service-setting-subtitle" placeholder="My Services" value={setting.title} onChange={(event) => updateValue('setting', 'servicesSubTitle', event.target.value)} />
                        </div>
                        {/* ONE ITEM */}
                        <div className="form-group">
                            <label htmlFor="service-title">Title</label>
                            <input type="text" className="form-control" id="service-title" placeholder="DEVELOPER" value={service.title} onChange={(event) => updateValue('service', 'title', event.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="service-icon">Icon</label>
                            <input type="text" className="form-control" id="service-icon" placeholder="lnr lnr-code" value={service.icon} onChange={(event) => updateValue('service', 'icon', event.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="service-description">Description</label>
                            <textarea className="form-control" id="service-description" rows="3" value={service.description} onChange={(event) => updateValue('service', 'description', event.target.value)} ></textarea>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-sm-4">
                <div className="card">
                    <div className="card-body">
                        <h3>Achievement</h3>
                        {/* ONE ITEM */}
                        <div className="form-group">
                            <label htmlFor="achievement-title">Title</label>
                            <input type="text" className="form-control" id="achievement-title" placeholder="DEVELOPER" value={achievement.title} onChange={(event) => updateValue('achievement', 'title', event.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="achievement-icon">Icon</label>
                            <input type="text" className="form-control" id="achievement-icon" placeholder="lnr lnr-code" value={achievement.icon} onChange={(event) => updateValue('achievement', 'icon', event.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="achievement-description">Description</label>
                            <textarea className="form-control" id="achievement-description" rows="3" value={achievement.description} onChange={(event) => updateValue('achievement', 'description', event.target.value)}></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export const SectionAboutMe = AboutMe;