import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const translations = {
  en: {
    // Navigation
    home: 'HOME',
    profile: 'PROFILE',
    skills: 'SKILLS',
    projects: 'PROJECTS',
    achievements: 'ACHIEVEMENTS',
    photography: 'PHOTOGRAPHY',
    gear: 'GEAR',
    contact: 'CONTACT',

    // Main / Welcome
    welcome_to: 'WELCOME TO THE DIGITAL PORTFOLIO OF',
    view_projects: 'VIEW PROJECTS',
    get_in_touch: 'GET IN TOUCH',
    uptime: 'UPTIME: 99.98% // SYSTEM SECURE',
    database_logs: 'DATABASE LOGS',
    system_status: 'SYSTEM_STATUS: ONLINE _ Securing network tunnels...',
    db_connection: 'DATABASE: Connection established with Neo Tokyo Sector 4.',
    visual_archive: 'VISUAL_ARCHIVE: Synchronized with Sony a6400 camera.',
    reached_level: 'MISSION_LOG: Kazuki Delta reached Level {level}.',
    just_now: 'Just now',
    mins_ago: '10 mins ago',
    hour_ago: '1 hour ago',
    hours_ago: '2 hours ago',
    repositories: 'REPOSITORIES',
    stars_earned: 'STARS EARNED',
    contributions: 'CONTRIBUTIONS',
    commits: 'COMMITS',
    total_projects: 'TOTAL PROJECTS',
    featured_projects: 'FEATURED PROJECTS',
    view_all_projects: 'VIEW ALL PROJECTS',

    // Profile
    profile_title: 'PROFILE',
    profile_subtitle: 'Full Stack Dev & Cyber Security',
    profile_bio: 'Welcome to my digital realm. I am a passionate developer specializing in building immersive web applications and exploring the deep fields of cyber security. Outside of code, I love gaming, capturing breathtaking landscape photography, and admiring majestic sceneries. I love to code when I am feeling down or super sad.',

    // Skills
    skills_title: 'SKILL MATRIX',

    // Projects
    projects_title: 'NEURAL PROJECTS',
    establishing_uplink: '_ ESTABLISHING GITHUB UPLINK...',
    no_description: 'No description provided in database.',

    // Achievements
    achievements_title: 'HALL OF FAME',
    it_prize_title: 'IT Excellence Prize',
    it_prize_desc: 'City-level Excellence Student in IT (Middle School & High School)',
    english_prize_title: 'English Contest 3rd Prize',
    english_prize_desc: 'City-level IOE English Contest 3rd Prize (Grade 10 & 11)',
    more_coming: 'System upgrade in progress. More files incoming...',

    // Gear
    gear_title: 'MY GEAR',
    camera: 'CAMERA',
    devices: 'DEVICES',
    gaming: 'GAMING',
    active_workstation: 'Active Workstation',
    
    // Contact
    contact_title: 'SECURE LINK',
    contact_desc: 'Open for opportunities and collaborations. Establish a secure connection through the channels below.',
    location: 'Vietnam',
    copyright: '© 2024 Kazuki Delta. All rights reserved.'
  },
  vi: {
    // Navigation
    home: 'TRANG CHỦ',
    profile: 'GIỚI THIỆU',
    skills: 'KỸ NĂNG',
    projects: 'DỰ ÁN',
    achievements: 'THÀNH TÍCH',
    photography: 'HÌNH ẢNH',
    gear: 'THIẾT BỊ',
    contact: 'LIÊN HỆ',

    // Main / Welcome
    welcome_to: 'CHÀO MỪNG ĐẾN VỚI HỒ SƠ NĂNG LỰC CỦA',
    view_projects: 'XEM DỰ ÁN',
    get_in_touch: 'LIÊN HỆ NGAY',
    uptime: 'HOẠT ĐỘNG: 99.98% // HỆ THỐNG AN TOÀN',
    database_logs: 'NHẬT KÝ HỆ THỐNG',
    system_status: 'TRẠNG_THÁI_HỆ_THỐNG: TRỰC TUYẾN _ Đang bảo mật đường truyền...',
    db_connection: 'CƠ_SỞ_DỮ_LIỆU: Đã kết nối với Phân khu Neo Tokyo 4.',
    visual_archive: 'KHO_HÌNH_ẢNH: Đã đồng bộ với máy ảnh Sony a6400.',
    reached_level: 'NHẬT_KÝ_NHIỆM_VỤ: Kazuki Delta đã đạt Cấp độ {level}.',
    just_now: 'Vừa xong',
    mins_ago: '10 phút trước',
    hour_ago: '1 giờ trước',
    hours_ago: '2 giờ trước',
    repositories: 'KHO CHỨA CODE',
    stars_earned: 'LƯỢT YÊU THÍCH',
    contributions: 'ĐÓNG GÓP',
    commits: 'LƯỢT COMMITS',
    total_projects: 'TỔNG DỰ ÁN',
    featured_projects: 'DỰ ÁN TIÊU BIỂU',
    view_all_projects: 'XEM TẤT CẢ DỰ ÁN',

    // Profile
    profile_title: 'HỒ SƠ CÁ NHÂN',
    profile_subtitle: 'Lập trình viên Full Stack & An ninh mạng',
    profile_bio: 'Chào mừng bạn đến với thế giới kỹ thuật số của tôi. Tôi là một nhà phát triển đầy nhiệt huyết, chuyên xây dựng các ứng dụng web chuyên sâu và khám phá lĩnh vực an ninh mạng. Ngoài việc viết code, tôi yêu thích chơi game, chụp ảnh phong cảnh thiên nhiên và chiêm ngưỡng những cảnh đẹp hùng vĩ. Tôi thích code khi tôi có tâm trạng chán nản hoặc siêu buồn bã.',

    // Skills
    skills_title: 'BẢNG KỸ NĂNG',

    // Projects
    projects_title: 'DANH SÁCH DỰ ÁN',
    establishing_uplink: '_ ĐANG THIẾT LẬP KẾT NỐI GITHUB...',
    no_description: 'Không có mô tả trong cơ sở dữ liệu.',

    // Achievements
    achievements_title: 'BẢNG VÀNG THÀNH TÍCH',
    it_prize_title: 'Giải học sinh giỏi Tin học',
    it_prize_desc: 'Học sinh giỏi cấp Thành phố môn Tin học (Cấp 2 & Cấp 3)',
    english_prize_title: 'Giải Ba cuộc thi Tiếng Anh',
    english_prize_desc: 'Giải Ba cuộc thi Tiếng Anh IOE cấp Thành phố (Lớp 10 & 11)',
    more_coming: 'Đang nâng cấp hệ thống. Nhiều tệp tin mới sắp được tải lên...',

    // Gear
    gear_title: 'THIẾT BỊ CỦA TÔI',
    camera: 'MÁY ẢNH',
    devices: 'THIẾT BỊ',
    gaming: 'GAMING',
    active_workstation: 'Trạm làm việc hiện tại',

    // Contact
    contact_title: 'KẾT NỐI BẢO MẬT',
    contact_desc: 'Tôi luôn sẵn sàng cho các cơ hội hợp tác và dự án mới. Hãy kết nối với tôi qua các kênh bên dưới nhé.',
    location: 'Việt Nam',
    copyright: '© 2024 Kazuki Delta. Bảo lưu mọi quyền.'
  }
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('vi');

  const toggleLanguage = () => {
    setLang(prev => (prev === 'vi' ? 'en' : 'vi'));
  };

  const t = (key, params = {}) => {
    let text = translations[lang]?.[key] || translations['en']?.[key] || key;
    Object.keys(params).forEach(param => {
      text = text.replace(`{${param}}`, params[param]);
    });
    return text;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    return { lang: 'vi', toggleLanguage: () => {}, t: (k) => k };
  }
  return context;
};
