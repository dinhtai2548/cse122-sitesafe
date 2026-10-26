let failedAttemptsCount = 0;

const ROLE_REDIRECT_MAP = {
  worker: '../../worker/safety-checklist/worker-safety-checklist.html',
  safety: '../../safety/safety_dashboard/safety_dashboard.html',
  manager: '../../manager/zone_risk_map/manager-zone-risk-map.html',
  admin: '../../admin/checklist_template/admin-checklist-template-management.html'
};

function fillDemoAccount(role) {
  const demoMap = {
    worker: 'worker@sitesafe.vn',
    safety: 'safety@sitesafe.vn',
    manager: 'manager@sitesafe.vn',
    admin: 'admin@sitesafe.vn'
  };
  document.getElementById('login-email').value = demoMap[role];
  document.getElementById('login-password').value = '123456';
  showAlert('info', `Đã tự động điền tài khoản demo vai trò ${role.toUpperCase()}`);
}

function loginAsRoleDirect(role) {
  const accounts = getAccounts();
  const user = accounts.find(a => a.role === role) || {
    email: `${role}@sitesafe.vn`,
    name: role === 'worker' ? 'Lê Văn Hùng' : role === 'safety' ? 'Đinh Trọng Tài' : role === 'manager' ? 'Nguyễn Văn Minh' : 'Trần Đình Thắng',
    role: role,
    phone: '0912.345.678',
    project: 'Metro Tower - Khu B'
  };

  sessionStorage.setItem('sitesafe_current_user', JSON.stringify(user));
  localStorage.setItem('sitesafe_current_role', role);
  showAlert('success', `Đang đăng nhập với vai trò ${role.toUpperCase()}...`);

  setTimeout(() => {
    window.location.href = ROLE_REDIRECT_MAP[role] || ROLE_REDIRECT_MAP.worker;
  }, 400);
}

function handleLoginSubmit(e) {
  e.preventDefault();
  const emailInput = document.getElementById('login-email').value.trim().toLowerCase();
  const passwordInput = document.getElementById('login-password').value;

  const submitBtn = document.getElementById('login-submit-btn');
  const btnText = document.getElementById('login-btn-text');
  const btnSpinner = document.getElementById('login-btn-spinner');

  submitBtn.disabled = true;
  btnText.classList.add('hidden');
  btnSpinner.classList.remove('hidden');

  setTimeout(() => {
    submitBtn.disabled = false;
    btnText.classList.remove('hidden');
    btnSpinner.classList.add('hidden');

    const accounts = getAccounts();
    const user = accounts.find(acc => acc.email.toLowerCase() === emailInput && acc.pass === passwordInput);

    if (user) {
      failedAttemptsCount = 0;
      sessionStorage.setItem('sitesafe_current_user', JSON.stringify(user));
      localStorage.setItem('sitesafe_current_role', user.role);
      showAlert('success', `Đăng nhập thành công với vai trò ${user.role.toUpperCase()}! Đang chuyển hướng...`);
      
      const targetPage = ROLE_REDIRECT_MAP[user.role] || ROLE_REDIRECT_MAP.worker;
      setTimeout(() => {
        window.location.href = targetPage;
      }, 600);
    } else {
      failedAttemptsCount++;
      triggerShakeAnimation();
      showAlert('danger', `Đăng nhập thất bại! Email hoặc mật khẩu không chính xác. (Đã sai ${failedAttemptsCount} lần)`);
    }
  }, 600);
}

function triggerShakeAnimation() {
  const screen = document.getElementById('form-login-screen');
  if (!screen) return;
  screen.classList.remove('animate-shake');
  void screen.offsetWidth;
  screen.classList.add('animate-shake');
}

window.onload = function() {
  getAccounts();
};
