import uuid from 'uuid';
import axios from 'axios'
import cookies from 'js-cookie'
import { history } from './history'
import { take, put, select } from 'redux-saga/effects'
import service from '../helper/service'
import * as mutations from './mutations'

const url = process.env.NODE_ENV === 'production' ? `` : `http://localhost:2040`;

// export function* taskCreationSaga(){
//     while (true){
//         const {groupID} = yield take(mutations.REQUEST_TASK_CREATION);
//         const ownerID = yield select(state=>state.session.id);
//         const taskID = uuid();
//         let mutation = mutations.createTask(taskID, groupID, ownerID);
//         const { res } = yield axios.post(url + `/task/new`,{task:{
//             id:taskID,
//             group: groupID,
//             owner: ownerID,
//             isComplete:false,
//             name:"New task"
//         }});
//         yield put(mutation);
//     }
// }

// export function* commentCreationSaga(){
//     while (true) {
//         const comment = yield take (mutations.ADD_TASK_COMMENT);
//         axios.post(url + `/comment/new`,{comment})
//     }
// }

// export function* taskModificationSaga(){
//     while (true){
//         const task = yield take([mutations.SET_TASK_GROUP, mutations.SET_TASK_NAME,mutations.SET_TASK_COMPLETE]);
//         axios.post(url + `/task/update`,{
//             task:{
//                 id:task.taskID,
//                 group:task.groupID,
//                 name:task.name,
//                 isComplete:task.isComplete
//             }});
//     }
// }

export function* userAuthenticationSaga(){
    while (true){
        const {username,password} = yield take(mutations.REQUEST_AUTHENTICATE_USER);
        
        try {
            const { responseCode, accessToken, refreshToken } = yield service.post(url + `/login`, { 
                username,
                password 
            });

            if (!responseCode || responseCode !== 200) {
                throw new Error()
            }

            // yield put(mutations.setState(data.state));
            yield put(mutations.processAuthenticateUser(mutations.AUTHENTICATED, {
                id: "U1",
                token: ""
            }));

            // SAVE TOKEN:
            cookies.set('accessToken', accessToken);
            cookies.set('refreshToken', refreshToken);
            history.push(`/admin`);
        } catch (e) {
            /* catch block handles failed login */
            yield put(mutations.processAuthenticateUser(mutations.NOT_AUTHENTICATED));
        }
    }
}

export function* userAccountCreationSaga(){
    while (true) {
        const {username, password } = yield take(mutations.REQUEST_USER_ACCOUNT_CREATION);
        try {
            const { data } = yield axios.post(url + `/user/create`, {username,password});

            yield put(mutations.setState({...data.state,session:{id:data.userID}}));
            yield put(mutations.processAuthenticateUser(mutations.AUTHENTICATED));

            history.push('/dashboard');
        } catch (e) {
            yield put(mutations.processAuthenticateUser(mutations.USERNAME_RESERVED));
        }
    }
}

export function* userAuthorizationSaga(){
    while (true){
        yield take(mutations.REQUEST_AUTHORIZATION_USER);

        try {
            const { responseCode, state } = yield service.get(url + `/auth`);

            if (responseCode === 401) {
                throw new Error()
            }

            // if (!responseCode || responseCode !== 200) {
            //     throw new Error()
            // }

            yield put(mutations.setState(state));

        } catch (e) {
            console.log(e);
           history.push('/login');
        }
    }
}

export function* userLogoutSaga(){
    while (true){
        yield take(mutations.REQUEST_LOGOUT_USER);

        try {
            const { responseCode } = yield service.get(url + `/logout`);

            if (!responseCode || responseCode !== 200) {
                throw new Error()
            }

            yield put(mutations.processAuthenticateUser(mutations.NOT_AUTHENTICATED));

            history.push('/login');
        } catch (e) {
            // NOTHING
        }
    }
}

