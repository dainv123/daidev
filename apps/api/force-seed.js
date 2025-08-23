const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

// Database connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://admin:your-secure-mongodb-password@mongodb:27017/daidev?authSource=admin';

// Sample user data
const sampleUsers = [
  {
    email: 'admin@daidev.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin',
    tenantId: 'admin-tenant',
    profile: {
      name: 'Admin User',
      bio: { en: 'System Administrator', vi: 'Quản trị viên hệ thống' },
      avatar: '',
      socialLinks: { github: '', linkedin: '', twitter: '' }
    }
  },
  {
    email: 'viewer@default.com',
    password: 'password123',
    name: 'Test User',
    role: 'viewer',
    tenantId: 'default',
    profile: {
      name: 'Test User',
      bio: { en: 'Test user for development', vi: 'Người dùng test cho phát triển' },
      avatar: '',
      socialLinks: { github: '', linkedin: '', twitter: '' }
    }
  },
  {
    email: 'admin@default.com',
    password: 'password123',
    name: 'Test Admin',
    role: 'admin',
    tenantId: 'default',
    profile: {
      name: 'Test Admin',
      bio: { en: 'Test admin for development', vi: 'Admin test cho phát triển' },
      avatar: '',
      socialLinks: { github: '', linkedin: '', twitter: '' }
    }
  }
];

// Sample tags data
const sampleTags = [
  {
    name: 'Design',
    slug: 'design',
    description: { en: 'Web design and UI/UX', vi: 'Thiết kế web và UI/UX' },
    color: '#11d6f0',
    tenantId: 'default'
  },
  {
    name: 'UI/UX',
    slug: 'ui-ux',
    description: { en: 'User Interface and User Experience', vi: 'Giao diện người dùng và trải nghiệm người dùng' },
    color: '#ff6b6b',
    tenantId: 'default'
  },
  {
    name: 'React',
    slug: 'react',
    description: { en: 'React JavaScript library', vi: 'Thư viện JavaScript React' },
    color: '#61dafb',
    tenantId: 'default'
  },
  {
    name: 'CSS',
    slug: 'css',
    description: { en: 'Cascading Style Sheets', vi: 'Cascading Style Sheets' },
    color: '#264de4',
    tenantId: 'default'
  },
  {
    name: 'Frontend',
    slug: 'frontend',
    description: { en: 'Frontend development', vi: 'Phát triển frontend' },
    color: '#f7df1e',
    tenantId: 'default'
  },
  {
    name: 'Backend',
    slug: 'backend',
    description: { en: 'Backend development', vi: 'Phát triển backend' },
    color: '#339933',
    tenantId: 'default'
  },
  {
    name: 'JavaScript',
    slug: 'javascript',
    description: { en: 'JavaScript programming language', vi: 'Ngôn ngữ lập trình JavaScript' },
    color: '#f7df1e',
    tenantId: 'default'
  },
  {
    name: 'Node.js',
    slug: 'nodejs',
    description: { en: 'Node.js runtime environment', vi: 'Môi trường runtime Node.js' },
    color: '#339933',
    tenantId: 'default'
  },
  {
    name: 'Animation',
    slug: 'animation',
    description: { en: 'Web animations and transitions', vi: 'Animation và chuyển đổi web' },
    color: '#ff6b6b',
    tenantId: 'default'
  },
  {
    name: 'Fashion',
    slug: 'fashion',
    description: { en: 'Fashion and lifestyle', vi: 'Thời trang và lối sống' },
    color: '#ff9ff3',
    tenantId: 'default'
  },
  {
    name: 'Lifestyle',
    slug: 'lifestyle',
    description: { en: 'Lifestyle and culture', vi: 'Lối sống và văn hóa' },
    color: '#54a0ff',
    tenantId: 'default'
  },
  {
    name: 'Storytelling',
    slug: 'storytelling',
    description: { en: 'Storytelling and content creation', vi: 'Kể chuyện và tạo nội dung' },
    color: '#5f27cd',
    tenantId: 'default'
  },
  {
    name: 'Trends',
    slug: 'trends',
    description: { en: 'Latest trends and innovations', vi: 'Xu hướng và đổi mới mới nhất' },
    color: '#00d2d3',
    tenantId: 'default'
  },
  {
    name: 'Content',
    slug: 'content',
    description: { en: 'Content creation and management', vi: 'Tạo và quản lý nội dung' },
    color: '#ff9f43',
    tenantId: 'default'
  },
  {
    name: 'Social Media',
    slug: 'social-media',
    description: { en: 'Social media and networking', vi: 'Mạng xã hội và kết nối' },
    color: '#4834d4',
    tenantId: 'default'
  },
  {
    name: 'Web',
    slug: 'web',
    description: { en: 'Web development and technologies', vi: 'Phát triển web và công nghệ' },
    color: '#6c5ce7',
    tenantId: 'default'
  },
  {
    name: 'Real-time',
    slug: 'real-time',
    description: { en: 'Real-time applications and features', vi: 'Ứng dụng và tính năng real-time' },
    color: '#fd79a8',
    tenantId: 'default'
  },
  {
    name: 'Principles',
    slug: 'principles',
    description: { en: 'Design and development principles', vi: 'Nguyên tắc thiết kế và phát triển' },
    color: '#00b894',
    tenantId: 'default'
  }
];

