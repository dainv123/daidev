export const SET_TASK_COMPLETE = `SET_TASK_COMPLETE`;
export const SET_TASK_GROUP = `SET_TASK_GROUP`;
export const SET_TASK_NAME = `SET_TASK_NAME`;
export const ADD_TASK_COMMENT = `ADD_TASK_COMMENT`;
export const REQUEST_TASK_CREATION = `REQUEST_TASK_CREATION`;
export const CREATE_TASK = `CREATE_TASK`;
export const REQUEST_AUTHENTICATE_USER = `REQUEST_AUTHENTICATE_USER`;
export const PROCESSING_AUTHENTICATE_USER = `PROCESSING_AUTHENTICATE_USER`;
export const AUTHENTICATING = `AUTHENTICATING`;
export const AUTHENTICATED = `AUTHENTICATED`;
export const NOT_AUTHENTICATED = `NOT_AUTHENTICATED`;
export const SET_STATE = `SET_STATE`;
export const USERNAME_RESERVED = `USERNAME_RESERVED`;
export const REQUEST_USER_ACCOUNT_CREATION = `REQUEST_USER_ACCOUNT_CREATION`;
export const REQUEST_AUTHORIZATION_USER = `REQUEST_AUTHORIZATION_USER`;
export const VERIFY_TOKEN = `VERIFY_TOKEN`;
export const REQUEST_LOGOUT_USER = `REQUEST_LOGOUT_USER`;

// export const setTaskCompletion = (id, isComplete = true)=>({
//     type:SET_TASK_COMPLETE,
//     taskID:id,
//     isComplete
// });

// export const addTaskComment = (commentID, taskID, ownerID, content)=>({
//     type:ADD_TASK_COMMENT,
//     id:commentID,
//     task: taskID,
//     owner: ownerID,
//     content
// });

// export const requestTaskCreation = (groupID)=>({
//     type:REQUEST_TASK_CREATION,
//     groupID
// });

// export const createTask = (taskID, groupID, ownerID)=>({
//     type:CREATE_TASK,
//     taskID,
//     groupID,
//     ownerID
// });

// export const setTaskGroup = (taskID, groupID)=>({
//     type:SET_TASK_GROUP,
//     taskID,
//     groupID
// });

// export const setTaskName = (taskID, name)=>({
//     type:SET_TASK_NAME,
//     taskID,
//     name
// });

export const requestAuthenticateUser = (username, password)=>({
    type:REQUEST_AUTHENTICATE_USER,
    username,
    password
});

export const processAuthenticateUser = (status = AUTHENTICATING, session = null)=>({
    type: PROCESSING_AUTHENTICATE_USER,
    session,
    authenticated: status
});

export const setState = (state = {})=>({
    type:SET_STATE,
    state
});


export const requestCreateUserAccount = (username,password)=>({
    type:REQUEST_USER_ACCOUNT_CREATION,
    username,
    password
});


// draft
export const auth = () => ({
    type: REQUEST_AUTHORIZATION_USER
})

export const test = () => ({
    type: REQUEST_AUTHORIZATION_USER
})

export const logout = () => ({
    type: REQUEST_LOGOUT_USER
})


// api
// export const EDITING_SNACKBAR = `EDITING_SNACKBAR`;
// export const SUBMITTING_SNACKBAR = `SUBMITTING_SNACKBAR`;
// export const CANCELING_SNACKBAR = `CANCELING_SNACKBAR`;

// export const editingSnackbar = ()=>({
//     type: EDITING_SNACKBAR
// });

// export const submittingSnackbar = ()=>({
//     type: SUBMITTING_SNACKBAR
// });

// export const cancellingSnackbar = ()=>({
//     type: CANCELING_SNACKBAR
// });

// achievement
export const SET_ACHIEVEMENT = `SET_ACHIEVEMENT`;
export const GET_ACHIEVEMENT = `GET_ACHIEVEMENT`;
export const CREATE_ACHIEVEMENT = `CREATE_ACHIEVEMENT`;
export const UPDATE_ACHIEVEMENT = `UPDATE_ACHIEVEMENT`;

export const getAchievement = ()=>({
    type: GET_ACHIEVEMENT
});