// achievement
export function* achievementGettingSaga(){
    while (true){
        yield take(mutations.GET_ACHIEVEMENT);

        try {
            const response = yield service.get(url + `/achievement/get`);

            const {_id: id, icon, title, description} = response.length ? response[0] : {};

            const mutation = mutations.setAchievement(id, icon, title, description);

            yield put(mutation);
        } catch (e) {
            console.log(e);
        }
    }
}

export function* achievementCreationSaga() {
    while (true){
        try {
            const { icon, title, description } = yield take (mutations.CREATE_ACHIEVEMENT);

            const response = yield service.post(url + `/achievement/create`, {
                icon,
                title,
                description
            });

            const {_id: id} = response.length ? response[0] : {};

            const mutation = mutations.setAchievement(id, icon, title, description);

            yield put(mutation);
        } catch (e) {
            console.log(e);
        }
    }
}

export function* achievementUpdatingSaga() {
    while (true){
        try {
            const { id, icon, title, description } = yield take (mutations.UPDATE_ACHIEVEMENT);

            yield service.post(url + `/achievement/update`, {
                id,
                icon,
                title,
                description
            });

            const mutation = mutations.setAchievement(id, icon, title, description);

            yield put(mutation);
        } catch (e) {
            console.log(e);
        }
    }
}

// education
export function* resumeGettingSaga(){
    while (true){
        yield take(mutations.GET_RESUME)

        try {
            const education = yield service.get(url + `/education/get`)
            const langSkill = yield service.get(url + `/lang-skill/get`)
            const workSkill = yield service.get(url + `/work-skill/get`)
            const workHistory = yield service.get(url + `/work-history/get`)
            
            const imageIds = [...education, ...workHistory].reduce((acc, item) => 
                item.image ? acc.concat([item.image]) : acc, [])

            if (!imageIds.length) {
                yield put(mutations.setResume({
                    langSkill,
                    workSkill,
                    education: education,
                    workHistory: workHistory
                }))
                
                return;
            }

            let images = yield service.post(url + `/file/get`, { ids: imageIds })

            images = (images && images.length) ? images : []
            
            const modifier = (input) => input.reduce((acc, item) => {
                const newAcc = acc
                
                newAcc.push({ 
                    ...item, 
                    image: images.find(image => image.id == item.image) || null 
                }) 

                return newAcc
            }, []) || []

            yield put(mutations.setResume({
                langSkill,
                workSkill,
                education: modifier(education),
                workHistory: modifier(workHistory)
            }))
        } catch (e) {
            console.log(e);
        }
    }
}