// Sample themes data
const sampleThemes = [
  {
    title: {
      en: 'Modern Portfolio Theme',
      vi: 'Giao diện Portfolio Hiện đại'
    },
    description: {
      en: 'A modern and clean portfolio theme with responsive design and beautiful animations',
      vi: 'Giao diện portfolio hiện đại và sạch sẽ với thiết kế responsive và animation đẹp mắt'
    },
    previewImage: '/assets/images/portfolio/1.jpg',
    category: 'Portfolio',
    tags: [],
    demoUrl: 'https://demo-modern-portfolio.com',
    sourceUrl: 'https://github.com/daidev/modern-portfolio',
    isPublished: true,
    tenantId: 'default'
  },
  {
    title: {
      en: 'Creative Agency Theme',
      vi: 'Giao diện Agency Sáng tạo'
    },
    description: {
      en: 'A creative agency theme with bold design and interactive elements',
      vi: 'Giao diện agency sáng tạo với thiết kế táo bạo và các yếu tố tương tác'
    },
    previewImage: '/assets/images/portfolio/2.jpg',
    category: 'Agency',
    tags: [],
    demoUrl: 'https://demo-creative-agency.com',
    sourceUrl: 'https://github.com/daidev/creative-agency',
    isPublished: true,
    tenantId: 'default'
  },
  {
    title: {
      en: 'E-commerce Theme',
      vi: 'Giao diện Thương mại điện tử'
    },
    description: {
      en: 'A complete e-commerce theme with shopping cart and payment integration',
      vi: 'Giao diện thương mại điện tử hoàn chỉnh với giỏ hàng và tích hợp thanh toán'
    },
    previewImage: '/assets/images/portfolio/3.jpg',
    category: 'E-commerce',
    tags: [],
    demoUrl: 'https://demo-ecommerce.com',
    sourceUrl: 'https://github.com/daidev/ecommerce-theme',
    isPublished: true,
    tenantId: 'default'
  },
  {
    title: {
      en: 'Blog Magazine Theme',
      vi: 'Giao diện Blog Tạp chí'
    },
    description: {
      en: 'A magazine-style blog theme with advanced content management',
      vi: 'Giao diện blog kiểu tạp chí với quản lý nội dung nâng cao'
    },
    previewImage: '/assets/images/portfolio/4.jpg',
    category: 'Blog',
    tags: [],
    demoUrl: 'https://demo-blog-magazine.com',
    sourceUrl: 'https://github.com/daidev/blog-magazine',
    isPublished: true,
    tenantId: 'default'
  },
  {
    title: {
      en: 'Restaurant Theme',
      vi: 'Giao diện Nhà hàng'
    },
    description: {
      en: 'A beautiful restaurant theme with menu management and online ordering',
      vi: 'Giao diện nhà hàng đẹp mắt với quản lý menu và đặt hàng trực tuyến'
    },
    previewImage: '/assets/images/portfolio/5.jpg',
    category: 'Restaurant',
    tags: [],
    demoUrl: 'https://demo-restaurant.com',
    sourceUrl: 'https://github.com/daidev/restaurant-theme',
    isPublished: true,
    tenantId: 'default'
  },
  {
    title: {
      en: 'Education Platform Theme',
      vi: 'Giao diện Nền tảng Giáo dục'
    },
    description: {
      en: 'An educational platform theme with course management and student dashboard',
      vi: 'Giao diện nền tảng giáo dục với quản lý khóa học và dashboard học viên'
    },
    previewImage: '/assets/images/portfolio/6.jpg',
    category: 'Education',
    tags: [],
    demoUrl: 'https://demo-education.com',
    sourceUrl: 'https://github.com/daidev/education-theme',
    isPublished: true,
    tenantId: 'default'
  }
];

