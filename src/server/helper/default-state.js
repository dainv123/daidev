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
        greeting: "",
        email: "",
        phone: "",
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
        user: "U1",
        title: "",
        percent: 0
    }],
    socials: [{
        user: "U1",
        title: "",
        icon: "",
        link: ""
    }]
};