export const createAchievement = ({icon, title, description})=>({
    type: CREATE_ACHIEVEMENT,
    icon,
    title,
    description
});

export const updateAchievement = ({id, icon, title, description})=>({
    type: UPDATE_ACHIEVEMENT,
    id,
    icon,
    title,
    description
});

export const setAchievement = (id, icon, title, description)=>({
    type: SET_ACHIEVEMENT,
    id,
    icon,
    title,
    description
});

// education
export const SET_EDUCATION = `SET_EDUCATION`;
export const GET_EDUCATION = `GET_EDUCATION`;
export const CREATE_EDUCATION = `CREATE_EDUCATION`;
export const UPDATE_EDUCATION = `UPDATE_EDUCATION`;

export const getEducation = ()=>({
    type: GET_EDUCATION
});

export const createEducation = ({title, date, image, description})=>({
    type: CREATE_EDUCATION,
    date,
    title,
    image,
    description
});

export const updateEducation = ({id, title, date, image, description})=>({
    type: UPDATE_EDUCATION,
    id,
    date,
    title,
    image,
    description
});

export const setEducation = (id, title, date, image, description)=>({
    type: SET_EDUCATION,
    id,
    date,
    title,
    image,
    description
});


// job-role
export const SET_JOB_ROLE = `SET_JOB_ROLE`;
export const GET_JOB_ROLE = `GET_JOB_ROLE`;
export const CREATE_JOB_ROLE = `CREATE_JOB_ROLE`;
export const UPDATE_JOB_ROLE = `UPDATE_JOB_ROLE`;

export const getJobRole = ()=>({
    type: GET_JOB_ROLE
});

export const createJobRole = ({title})=>({
    type: CREATE_JOB_ROLE,
    title
});

export const updateJobRole = ({id, title})=>({
    type: UPDATE_JOB_ROLE,
    id,
    title
});

export const setJobRole = (id, title)=>({
    type: SET_JOB_ROLE,
    id,
    title
});

// lang-skill
export const SET_LANG_SKILL = `SET_LANG_SKILL`;
export const GET_LANG_SKILL = `GET_LANG_SKILL`;
export const CREATE_LANG_SKILL = `CREATE_LANG_SKILL`;
export const UPDATE_LANG_SKILL = `UPDATE_LANG_SKILL`;

export const getLangSkill = ()=>({
    type: GET_LANG_SKILL
});

export const createLangSkill = ({title, point})=>({
    type: CREATE_LANG_SKILL,
    title,
    point
});

export const updateLangSkill = ({id, title, point})=>({
    type: UPDATE_LANG_SKILL,
    id,
    title,
    point
});

export const setLangSkill = (id, title, point)=>({
    type: SET_LANG_SKILL,
    id,
    title,
    point
});

// portfolio
export const SET_PORTFOLIO = `SET_PORTFOLIO`;
export const GET_PORTFOLIO = `GET_PORTFOLIO`;
export const CREATE_PORTFOLIO = `CREATE_PORTFOLIO`;
export const UPDATE_PORTFOLIO = `UPDATE_PORTFOLIO`;

export const getPortfolio = ()=>({
    type: GET_PORTFOLIO
});

export const createPortfolio = ({title, link, image, description})=>({
    type: CREATE_PORTFOLIO,
    title,
    link,
    image,
    description
});

export const updatePortfolio = ({id, title, link, image, description})=>({
    type: UPDATE_PORTFOLIO,
    id,
    title,
    link,
    image,
    description
});

export const setPortfolio = (id, title, link, image, description)=>({
    type: SET_PORTFOLIO,
    id,
    title,
    link,
    image,
    description
});


// profile
export const SET_PROFILE = `SET_PROFILE`;
export const GET_PROFILE = `GET_PROFILE`;
export const CREATE_PROFILE = `CREATE_PROFILE`;
export const UPDATE_PROFILE = `UPDATE_PROFILE`;

export const getProfile = ()=>({
    type: GET_PROFILE
});

export const createProfile = ({question, answer, avatar, name, address, greeting, email, phone})=>({
    type: CREATE_PROFILE,
    question,
    answer,
    avatar,
    name,
    address,
    greeting,
    email,
    phone
});