// Sample blogs data
const sampleBlogs = [
  {
    title: {
      en: 'Design is not just what it looks like .Design is how it works .',
      vi: 'Thiết kế không chỉ là vẻ bề ngoài. Thiết kế là cách nó hoạt động.'
    },
    content: {
      en: 'Learn the basics of React development and modern web design principles. This comprehensive guide covers everything from component architecture to state management.',
      vi: 'Học những điều cơ bản về phát triển React và nguyên tắc thiết kế web hiện đại. Hướng dẫn toàn diện này bao gồm mọi thứ từ kiến trúc component đến quản lý state.'
    },
    excerpt: {
      en: 'A comprehensive guide to React fundamentals and modern web design',
      vi: 'Hướng dẫn toàn diện về React cơ bản và thiết kế web hiện đại'
    },
    coverImage: '/assets/images/blog/1.jpeg',
    tags: [],
    author: { en: 'Dai Nguyen', vi: 'Đại Nguyễn' },
    slug: 'design-is-how-it-works',
    readTime: 5,
    commentCount: 25,
    likeCount: 18,
    isPublished: true,
    publishedAt: new Date('2024-01-15'),
    tenantId: 'default'
  },
  {
    title: {
      en: 'The new clear blog',
      vi: 'Blog mới rõ ràng'
    },
    content: {
      en: 'Explore advanced CSS features and modern web development techniques. Learn how to create responsive and accessible web applications.',
      vi: 'Khám phá các tính năng CSS nâng cao và kỹ thuật phát triển web hiện đại. Học cách tạo ứng dụng web responsive và accessible.'
    },
    excerpt: {
      en: 'Master modern CSS for better web design and development',
      vi: 'Thành thạo CSS hiện đại để thiết kế và phát triển web tốt hơn'
    },
    coverImage: '/assets/images/blog/2.jpeg',
    tags: [],
    author: { en: 'Dai Nguyen', vi: 'Đại Nguyễn' },
    slug: 'modern-css-techniques',
    readTime: 8,
    commentCount: 42,
    likeCount: 31,
    isPublished: true,
    publishedAt: new Date('2024-01-10'),
    tenantId: 'default'
  },
  {
    title: {
      en: 'Content builder posts',
      vi: 'Bài viết xây dựng nội dung'
    },
    content: {
      en: 'Best practices for Node.js development and backend architecture. Learn about scalable application design and performance optimization.',
      vi: 'Thực hành tốt nhất cho phát triển Node.js và kiến trúc backend. Học về thiết kế ứng dụng có thể mở rộng và tối ưu hóa hiệu suất.'
    },
    excerpt: {
      en: 'Essential practices for scalable Node.js applications',
      vi: 'Thực hành cần thiết cho ứng dụng Node.js có thể mở rộng'
    },
    coverImage: '/assets/images/blog/3.jpeg',
    tags: [],
    author: { en: 'Dai Nguyen', vi: 'Đại Nguyễn' },
    slug: 'nodejs-best-practices',
    readTime: 12,
    commentCount: 38,
    likeCount: 27,
    isPublished: true,
    publishedAt: new Date('2024-01-05'),
    tenantId: 'default'
  },
  {
    title: {
      en: 'Transitions In Design',
      vi: 'Chuyển đổi trong thiết kế'
    },
    content: {
      en: 'Understanding the importance of smooth transitions and animations in modern web design. Learn how to create engaging user experiences.',
      vi: 'Hiểu tầm quan trọng của chuyển đổi mượt mà và animation trong thiết kế web hiện đại. Học cách tạo trải nghiệm người dùng hấp dẫn.'
    },
    excerpt: {
      en: 'Master smooth transitions and animations for better UX',
      vi: 'Thành thạo chuyển đổi mượt mà và animation để UX tốt hơn'
    },
    coverImage: '/assets/images/blog/4.jpeg',
    tags: [],
    author: { en: 'Dai Nguyen', vi: 'Đại Nguyễn' },
    slug: 'transitions-in-design',
    readTime: 7,
    commentCount: 18,
    likeCount: 10,
    isPublished: true,
    publishedAt: new Date('2023-12-20'),
    tenantId: 'default'
  },
  {
    title: {
      en: 'Comfort classy outfits',
      vi: 'Trang phục sang trọng thoải mái'
    },
    content: {
      en: 'Exploring the intersection of fashion and web design. How to create elegant and comfortable user interfaces.',
      vi: 'Khám phá sự giao thoa giữa thời trang và thiết kế web. Cách tạo giao diện người dùng thanh lịch và thoải mái.'
    },
    excerpt: {
      en: 'Create elegant and comfortable user interfaces',
      vi: 'Tạo giao diện người dùng thanh lịch và thoải mái'
    },
    coverImage: '/assets/images/blog/5.jpeg',
    tags: [],
    author: { en: 'Dai Nguyen', vi: 'Đại Nguyễn' },
    slug: 'comfort-classy-outfits',
    readTime: 6,
    commentCount: 50,
    likeCount: 45,
    isPublished: true,
    publishedAt: new Date('2023-12-10'),
    tenantId: 'default'
  },
  {
    title: {
      en: 'Recent trends in story',
      vi: 'Xu hướng gần đây trong câu chuyện'
    },
    content: {
      en: 'Discover the latest trends in storytelling and content creation for web applications.',
      vi: 'Khám phá xu hướng mới nhất trong kể chuyện và tạo nội dung cho ứng dụng web.'
    },
    excerpt: {
      en: 'Latest trends in storytelling and content creation',
      vi: 'Xu hướng mới nhất trong kể chuyện và tạo nội dung'
    },
    coverImage: '/assets/images/blog/6.jpeg',
    tags: [],
    author: { en: 'Dai Nguyen', vi: 'Đại Nguyễn' },
    slug: 'recent-trends-in-story',
    readTime: 9,
    commentCount: 22,
    likeCount: 12,
    isPublished: true,
    publishedAt: new Date('2023-11-25'),
    tenantId: 'default'
  },
  {
    title: {
      en: 'Social media websites',
      vi: 'Các trang web mạng xã hội'
    },
    content: {
      en: 'Building social media platforms with modern web technologies. Learn about real-time features and user engagement.',
      vi: 'Xây dựng nền tảng mạng xã hội với công nghệ web hiện đại. Học về tính năng real-time và tương tác người dùng.'
    },
    excerpt: {
      en: 'Build social media platforms with modern web technologies',
      vi: 'Xây dựng nền tảng mạng xã hội với công nghệ web hiện đại'
    },
    coverImage: '/assets/images/blog/7.jpeg',
    tags: [],
    author: { en: 'Dai Nguyen', vi: 'Đại Nguyễn' },
    slug: 'social-media-websites',
    readTime: 10,
    commentCount: 60,
    likeCount: 55,
    isPublished: true,
    publishedAt: new Date('2023-11-15'),
    tenantId: 'default'
  },
  {
    title: {
      en: 'Design is not just what it looks like .Design is how it works .',
      vi: 'Thiết kế không chỉ là vẻ bề ngoài. Thiết kế là cách nó hoạt động.'
    },
    content: {
      en: 'A deeper look into design principles and how they affect user experience and functionality.',
      vi: 'Cái nhìn sâu hơn về nguyên tắc thiết kế và cách chúng ảnh hưởng đến trải nghiệm người dùng và chức năng.'
    },
    excerpt: {
      en: 'Understanding design principles and user experience',
      vi: 'Hiểu nguyên tắc thiết kế và trải nghiệm người dùng'
    },
    coverImage: '/assets/images/blog/8.jpeg',
    tags: [],
    author: { en: 'Dai Nguyen', vi: 'Đại Nguyễn' },
    slug: 'design-principles-ux',
    readTime: 5,
    commentCount: 35,
    likeCount: 20,
    isPublished: true,
    publishedAt: new Date('2023-11-01'),
    tenantId: 'default'
  }
];

