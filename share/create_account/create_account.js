function handleRegisterSubmit(e) {
  e.preventDefault();
  const role = document.getElementById('reg-role').value;
  const name = document.getElementById('reg-name').value.trim();
  const email = document.getElementById('reg-email').value.trim().toLowerCase();
  const phone = document.getElementById('reg-phone').value.trim();
  const pass = document.getElementById('reg-password').value;
  const confirmPass = document.getElementById('reg-confirm-password').value;

  if (pass !== confirmPass) {
    showAlert('danger', 'Mật khẩu xác nhận không trùng khớp. Vui lòng kiểm tra lại!');
    return;
  }

  const accounts = getAccounts();
  const existing = accounts.find(a => a.email.toLowerCase() === email);
  if (existing) {
    showAlert('danger', 'Email này đã tồn tại trên hệ thống. Vui lòng sử dụng email khác hoặc Đăng nhập.');
    return;
  }

  const svMap = { worker: 'SV1', safety: 'SV2', manager: 'SV3', admin: 'SV3' };
  const newAccount = {
    email: email,
    pass: pass,
    name: name,
    role: role,
    sv: svMap[role],
    phone: phone
  };

  accounts.push(newAccount);
  saveAccounts(accounts);

  showAlert('success', 'Đăng ký tài khoản mới thành công! Đang chuyển hướng sang trang đăng nhập...');
  
  setTimeout(() => {
    window.location.href = '../login/login.html';
  }, 1500);
}

window.onload = function() {
  getAccounts();
};