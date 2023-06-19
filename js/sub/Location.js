const mapContainer = document.querySelector('#map');
const btns = document.querySelectorAll('#map_list li');
const input_area = document.querySelectorAll('.input_Area'); //input 요소
const btn_Submit = document.querySelector('#btn_Submit');
let active_index = 0;

btn_Submit.addEventListener('click', (e) => {
	e.preventDefault();
	// generate a five digit number for the contact_number variable
	document.getElementById('contact-form').contact_number.value = (Math.random() * 100000) | 0;
	// service ID , template ID ,
	emailjs.sendForm('service_Portfolio', 'template_zdeoxxk', document.getElementById('contact-form')).then(
		function () {
			document.getElementById('contact-form').reset();
			alert('이메일 전송이 완료 되었습니다.');
		},
		function (error) {
			alert('이메일 전송이 실패 하였습니다.');
			console.log(`이메일 전송 실패 : ${error}`);
		}
	);
});

//input 요소가 작아서 클릭 하면 focus 되게 했음
input_area.forEach((input, idx) => {
	input.addEventListener('click', () => {
		input.querySelector('input').focus();
	});
});

const markInfo = [
	{
		title: 'Seoul Head Office',
		position: new kakao.maps.LatLng(37.55478486270159, 126.96944912258016),
		imgSrc: 'img/sub/Location_kakaomarker.png',
		imgSize: new kakao.maps.Size(64, 64),
		imgPos: { offset: new kakao.maps.Point(32, 64) },
		button: btns[0],
	},
	{
		title: 'Busan Subsidiary Company',
		position: new kakao.maps.LatLng(35.15944805474844, 129.16135499541983),
		imgSrc: 'img/sub/Location_kakaomarker.png',
		imgSize: new kakao.maps.Size(64, 64),
		imgPos: { offset: new kakao.maps.Point(32, 64) },
		button: btns[1],
	},
	{
		title: 'Deajeon Subsidiary Company',
		position: new kakao.maps.LatLng(36.37514311656888, 127.38133982113746),
		imgSrc: 'img/sub/Location_kakaomarker.png',
		imgSize: new kakao.maps.Size(64, 64),
		imgPos: { offset: new kakao.maps.Point(32, 64) },
		button: btns[2],
	},
];

//MarkerInfo의 첫번째 데이터로 기본 지도 인스턴스 생성
const map = new kakao.maps.Map(mapContainer, { center: markInfo[0].position, level: 3 });

//맵타입 인스턴스 생성후 맵인스턴스에 바인딩
const mapTypeControl = new kakao.maps.MapTypeControl();
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

//맵줌컨트롤 인스턴스 생성후 맵인스턴스에 바인딩
const zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.BOTTOMRIGHT);

markInfo.forEach((info, idx) => {
	const marker = new kakao.maps.Marker({ position: info.position, image: new kakao.maps.MarkerImage(info.imgSrc, info.imgSize, info.imgPos) });
	marker.setMap(map);

	info.button.addEventListener('click', (e) => {
		if (info.button.classList.contains('on')) return;
		for (el of btns) el.classList.remove('on');
		btns[idx].classList.add('on');
		active_index = idx;

		new Anime(window, {
			prop: 'scroll',
			value: document.querySelector('#map').offsetTop - 150,
			duration: 500,
		});

		map.panTo(info.position);
	});
});

//브라우저 리사이즈시 지도 위치 및 마커 가운데 보정
window.addEventListener('resize', () => {
	//현재 활성화 되어 있는 순번의 지역위치값으로 맵 인스턴스 가운데 위치보정
	map.setCenter(markInfo[active_index].position);
});