// Sample certificates data
const sampleCertificates = [
  {
    name: {
      en: 'React Developer Certificate',
      vi: 'Chứng chỉ React Developer'
    },
    description: {
      en: 'Certificate for React.js development skills',
      vi: 'Chứng chỉ kỹ năng phát triển React.js'
    },
    issuer: {
      en: 'Meta',
      vi: 'Meta'
    },
    issueDate: new Date('2024-01-15'),
    expiryDate: new Date('2027-01-15'),
    credentialId: 'REACT-2024-001',
    certificateUrl: 'https://example.com/cert/react',
    image: '/assets/images/certificates/react-cert.jpg',
    isPublished: true,
    tenantId: 'default'
  },
  {
    name: {
      en: 'Node.js Developer Certificate',
      vi: 'Chứng chỉ Node.js Developer'
    },
    description: {
      en: 'Certificate for Node.js backend development',
      vi: 'Chứng chỉ phát triển backend Node.js'
    },
    issuer: {
      en: 'OpenJS Foundation',
      vi: 'OpenJS Foundation'
    },
    issueDate: new Date('2023-12-10'),
    expiryDate: new Date('2026-12-10'),
    credentialId: 'NODEJS-2023-002',
    certificateUrl: 'https://example.com/cert/nodejs',
    image: '/assets/images/certificates/nodejs-cert.jpg',
    isPublished: true,
    tenantId: 'default'
  },
  {
    name: {
      en: 'AWS Solutions Architect',
      vi: 'Chứng chỉ AWS Solutions Architect'
    },
    description: {
      en: 'Certificate for AWS cloud architecture',
      vi: 'Chứng chỉ kiến trúc đám mây AWS'
    },
    issuer: {
      en: 'Amazon Web Services',
      vi: 'Amazon Web Services'
    },
    issueDate: new Date('2023-11-20'),
    expiryDate: new Date('2026-11-20'),
    credentialId: 'AWS-SA-2023-003',
    certificateUrl: 'https://example.com/cert/aws',
    image: '/assets/images/certificates/aws-cert.jpg',
    isPublished: true,
    tenantId: 'default'
  },
  {
    name: {
      en: 'MongoDB Developer Certificate',
      vi: 'Chứng chỉ MongoDB Developer'
    },
    description: {
      en: 'Certificate for MongoDB database development',
      vi: 'Chứng chỉ phát triển cơ sở dữ liệu MongoDB'
    },
    issuer: {
      en: 'MongoDB University',
      vi: 'MongoDB University'
    },
    issueDate: new Date('2023-10-15'),
    expiryDate: new Date('2026-10-15'),
    credentialId: 'MONGODB-2023-004',
    certificateUrl: 'https://example.com/cert/mongodb',
    image: '/assets/images/certificates/mongodb-cert.jpg',
    isPublished: true,
    tenantId: 'default'
  }
];