export function* resumeUpdatingSaga() {
    while (true) {
        try {
            let uploadResponse = []

            const { 
                uploading, 
                deleting, 
                educationUpdating,
                educationDeleting,
                workHistoryUpdating, 
                workHistoryDeleting,
                langSkillUpdating, 
                langSkillDeleting,
                workSkillUpdating, 
                workSkillDeleting
            } = yield take (mutations.UPDATE_RESUME)
            

            if (deleting && deleting.length) {
                service.post(url + `/file/delete`, { ids: deleting })
            }

            if (uploading && uploading.length) {
                const uploadRequest = []

                uploading.forEach(element => {
                    const uploadingFormData = new FormData()

                    uploadingFormData.append(
                        "file",
                        element.file,
                        element.file.name
                    );

                    uploadRequest.push(service.postMultipart(url + `/file/upload`, uploadingFormData))
                });

                uploadResponse = yield Promise.all(uploadRequest)

                uploadResponse = uploadResponse.map((response, index) => ({ 
                    id: response.id, 
                    elementId: uploading[index].id 
                }))
            }

            if (educationDeleting && educationDeleting.length) {
                service.post(url + `/education/delete`, { ids: educationDeleting })
            }

            if (workHistoryDeleting && workHistoryDeleting.length) {
                service.post(url + `/work-history/delete`, { ids: workHistoryDeleting })
            }

            if (langSkillDeleting && langSkillDeleting.length) {
                service.post(url + `/lang-skill/delete`, { ids: langSkillDeleting })
            }

            if (workSkillDeleting && workSkillDeleting.length) {
                service.post(url + `/work-skill/delete`, { ids: workSkillDeleting })
            }
            
                
            yield service.post(url + `/education/update`, educationUpdating.map(item => {
                const {
                    _id: id, 
                    date, 
                    image,
                    title, 
                    isNew,
                    description
                } = item;

                const found = uploadResponse.find(it => it.elementId === (image && image.id));

                return {
                    id,
                    date, 
                    title, 
                    isNew,
                    description, 
                    image: found ? found.id : image ? image.id : null
                }
            }));

            yield service.post(url + `/work-history/update`, workHistoryUpdating.map(item => {
                const {
                    _id: id, 
                    date, 
                    image,
                    title, 
                    isNew,
                    description
                } = item;

                const found = uploadResponse.find(it => it.elementId === (image && image.id));

                return {
                    id,
                    date, 
                    title, 
                    isNew,
                    description, 
                    image: found ? found.id : image ? image.id : null
                }
            }));

            yield service.post(url + `/work-skill/update`, workSkillUpdating.map(item => {
                const {
                    _id: id, 
                    title, 
                    percent,
                    isNew,
                } = item;

                return {
                    id,
                    title, 
                    percent,
                    isNew,
                }
            }));

            yield service.post(url + `/lang-skill/update`, langSkillUpdating.map(item => {
                const {
                    _id: id, 
                    title, 
                    point,
                    isNew,
                } = item;

                return {
                    id,
                    title, 
                    point,
                    isNew,
                }
            }));

            // TRIGGER RECALL DATA
            yield put(mutations.getResume());
        } catch (e) {
            console.log(e);
        }
    }
}


// job-role
export function* jobRoleGettingSaga(){
    while (true){
        yield take(mutations.GET_JOB_ROLE);

        try {
            const response = yield service.get(url + `/job-role/get`);

            const {_id: id, title} = response.length ? response[0] : {};

            const mutation = mutations.setAchievement(id, title);

            yield put(mutation);
        } catch (e) {
            console.log(e);
        }
    }
}

export function* jobRoleCreationSaga() {
    while (true){
        try {
            const { title } = yield take (mutations.CREATE_JOB_ROLE);

            const response = yield service.post(url + `/job-role/create`, {
                title
            });

            const {_id: id} = response.length ? response[0] : {};

            const mutation = mutations.setAchievement(id, title);

            yield put(mutation);
        } catch (e) {
            console.log(e);
        }
    }
}

export function* jobRoleUpdatingSaga() {
    while (true){
        try {
            const { id, title } = yield take (mutations.UPDATE_JOB_ROLE);

            yield service.post(url + `/job-role/update`, {
                id,
                title,
            });

            const mutation = mutations.setAchievement(id, title);

            yield put(mutation);
        } catch (e) {
            console.log(e);
        }
    }
}


// lang-skill
// export function* langSkillGettingSaga(){
//     while (true){
//         yield take(mutations.GET_LANG_SKILL);

//         try {
//             const response = yield service.get(url + `/lang-skill/get`);

//             const {_id: id, title, point} = response.length ? response[0] : {};

//             const mutation = mutations.setLangSkill(id, title, point);

//             yield put(mutation);
//         } catch (e) {
//             console.log(e);
//         }
//     }
// }

// export function* langSkillCreationSaga() {
//     while (true){
//         try {
//             const { title, point } = yield take (mutations.CREATE_LANG_SKILL);

//             const response = yield service.post(url + `/lang-skill/create`, {
//                 title,
//                 point
//             });

//             const {_id: id} = response.length ? response[0] : {};

//             const mutation = mutations.setLangSkill(id, title, point);

//             yield put(mutation);
//         } catch (e) {
//             console.log(e);
//         }
//     }
// }

// export function* langSkillUpdatingSaga() {
//     while (true){
//         try {
//             const { id, title, point } = yield take (mutations.UPDATE_LANG_SKILL);