export const updateProfile = ({id, question, answer, avatar, name, address, greeting, email, phone})=>({
    type: UPDATE_PROFILE,
    id,
    question,
    answer,
    avatar,
    name,
    address,
    greeting,
    email,
    phone
});

export const setProfile = (id, question, answer, avatar, name, address, greeting, email, phone)=>({
    type: SET_PROFILE,
    id,
    question,
    answer,
    avatar,
    name,
    address,
    greeting,
    email,
    phone
});


// service
export const SET_SERVICE = `SET_SERVICE`;
export const GET_SERVICE = `GET_SERVICE`;
export const CREATE_SERVICE = `CREATE_SERVICE`;
export const UPDATE_SERVICE = `UPDATE_SERVICE`;

export const getService = ()=>({
    type: GET_SERVICE
});

export const createService = ({ icon, title, description })=>({
    type: CREATE_SERVICE,
    icon,
    title,
    description
});

export const updateService = ({ id, icon, title, description })=>({
    type: UPDATE_SERVICE,
    id,
    icon,
    title,
    description
});

export const setService = (id, icon, title, description)=>({
    type: SET_SERVICE,
    id,
    icon,
    title,
    description
});

// setting
export const SET_SETTING = `SET_SETTING`;
export const GET_SETTING = `GET_SETTING`;
export const CREATE_SETTING = `CREATE_SETTING`;
export const UPDATE_SETTING = `UPDATE_SETTING`;

export const getSetting = ()=>({
    type: GET_SETTING
});

export const createSetting = ({
    aboutMeTitle,
    aboutMeSubTitle,
    aboutMeLink,
    servicesTitle,
    servicesSubTitle,
    portfolioTitle,
    portfolioSubTitle,
    blogTitle,
    blogSubTitle,
    blogGithubLink,
    resumeTitle,
    resumeSubtitle,
    workHistoryTitle,
    workHistorySubTitle,
    workHistoryDownloadButtonName,
    educationTitle,
    educationSubTitle,
    langSkillsTitle,
    langSkillsSubTitle,
    workSkillsTitle,
    workSkillsSubTitle,
    contactTitle,
    contactSubtitle,
    contactInfoTitle,
    contactInfoSubtitle,
    socialTitle,
})=>({
    type: CREATE_SETTING,
    aboutMeTitle,
    aboutMeSubTitle,
    aboutMeLink,
    servicesTitle,
    servicesSubTitle,
    portfolioTitle,
    portfolioSubTitle,
    blogTitle,
    blogSubTitle,
    blogGithubLink,
    resumeTitle,
    resumeSubtitle,
    workHistoryTitle,
    workHistorySubTitle,
    workHistoryDownloadButtonName,
    educationTitle,
    educationSubTitle,
    langSkillsTitle,
    langSkillsSubTitle,
    workSkillsTitle,
    workSkillsSubTitle,
    contactTitle,
    contactSubtitle,
    contactInfoTitle,
    contactInfoSubtitle,
    socialTitle,
});

export const updateSetting = ({
    id, 
    aboutMeTitle,
    aboutMeSubTitle,
    aboutMeLink,
    servicesTitle,
    servicesSubTitle,
    portfolioTitle,
    portfolioSubTitle,
    blogTitle,
    blogSubTitle,
    blogGithubLink,
    resumeTitle,
    resumeSubtitle,
    workHistoryTitle,
    workHistorySubTitle,
    workHistoryDownloadButtonName,
    educationTitle,
    educationSubTitle,
    langSkillsTitle,
    langSkillsSubTitle,
    workSkillsTitle,
    workSkillsSubTitle,
    contactTitle,
    contactSubtitle,
    contactInfoTitle,
    contactInfoSubtitle,
    socialTitle
})=>({
    type: UPDATE_SETTING,
    id,
    aboutMeTitle,
    aboutMeSubTitle,
    aboutMeLink,
    servicesTitle,
    servicesSubTitle,
    portfolioTitle,
    portfolioSubTitle,
    blogTitle,
    blogSubTitle,
    blogGithubLink,
    resumeTitle,
    resumeSubtitle,
    workHistoryTitle,
    workHistorySubTitle,
    workHistoryDownloadButtonName,
    educationTitle,
    educationSubTitle,
    langSkillsTitle,
    langSkillsSubTitle,
    workSkillsTitle,
    workSkillsSubTitle,
    contactTitle,
    contactSubtitle,
    contactInfoTitle,
    contactInfoSubtitle,
    socialTitle,
});

