/**
 * SITESAFE - DÙNG CHUNG MỤC LOGIN / REGISTER / RESET PASSWORD
 * Quản lý LocalStorage tài khoản, thông báo và tiện ích bảo mật
 */

const DEFAULT_ACCOUNTS = [
  {
    email: 'worker@sitesafe.vn',
    pass: '123456',
    name: 'Lê Văn Hùng',
    role: 'worker',
    sv: 'SV1',
    phone: '0912.345.678',
    project: 'Metro Tower - Khu B'
  },
  {
    email: 'safety@sitesafe.vn',
    pass: '123456',
    name: 'Đinh Trọng Tài',
    role: 'safety',
    sv: 'SV2',
    phone: '0988.765.432',
    project: 'Metro Tower - Khu B'
  },
  {
    email: 'manager@sitesafe.vn',
    pass: '123456',
    name: 'Nguyễn Văn Minh',
    role: 'manager',
    sv: 'SV3',
    phone: '0903.888.999',
    project: 'Metro Tower - Khu B'
  },
  {
    email: 'admin@sitesafe.vn',
    pass: '123456',
    name: 'Trần Đình Thắng',
    role: 'admin',
    sv: 'SV4',
    phone: '0977.112.233',
    project: 'Toàn bộ hệ thống SiteSafe'
  }
];

const STORAGE_KEY_ACCOUNTS = 'sitesafe_accounts_db';

function getAccounts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ACCOUNTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_ACCOUNTS, JSON.stringify(DEFAULT_ACCOUNTS));
      return [...DEFAULT_ACCOUNTS];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(STORAGE_KEY_ACCOUNTS, JSON.stringify(DEFAULT_ACCOUNTS));
      return [...DEFAULT_ACCOUNTS];
    }
    return parsed;
  } catch (err) {
    console.error('Lỗi đọc accounts từ localStorage:', err);
    return [...DEFAULT_ACCOUNTS];
  }
}

function saveAccounts(accounts) {
  try {
    localStorage.setItem(STORAGE_KEY_ACCOUNTS, JSON.stringify(accounts));
  } catch (err) {
    console.error('Lỗi ghi accounts vào localStorage:', err);
  }
}

function resetAccountsToDefault() {
  localStorage.setItem(STORAGE_KEY_ACCOUNTS, JSON.stringify(DEFAULT_ACCOUNTS));
  showAlert('success', 'Đã khôi phục danh sách tài khoản demo về mặc định!');
}

function showAlert(type, message) {
  const banner = document.getElementById('alert-banner');
  const icon = document.getElementById('alert-icon');
  const msgEl = document.getElementById('alert-message');

  if (!banner || !icon || !msgEl) {
    alert(message);
    return;
  }

  banner.className = 'mb-4 p-3.5 rounded-xl text-xs font-bold flex items-center justify-between transition-all';

  if (type === 'success') {
    banner.classList.add('bg-emerald-500/15', 'border', 'border-emerald-500/30', 'text-emerald-400');
    icon.className = 'fa-solid fa-circle-check text-emerald-400 text-base';
  } else if (type === 'danger') {
    banner.classList.add('bg-rose-500/15', 'border', 'border-rose-500/30', 'text-rose-400');
    icon.className = 'fa-solid fa-triangle-exclamation text-rose-400 text-base';
  } else {
    banner.classList.add('bg-amber-500/15', 'border', 'border-amber-500/30', 'text-amber-400');
    icon.className = 'fa-solid fa-circle-info text-amber-400 text-base';
  }

  msgEl.textContent = message;
  banner.classList.remove('hidden');
}

function hideAlert() {
  const banner = document.getElementById('alert-banner');
  if (banner) banner.classList.add('hidden');
}

function togglePasswordVisibility(inputId, iconId) {
  const input = document.getElementById(inputId);
  const icon = document.getElementById(iconId);
  if (!input) return;

  if (input.type === 'password') {
    input.type = 'text';
    if (icon) {
      icon.classList.remove('fa-eye');
      icon.classList.add('fa-eye-slash');
    }
  } else {
    input.type = 'password';
    if (icon) {
      icon.classList.remove('fa-eye-slash');
      icon.classList.add('fa-eye');
    }
  }
}

