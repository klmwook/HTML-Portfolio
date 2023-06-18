const secs = document.querySelectorAll('section');
const speed = 500;
const baseline = -window.innerHeight / 2;
let enableEvent = true;
let autoScroll = true;
let eventBlocker = null;

const mo_menu = document.querySelector('.btnCall');

mo_menu.addEventListener('click', () => {
	alert('모바일 메뉴 버튼 이벤트 ');
});

window.addEventListener('scroll', () => {
	if (eventBlocker) return;
	eventBlocker = setTimeout(() => {
		//console.log('matchMedia : ' + );
		eventBlocker = null;
	}, speed);
});