export const setSetting = (
    id, 
    aboutMeTitle,
    aboutMeSubTitle,
    aboutMeLink,
    servicesTitle,
    servicesSubTitle,
    portfolioTitle,
    portfolioSubTitle,
    blogTitle,
    blogSubTitle,
    blogGithubLink,
    resumeTitle,
    resumeSubtitle,
    workHistoryTitle,
    workHistorySubTitle,
    workHistoryDownloadButtonName,
    educationTitle,
    educationSubTitle,
    langSkillsTitle,
    langSkillsSubTitle,
    workSkillsTitle,
    workSkillsSubTitle,
    contactTitle,
    contactSubtitle,
    contactInfoTitle,
    contactInfoSubtitle,
    socialTitle
)=>({
    type: SET_SETTING,
    id,
    aboutMeTitle,
    aboutMeSubTitle,
    aboutMeLink,
    servicesTitle,
    servicesSubTitle,
    portfolioTitle,
    portfolioSubTitle,
    blogTitle,
    blogSubTitle,
    blogGithubLink,
    resumeTitle,
    resumeSubtitle,
    workHistoryTitle,
    workHistorySubTitle,
    workHistoryDownloadButtonName,
    educationTitle,
    educationSubTitle,
    langSkillsTitle,
    langSkillsSubTitle,
    workSkillsTitle,
    workSkillsSubTitle,
    contactTitle,
    contactSubtitle,
    contactInfoTitle,
    contactInfoSubtitle,
    socialTitle,
});

// social
export const SET_SOCIAL = `SET_SOCIAL`;
export const GET_SOCIAL = `GET_SOCIAL`;
export const CREATE_SOCIAL = `CREATE_SOCIAL`;
export const UPDATE_SOCIAL = `UPDATE_SOCIAL`;

export const getSocial = ()=>({
    type: GET_SOCIAL
});

export const createSocial = ({icon, title, link})=>({
    type: CREATE_SOCIAL,
    icon,
    title,
    link
});

export const updateSocial = ({id, icon, title, link})=>({
    type: UPDATE_SOCIAL,
    id,
    icon,
    title,
    link
});

export const setSocial = (id, icon, title, link)=>({
    type: SET_SOCIAL,
    id,
    icon,
    title,
    link
});


// work-history
export const SET_WORK_HISTORY = `SET_WORK_HISTORY`;
export const GET_WORK_HISTORY = `GET_WORK_HISTORY`;
export const CREATE_WORK_HISTORY = `CREATE_WORK_HISTORY`;
export const UPDATE_WORK_HISTORY = `UPDATE_WORK_HISTORY`;

export const getWorkHistory = ()=>({
    type: GET_WORK_HISTORY
});

export const createWorkHistory = ({date, title, image, description})=>({
    type: CREATE_WORK_HISTORY,
    date,
    title,
    image,
    description
});

export const updateWorkHistory = ({id, date, title, image, description})=>({
    type: UPDATE_WORK_HISTORY,
    id,
    date,
    title,
    image,
    description
});

export const setWorkHistory = (id, date, title, image, description)=>({
    type: SET_WORK_HISTORY,
    id,
    date,
    title,
    image,
    description
});


// work-skill
export const SET_WORK_SKILL = `SET_WORK_SKILL`;
export const GET_WORK_SKILL = `GET_WORK_SKILL`;
export const CREATE_WORK_SKILL = `CREATE_WORK_SKILL`;
export const UPDATE_WORK_SKILL = `UPDATE_WORK_SKILL`;

export const getWorkSkill = ()=>({
    type: GET_WORK_SKILL
});

export const createWorkSkill = ({title, percent})=>({
    type: CREATE_WORK_SKILL,
    title,
    percent
});

export const updateWorkSkill = ({id, title, percent})=>({
    type: UPDATE_WORK_SKILL,
    id,
    title,
    percent
});

export const setWorkSkill = (id, title, percent)=>({
    type: SET_WORK_SKILL,
    id,
    title,
    percent
});