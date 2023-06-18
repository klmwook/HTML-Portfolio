const secs = document.querySelectorAll('section');
const speed = 500;
const baseline = -window.innerHeight / 2;
let enableEvent = true;
let eventBlocker = null;
const mo_menu = document.querySelector('.btnCall');

//widdow가 onload 이벤트
window.onload = function () {
	//메인 첫 페이지가 아래라면 맨 위로 올려보내기
	if (window.scrollY > 0) {
		setTimeout(() => {
			window.scrollTo({ top: 0, behavior: 'instant' });
		}, 0);
	}

	//메인화면 인터렉티브 하게 보여지게
	document.querySelector('header').classList.add('on');
	document.querySelector('#visual .right').classList.add('on');
	document.querySelector('#visual .left').classList.add('on');
	document.querySelector('#categories .wrap').classList.add('on');
};

mo_menu.addEventListener('click', () => {
	alert('모바일 메뉴 버튼 이벤트 ');
});

window.addEventListener('scroll', () => {
	_headerFix();
	categories_custom_scroll();
	skills_custom_scroll();
	youtube_custom_scroll();

	// if (eventBlocker) return;
	// eventBlocker = setTimeout(() => {
	// 	eventBlocker = null;
	// }, speed);
});

//모바일에서는 fixed를 안할라고 했는데 생각해보니 해야될 듯.
function _headerFix() {
	const scroll = window.scrollY;

	if (scroll > 0) {
		document.querySelector('header').classList.add('fix');
	} else {
		document.querySelector('header').classList.remove('fix');
	}

	// if (matchMedia('screen and (min-width: 999px)').matches) {
	// 	const scroll = window.scrollY;

	// 	if (scroll > 0) {
	// 		document.querySelector('header').classList.add('fix');
	// 	} else {
	// 		document.querySelector('header').classList.remove('fix');
	// 	}
	// } else {
	// 	//fix 없애기
	// 	document.querySelector('header').classList.remove('fix');
	// }
}

//카테고리 스크롤 위로 나오는 함수
function categories_custom_scroll() {
	const scroll = window.scrollY;
	//let scroll2 = scroll - secs[1].offsetTop - baseline;

	if (scroll > secs[1].offsetTop + baseline) {
		const img_li = secs[1].querySelectorAll('ul.img li');
		img_li.forEach((li) => {
			li.classList.add('on');
		});
	}
}

//카테고리 스크롤 위로 나오는 함수
function skills_custom_scroll() {
	const scroll = window.scrollY;
	//let scroll2 = scroll - secs[1].offsetTop - baseline;

	if (scroll > secs[2].offsetTop + baseline - 100) {
		document.querySelector('#skills .wrap').classList.add('on');
		document.querySelector('#skills .number_area').classList.add('on');
	}
}

//youtube 스크롤 위로 나오는 함수
function youtube_custom_scroll() {
	const scroll = window.scrollY;
	//let scroll2 = scroll - secs[1].offsetTop - baseline;

	if (scroll > secs[3].offsetTop + baseline - 100) {
		document.querySelector('#youtube .wrap').classList.add('on');
	}
}
