const cards = [...document.querySelectorAll('.incident-card')];
const searchInput = document.getElementById('searchInput');
const zoneFilter = document.getElementById('zoneFilter');
const priorityFilter = document.getElementById('priorityFilter');
const kanbanBoard = document.getElementById('kanbanBoard');
const listView = document.getElementById('listView');
const resultCount = document.getElementById('resultCount');
const modal = document.getElementById('incidentModal');
const toast = document.getElementById('toast');
let selectedCard = null;
let priorityOnly = false;
let toastTimer;

const statusNames = {todo:'Cần làm', doing:'Đang xử lý', review:'Đang nghiệm thu', closed:'Đã đóng'};
const statusClass = {todo:'status-todo', doing:'status-doing', review:'status-review', closed:'status-closed'};

function notify(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}
function filteredCards() {
  const q = searchInput.value.trim().toLocaleLowerCase('vi');
  const zone = zoneFilter.value;
  return cards.filter(card => {
    const matchesText = `${card.dataset.id} ${card.dataset.title} ${card.dataset.zone}`.toLocaleLowerCase('vi').includes(q);
    const matchesZone = zone === 'all' || card.dataset.zone === zone;
    const matchesPriority = !priorityOnly || card.dataset.priority === 'true';
    return matchesText && matchesZone && matchesPriority;
  });
}
function renderList(items) {
  document.getElementById('listRows').innerHTML = items.map(card => `
    <div class="list-row" data-card-id="${card.dataset.id}" tabindex="0">
      <span>${card.dataset.id}</span><b>${card.dataset.title}</b><span>Zone ${card.dataset.zone}</span>
      <span><i class="list-status ${statusClass[card.dataset.status]}">${statusNames[card.dataset.status]}</i></span>
      <span>${card.querySelector('.deadline')?.textContent.replace('● ','') || '—'}</span>
    </div>`).join('');
  document.querySelectorAll('.list-row').forEach(row => {
    const open = () => openCard(cards.find(card => card.dataset.id === row.dataset.cardId));
    row.addEventListener('click', open);
    row.addEventListener('keydown', e => { if (e.key === 'Enter') open(); });
  });
}
function applyFilters() {
  const filtered = filteredCards();
  cards.forEach(card => card.hidden = !filtered.includes(card));
  document.querySelectorAll('.kanban-column').forEach(column => {
    const visible = [...column.querySelectorAll('.incident-card')].filter(card => !card.hidden);
    column.querySelector('.count').textContent = visible.length;
  });
  resultCount.textContent = `Hiển thị ${filtered.length} sự cố · Ưu tiên xử lý sự cố tại công trường`;
  renderList(filtered);
}
function openCard(card) {
  if (!card) return;
  selectedCard = card;
  document.getElementById('modalId').textContent = `MÃ SỰ CỐ ${card.dataset.id}`;
  document.getElementById('modalTitle').textContent = card.dataset.title;
  document.getElementById('modalZone').textContent = `Zone ${card.dataset.zone}`;
  document.getElementById('modalStatus').textContent = statusNames[card.dataset.status];
  document.getElementById('modalAssignee').textContent = card.querySelector('.assignee')?.textContent.trim() || 'Chưa phân công';
  document.getElementById('modalPhoto').src = card.querySelector('img').src;
  document.getElementById('statusSelect').value = card.dataset.status;
  modal.hidden = false;
  document.body.style.overflow = 'hidden';
  document.getElementById('closeModal').focus();
}
function closeModal() {
  modal.hidden = true;
  document.body.style.overflow = '';
}
cards.forEach(card => card.addEventListener('click', () => openCard(card)));
[searchInput, zoneFilter].forEach(el => el.addEventListener('input', applyFilters));
priorityFilter.addEventListener('click', () => {
  priorityOnly = !priorityOnly;
  priorityFilter.classList.toggle('active', priorityOnly);
  applyFilters();
});
document.getElementById('filterButton').addEventListener('click', () => {
  zoneFilter.value = 'all';
  priorityOnly = false;
  priorityFilter.classList.remove('active');
  searchInput.value = '';
  applyFilters();
  notify('Đã xóa các bộ lọc.');
});
document.getElementById('kanbanBtn').addEventListener('click', () => {
  kanbanBoard.hidden = false;
  kanbanBoard.style.display = 'grid';
  listView.hidden = true;
  listView.style.display = 'none';
  document.getElementById('kanbanBtn').classList.add('active');
  document.getElementById('listBtn').classList.remove('active');
});
document.getElementById('listBtn').addEventListener('click', () => {
  kanbanBoard.hidden = true;
  kanbanBoard.style.display = 'none';
  listView.hidden = false;
  listView.style.display = 'block';
  document.getElementById('listBtn').classList.add('active');
  document.getElementById('kanbanBtn').classList.remove('active');
  renderList(filteredCards());
});
document.getElementById('closeModal').addEventListener('click', closeModal);
document.getElementById('cancelModal').addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !modal.hidden) closeModal(); });
document.getElementById('saveStatus').addEventListener('click', () => {
  if (!selectedCard) return;
  const next = document.getElementById('statusSelect').value;
  selectedCard.dataset.status = next;
  const columnOrder = {todo:0, doing:1, review:2, closed:3};
  const destination = document.querySelectorAll('.kanban-column')[columnOrder[next]];
  destination.querySelector('.card-list').appendChild(selectedCard);
  const deadline = selectedCard.querySelector('.deadline');
  if (next === 'closed') {
    deadline.className = 'deadline closed-date';
    deadline.textContent = '● Đã đóng · Vừa cập nhật';
  } else if (next === 'review') {
    deadline.className = 'deadline review-date';
    deadline.textContent = '◉ Chờ nghiệm thu';
  } else if (next === 'doing') {
    deadline.className = 'deadline due';
    deadline.textContent = '● Đang xử lý';
  } else {
    deadline.className = 'deadline due';
    deadline.textContent = '● Chờ phân công';
  }
  document.getElementById('modalStatus').textContent = statusNames[next];
  closeModal();
  applyFilters();
  notify(`Đã cập nhật ${selectedCard.dataset.id}: ${statusNames[next]}.`);
});
document.getElementById('exportBtn').addEventListener('click', () => {
  const rows = [['Mã sự cố','Tiêu đề','Khu vực','Trạng thái','Hạn xử lý']];
  filteredCards().forEach(card => rows.push([
    card.dataset.id, card.dataset.title, `Zone ${card.dataset.zone}`, statusNames[card.dataset.status],
    card.querySelector('.deadline')?.textContent.trim() || ''
  ]));
  const csv = '\ufeff' + rows.map(row => row.map(v => `"${String(v).replaceAll('"','""')}"`).join(',')).join('\r\n');
  const url = URL.createObjectURL(new Blob([csv], {type:'text/csv;charset=utf-8;'}));
  const a = document.createElement('a');
  a.href = url; a.download = 'tien-do-xu-ly-su-co.csv'; a.click();
  URL.revokeObjectURL(url);
  notify('Đã xuất báo cáo CSV.');
});
document.getElementById('menuToggle').addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('open');
});
document.querySelectorAll('.nav-item').forEach(item => item.addEventListener('click', () => {
  document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
  item.classList.add('active');
  if (!item.textContent.includes('Hành động khắc phục')) notify('Mục này đang là giao diện minh họa.');
  document.getElementById('sidebar').classList.remove('open');
}));
document.querySelectorAll('.column-tools button').forEach(button => button.addEventListener('click', () => notify('Tùy chọn cột: chức năng demo.')));
applyFilters();