// Sample skills data
const sampleSkills = [
  { name: { en: 'HTML/CSS', vi: 'HTML/CSS' }, level: { en: 'Advanced', vi: 'Nâng cao' }, icon: 'fab fa-html5', stars: 5, isActive: true, tenantId: 'default' },
  { name: { en: 'JavaScript', vi: 'JavaScript' }, level: { en: 'Advanced', vi: 'Nâng cao' }, icon: 'fab fa-js', stars: 5, isActive: true, tenantId: 'default' },
  { name: { en: 'React', vi: 'React' }, level: { en: 'Intermediate', vi: 'Trung bình' }, icon: 'fab fa-react', stars: 4, isActive: true, tenantId: 'default' },
  { name: { en: 'Node.js', vi: 'Node.js' }, level: { en: 'Intermediate', vi: 'Trung bình' }, icon: 'fab fa-node-js', stars: 4, isActive: true, tenantId: 'default' },
  { name: { en: 'TypeScript', vi: 'TypeScript' }, level: { en: 'Intermediate', vi: 'Trung bình' }, icon: 'fab fa-js', stars: 4, isActive: true, tenantId: 'default' },
  { name: { en: 'MongoDB', vi: 'MongoDB' }, level: { en: 'Basic', vi: 'Cơ bản' }, icon: 'fas fa-database', stars: 3, isActive: true, tenantId: 'default' }
];

