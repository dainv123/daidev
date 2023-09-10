import React, { useState, useEffect } from 'react'

const EducationElement = ({
    portfolio,
    addImage, 
    removeImage, 
    updatedImage,
    removePortfolio, 
    updatePortfolio
}) => {
    const [portfolioState, setPortfolioState] = useState(portfolio);
    
    useEffect(() => setPortfolioState(portfolio), [portfolio]);

    return (
        <div>
            <div className="form-group">
                <label htmlFor="history-title">Title</label>
                <input type="text" className="form-control" id="history-title" placeholder="DEVELOPER" />
            </div>
            <div className="form-group">
                <label htmlFor="history-date">Date</label>
                <input type="text" className="form-control" id="history-date" placeholder="Aug 2018 - Till Now" />
            </div>
            <div className="form-group">
                <label htmlFor="history-description">Description</label>
                <textarea className="form-control" id="history-description" rows="3"></textarea>
            </div>
            <div className="form-group">
                <label htmlFor="history-image">Image</label>
                <input type="file" className="form-control-file" id="history-image" />
            </div>
        </div>
    )
}

const WorkHistoryElement = ({
    portfolio,
    addImage, 
    removeImage, 
    updatedImage,
    removePortfolio, 
    updatePortfolio
}) => {
    const [portfolioState, setPortfolioState] = useState(portfolio);
    
    useEffect(() => setPortfolioState(portfolio), [portfolio]);

    return (
        <div>
            <div className="form-group">
                <label htmlFor="history-title">Title</label>
                <input type="text" className="form-control" id="history-title" placeholder="DEVELOPER" />
            </div>
            <div className="form-group">
                <label htmlFor="history-date">Date</label>
                <input type="text" className="form-control" id="history-date" placeholder="Aug 2018 - Till Now" />
            </div>
            <div className="form-group">
                <label htmlFor="history-description">Description</label>
                <textarea className="form-control" id="history-description" rows="3"></textarea>
            </div>
            <div className="form-group">
                <label htmlFor="history-image">Image</label>
                <input type="file" className="form-control-file" id="history-image" />
            </div>
        </div>
    )
}

const WorkSkillElement = ({
    portfolio,
    addImage, 
    removeImage, 
    updatedImage,
    removePortfolio, 
    updatePortfolio
}) => {
    const [portfolioState, setPortfolioState] = useState(portfolio);
    
    useEffect(() => setPortfolioState(portfolio), [portfolio]);

    return (
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
    )
}

const LangSkillElement = ({
    portfolio,
    addImage, 
    removeImage, 
    updatedImage,
    removePortfolio, 
    updatePortfolio
}) => {
    const [portfolioState, setPortfolioState] = useState(portfolio);
    
    useEffect(() => setPortfolioState(portfolio), [portfolio]);

    return (
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
    )
}