//             yield service.post(url + `/lang-skill/update`, {
//                 id,
//                 title,
//                 point
//             });

//             const mutation = mutations.setLangSkill(id, title, point);

//             yield put(mutation);
//         } catch (e) {
//             console.log(e);
//         }
//     }
// }

// portfolio
export function* portfolioGettingSaga(){
    while (true){
        yield take(mutations.GET_PORTFOLIO);

        try {
            const response = yield service.get(url + `/portfolio/get`);

            const imageIds = response.reduce((acc, item) => acc.concat(item.images || []), []);

            let images = yield service.post(url + `/file/get`, { ids: imageIds })
            
            const medium = response.reduce((acc, item) => {
                const newAcc = acc
                
                images = images && images.length ? images : []

                const expect = item.images.map(id => images.find(image => image.id == id)).filter(img => img)

                newAcc.push({ ...item, images: expect })

                return newAcc
            }, []);

            const mutation = mutations.setPortfolio(medium || []);

            yield put(mutation);
        } catch (e) {
            console.log(e);
        }
    }
}

export function* portfolioUpdatingSaga() {
    while (true) {
        try {
            let uploadResponse = []

            const { 
                uploading, 
                deleting, 
                portfoliosUpdating,
                portfoliosDeleting
            } = yield take (mutations.UPDATE_PORTFOLIO)

            if (deleting && deleting.length) {
                service.post(url + `/file/delete`, { ids: deleting })
            }

            if (portfoliosDeleting && portfoliosDeleting.length) {
                service.post(url + `/portfolio/delete`, { ids: portfoliosDeleting })
            }

            if (uploading && uploading.length) {
                const uploadRequest = []

                uploading.forEach(element => {
                    const uploadingFormData = new FormData()

                    uploadingFormData.append(
                        "file",
                        element.file,
                        element.file.name
                    );

                    uploadRequest.push(service.postMultipart(url + `/file/upload`, uploadingFormData))
                });

                uploadResponse = yield Promise.all(uploadRequest)

                uploadResponse = uploadResponse.map((response, index) => ({ 
                    id: response.id, 
                    elementId: uploading[index].id 
                }))
            }

            const payload = portfoliosUpdating.map(item => {
                const {
                    _id: id, 
                    title, 
                    link, 
                    description, 
                    images, 
                    isNew, 
                    type 
                } = item;

                const imagesUpdated = 
                    images
                    .map(img => {
                        const found = uploadResponse.find(it => it.elementId === img.id);
                        return found ? found.id : img.id
                    })
                    .filter(img => img)

                return {
                    id,
                    isNew,
                    title,
                    type,
                    link,
                    description,
                    images: imagesUpdated
                }
            })
    
            
            yield service.post(url + `/portfolio/update`, payload);

            // if (
            //     deleting && deleting.length || 
            //     uploading && uploading.length || 
            //     portfoliosDeleting && portfoliosDeleting.length || 
            //     portfoliosUpdating && portfoliosUpdating.length
            // ) 
            // {
                const mutation = mutations.getPortfolio();
                yield put(mutation);
            // }
        } catch (e) {
            console.log(e);
        }
    }
}


// profile
export function* profileGettingSaga(){
    while (true){
        yield take(mutations.GET_PROFILE);

        try {
            const response = yield service.get(url + `/profile/get`);

            const {_id: id, question, answer, avatar, name, address, greeting, email, phone} = response.length ? response[0] : {};

            const mutation = mutations.setProfile(id, question, answer, avatar, name, address, greeting, email, phone);

            yield put(mutation);
        } catch (e) {
            console.log(e);
        }
    }
}

export function* profileCreationSaga() {
    while (true){
        try {
            const { question, answer, avatar, name, address, greeting, email, phone } = yield take (mutations.CREATE_PROFILE);

            const response = yield service.post(url + `/profile/create`, {
                question,
                answer,
                avatar,
                name,
                address,
                greeting,
                email,
                phone
            });

            const {_id: id} = response.length ? response[0] : {};

            const mutation = mutations.setProfile(id, question, answer, avatar, name, address, greeting, email, phone);

            yield put(mutation);
        } catch (e) {
            console.log(e);
        }
    }
}

