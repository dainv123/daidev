import md5 from 'md5';

export const DefaultState = {
    // session: {
    //     authenticated: false
    // },
    users: [{
        id: "U1",
        name: "Dev",
        passwordHash: md5("TUPLES"),
        friends: [`U2`]
    }, {
        id: "U2",
        name: "C. Eeyo",
        passwordHash: md5("PROFITING"),
        friends: []
    }],
    profile: [{
        user: "U1",
        question: "",
        answer: "",
        avatar: "",
        name: "",
        address: "",
        greeting: ""
    }],
    setting: [{
        user: "U1",
        aboutMeTitle: "",
        aboutMeSubTitle: "",
        aboutMeLink: "",
        servicesTitle: "",
        servicesSubTitle: "",
        portfolioTitle: "",
        portfolioSubTitle: "",
        blogTitle: "",
        blogSubTitle: "",
        blogGithubLink: "",
        resumeTitle: "",
        resumeSubtitle: "",
        workHistoryTitle: "",
        workHistorySubTitle: "",
        workHistoryDownloadButtonName: "",
        educationTitle: "",
        educationSubTitle: "",
        langSkillsTitle: "",
        langSkillsSubTitle: "",
        workSkillsTitle: "",
        workSkillsSubTitle: "",
        contactTitle: "",
        contactSubtitle: "",
        contactInfoTitle: "",
        contactInfoSubtitle: "",
        socialTitle: "",
    }],
    jobRoles: [{
        user: "U1",
        title: ""
    }],
    services: [{
        user: "U1",
        title: "",
        icon: "",
        description: ""
    }],
    achievements: [{
        user: "U1",
        title: "",
        icon: "",
        description: ""
    }],
    portfolio: [{
        user: "U1",
        title: "",
        description: "",
        link: "",
        image: ""
    }],
    workHistory: [{
        user: "U1",
        title: "",
        date: "",
        description: "",
        image: "",
    }],
    education: [{
        user: "U1",
        title: "",
        date: "",
        description: "",
        image: "",
    }],
    langSkills: [{
        user: "U1",
        title: "",
        point: 0,
    }],
    workSkills: [{
        id: "U1",
        title: "",
        percent: 0
    }],
    // groups:[{
    //     name:"To Do",
    //     id:"G1",
    //     owner:"U1"
    // },{
    //     name:"Doing",
    //     id:"G2",
    //     owner:"U1"
    // },{
    //     name:"Done",
    //     id:"G3",
    //     owner:"U1"
    // }
    // ],
    // tasks:[{
    //     name:"Refactor tests",
    //     id:"T1",
    //     group:"G1",
    //     owner:"U1",
    //     isComplete:false,
    // },{
    //     name:"Meet with CTO",
    //     id:"T2",
    //     group:"G1",
    //     owner:"U1",
    //     isComplete:true,
    // },{
    //     name:"Compile ES6",
    //     id:"T3",
    //     group:"G2",
    //     owner:"U2",
    //     isComplete:false,
    // },{
    //     name:"Update component snapshots",
    //     id:"T4",
    //     group:"G2",
    //     owner:"U1",
    //     isComplete:true,
    // },{
    //     name:"Production optimizations",
    //     id:"T5",
    //     group:"G3",
    //     owner:"U1",
    //     isComplete:false,
    // }],
    // comments:[{
    //     owner:"U1",
    //     id:"C1",
    //     task:"T1",
    //     content:"Great work!"
    // }]
};