function Resume({
    setting,
    education,
    workHistory,
    workSkill,
    langSkill,
    updateValue
}) {
    const [educationState, setEducation] = useState([])

    const [workHistoryState, setWorkHistoryState] = useState([])

    const [workSkillState, setWorSkillState] = useState([])

    const [langSkillState, setLangSkillState] = useState([])

    useEffect(() => setEducation(JSON.parse(JSON.stringify(education))), [education])

    useEffect(() => setWorkHistoryState(JSON.parse(JSON.stringify(workSkill))), [workHistory])

    useEffect(() => setWorSkillState(JSON.parse(JSON.stringify(workSkill))), [workSkill])

    useEffect(() => setLangSkillState(JSON.parse(JSON.stringify(workSkill))), [langSkill])

    return (
        <div className="row ml-4 mr-4">
            <div className="col-sm-12 mb-4">
                <div className="card">
                    <div className="card-body">
                        <h3>Configuration</h3>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input type="text" className="form-control" id="title" placeholder="RESUME"  value={setting.resumeTitle} onChange={(event) => updateValue('setting', 'resumeTitle', event.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="sub-title">Sub Title</label>
                            <input type="text" className="form-control" id="sub-title" placeholder="ALL MY BACKGROUND" value={setting.resumeSubTitle} onChange={(event) => updateValue('setting', 'resumeSubTitle', event.target.value)} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-sm-6 mb-4">
                <div className="card">
                    <div className="card-body">
                        <h3>Work History</h3>
                        <div className="form-group">
                            <label htmlFor="professional-title">Title</label>
                            <input type="text" className="form-control" id="professional-title" placeholder="My Professional" value={setting.workHistoryTitle} onChange={(event) => updateValue('setting', 'workHistoryTitle', event.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="work-history">Sub Title</label>
                            <input type="text" className="form-control" id="work-history" placeholder="Work History" value={setting.workHistorySubTitle} onChange={(event) => updateValue('setting', 'workHistorySubTitle', event.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="download-button-name">Download Button Name</label>
                            <input type="text" className="form-control" id="download-button-name" placeholder="Download Resume" />
                        </div>
                        {
                            workHistoryState.map(work => 
                                (
                                    <WorkHistoryElement 
                                        // key={portfolio._id} 
                                        // portfolio={portfolio}
                                        // addImage={portfolioId => addImage(portfolioId)} 
                                        // removeImage={(portfolioId, imageId) => removeImage(portfolioId, imageId)} 
                                        // updatedImage={(portfolioId, imageId, file) => updatedImage(portfolioId, imageId, file)}
                                        // removePortfolio={portfolioId => removePortfolio(portfolioId)} 
                                        // updatePortfolio={(portfolioId, key, value) => updatePortfolio(portfolioId, key, value)}
                                    ></WorkHistoryElement>
                                )
                            )
                        }
                    </div>
                </div>
            </div>

            <div className="col-sm-6 mb-4">
                <div className="card">
                    <div className="card-body">
                        <h3>Education</h3>
                        <div className="form-group">
                            <label htmlFor="professional-title">Title</label>
                            <input type="text" className="form-control" id="professional-title" placeholder="My Education" value={setting.educationTitle} onChange={(event) => updateValue('setting', 'educationTitle', event.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="work-history">Sub Title</label>
                            <input type="text" className="form-control" id="work-history" placeholder="Background History" value={setting.educationSubTitle} onChange={(event) => updateValue('setting', 'educationSubTitle', event.target.value)} />
                        </div>
                        {
                            educationState.map(work => 
                                (
                                    <EducationElement 
                                        // key={portfolio._id} 
                                        // portfolio={portfolio}
                                        // addImage={portfolioId => addImage(portfolioId)} 
                                        // removeImage={(portfolioId, imageId) => removeImage(portfolioId, imageId)} 
                                        // updatedImage={(portfolioId, imageId, file) => updatedImage(portfolioId, imageId, file)}
                                        // removePortfolio={portfolioId => removePortfolio(portfolioId)} 
                                        // updatePortfolio={(portfolioId, key, value) => updatePortfolio(portfolioId, key, value)}
                                    ></EducationElement>
                                )
                            )
                        }
                    </div>
                </div>
            </div>

            <div className="col-sm-6 mb-4">
                <div className="card">
                    <div className="card-body">
                        <h3>Work Skills</h3>
                        <div className="form-group">
                            <label htmlFor="professional-title">Title</label>
                            <input type="text" className="form-control" id="professional-title" placeholder="My Professional" value={setting.workSkillTitle} onChange={(event) => updateValue('setting', 'workSkillTitle', event.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="work-history">Sub Title</label>
                            <input type="text" className="form-control" id="work-history" placeholder="Work Skills" value={setting.workSkillSubTitle} onChange={(event) => updateValue('setting', 'workSkillSubTitle', event.target.value)} />
                        </div>
                        <label>Skill(s)</label>
                        {
                            workSkillState.map(work => 
                                (
                                    <WorkSkillElement 
                                        // key={portfolio._id} 
                                        // portfolio={portfolio}
                                        // addImage={portfolioId => addImage(portfolioId)} 
                                        // removeImage={(portfolioId, imageId) => removeImage(portfolioId, imageId)} 
                                        // updatedImage={(portfolioId, imageId, file) => updatedImage(portfolioId, imageId, file)}
                                        // removePortfolio={portfolioId => removePortfolio(portfolioId)} 
                                        // updatePortfolio={(portfolioId, key, value) => updatePortfolio(portfolioId, key, value)}
                                    ></WorkSkillElement>
                                )
                            )
                        }
                    </div>
                </div>
            </div>

            <div className="col-sm-6 mb-4">
                <div className="card">
                    <div className="card-body">
                        <h3>Language Skills</h3>
                        <div className="form-group">
                            <label htmlFor="language-title">Title</label>
                            <input type="text" className="form-control" id="language-title" placeholder="My Professional" value={setting.langSkillTitle} onChange={(event) => updateValue('setting', 'langSkillTitle', event.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="language-history">Sub Title</label>
                            <input type="text" className="form-control" id="language-history" placeholder="Language Skills" value={setting.langSkillSubTitle} onChange={(event) => updateValue('setting', 'langSkillSubTitle', event.target.value)} />
                        </div>
                        <label>Skill(s)</label>
                        {
                            langSkillState.map(work => 
                                (
                                    <LangSkillElement 
                                        // key={portfolio._id} 
                                        // portfolio={portfolio}
                                        // addImage={portfolioId => addImage(portfolioId)} 
                                        // removeImage={(portfolioId, imageId) => removeImage(portfolioId, imageId)} 
                                        // updatedImage={(portfolioId, imageId, file) => updatedImage(portfolioId, imageId, file)}
                                        // removePortfolio={portfolioId => removePortfolio(portfolioId)} 
                                        // updatePortfolio={(portfolioId, key, value) => updatePortfolio(portfolioId, key, value)}
                                    ></LangSkillElement>
                                )
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}


export const SectionResume = Resume;