export function* profileUpdatingSaga() {
    while (true){
        try {
            const { id, question, answer, avatar, name, address, greeting, email, phone } = yield take (mutations.UPDATE_PROFILE);

            yield service.post(url + `/profile/update`, {
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

            const mutation = mutations.setProfile(id, question, answer, avatar, name, address, greeting, email, phone);

            yield put(mutation);
        } catch (e) {
            console.log(e);
        }
    }
}


// service
export function* serviceGettingSaga(){
    while (true){
        yield take(mutations.GET_SERVICE);

        try {
            const response = yield service.get(url + `/service/get`);

            const {_id: id, icon, title, description} = response.length ? response[0] : {};

            const mutation = mutations.setService(id, icon, title, description);

            yield put(mutation);
        } catch (e) {
            console.log(e);
        }
    }
}

export function* serviceCreationSaga() {
    while (true){
        try {
            const { icon, title, description } = yield take (mutations.CREATE_SERVICE);

            const response = yield service.post(url + `/service/create`, {
                icon,
                title,
                description
            });

            const {_id: id} = response.length ? response[0] : {};

            const mutation = mutations.setService(id, icon, title, description);

            yield put(mutation);
        } catch (e) {
            console.log(e);
        }
    }
}

export function* serviceUpdatingSaga() {
    while (true){
        try {
            const { id, icon, title, description } = yield take (mutations.UPDATE_SERVICE);

            yield service.post(url + `/service/update`, {
                id,
                icon,
                title,
                description
            });

            const mutation = mutations.setService(id, icon, title, description);

            yield put(mutation);
        } catch (e) {
            console.log(e);
        }
    }
}


// social
export function* socialGettingSaga(){
    while (true){
        yield take(mutations.GET_SOCIAL);

        try {
            const response = yield service.get(url + `/social/get`);

            const {_id: id, icon, title, link} = response.length ? response[0] : {};

            const mutation = mutations.setSocial(id, icon, title, link);

            yield put(mutation);
        } catch (e) {
            console.log(e);
        }
    }
}

export function* socialCreationSaga() {
    while (true){
        try {
            const { icon, title, link } = yield take (mutations.CREATE_SOCIAL);

            const response = yield service.post(url + `/social/create`, {
                icon,
                title,
                link
            });

            const {_id: id} = response.length ? response[0] : {};

            const mutation = mutations.setSocial(id, icon, title, link);

            yield put(mutation);
        } catch (e) {
            console.log(e);
        }
    }
}

export function* socialUpdatingSaga() {
    while (true){
        try {
            const { id, icon, title, link } = yield take (mutations.UPDATE_SOCIAL);

            yield service.post(url + `/social/update`, {
                id,
                icon,
                title,
                link
            });

            const mutation = mutations.setSocial(id, icon, title, link);

            yield put(mutation);
        } catch (e) {
            console.log(e);
        }
    }
}


// export function* workHistoryUpdatingSaga() {
//     while (true){
//         try {
//             const { id, date, title, image, description } = yield take (mutations.UPDATE_WORK_HISTORY);

//             yield service.post(url + `/work-history/update`, {
//                 id,
//                 date,
//                 title,
//                 image,
//                 description
//             });

//             const mutation = mutations.setWorkHistory(id, date, title, image, description);

//             yield put(mutation);
//         } catch (e) {
//             console.log(e);
//         }
//     }
// }


// work-skill
// export function* workSkillGettingSaga(){
//     while (true){
//         yield take(mutations.GET_WORK_SKILL);

//         try {
//             const response = yield service.get(url + `/work-skill/get`);

//             const {_id: id, title, percent} = response.length ? response[0] : {};

//             const mutation = mutations.setWorkSkill(id, title, percent);

//             yield put(mutation);
//         } catch (e) {
//             console.log(e);
//         }
//     }
// }

// export function* workSkillCreationSaga() {
//     while (true){
//         try {
//             const { title, percent } = yield take (mutations.CREATE_WORK_SKILL);

//             const response = yield service.post(url + `/work-skill/create`, {
//                 title,
//                 percent
//             });

//             const {_id: id} = response.length ? response[0] : {};

//             const mutation = mutations.setWorkSkill(id, title, percent);

//             yield put(mutation);
//         } catch (e) {
//             console.log(e);
//         }
//     }
// }

// export function* workSkillUpdatingSaga() {
//     while (true){
//         try {
//             const { id, title, percent } = yield take (mutations.UPDATE_WORK_SKILL);

//             yield service.post(url + `/work-skill/update`, {
//                 id,
//                 title,
//                 percent
//             });

//             const mutation = mutations.setWorkSkill(id, title, percent);

//             yield put(mutation);
//         } catch (e) {
//             console.log(e);
//         }
//     }
// }


// setting
export function* settingGettingSaga(){
    while (true){
        yield take(mutations.GET_SETTING);

        try {
            const response = yield service.get(url + `/setting/get`);

            const {
                _id, 
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
                langSkillTitle,
                langSkillSubTitle,
                workSkillTitle,
                workSkillSubTitle,
                contactTitle,
                contactSubtitle,
                contactInfoTitle,
                contactInfoSubtitle,
                socialTitle
            } = response || {};

            const mutation = mutations.setSetting(
                _id, 
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
                langSkillTitle,
                langSkillSubTitle,
                workSkillTitle,
                workSkillSubTitle,
                contactTitle,
                contactSubtitle,
                contactInfoTitle,
                contactInfoSubtitle,
                socialTitle
            );

            yield put(mutation);
        } catch (e) {
            console.log(e);
        }
    }
}

export function* settingCreationSaga() {
    while (true){
        try {
            const { 
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
                langSkillTitle,
                langSkillSubTitle,
                workSkillTitle,
                workSkillSubTitle,
                contactTitle,
                contactSubtitle,
                contactInfoTitle,
                contactInfoSubtitle,
                socialTitle
            } = yield take (mutations.CREATE_SETTING);

            const response = yield service.post(url + `/setting/create`, {
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
                langSkillTitle,
                langSkillSubTitle,
                workSkillTitle,
                workSkillSubTitle,
                contactTitle,
                contactSubtitle,
                contactInfoTitle,
                contactInfoSubtitle,
                socialTitle
            });

            const {_id: id} = response.length ? response[0] : {};

            const mutation = mutations.setSetting(
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
                langSkillTitle,
                langSkillSubTitle,
                workSkillTitle,
                workSkillSubTitle,
                contactTitle,
                contactSubtitle,
                contactInfoTitle,
                contactInfoSubtitle,
                socialTitle
            );

            yield put(mutation);
        } catch (e) {
            console.log(e);
        }
    }
}

export function* settingUpdatingSaga() {
    while (true){
        try {
            const { 
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
                langSkillTitle,
                langSkillSubTitle,
                workSkillTitle,
                workSkillSubTitle,
                contactTitle,
                contactSubtitle,
                contactInfoTitle,
                contactInfoSubtitle,
                socialTitle
            } = yield take (mutations.UPDATE_SETTING);

            yield service.post(url + `/setting/update`, {
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
                langSkillTitle,
                langSkillSubTitle,
                workSkillTitle,
                workSkillSubTitle,
                contactTitle,
                contactSubtitle,
                contactInfoTitle,
                contactInfoSubtitle,
                socialTitle
            });

            const mutation = mutations.setSetting(
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
                langSkillTitle,
                langSkillSubTitle,
                workSkillTitle,
                workSkillSubTitle,
                contactTitle,
                contactSubtitle,
                contactInfoTitle,
                contactInfoSubtitle,
                socialTitle
            );

            yield put(mutation);
        } catch (e) {
            console.log(e);
        }
    }
}