// Sample languages data
const sampleLanguages = [
  { name: { en: 'English', vi: 'Tiếng Anh' }, level: { en: 'Fluent', vi: 'Thành thạo' }, icon: 'flag-icon-gb', stars: 5, isActive: true, tenantId: 'default' },
  { name: { en: 'Vietnamese', vi: 'Tiếng Việt' }, level: { en: 'Native', vi: 'Bản ngữ' }, icon: 'flag-icon-vn', stars: 5, isActive: true, tenantId: 'default' },
  { name: { en: 'Japanese', vi: 'Tiếng Nhật' }, level: { en: 'Basic', vi: 'Cơ bản' }, icon: 'flag-icon-jp', stars: 2, isActive: true, tenantId: 'default' }
];

// Sample experience data
const sampleExperience = [
  { company: { en: 'Tech Company', vi: 'Công ty Công nghệ' }, position: { en: 'Senior Web Developer', vi: 'Lập trình viên Web cao cấp' }, startDate: new Date('2022-01-01'), endDate: null, description: { en: 'Leading web development projects and mentoring junior developers.', vi: 'Lãnh đạo các dự án phát triển web và hướng dẫn các lập trình viên mới.' }, isActive: true },
  { company: { en: 'Digital Agency', vi: 'Công ty Digital' }, position: { en: 'Web Developer', vi: 'Lập trình viên Web' }, startDate: new Date('2020-01-01'), endDate: new Date('2021-12-31'), description: { en: 'Developed responsive websites and web applications.', vi: 'Phát triển các website responsive và ứng dụng web.' }, isActive: true }
];

// Sample education data
const sampleEducation = [
  { school: { en: 'University of Technology', vi: 'Đại học Công nghệ' }, degree: { en: 'Bachelor of Computer Science', vi: 'Cử nhân Khoa học Máy tính' }, field: { en: 'Computer Science', vi: 'Khoa học Máy tính' }, startDate: new Date('2016-01-01'), endDate: new Date('2020-12-31'), description: { en: 'Studied computer science with focus on web development.', vi: 'Học khoa học máy tính với chuyên ngành phát triển web.' }, isActive: true }
];

// Sample site settings data
const sampleSiteSettings = [
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
  }
];

