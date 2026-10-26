let forgotPasswordTargetEmail = '';

function handleSendOTP() {
  const email = document.getElementById('fp-email').value.trim().toLowerCase();
  if (!email) {
    showAlert('danger', 'Vui lòng nhập Email tài khoản cần khôi phục!');
    return;
  }

  const accounts = getAccounts();
  const user = accounts.find(a => a.email.toLowerCase() === email);
  if (!user) {
    showAlert('danger', 'Email này chưa được đăng ký trong hệ thống SiteSafe!');
    return;
  }

  forgotPasswordTargetEmail = email;
  document.getElementById('fp-step-1').classList.add('hidden');
  document.getElementById('fp-step-2').classList.remove('hidden');

  document.getElementById('fp-step2-indicator').className = 'p-2 rounded-xl bg-amber-500 text-slate-950 border border-amber-500/30';
  showAlert('info', 'Mã OTP mô phỏng 8888 đã được gửi tới email của bạn!');
}

function handleVerifyOTP() {
  const otp = document.getElementById('fp-otp').value.trim();
  if (otp === '8888') {
    document.getElementById('fp-step-2').classList.add('hidden');
    document.getElementById('fp-step-3').classList.remove('hidden');

    document.getElementById('fp-step3-indicator').className = 'p-2 rounded-xl bg-amber-500 text-slate-950 border border-amber-500/30';
    showAlert('success', 'Xác thực OTP thành công! Vui lòng đặt mật khẩu mới.');
  } else {
    showAlert('danger', 'Mã OTP không đúng! Vui lòng nhập mã 8888.');
  }
}

function handleResetPassword() {
  const newPass = document.getElementById('fp-new-password').value;
  const confirmPass = document.getElementById('fp-confirm-password').value;

  if (newPass.length < 6) {
    showAlert('danger', 'Mật khẩu mới phải có tối thiểu 6 ký tự!');
    return;
  }

  if (newPass !== confirmPass) {
    showAlert('danger', 'Mật khẩu xác nhận không khớp!');
    return;
  }

  const accounts = getAccounts();
  const user = accounts.find(a => a.email.toLowerCase() === forgotPasswordTargetEmail);
  if (user) {
    user.pass = newPass;
    saveAccounts(accounts);

    showAlert('success', 'Đặt lại mật khẩu thành công! Đang chuyển hướng sang trang đăng nhập...');
    
    setTimeout(() => {
      window.location.href = '../login/login.html';
    }, 1500);
  }
}

window.onload = function() {
  getAccounts();
};