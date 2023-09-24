import React, { useState, useEffect } from 'react'

const FileData = ({file}) => {
    const [fileState, setFileState] = useState(file);
    
    useEffect(() => setFileState(file), [file]);

    if (fileState.url) {
        return (
            <div>
                <h4>File Details:</h4>
                <p>File Name: {fileState.name}</p>
                <p>File Type: {fileState.type}</p>
                <img src={fileState.url} width="auto" height="200" />
            </div>
        );
    } else if (fileState.file) {
        return (
            <div>
                <h4>File Details:</h4>
                <p>File Name: {fileState.file.name}</p>
                <p>File Type: {fileState.file.type}</p>
            </div>
        );
    } else {
        return (
            <div>
                <h4>Choose before Pressing the Upload button</h4>
            </div>
        );
    }
};

const ImageElement = ({image, removeImage, updatedImage}) => {
    const onFileChange = (event) => updatedImage(event.target.files[0]);

    return (
        <div className="form-group" style={{ border:1 + 'px solid' }}>
            <h4>Update or add new:</h4>
            { image && <button onClick={() => removeImage(image.id)}>Remove this image</button> }
            <input onChange={(event) => onFileChange(event)} type="file" accept="image/png, image/jpeg" multiple/>
            { image && <FileData file={image}/> }
        </div>
    )
}