async function forceSeedDatabase() {
  let client;
  
  try {
    console.log('🌱 Force seeding database...');
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    console.log('✅ Connected to MongoDB');

    const db = client.db();
    const usersCollection = db.collection('users');
    const tagsCollection = db.collection('tags');
    const siteSettingsCollection = db.collection('sitesettings');
    const themesCollection = db.collection('themes');
    const blogsCollection = db.collection('blogs');
    const certificatesCollection = db.collection('certificates');
    const skillsCollection = db.collection('skills');
    const languagesCollection = db.collection('languages');
    const experienceCollection = db.collection('experience');
    const educationCollection = db.collection('education');

    // Clear existing data
    console.log('🧹 Clearing existing data...');
    await usersCollection.deleteMany({});
    await tagsCollection.deleteMany({});
    await siteSettingsCollection.deleteMany({});
    await themesCollection.deleteMany({});
    await blogsCollection.deleteMany({});
    await certificatesCollection.deleteMany({});
    await skillsCollection.deleteMany({});
    await languagesCollection.deleteMany({});
    await experienceCollection.deleteMany({});
    await educationCollection.deleteMany({});

    // Seed users
    console.log('👥 Seeding users...');
    for (const userData of sampleUsers) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      await usersCollection.insertOne({
        ...userData,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

          // Seed tags
      console.log('🏷️ Seeding tags...');
      await tagsCollection.insertMany(sampleTags.map(tag => ({
        ...tag,
        createdAt: new Date(),
        updatedAt: new Date()
      })));

      // Seed themes
      console.log('🎨 Seeding themes...');
      await themesCollection.insertMany(sampleThemes.map(theme => ({
        ...theme,
        createdAt: new Date(),
        updatedAt: new Date()
      })));

      // Seed blogs
      console.log('📝 Seeding blogs...');
      await blogsCollection.insertMany(sampleBlogs.map(blog => ({
        ...blog,
        createdAt: new Date(),
        updatedAt: new Date()
      })));

      // Seed certificates
      console.log('🏆 Seeding certificates...');
      await certificatesCollection.insertMany(sampleCertificates.map(cert => ({
        ...cert,
        createdAt: new Date(),
        updatedAt: new Date()
      })));

      // Seed skills
      console.log('💪 Seeding skills...');
      await skillsCollection.insertMany(sampleSkills.map(skill => ({
        ...skill,
        createdAt: new Date(),
        updatedAt: new Date()
      })));

      // Seed languages
      console.log('🌍 Seeding languages...');
      await languagesCollection.insertMany(sampleLanguages.map(lang => ({
        ...lang,
        createdAt: new Date(),
        updatedAt: new Date()
      })));

      // Seed experience
      console.log('💼 Seeding experience...');
      await experienceCollection.insertMany(sampleExperience.map(exp => ({
        ...exp,
        createdAt: new Date(),
        updatedAt: new Date()
      })));

      // Seed education
      console.log('🎓 Seeding education...');
      await educationCollection.insertMany(sampleEducation.map(edu => ({
        ...edu,
        createdAt: new Date(),
        updatedAt: new Date()
      })));

      // Seed site settings
      console.log('⚙️ Seeding site settings...');
      await siteSettingsCollection.insertMany(sampleSiteSettings.map(setting => ({
        ...setting,
        createdAt: new Date(),
        updatedAt: new Date()
      })));

      console.log('✅ Force seed completed successfully!');
      console.log('\n📊 Sample data created:');
      console.log(`- Users: ${sampleUsers.length}`);
      console.log(`- Tags: ${sampleTags.length}`);
      console.log(`- Themes: ${sampleThemes.length}`);
      console.log(`- Blogs: ${sampleBlogs.length}`);
      console.log(`- Certificates: ${sampleCertificates.length}`);
      console.log(`- Skills: ${sampleSkills.length}`);
      console.log(`- Languages: ${sampleLanguages.length}`);
      console.log(`- Experience: ${sampleExperience.length}`);
      console.log(`- Education: ${sampleEducation.length}`);
      console.log(`- Site Settings: ${sampleSiteSettings.length}`);
    console.log('\n🔑 Login credentials:');
    console.log('Admin: admin@daidev.com / admin123');
    console.log('User: viewer@default.com / password123');
    console.log('Admin (default): admin@default.com / password123');

  } catch (error) {
    console.error('❌ Error force seeding database:', error);
  } finally {
    if (client) {
      await client.close();
      console.log('🔌 Disconnected from MongoDB');
    }
  }
}

// Run the force seed function
forceSeedDatabase(); 