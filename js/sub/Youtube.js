const wrap = document.querySelector('#Sub_Youtube .wrap');

fetchData();

document.body.addEventListener('click', (e) => {
	if (e.target.className === 'thumb') createPop(e.target.getAttribute('alt'));
	if (e.target.className === 'close') removePop();
});

//데이터 fetching 함수
async function fetchData() {
	const key = 'AIzaSyDOsDRuQ_v0ISUQEy6mZdnCfcf3VKIG5uE';
	const list = 'PLGrvPC1Wr19hEuOc58RgKY1uPw_0eoIbE';
	const num = 10;
	const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${list}&key=${key}&maxResults=${num}`;

	const data = await fetch(url);
	const json = await data.json();

	createList(json.items);
}

//동적으로 목록 생성함수
function createList(arr) {
	let tags = '';

	arr.forEach((item) => {
		let tit = item.snippet.title;
		let desc = item.snippet.description;
		let date = item.snippet.publishedAt;
		let channel = item.snippet.videoOwnerChannelTitle;

		tags += `
          <li>
          <div class="you_title">
          ${tit.length > 50 ? tit.substr(0, 50) + '...' : tit}
          </div>
          <div class="you_desc">
            <p>${desc.length > 200 ? desc.substr(0, 200) + '...' : desc}</p>      
						<div class='channel_info'>
							<span class='channel'>${channel}</span>
							<span class='date'>${date.split('T')[0].split('-').join('.')}</span>
						</div>            
          </div>
          <div class="you_thumb">
          <img class='thumb' src=${item.snippet.thumbnails.standard.url} alt=${item.snippet.resourceId.videoId}/>
          </div>
        </li>     
      `;
	});

	wrap.querySelector('#youtube_Result').innerHTML = tags;
}

//동적으로 팝업 생성함수
function createPop(id) {
	const tags = `	
		<div class='con'>
			<iframe src='https://www.youtube.com/embed/${id}'></iframe>
		</div>
		<span class='close'>close</span>	
	`;

	const pop = document.createElement('aside');
	pop.className = 'pop';
	pop.innerHTML = tags;
	document.body.append(pop);
	//특정 코드를 강제로 동기화시키고 싶을 때는 setTimeout에 delay를 0초로 지정해서 코드를 패키징 (강제로 web api에 넘어갔다가 다시 콜스택 제일 마지막에 등록)
	setTimeout(() => document.querySelector('.pop').classList.add('on'), 0);
	document.body.style.overflow = 'hidden';
}

//팝업 제거 함수
function removePop() {
	document.querySelector('.pop').classList.remove('on');
	setTimeout(() => {
		document.querySelector('.pop').remove();
	}, 1000);

	document.body.style.overflow = 'auto';
}
