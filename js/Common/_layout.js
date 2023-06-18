window.addEventListener('scroll', () => {
	_headerFix();
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
