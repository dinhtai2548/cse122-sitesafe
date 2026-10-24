/**
 * SITESAFE - USER PROFILE SCRIPT (profile.js)
 * Quản lý tương tác trang Hồ sơ người dùng, chữ ký điện tử và điều hướng Mobile
 */

document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------------------
    // 1. Toast Notification Helper
    // -------------------------------------------------------------------------
    const toastPopup = document.getElementById('toastPopup');
    const toastText = document.getElementById('toastText');
    let toastTimer = null;

    function showToast(message, isSuccess = true) {
        if (!toastPopup || !toastText) return;
        toastText.textContent = message;
        const icon = toastPopup.querySelector('.toast-icon');
        if (icon) {
            icon.className = isSuccess ? 'toast-icon fa-solid fa-circle-check' : 'toast-icon fa-solid fa-circle-exclamation';
            icon.style.color = isSuccess ? '#10b981' : '#f59e0b';
        }

        toastPopup.classList.add('show');
        if (toastTimer) clearTimeout(toastTimer);

        toastTimer = setTimeout(() => {
            toastPopup.classList.remove('show');
        }, 3000);
    }

    // -------------------------------------------------------------------------
    // 2. Custom Project Dropdowns (Sidebar, Desktop Topbar, Mobile Header & Drawer)
    // -------------------------------------------------------------------------
    function initDropdown(dropdownId, titleId, optionsId) {
        const dropdown = document.getElementById(dropdownId);
        const title = document.getElementById(titleId);
        const options = document.getElementById(optionsId);

        if (!dropdown || !title || !options) return;

        const trigger = dropdown.querySelector('.dropdown-trigger');
        if (trigger) {
            trigger.addEventListener('click', (e) => {
                e.stopPropagation();
                // Close other open dropdowns
                document.querySelectorAll('.custom-dropdown.open').forEach(el => {
                    if (el !== dropdown) el.classList.remove('open');
                });
                dropdown.classList.toggle('open');
            });
        }

        const items = options.querySelectorAll('.dropdown-item');
        items.forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                const selectedVal = item.getAttribute('data-value') || item.textContent.trim();
                
                // Đồng bộ tiêu đề trên tất cả các vị trí
                const allTitles = [
                    document.getElementById('sidebarProjectTitle'),
                    document.getElementById('desktopProjectTitle'),
                    document.getElementById('mobileProjectTitle'),
                    document.getElementById('drawerProjectTitle')
                ];
                allTitles.forEach(t => {
                    if (t) t.textContent = selectedVal;
                });

                // Cập nhật trạng thái active cho tất cả các menu
                document.querySelectorAll('.dropdown-menu .dropdown-item').forEach(i => {
                    if ((i.getAttribute('data-value') || i.textContent.trim()) === selectedVal) {
                        i.classList.add('active');
                    } else {
                        i.classList.remove('active');
                    }
                });

                document.querySelectorAll('.custom-dropdown.open').forEach(el => el.classList.remove('open'));
                showToast(`Đã chuyển sang công trường: ${selectedVal}`);
            });
        });
    }

    initDropdown('sidebarProjectSelect', 'sidebarProjectTitle', 'sidebarProjectOptions');
    initDropdown('desktopProjectSelect', 'desktopProjectTitle', 'desktopProjectOptions');
    initDropdown('mobileProjectSelect', 'mobileProjectTitle', 'mobileProjectOptions');
    initDropdown('drawerProjectSelect', 'drawerProjectTitle', 'drawerProjectOptions');

    // Close dropdowns on outside click
    document.addEventListener('click', () => {
        document.querySelectorAll('.custom-dropdown.open').forEach(el => el.classList.remove('open'));
    });

    // -------------------------------------------------------------------------
    // 3. Mobile Navigation Drawer (Đồng bộ với các trang khác)
    // -------------------------------------------------------------------------
    const btnMobileNavToggle = document.getElementById('btnMobileNavToggle');
    const mobileNavDrawer = document.getElementById('mobileNavDrawer');
    const mobileNavBackdrop = document.getElementById('mobileNavBackdrop');
    const btnCloseNavDrawer = document.getElementById('btnCloseNavDrawer');

    function openMobileDrawer() {
        if (mobileNavBackdrop) {
            mobileNavBackdrop.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeMobileDrawer() {
        if (mobileNavBackdrop) {
            mobileNavBackdrop.classList.remove('show');
            document.body.style.overflow = '';
        }
    }

    if (btnMobileNavToggle) {
        btnMobileNavToggle.addEventListener('click', openMobileDrawer);
    }

    if (btnCloseNavDrawer) {
        btnCloseNavDrawer.addEventListener('click', closeMobileDrawer);
    }

    if (mobileNavBackdrop) {
        mobileNavBackdrop.addEventListener('click', (e) => {
            if (e.target === mobileNavBackdrop) {
                closeMobileDrawer();
            }
        });
    }

    // -------------------------------------------------------------------------
    // 4. Profile Form Saving & Canceling
    // -------------------------------------------------------------------------
    const profileForm = document.getElementById('profileForm');
    const inputFullName = document.getElementById('inputFullName');
    const inputPhone = document.getElementById('inputPhone');
    const inputEmail = document.getElementById('inputEmail');
    const summaryUserName = document.getElementById('summaryUserName');
    const userNameDisplay = document.getElementById('userNameDisplay');
    const btnCancelChanges = document.getElementById('btnCancelChanges');

    // Initial snapshot values
    const originalData = {
        name: inputFullName ? inputFullName.value : 'Đinh Trọng Tài',
        phone: inputPhone ? inputPhone.value : '0912 486 208',
        email: inputEmail ? inputEmail.value : 'tai.dinh@sitesafe.vn'
    };

    if (profileForm) {
        profileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const newName = inputFullName.value.trim();
            if (newName) {
                if (summaryUserName) summaryUserName.textContent = newName;
                if (userNameDisplay) userNameDisplay.textContent = newName;
                originalData.name = newName;
            }
            originalData.phone = inputPhone.value.trim();
            originalData.email = inputEmail.value.trim();

            showToast('Đã lưu thay đổi thông tin cá nhân thành công!');
        });
    }

    if (btnCancelChanges) {
        btnCancelChanges.addEventListener('click', () => {
            if (inputFullName) inputFullName.value = originalData.name;
            if (inputPhone) inputPhone.value = originalData.phone;
            if (inputEmail) inputEmail.value = originalData.email;
            showToast('Đã hoàn tác các thay đổi chưa lưu.', false);
        });
    }

    // -------------------------------------------------------------------------
    // 5. Avatar Upload & Preview
    // -------------------------------------------------------------------------
    const btnChangeAvatar = document.getElementById('btnChangeAvatar');
    const avatarFileInput = document.getElementById('avatarFileInput');
    const avatarImagePreview = document.getElementById('avatarImagePreview');

    if (btnChangeAvatar && avatarFileInput) {
        btnChangeAvatar.addEventListener('click', () => {
            avatarFileInput.click();
        });

        avatarFileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    if (avatarImagePreview) {
                        avatarImagePreview.src = event.target.result;
                        showToast('Đã cập nhật ảnh đại diện mới!');
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // -------------------------------------------------------------------------
    // 6. Digital Signature Canvas Drawing & Modal
    // -------------------------------------------------------------------------
    const btnUpdateSignature = document.getElementById('btnUpdateSignature');
    const signatureModal = document.getElementById('signatureModal');
    const btnCloseSigModal = document.getElementById('btnCloseSigModal');
    const btnCancelSigModal = document.getElementById('btnCancelSigModal');
    const btnSaveSigModal = document.getElementById('btnSaveSigModal');
    const btnClearCanvas = document.getElementById('btnClearCanvas');
    const sigFileInput = document.getElementById('sigFileInput');
    const signatureCanvas = document.getElementById('signatureCanvas');
    const signatureImagePreview = document.getElementById('signatureImagePreview');
    const sigFilename = document.getElementById('sigFilename');

    let isDrawing = false;
    let canvasCtx = null;

    if (signatureCanvas) {
        canvasCtx = signatureCanvas.getContext('2d');
        canvasCtx.lineWidth = 2.5;
        canvasCtx.lineCap = 'round';
        canvasCtx.lineJoin = 'round';
        canvasCtx.strokeStyle = '#0f172a';

        function startPosition(e) {
            isDrawing = true;
            draw(e);
        }

        function endPosition() {
            isDrawing = false;
            canvasCtx.beginPath();
        }

        function getMousePos(e) {
            const rect = signatureCanvas.getBoundingClientRect();
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            return {
                x: clientX - rect.left,
                y: clientY - rect.top
            };
        }

        function draw(e) {
            if (!isDrawing) return;
            const pos = getMousePos(e);
            canvasCtx.lineTo(pos.x, pos.y);
            canvasCtx.stroke();
            canvasCtx.beginPath();
            canvasCtx.moveTo(pos.x, pos.y);
        }

        // Mouse events
        signatureCanvas.addEventListener('mousedown', startPosition);
        signatureCanvas.addEventListener('mouseup', endPosition);
        signatureCanvas.addEventListener('mousemove', draw);
        signatureCanvas.addEventListener('mouseleave', endPosition);

        // Touch events for mobile
        signatureCanvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            startPosition(e);
        }, { passive: false });
        signatureCanvas.addEventListener('touchend', (e) => {
            e.preventDefault();
            endPosition();
        }, { passive: false });
        signatureCanvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            draw(e);
        }, { passive: false });
    }

    function clearCanvas() {
        if (canvasCtx && signatureCanvas) {
            canvasCtx.clearRect(0, 0, signatureCanvas.width, signatureCanvas.height);
            canvasCtx.beginPath();
        }
    }

    if (btnClearCanvas) {
        btnClearCanvas.addEventListener('click', clearCanvas);
    }

    // File input for signature image upload
    if (sigFileInput) {
        sigFileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const img = new Image();
                    img.onload = () => {
                        clearCanvas();
                        const hRatio = signatureCanvas.width / img.width;
                        const vRatio = signatureCanvas.height / img.height;
                        const ratio = Math.min(hRatio, vRatio, 1);
                        const centerShiftX = (signatureCanvas.width - img.width * ratio) / 2;
                        const centerShiftY = (signatureCanvas.height - img.height * ratio) / 2;
                        canvasCtx.drawImage(img, 0, 0, img.width, img.height,
                            centerShiftX, centerShiftY, img.width * ratio, img.height * ratio);
                    };
                    img.src = event.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    function openSigModal() {
        if (signatureModal) {
            clearCanvas();
            signatureModal.classList.add('active');
            signatureModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeSigModal() {
        if (signatureModal) {
            signatureModal.classList.remove('active');
            signatureModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    }

    if (btnUpdateSignature) {
        btnUpdateSignature.addEventListener('click', openSigModal);
    }

    if (btnCloseSigModal) {
        btnCloseSigModal.addEventListener('click', closeSigModal);
    }

    if (btnCancelSigModal) {
        btnCancelSigModal.addEventListener('click', closeSigModal);
    }

    if (btnSaveSigModal) {
        btnSaveSigModal.addEventListener('click', () => {
            if (signatureCanvas && signatureImagePreview) {
                const dataUrl = signatureCanvas.toDataURL('image/png');
                signatureImagePreview.src = dataUrl;
                if (sigFilename) {
                    sigFilename.textContent = 'chu-ky-moi-cap-nhat.png';
                }
                closeSigModal();
                showToast('Đã lưu chữ ký điện tử mới thành công!');
            }
        });
    }

    // -------------------------------------------------------------------------
    // 7. Security Shortcut & Notifications
    // -------------------------------------------------------------------------
    const btnGoToSecurity = document.getElementById('btnGoToSecurity');
    if (btnGoToSecurity) {
        btnGoToSecurity.addEventListener('click', () => {
            const card = document.getElementById('accountSecurityCard');
            if (card) {
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                card.style.transition = 'box-shadow 0.3s ease, border-color 0.3s ease';
                card.style.borderColor = 'var(--primary-orange)';
                card.style.boxShadow = '0 0 0 3px rgba(255, 107, 0, 0.25)';
                setTimeout(() => {
                    card.style.borderColor = '';
                    card.style.boxShadow = '';
                }, 2000);
            }
            showToast('Tính năng đổi mật khẩu đang mở.');
        });
    }

    const btnDesktopNotification = document.getElementById('btnDesktopNotification');
    const btnMobileNotification = document.getElementById('btnMobileNotification');
    [btnDesktopNotification, btnMobileNotification].forEach(btn => {
        if (btn) {
            btn.addEventListener('click', () => {
                showToast('Không có thông báo an toàn mới cần xử lý.');
            });
        }
    });

    const btnDesktopHelp = document.getElementById('btnDesktopHelp');
    if (btnDesktopHelp) {
        btnDesktopHelp.addEventListener('click', () => {
            showToast('Hotline hỗ trợ an toàn SiteSafe: 1800 6886 (24/7).');
        });
    }

    // Keyboard Shortcut (Ctrl+K or Cmd+K for search)
    window.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            const searchInput = document.getElementById('globalSearchInput');
            if (searchInput) searchInput.focus();
        }
        if (e.key === 'Escape') {
            closeSigModal();
            closeMobileDrawer();
        }
    });
});
