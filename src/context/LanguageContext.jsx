/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const translations = {
  en: {
    // Navigation
    home: 'HOME',
    profile: 'PROFILE',
    skills: 'SKILLS',
    projects: 'PROJECTS',
    achievements: 'ACHIEVEMENTS',
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
    
    reached_level: 'MISSION_LOG: Kazuki Delta reached Level {level}.',
    just_now: 'Just now',
    mins_ago: '10 mins ago',
    
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
    profile_subtitle: 'Content Creator & Streamer',
    profile_bio: "I love calling my viewers 'Vari' (short for variables in programming). Because to me, every single viewer represents a unique and special value.",

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
    channels: 'SECURE_CHANNELS // PICK ONE',
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
    
    reached_level: 'NHẬT_KÝ_NHIỆM_VỤ: Kazuki Delta đã đạt Cấp độ {level}.',
    just_now: 'Vừa xong',
    mins_ago: '10 phút trước',
    
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
    profile_subtitle: 'Content Creator & Streamer',
    profile_bio: 'Mình thích gọi Viewer là Vari (variables), nó có nghĩa là biến trong lập trình. Bởi vì mỗi Viewer của mình luôn tượng trưng cho 1 giá trị đặc biệt đối với bản thân mình.',

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
    channels: 'KÊNH LIÊN HỆ // CHỌN MỘT',
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
