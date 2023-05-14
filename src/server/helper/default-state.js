import md5 from 'md5';

export const DefaultState = {
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
        question: "question",
        answer: "answer",
        avatar: "avatar",
        name: "name",
        address: "address",
        greeting: "greeting",
        email: "email",
        phone: "phone",
    }],
    setting: [{
        user: "U1",
        aboutMeTitle: "aboutMeTitle",
        aboutMeSubTitle: "aboutMeSubTitle",
        aboutMeLink: "aboutMeLink",
        servicesTitle: "servicesTitle",
        servicesSubTitle: "servicesSubTitle",
        portfolioTitle: "portfolioTitle",
        portfolioSubTitle: "portfolioSubTitle",
        blogTitle: "blogTitle",
        blogSubTitle: "blogSubTitle",
        blogGithubLink: "blogGithubLink",
        resumeTitle: "resumeTitle",
        resumeSubtitle: "resumeSubtitle",
        workHistoryTitle: "workHistoryTitle",
        workHistorySubTitle: "workHistorySubTitle",
        workHistoryDownloadButtonName: "workHistoryDownloadButtonName",
        educationTitle: "educationTitle",
        educationSubTitle: "educationSubTitle",
        langSkillsTitle: "langSkillsTitle",
        langSkillsSubTitle: "langSkillsSubTitle",
        workSkillsTitle: "workSkillsTitle",
        workSkillsSubTitle: "workSkillsSubTitle",
        contactTitle: "contactTitle",
        contactSubtitle: "contactSubtitle",
        contactInfoTitle: "contactInfoTitle",
        contactInfoSubtitle: "contactInfoSubtitle",
        socialTitle: "socialTitle",
    }],
    jobRoles: [{
        user: "U1",
        title: "title"
    }],
    services: [{
        user: "U1",
        title: "title",
        icon: "icon",
        description: "description"
    }],
    achievements: [{
        user: "U1",
        title: "title",
        icon: "icon",
        description: "description"
    }],
    portfolio: [{
        user: "U1",
        title: "title",
        description: "description",
        link: "link",
        image: "image"
    }],
    workHistory: [{
        user: "U1",
        title: "title",
        date: "date",
        description: "description",
        image: "image",
    }],
    education: [{
        user: "U1",
        title: "title",
        date: "date",
        description: "description",
        image: "image",
    }],
    langSkills: [{
        user: "U1",
        title: "title",
        point: 0,
    }],
    workSkills: [{
        user: "U1",
        title: "title",
        percent: 0
    }],
    socials: [{
        user: "U1",
        title: "title",
        icon: "icon",
        link: "link"
    }]
};