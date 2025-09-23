import { SiteSettings } from '../../site-settings/site-settings.schema';

// Comprehensive site settings seed data
export const allSettingsSeed: Partial<SiteSettings>[] = [
  // General Site Settings
  {
    key: 'site_config',
    value: {
      site_name: 'DaiDev Portfolio',
      site_description: 'Professional Web Developer Portfolio',
      site_keywords: 'web developer, portfolio, react, next.js, typescript',
      site_author: 'Dai Nguyen',
      site_version: '1.0.0',
      maintenance_mode: false,
      analytics_enabled: true,
      seo_enabled: true
    },
    tenantId: 'default'
  },

  // Home Page Settings
  {
    key: 'hero_title',
    value: {
      en: "Hello I'm Dai Nguyen",
      vi: "Xin chào, tôi là Đại Nguyễn"
    },
    tenantId: 'default'
  },
  {
    key: 'hero_subtitle',
    value: {
      en: 'Senior Web Developer',
      vi: 'Lập trình viên Web cao cấp'
    },
    tenantId: 'default'
  },
  {
    key: 'hero_description',
    value: {
      en: 'Passionate about creating amazing web experiences with modern technologies',
      vi: 'Đam mê tạo ra những trải nghiệm web tuyệt vời với công nghệ hiện đại'
    },
    tenantId: 'default'
  },
  {
    key: 'typed_strings',
    value: JSON.stringify([
      'Senior Web Developer',
      'Newbie Mobile Developer',
      'and',
      'Culi in Some Backend Languages'
    ]),
    tenantId: 'default'
  },
  {
    key: 'contact_button_text',
    value: {
      en: 'Contact Me',
      vi: 'Liên hệ'
    },
    tenantId: 'default'
  },
  {
    key: 'portfolio_button_text',
    value: {
      en: 'View My Work',
      vi: 'Xem dự án'
    },
    tenantId: 'default'
  },

  // Header Settings
  {
    key: 'header_name',
    value: {
      en: 'Dai Nguyen',
      vi: 'Đại Nguyễn'
    },
    tenantId: 'default'
  },
  {
    key: 'header_title',
    value: {
      en: 'Dai Nguyen',
      vi: 'Đại Nguyễn'
    },
    tenantId: 'default'
  },
  {
    key: 'header_subtitle',
    value: {
      en: 'Professional Web Developer',
      vi: 'Lập trình viên Web chuyên nghiệp'
    },
    tenantId: 'default'
  },
  {
    key: 'header_avatar',
    value: '/assets/images/avatar.jpeg',
    tenantId: 'default'
  },
  {
    key: 'header_typed_strings',
    value: JSON.stringify([
      'Senior Web Developer',
      'Newbie Mobile Developer',
      'and',
      'Culi in Some Backend Languages'
    ]),
    tenantId: 'default'
  },
  {
    key: 'header_menu_items',
    value: JSON.stringify([
      { 
        label: { en: 'Home', vi: 'Trang chủ' }, 
        url: '/', 
        icon: 'fas fa-home', 
        order: 1 
      },
      { 
        label: { en: 'About Me', vi: 'Giới thiệu' }, 
        url: '/about', 
        icon: 'fas fa-user-tie', 
        order: 2 
      },
      { 
        label: { en: 'Resume', vi: 'Sơ yếu lý lịch' }, 
        url: '/resume', 
        icon: 'fas fa-award', 
        order: 3 
      },
      { 
        label: { en: 'Theme', vi: 'Chủ đề' }, 
        url: '/theme', 
        icon: 'fas fa-business-time', 
        order: 4 
      },
      { 
        label: { en: 'Blog', vi: 'Blog' }, 
        url: '/blog', 
        icon: 'fas fa-book-reader', 
        order: 5 
      },
      { 
        label: { en: 'Contact', vi: 'Liên hệ' }, 
        url: '/contact', 
        icon: 'fas fa-paper-plane', 
        order: 6 
      }
    ]),
    tenantId: 'default'
  },
  {
    key: 'header_copyright',
    value: {
      en: '© 2024 All rights reserved.',
      vi: '© 2024 Tất cả quyền được bảo lưu.'
    },
    tenantId: 'default'
  },

  // About Page Settings
  {
    key: 'about_title',
    value: {
      en: 'About Me',
      vi: 'Giới thiệu'
    },
    tenantId: 'default'
  },
  {
    key: 'about_subtitle',
    value: {
      en: 'Professional Web Developer',
      vi: 'Lập trình viên Web chuyên nghiệp'
    },
    tenantId: 'default'
  },
  {
    key: 'about_description',
    value: {
      en: 'I am a passionate web developer with experience in modern web technologies. I love creating beautiful and functional websites that provide great user experiences.',
      vi: 'Tôi là một lập trình viên web đam mê với kinh nghiệm trong các công nghệ web hiện đại. Tôi thích tạo ra những website đẹp và chức năng mang lại trải nghiệm người dùng tuyệt vời.'
    },
    tenantId: 'default'
  },
  {
    key: 'about_name',
    value: { en: 'Dai Nguyen', vi: 'Đại Nguyễn' },
    tenantId: 'default'
  },
  {
    key: 'about_photo',
    value: '/assets/images/about.png',
    tenantId: 'default'
  },
  {
    key: 'about_location',
    value: { en: 'Vietnam, Ho Chi Minh City', vi: 'Việt Nam, TP. Hồ Chí Minh' },
    tenantId: 'default'
  },
  {
    key: 'about_years_exp',
    value: '5+ Years',
    tenantId: 'default'
  },
  {
    key: 'about_projects',
    value: '50+ Projects',
    tenantId: 'default'
  },
  {
    key: 'about_clients',
    value: '30+ Clients',
    tenantId: 'default'
  },
  {
    key: 'about_fun_facts',
    value: JSON.stringify([
      { icon: 'pe-7s-smile', label: { en: 'Happy Clients', vi: 'Khách hàng hài lòng' }, value: 30 },
      { icon: 'pe-7s-cup', label: { en: 'Projects Done', vi: 'Dự án hoàn thành' }, value: 50 },
      { icon: 'pe-7s-coffee', label: { en: 'Cups of Coffee', vi: 'Cốc cà phê' }, value: 1000 },
      { icon: 'pe-7s-clock', label: { en: 'Hours Worked', vi: 'Giờ làm việc' }, value: 5000 }
    ]),
    tenantId: 'default'
  },
  // About Services
  {
    key: 'about_services',
    value: JSON.stringify([
      {
        icon: 'lnr lnr-code',
        title: { en: 'Web Development', vi: 'Phát triển Web' },
        description: {
          en: 'Full-stack web development using modern technologies like React, Next.js, Node.js, and TypeScript. Creating scalable and maintainable web applications.',
          vi: 'Phát triển web full-stack với các công nghệ hiện đại như React, Next.js, Node.js, TypeScript. Xây dựng ứng dụng web mở rộng, dễ bảo trì.'
        }
      },
      {
        icon: 'lnr lnr-laptop-phone',
        title: { en: 'Responsive Design', vi: 'Thiết kế Responsive' },
        description: {
          en: 'Creating beautiful and responsive user interfaces that work perfectly on all devices. Focus on user experience and modern design principles.',
          vi: 'Tạo giao diện đẹp, responsive, hoạt động tốt trên mọi thiết bị. Tập trung vào trải nghiệm người dùng và nguyên tắc thiết kế hiện đại.'
        }
      },
      {
        icon: 'lnr lnr-database',
        title: { en: 'Backend Development', vi: 'Phát triển Backend' },
        description: {
          en: 'Building robust backend systems with Node.js, Express, MongoDB, and other modern technologies. API development and database design.',
          vi: 'Xây dựng hệ thống backend mạnh mẽ với Node.js, Express, MongoDB và các công nghệ hiện đại khác. Phát triển API và thiết kế cơ sở dữ liệu.'
        }
      },
      {
        icon: 'lnr lnr-cog',
        title: { en: 'DevOps & Deployment', vi: 'DevOps & Triển khai' },
        description: {
          en: 'Setting up CI/CD pipelines, cloud deployment, and server management. Ensuring smooth deployment and maintenance of applications.',
          vi: 'Thiết lập CI/CD, triển khai cloud, quản lý server. Đảm bảo triển khai và bảo trì ứng dụng mượt mà.'
        }
      }
    ]),
    tenantId: 'default'
  },
  // About Video Section
  {
    key: 'about_video_section',
    value: {
      title: { en: 'Why Choose Me?', vi: 'Tại sao chọn tôi?' },
      subtitle: {
        en: 'I Am A Full-Stack Developer With Modern Web Technologies',
        vi: 'Tôi là lập trình viên full-stack với công nghệ web hiện đại'
      },
      videoUrl: 'https://your-video-url.com'
    },
    tenantId: 'default'
  },

  // Portfolio Page Settings
  {
    key: 'portfolio_title',
    value: {
      en: 'My Portfolio',
      vi: 'Dự án của tôi'
    },
    tenantId: 'default'
  },
  {
    key: 'portfolio_subtitle',
    value: {
      en: 'Recent Projects',
      vi: 'Dự án gần đây'
    },
    tenantId: 'default'
  },

  // Contact Page Settings
  {
    key: 'contact_title',
    value: {
      en: 'Get In Touch',
      vi: 'Liên hệ'
    },
    tenantId: 'default'
  },
  {
    key: 'contact_subtitle',
    value: {
      en: 'Let\'s work together',
      vi: 'Hãy làm việc cùng nhau'
    },
    tenantId: 'default'
  },
  {
    key: 'contact_description',
    value: {
      en: 'Feel free to reach out if you have any questions or would like to discuss a project.',
      vi: 'Đừng ngại liên hệ nếu bạn có câu hỏi hoặc muốn thảo luận về một dự án.'
    },
    tenantId: 'default'
  },

  // Social Media Settings
  {
    key: 'social_github',
    value: 'https://github.com/dainguyen',
    tenantId: 'default'
  },
  {
    key: 'social_linkedin',
    value: 'https://linkedin.com/in/dainguyen',
    tenantId: 'default'
  },
  {
    key: 'social_twitter',
    value: 'https://twitter.com/dainguyen',
    tenantId: 'default'
  },
  {
    key: 'social_email',
    value: 'dai@daidev.com',
    tenantId: 'default'
  },
  {
    key: 'social_phone',
    value: '+84 123 456 789',
    tenantId: 'default'
  },
  {
    key: 'social_address',
    value: { en: 'Ho Chi Minh City, Vietnam', vi: 'TP. Hồ Chí Minh, Việt Nam' },
    tenantId: 'default'
  },

  // SEO Settings
  {
    key: 'seo_title',
    value: 'DaiDev Portfolio - Professional Web Developer',
    tenantId: 'default'
  },
  {
    key: 'seo_description',
    value: 'Portfolio website showcasing web development projects, themes, and professional experience',
    tenantId: 'default'
  },
  {
    key: 'seo_keywords',
    value: 'web developer, portfolio, themes, react, next.js, typescript',
    tenantId: 'default'
  },
  {
    key: 'seo_author',
    value: 'Dai Nguyen',
    tenantId: 'default'
  },

  // Image Assets Settings
  {
    key: 'resume_icon_image',
    value: '/assets/images/resume/1.png',
    tenantId: 'default'
  },
  {
    key: 'contact_mailbox_image',
    value: '/assets/images/mailbox.png',
    tenantId: 'default'
  }
]; 