const EducationElement = ({
    education,
    removeImage, 
    updatedImage,
    removeEducation, 
    updateEducation
}) => {
    const [educationState, setEducationState] = useState(education);
    
    useEffect(() => setEducationState(education), [education]);

    return (
        <div>
            <button onClick={() => removeEducation(education._id)}>Remove education</button>
            <div className="form-group">
                <label htmlFor="history-title">Title</label>
                <input type="text" className="form-control" id="history-title" placeholder="DEVELOPER" value={educationState.title} onChange={(event) => updateEducation(education._id, 'title', event.target.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="history-date">Date</label>
                <input type="text" className="form-control" id="history-date" placeholder="Aug 2018 - Till Now" value={educationState.date} onChange={(event) => updateEducation(education._id, 'date', event.target.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="history-description">Description</label>
                <textarea className="form-control" id="history-description" rows="3" value={educationState.description} onChange={(event) => updateEducation(education._id, 'description', event.target.value)}></textarea>
            </div>
            <ImageElement 
                image={education.image} 
                removeImage={imageId => removeImage(education._id, imageId)} 
                updatedImage={(imageId, file) => updatedImage(education._id, imageId, file)} 
            />
        </div>
    )
}

const WorkHistoryElement = ({
    workHistory,
    removeImage, 
    updatedImage,
    removeWorkHistory, 
    updateWorkHistory
}) => {
    const [workHistoryState, setWorkHistoryState] = useState(workHistory);
    
    useEffect(() => setWorkHistoryState(workHistory), [workHistory]);

    return (
        <div>
            <button onClick={() => removeWorkHistory(workHistory._id)}>Remove Work History</button>
            <div className="form-group">
                <label htmlFor="history-title">Title</label>
                <input type="text" className="form-control" id="history-title" placeholder="DEVELOPER" value={workHistoryState.title} onChange={(event) => updateWorkHistory(workHistory._id, 'title', event.target.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="history-date">Date</label>
                <input type="text" className="form-control" id="history-date" placeholder="Aug 2018 - Till Now" value={workHistoryState.date} onChange={(event) => updateWorkHistory(workHistory._id, 'date', event.target.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="history-description">Description</label>
                <textarea className="form-control" id="history-description" rows="3" value={workHistoryState.description} onChange={(event) => updateWorkHistory(workHistory._id, 'description', event.target.value)}></textarea>
            </div>
            <ImageElement 
                image={workHistory.image} 
                removeImage={imageId => removeImage(workHistory._id, imageId)} 
                updatedImage={(imageId, file) => updatedImage(workHistory._id, imageId, file)} 
            />
        </div>
    )
}

const WorkSkillElement = ({
    workSkill,
    removeWorkSkill, 
    updateWorkSkill
}) => {
    const [workSkillState, setWorkSkillState] = useState(workSkill);
    
    useEffect(() => setWorkSkillState(workSkill), [workSkill]);

    return (
        <div className="row">
            <div className="form-group col-sm-2">
                <button onClick={() => removeWorkSkill(workSkill._id)}>Remove</button>
            </div>
            <div className="form-group col-sm-5">
                <input type="text" className="form-control" placeholder="Algorithm" value={workSkillState.title} onChange={(event) => updateWorkSkill(workSkill._id, 'title', event.target.value)}/>
            </div>
            <div className="form-group col-sm-5">
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="%" value={workSkillState.percent} onChange={(event) => updateWorkSkill(workSkill._id, 'percent', event.target.value)}/>
                    <div className="input-group-append">
                        <span className="input-group-text">%</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

const LangSkillElement = ({
    langSkill,
    removeLangSkill, 
    updateLangSkill
}) => {
    const [langSkillState, setLangSkillState] = useState(langSkill);
    
    useEffect(() => setLangSkillState(langSkill), [langSkill]);

    return (
        <div className="row">
            <div className="form-group col-sm-2">
                <button onClick={() => removeLangSkill(langSkill._id)}>Remove</button>
            </div>
            <div className="form-group col-sm-5">
                <input type="text" className="form-control" placeholder="Vietnamese" value={langSkillState.title} onChange={(event) => updateLangSkill(langSkill._id, 'title', event.target.value)}/>
            </div>
            <div className="form-group col-sm-5">
                <select className="form-control" value={langSkillState.point} onChange={(event) => updateLangSkill(langSkill._id, 'point', event.target.value)}>
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
    updateValue,
    onChangeResume
}) {
    const getUID = () => new Date().getTime().toString()

    const [deletingImages, setDeletingImages] = useState([])

    const [educationState, setEducationState] = useState([])

    const [workSkillState, setWorkSkillState] = useState([])
    
    const [langSkillState, setLangSkillState] = useState([])

    const [workHistoryState, setWorkHistoryState] = useState([])

    useEffect(() => setEducationState(JSON.parse(JSON.stringify(education))), [education])
    
    useEffect(() => setWorkSkillState(JSON.parse(JSON.stringify(workSkill))), [workSkill])
    
    useEffect(() => setLangSkillState(JSON.parse(JSON.stringify(langSkill))), [langSkill])

    useEffect(() => setWorkHistoryState(JSON.parse(JSON.stringify(workHistory))), [workHistory])

    useEffect(() => {
        const uploadImages = 
            [
                ...educationState, 
                ...workHistoryState
            ]
            .filter(element => element.image && !element.image.url)
            .map(element => ({ id: element.image.id, file: element.image.file }))
        
        const comparing = (origin, modified) => 
            [...origin]
            .filter(element => !modified.some(item => item._id === element._id))
            .map(element => element._id)

        const educationDeleting = comparing(education, educationState)
        
        const langSkillDeleting = comparing(langSkill, langSkillState)

        const workSkillDeleting = comparing(workSkill, workSkillState)

        const workHistoryDeleting = comparing(workHistory, workHistoryState)

        onChangeResume({
            deleting: deletingImages,
            uploading: uploadImages,
            educationUpdating: educationState,
            educationDeleting: educationDeleting,
            workHistoryUpdating: workHistoryState, 
            workHistoryDeleting: workHistoryDeleting,
            langSkillUpdating: langSkillState, 
            langSkillDeleting: langSkillDeleting,
            workSkillUpdating: workSkillState, 
            workSkillDeleting: workSkillDeleting
        })
    }, [educationState, workHistoryState, langSkillState, workSkillState])

    const RESUME_TYPE = {
        EDUCATION: 'education',
        WORK_SKILL: 'workSkill',
        LANG_SKILL: 'langSkill',
        WORK_HISTORY: 'workHistory'
    }

    const getState = type => {
        let result = '';

        switch (type) {
            case RESUME_TYPE.EDUCATION:
                result = educationState;
                break;
        
            case RESUME_TYPE.WORK_HISTORY:
                result = workHistoryState;
                break;
            
            case RESUME_TYPE.WORK_SKILL:
                result = workSkillState;
                break;

            case RESUME_TYPE.LANG_SKILL:
                result = langSkillState;
                break;
        }

        return result;
    }

    const setStateFunction = (type, value) => {
        switch (type) {
            case RESUME_TYPE.EDUCATION:
                setEducationState(value)
                break;
        
            case RESUME_TYPE.WORK_HISTORY:
                setWorkHistoryState(value)
                break;
            
            case RESUME_TYPE.WORK_SKILL:
                setWorkSkillState(value)
                break;

            case RESUME_TYPE.LANG_SKILL:
                setLangSkillState(value)
                break;
        }
    }
        

    const removeImage = (itemId, imageId, type) => {
        const deleted = [...deletingImages]

        deleted.push(imageId)

        setDeletingImages(deleted)
        
        const medium = getState(type).map(item => {
            if (item._id === itemId) {
                item.image = null
            }

            return item;
        })

        setEducationState(medium)
    }

    const updatedImage = (itemId, file, type) => {
        const medium = getState(type).map(item => {
            if (item._id === itemId) {
                item.image = {
                    ...(item.image || {}),
                    id: item.id ? item.id : getUID(),
                    url: null,
                    name: null,
                    type: null,
                    file: file
                }
            }
            return item
        })

        setStateFunction(type, medium)
    }

    const addResumeProperty = type => {
        const medium = getState(type)

        medium.push(
            new Object(
                type === RESUME_TYPE.LANG_SKILL 
                    ? 
                    {
                        _id: getUID(),
                        isNew: true,
                        title: '',
                        point: '',
                    }
                    : 
                    type === RESUME_TYPE.WORK_SKILL
                        ? 
                        {
                            _id: getUID(),
                            isNew: true,
                            title: '',
                            percent: ''
                        }
                        : 
                        {
                            _id: getUID(),
                            isNew: true,
                            date: '',
                            title: '',
                            describe: '',
                            image: null
                        }
            )
        )

        setStateFunction(type, medium.map(item => item))
    }

    const removeResumeProperty = (itemId, type) => {
        const medium = getState(type)

        const index = medium.findIndex(i => i._id === itemId)

        medium.splice(index, 1)

        setStateFunction(type, medium.map(item => item))

        if (medium[index].image && medium[index].image.id) {
            const deleted = [...deletingImages]

            deleted.push(medium[index].image.id)
            
            setDeletingImages(deleted)
        }
    }
    
    const updateResumeProperty = (itemId, property, value, type) => {
        let medium = getState(type)

        medium = medium.map(item => {
            if (item._id === itemId) {
                item[property] = value
            }
            return item
        })

        setStateFunction(type, medium)
    }

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
                        <button onClick={() => addResumeProperty(RESUME_TYPE.WORK_HISTORY)}>Add Work History Item</button>
                        {
                            workHistoryState.map(workHistory => 
                                (
                                    <WorkHistoryElement 
                                        key={workHistory._id} 
                                        workHistory={workHistory}
                                        removeImage={(workHistoryId, imageId) => removeImage(workHistoryId, imageId, RESUME_TYPE.WORK_HISTORY)} 
                                        updatedImage={(workHistoryId, file) => updatedImage(workHistoryId, file, RESUME_TYPE.WORK_HISTORY)}
                                        removeWorkHistory={workHistoryId => removeResumeProperty(workHistoryId, RESUME_TYPE.WORK_HISTORY)} 
                                        updateWorkHistory={(workHistoryId, key, value) => updateResumeProperty(workHistoryId, key, value, RESUME_TYPE.WORK_HISTORY)}
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
                        <button onClick={() => addResumeProperty(RESUME_TYPE.EDUCATION)}>Add Education Item</button>
                        {
                            educationState.map(education => 
                                (
                                    <EducationElement 
                                        key={education._id} 
                                        education={education}
                                        removeImage={(educationId, imageId) => removeImage(educationId, imageId, RESUME_TYPE.EDUCATION)} 
                                        updatedImage={(educationId, file) => updatedImage(educationId, file, RESUME_TYPE.EDUCATION)}
                                        removeEducation={educationId => removeResumeProperty(educationId, RESUME_TYPE.EDUCATION)} 
                                        updateEducation={(educationId, key, value) => updateResumeProperty(educationId, key, value, RESUME_TYPE.EDUCATION)}
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
                        <button onClick={() => addResumeProperty(RESUME_TYPE.WORK_SKILL)}>Add Work Skill Item</button>
                        {
                            workSkillState.map(workSkill => 
                                (
                                    <WorkSkillElement 
                                        key={workSkill._id} 
                                        workSkill={workSkill}
                                        removeWorkSkill={workSkillId => removeResumeProperty(workSkillId, RESUME_TYPE.WORK_SKILL)} 
                                        updateWorkSkill={(workSkillId, key, value) => updateResumeProperty(workSkillId, key, value, RESUME_TYPE.WORK_SKILL)}
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
                        <button onClick={() => addResumeProperty(RESUME_TYPE.LANG_SKILL)}>Add Lang Skill Item</button>
                        {
                            langSkillState.map(langSkill => 
                                (
                                    <LangSkillElement 
                                        key={langSkill._id} 
                                        langSkill={langSkill}
                                        removeLangSkill={langSkillId => removeResumeProperty(langSkillId, RESUME_TYPE.LANG_SKILL)} 
                                        updateLangSkill={(langSkillId, key, value) => updateResumeProperty(langSkillId, key, value, RESUME_TYPE.LANG_SKILL)}
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