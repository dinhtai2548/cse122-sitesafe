/**
 * SITESAFE - USER PROFILE SCRIPT (profile.js)
 * Quản lý tương tác trang Hồ sơ người dùng, chữ ký điện tử và điều hướng Mobile
 */

document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------------------
    // 0. DYNAMIC ROLE SYNCHRONIZATION
    // -------------------------------------------------------------------------
    const PROFILE_ROLES = {
        worker: {
            name: 'Lê Văn Hùng',
            roleTitle: 'Nhân sự hiện trường',
            avatar: 'LH',
            phone: '0912 345 678',
            email: 'worker@sitesafe.vn',
            code: 'NV-2026-088',
            homeLink: '../../worker/safety-checklist/worker-safety-checklist.html',
            certTitle: 'Chứng chỉ An toàn Lao động Nhóm 3 (Nghị định 44/2016/NĐ-CP)',
            certCode: 'Mã ATLĐ-3-09142 · Hiệu lực đến 20/12/2027',
            sigFilename: 'chu-ky-le-van-hung.svg',
            sigDate: '01/03/2026',
            navItems: [
                { title: 'Kiểm tra an toàn', icon: 'fa-solid fa-clipboard-check', link: '../../worker/safety-checklist/worker-safety-checklist.html' },
                { title: 'Báo cáo mối nguy', icon: 'fa-solid fa-triangle-exclamation', link: '../../worker/hazard_create/worker-hazard-create.html' },
                { title: 'Mối nguy của tôi', icon: 'fa-solid fa-folder-open', link: '../../worker/my_hazard/worker-my-hazard.html' }
            ]
        },
        safety: {
            name: 'Đinh Trọng Tài',
            roleTitle: 'Cán bộ An toàn',
            avatar: 'ĐT',
            phone: '0988 765 432',
            email: 'safety@sitesafe.vn',
            code: 'HSE-2026-042',
            homeLink: '../../safety/safety_dashboard/safety_dashboard.html',
            certTitle: 'Chứng chỉ Chuyên gia Giám sát An toàn Lao động (HSE)',
            certCode: 'Mã HSE-2-02864 · Hiệu lực đến 18/08/2027',
            sigFilename: 'chu-ky-dinh-trong-tai.svg',
            sigDate: '18/08/2026',
            navItems: [
                { title: 'Tổng quan an toàn', icon: 'fa-solid fa-chart-pie', link: '../../safety/safety_dashboard/safety_dashboard.html' },
                { title: 'Chi tiết mối nguy', icon: 'fa-solid fa-triangle-exclamation', link: '../../safety/hazard_detail/safety-hazard-detail.html' },
                { title: 'Quản lý kiểm tra', icon: 'fa-solid fa-clipboard-check', link: '../../safety/inspection_management_table/safety-inspection-management_table.html' },
                { title: 'Lịch trình kiểm tra', icon: 'fa-solid fa-calendar-days', link: '../../safety/inspection_management_schedule/safety-inspection-management_schedule.html' }
            ]
        },
        manager: {
            name: 'Nguyễn Văn Minh',
            roleTitle: 'Quản lý công trường',
            avatar: 'NM',
            phone: '0903 888 999',
            email: 'manager@sitesafe.vn',
            code: 'QL-2026-015',
            homeLink: '../../manager/zone_risk_map/manager-zone-risk-map.html',
            certTitle: 'Chứng chỉ Chỉ huy trưởng Công trường Hạng I',
            certCode: 'Mã CHT-1-00812 · Hiệu lực đến 15/05/2028',
            sigFilename: 'chu-ky-nguyen-van-minh.svg',
            sigDate: '10/01/2026',
            navItems: [
                { title: 'Bản đồ rủi ro', icon: 'fa-solid fa-table-cells-large', link: '../../manager/zone_risk_map/manager-zone-risk-map.html' },
                { title: 'Hành động khắc phục', icon: 'fa-solid fa-triangle-exclamation', link: '../../manager/corrective-actions/manager-corrective-actions.html' },
                { title: 'Báo cáo an toàn', icon: 'fa-regular fa-file-lines', link: '../../manager/safety_report/manager-safety-report.html' }
            ]
        },
        admin: {
            name: 'Trần Đình Thắng',
            roleTitle: 'Quản trị viên',
            avatar: 'TT',
            phone: '0977 112 233',
            email: 'admin@sitesafe.vn',
            code: 'ADM-2026-001',
            homeLink: '../../admin/checklist_template/admin-checklist-template-management.html',
            certTitle: 'Chứng chỉ Quản trị Hệ thống Thông tin An toàn SiteSafe',
            certCode: 'Mã ADM-SS-00199 · Vô thời hạn',
            sigFilename: 'chu-ky-tran-dinh-thang.svg',
            sigDate: '01/01/2026',
            navItems: [
                { title: 'Mẫu kiểm tra', icon: 'fa-solid fa-clipboard-list', link: '../../admin/checklist_template/admin-checklist-template-management.html' },
                { title: 'Quản lý khu vực', icon: 'fa-solid fa-map-location-dot', link: '../../admin/zone_management/admin-zone-management.html' },
                { title: 'Quản lý người dùng', icon: 'fa-solid fa-users-gear', link: '../../admin/user-management/admin-user-management.html' }
            ]
        }
    };
    PROFILE_ROLES.supervisor = PROFILE_ROLES.safety;

    const urlParams = new URLSearchParams(window.location.search);
    const activeRoleKey = urlParams.get('role') || localStorage.getItem('sitesafe_current_role') || 'worker';
    const roleData = PROFILE_ROLES[activeRoleKey] || PROFILE_ROLES.worker;
    localStorage.setItem('sitesafe_current_role', activeRoleKey);

    // Cập nhật thông tin profile hiển thị
    const summaryUserName = document.getElementById('summaryUserName');
    if (summaryUserName) summaryUserName.textContent = roleData.name;

    const userNameDisplay = document.getElementById('userNameDisplay');
    if (userNameDisplay) userNameDisplay.textContent = roleData.name;

    const rolePills = document.querySelectorAll('.role-pill, .user-role-badge');
    rolePills.forEach(p => p.textContent = roleData.roleTitle);

    const inputFullName = document.getElementById('inputFullName');
    if (inputFullName) inputFullName.value = roleData.name;

    const inputPhone = document.getElementById('inputPhone');
    if (inputPhone) inputPhone.value = roleData.phone;

    const inputEmail = document.getElementById('inputEmail');
    if (inputEmail) inputEmail.value = roleData.email;

    const certName = document.querySelector('.cert-name');
    if (certName) certName.textContent = roleData.certTitle;

    const certDetails = document.querySelector('.cert-details');
    if (certDetails) certDetails.textContent = roleData.certCode;

    const sigFilename = document.getElementById('sigFilename');
    if (sigFilename) sigFilename.textContent = roleData.sigFilename;

    const footerRightText = document.querySelector('.footer-right-text');
    if (footerRightText) footerRightText.textContent = `${roleData.name} · ${roleData.roleTitle}`;

    const avatarCircles = document.querySelectorAll('.avatar-circle');
    avatarCircles.forEach(a => a.textContent = roleData.avatar);

    // Render danh sách điều hướng Sidebar Desktop & Mobile Drawer theo Role
    const sidebarNavMenu = document.getElementById('sidebarNavMenu');
    if (sidebarNavMenu && roleData.navItems) {
        sidebarNavMenu.innerHTML = roleData.navItems.map(item => `
            <a href="${item.link}" class="menu-item" title="${item.title}">
                <i class="${item.icon} nav-icon"></i>
                <span>${item.title}</span>
            </a>
        `).join('');
    }

    const drawerNavMenuList = document.getElementById('drawerNavMenuList');
    if (drawerNavMenuList && roleData.navItems) {
        drawerNavMenuList.innerHTML = roleData.navItems.map(item => `
            <a href="${item.link}" class="drawer-menu-item" title="${item.title}">
                <i class="${item.icon}"></i>
                <span>${item.title}</span>
            </a>
        `).join('');
    }

    const drawerSectionHeading = document.querySelector('.drawer-section-heading');
    if (drawerSectionHeading) {
        drawerSectionHeading.textContent = roleData.roleTitle.toUpperCase();
    }

    // Cập nhật link logo về trang chủ của role
    const brandLogoLink = document.querySelector('.brand-logo-area a');
    if (brandLogoLink) brandLogoLink.href = roleData.homeLink;
    const mobileLogoLink = document.querySelector('.mobile-logo-link');
    if (mobileLogoLink) mobileLogoLink.href = roleData.homeLink;

    // Cập nhật link thông báo
    const btnDesktopNotification = document.getElementById('btnDesktopNotification');
    const btnMobileNotification = document.getElementById('btnMobileNotification');
    [btnDesktopNotification, btnMobileNotification].forEach(btn => {
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = `../notifications/notifications.html?role=${activeRoleKey}`;
            });
        }
    });

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
                
                // Lưu và đồng bộ tiêu đề trên tất cả các vị trí
                localStorage.setItem('sitesafe_current_project', selectedVal);
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

    // Khởi tạo công trường đã lưu từ localStorage
    const savedProject = localStorage.getItem('sitesafe_current_project') || 'Metro Tower - Khu B';
    const allTitlesInit = [
        document.getElementById('sidebarProjectTitle'),
        document.getElementById('desktopProjectTitle'),
        document.getElementById('mobileProjectTitle'),
        document.getElementById('drawerProjectTitle')
    ];
    allTitlesInit.forEach(t => {
        if (t) t.textContent = savedProject;
    });
    document.querySelectorAll('.dropdown-menu .dropdown-item').forEach(i => {
        if ((i.getAttribute('data-value') || i.textContent.trim()) === savedProject) {
            i.classList.add('active');
        } else {
            i.classList.remove('active');
        }
    });

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
        btnMobileNavToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openMobileDrawer();
        });
    }

    if (btnCloseNavDrawer) {
        btnCloseNavDrawer.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            closeMobileDrawer();
        });
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
