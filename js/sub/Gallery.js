const wrap = document.querySelector('#Sub_Gallery .contents');
const loading = document.querySelector('#Sub_Gallery .loading');
const input = document.querySelector('.input_Area input');
const btnSearch = document.querySelector('.input_Area button');
const btnInterest = document.querySelector('.button_Area .int');
const btnMine = document.querySelector('.button_Area .my');
const api_key = '4b95b58f2acca136d03e1c6883048c6c';
const num = 50;
const myId = '198489363@N07';

fecthData(setURL('interest'));

//일반 검색
btnSearch.addEventListener('click', getSearch);
input.addEventListener('keypress', (e) => e.code === 'Enter' && getSearch());
btnInterest.addEventListener('click', () => fecthData(setURL('interest')));
btnMine.addEventListener('click', () => fecthData(setURL('user', myId)));

document.body.addEventListener('click', (e) => {
	if (e.target.className == 'userid') fecthData(setURL('user', e.target.innerText));
	if (e.target.className == 'thumb') createPop(e.target.getAttribute('alt'));
	if (e.target.className == 'close') removePop();
});

function setURL(type, opt) {
	const baseURL = `https://www.flickr.com/services/rest/?format=json&nojsoncallback=1&api_key=${api_key}&per_page=${num}&method=`;
	const method_interest = 'flickr.interestingness.getList'; //오늘의 인기있는 이미지
	const method_user = 'flickr.people.getPhotos'; //사용자 유저 이미지
	const method_search = 'flickr.photos.search';

	if (type === 'interest') return `${baseURL}${method_interest}`;
	if (type === 'search') return `${baseURL}${method_search}&tags=${opt}`;
	if (type === 'user') return `${baseURL}${method_search}&user_id=${opt}`;
}

function getSearch() {
	const value = input.value.trim();
	input.value = '';
	if (value === '') return alert('검색어를 입력 해 주세요.');
	fecthData(setURL('search', value));
}

async function fecthData(url) {
	loading.classList.remove('off');
	wrap.classList.remove('on');

	const res = await fetch(url);
	const json = await res.json();
	const items = json.photos.photo;
	if (items.length === 0) {
		wrap.classList.add('on');
		loading.classList.add('off');
		return alert('해당 검색어의 결과이미지가 없습니다.');
	}
	createList(items);
	setLoading();
}

function createList(arr) {
	let tags = '';

	arr.forEach((item) => {
		tags += `
        <li class='item'>
          <div class="Img_Area">
          <img class='thumb' src='https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg' alt='https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_b.jpg'/>
          </div>
          <div class="Img_Title">
            <p>${item.title === '' ? 'Have a Good day!!' : item.title}</p>
          </div>
          <div class="Img_UserInfo">
          <img src='http://farm${item.farm}.staticflickr.com/${item.server}/buddyicons/${item.owner}.jpg' />	
          <span class='userid'>${item.owner}</span>
          </div>
        </li>        
      `;
	});

	wrap.querySelector('ul').innerHTML = tags;
}

function setLoading() {
	const imgs = wrap.querySelector('ul').querySelectorAll('img');

	let count = 0;

	for (const el of imgs) {
		el.onerror = () => {
			el.setAttribute('src', 'https://www.flickr.com/images/buddyicon.gif');
		};

		el.onload = () => {
			count++;
			console.log(count);
			count === imgs.length && isoLayout();
		};
	}
}

function isoLayout() {
	new Isotope(wrap, {
		// options
		itemSelector: '.item',
		transitionDuration: '0.5s',
	});

	wrap.classList.add('on');
	loading.classList.add('off');
}

//레이어 팝업 띄우기
function createPop(url) {
	document.body.style.overflow = 'hidden';
	const aside = document.createElement('aside');
	aside.className = 'pop';
	const tags = `
		<div class='con'>
			<img src='${url}' />
		</div>
		<span class='close'>close</span>
	`;

	aside.innerHTML = tags;
	document.body.append(aside);

	setTimeout(() => document.querySelector('aside').classList.add('on'), 0);
}

function removePop() {
	document.body.style.overflow = 'auto';
	const pop = document.querySelector('.pop');
	pop.classList.remove('on');
	setTimeout(() => {
		pop.remove();
	}, 0);
}
