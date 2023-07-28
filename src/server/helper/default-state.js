import md5 from 'md5';

export const DefaultState = {
    user: [{
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
    jobRole: [{
        user: "U1",
        title: "title"
    }],
    service: [{
        user: "U1",
        title: "title",
        icon: "icon",
        description: "description"
    }],
    achievement: [{
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
    langSkill: [{
        user: "U1",
        title: "title",
        point: 0,
    }],
    workSkill: [{
        user: "U1",
        title: "title",
        percent: 0
    }],
    social: [{
        user: "U1",
        title: "title",
        icon: "icon",
        link: "link"
    }]
};