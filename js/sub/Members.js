const wrap = document.querySelector('#Sub_Members .wrap');
const Tab = wrap.querySelector('.Tab_Area');

fnsetMembers();

//데이터를 가져오는 로직
async function fnsetMembers() {
	try {
		const data = await fetch('../../DB/department.json');
		const json = await data.json();

		fnMakeMembers(json.members);
		Tab.classList.add('on');
		//fnCheckLoading();
	} catch (err) {
		console.log('[Error - fnMakeMembers]' + err.message);
	}
}

//innerHTML을 만드는 함수
function fnMakeMembers(arr) {
	try {
		let vHTML = '';

		arr.forEach((data) => {
			vHTML += `
          <li>
          <div class="pic_Area">
            <div class="pic">
              <img src="../../img/sub/${data.pic}" alt="" class="pic_img">
            </div>
          </div>
          <div class="Name">
            ${data.name}
          </div>
          <div class="Position">
          ${data.position}
          </div>
          <div class="SNS_Area">
            <div class="SNS">
              <div class="icon_img1"></div>
            </div>
            <div class="SNS">
              <div class="icon_img2"></div>
            </div>
            <div class="SNS">
              <div class="icon_img3"></div>
            </div>
          </div>
        </li>
      `;
		});

		Tab.innerHTML = vHTML;
	} catch (err) {
		console.log('[Error - fnMakeMembers]' + err.message);
	}
}

function fnCheckLoading() {
	try {
		const cli = Tab.querySelectorAll('li');
		let count = 0;

		for (const el of cli) {
			el.onload = () => {
				console.log(count); //콘솔에 찍히지 않음.
				count++;
				if (count === cli.length) {
					Tab.classList.add('on');
				}
			};
		}
	} catch (err) {
		console.log('[Error - fnCheckLoading]' + err.message);
	}
}
