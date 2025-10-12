data = {
	"time": 1760258442196,
	"logs": [{
		"type": "round",
		"round": 1,
		"honnba": 0,
		"kyoutaku": 0
	}, {
		"type": "reach",
		"player": 1
	}, {
		"type": "tsumo",
		"score": {
			"1": 12000,
			"2": -4000,
			"3": -4000,
			"4": -4000
		}
	}, {
		"type": "agari_kyoutaku",
		"player": 1,
		"score": 1000
	}, {
		"type": "round",
		"round": 1,
		"honnba": 1,
		"kyoutaku": 0
	}, {
		"type": "reach",
		"player": 2
	}, {
		"type": "ron",
		"score": {
			"1": -8300,
			"2": 8300
		}
	}, {
		"type": "agari_kyoutaku",
		"player": 2,
		"score": 1000
	}, {
		"type": "round",
		"round": 2,
		"honnba": 0,
		"kyoutaku": 0
	}, {
		"type": "howannpai_ryuukyoku",
		"score": {
			"1": 1500,
			"2": -1500,
			"3": -1500,
			"4": 1500
		}
	}, {
		"type": "round",
		"round": 3,
		"honnba": 1,
		"kyoutaku": 0
	}, {
		"type": "howannpai_ryuukyoku",
		"score": {
			"1": 0,
			"2": 0,
			"3": 0,
			"4": 0
		}
	}, {
		"type": "ryuumann",
		"score": {
			"4": -4000
		}
	}, {
		"type": "round",
		"round": 4,
		"honnba": 2,
		"kyoutaku": 0
	}, {
		"type": "chuuto_ryuukyoku"
	}, {
		"type": "round",
		"round": 4,
		"honnba": 3,
		"kyoutaku": 0
	}, {
		"type": "tsumo",
		"score": {
			"1": 2500,
			"2": -700,
			"3": -700,
			"4": -1100
		}
	}, {
		"type": "round",
		"round": 5,
		"honnba": 0,
		"kyoutaku": 0
	}, {
		"type": "howannpai_ryuukyoku",
		"score": {
			"1": 0,
			"2": 0,
			"3": 0,
			"4": 0
		}
	}, {
		"type": "round",
		"round": 6,
		"honnba": 1,
		"kyoutaku": 0
	}, {
		"type": "howannpai_ryuukyoku",
		"score": {
			"1": 0,
			"2": 0,
			"3": 0,
			"4": 0
		}
	}, {
		"type": "round",
		"round": 7,
		"honnba": 2,
		"kyoutaku": 0
	}, {
		"type": "howannpai_ryuukyoku",
		"score": {
			"1": 0,
			"2": 0,
			"3": 0,
			"4": 0
		}
	}, {
		"type": "round",
		"round": 8,
		"honnba": 3,
		"kyoutaku": 0
	}, {
		"type": "howannpai_ryuukyoku",
		"score": {
			"1": 0,
			"2": 0,
			"3": 0,
			"4": 0
		}
	}, {
		"type": "round",
		"round": 9,
		"honnba": 4,
		"kyoutaku": 0
	}, {
		"type": "player_info",
		"player": [{
			"id": 1,
			"name": "AA",
			"score": 30700,
			"rank": 1,
			"point": 507
		}, {
			"id": 2,
			"name": "BB",
			"score": 25100,
			"rank": 3,
			"point": -149
		}, {
			"id": 3,
			"name": "CC",
			"score": 14800,
			"rank": 4,
			"point": -452
		}, {
			"id": 4,
			"name": "DD",
			"score": 29400,
			"rank": 2,
			"point": 94
		}]
	}]
}

player_name = ['', '未命名', '未命名', '未命名', '未命名']

function round_kanji(n) {
	let s = '东'
	if (n >= 5) s = '南';
	let p = (n - 1) % 4 + 1;
	switch (p) {
		case 1:
			s += '一'
			break
		case 2:
			s += '二'
			break
		case 3:
			s += '三'
			break
		case 4:
			s += '四'
			break
	}
	return s;
}

function err(s) {
	console.log(s)
	document.querySelector("#mainpage .log p").innerHTML = s
	document.querySelector("#mainpage .log p").classList.add('err')
}

var selected_round = 1,
	selected_honnba = 0,
	selected_kyoutaku = 0,
	selected_gid = 1;

function exe() {
	if (!('logs' in data)) {
		err('严重错误：data 不存在 logs')
	}
	document.querySelector('#mainpage .rounds>ul').innerHTML = ''
	let round_num = 0
	for (let i = 0; i < data.logs.length; i++) {
		let info = data.logs[i]
		if (info.type == "round") {
			if (info.round > 8) continue;
			round_num += 1
			let elem = document.createElement('li')
			elem.innerHTML = `<div class="title"><p>${round_kanji(info.round)}局 ${info.honnba}本场</p><span>${info.kyoutaku}供托</span></div>
				<div class="enter"><i class="fa-solid fa-bars"></i></div>`
			document.querySelector('#mainpage .rounds>ul').appendChild(elem)
			elem.querySelector('.title').addEventListener('click', () => {
				document.querySelectorAll('#mainpage .rounds ul li').forEach(x => x.classList.remove(
					'selected'))
				elem.classList.add('selected')
				document.querySelector('#mainpage .selround>.itt').innerHTML =
					`${round_kanji(info.round)}局 ${info.honnba}本场`
				selected_round = info.round
				selected_honnba = info.honnba
				selected_kyoutaku = info.kyoutaku
				selected_gid = i
			})
			elem.querySelector('.enter').addEventListener('click', () => {
				detailed(i)
			})

		}
	}
	if (round_num > 0) {
		document.querySelector('#mainpage .rounds ul li').click()
	}
}
exe()
document.querySelector('#mainpage .header .rename').addEventListener('click', () => {
	let temp = [{
		'text': '东起',
		'value': player_name[1]
	}, {
		'text': '南起',
		'value': player_name[2]
	}, {
		'text': '西起',
		'value': player_name[3]
	}, {
		'text': '北起',
		'value': player_name[4]
	}]
	popup('选手名设定', temp, (signal, rec_temp) => {
		if (!signal) return
		for (let i = 0; i < 4; i++) {
			player_name[i + 1] = rec_temp[i].value
			document.querySelectorAll('#mainpage .score ul li span.name')[i].innerHTML = player_name[i +
				1]
		}
	})
	console.log(temp)
})
document.querySelector("#mainpage .selround .setting").addEventListener('click', () => {
	let temp = [{
		'text': '风（1~8）',
		'value': selected_round
	}, {
		'text': '本场数',
		'value': selected_honnba
	}, {
		'text': '供托数',
		'value': selected_kyoutaku
	}]
	popup('风·本场·供托修正', temp, (signal, rec_temp) => {
		if (!signal) return
		let round_num = 0
		data.logs[selected_gid].round = rec_temp[0].value
		data.logs[selected_gid].honnba = rec_temp[1].value
		data.logs[selected_gid].kyoutaku = rec_temp[2].value
		exe()
	})
})
document.querySelector("#mainpage .selround .delete").addEventListener('click', () => {
	popup(`删除本局<br/>${round_kanji(selected_round)}局 ${selected_honnba}本场<br/>! 不可恢复 !`, [], (signal,
		rec_temp) => {
		if (!signal) return
		data.logs.splice(selected_gid, 1)
		exe()
	}, danger = true)
})
var olli=document.querySelectorAll('body>ol>li')
function wap(n){
	
	for(let i=0;i<olli.length;i++){
		if(i==n)olli[i].style.display='block'
		else olli[i].style.display='none'
	}
}
wap(0)
function detailed(round_gid) {
	let te = data.logs[round_gid]
	document.querySelector('#rnd .datas ul').innerHTML = ''
	document.querySelector('#rnd .datas>h1 span').innerHTML = `${round_kanji(te.round)}局 ${te.honnba}本场`
	for (let i = round_gid + 1; i < data.logs.length; i++) {
		if (data.logs[i].type == 'round') break
		let elem = document.createElement('li')
		let ss = '<div class="num">'

		switch (data.logs[i].type) {
			case 'tsumo':
				ss += `<p class="title tsumo">自摸</p>
								<p class="detail">${score_det(data.logs[i].score)}</p>`
				break
			case 'ron':
				ss += `<p class="title ron">荣和</p>
								<p class="detail">${score_det(data.logs[i].score)}</p>`
				break
			case 'reach':
				ss += `<p class="title reach">立直</p>
								<p class="detail">${player_name[data.logs[i].player]} -1000</p>`
				break
			case 'agari_kyoutaku':
				ss += `<p class="title agari_kyoutaku">和牌供托</p>
								<p class="detail">${player_name[data.logs[i].player]} +${data.logs[i].score}</p>`
				break
			case 'howannpai_ryuukyoku':
				ss += `<p class="title agari_kyoutaku">荒牌流局</p>
								<p class="detail">${score_det(data.logs[i].score)}</p>`
				break
			case 'chuuto_ryuukyoku':
				ss += `<p class="title chuuto_ryuukyoku">途中流局</p>`
				break
			case 'ryuumann':
				ss += `<p class="title ryuumann">流局满贯</p>
								<p class="detail">${score_det(data.logs[i].score)}</p>`
				break
		}

		ss += `</div>
										<div class="fix"><i class="fa-solid fa-gear"></i></div>
										<div class="del"><i class="fa-solid fa-trash"></i></div>`
		elem.innerHTML = ss
		document.querySelector('#rnd .datas ul').appendChild(elem)
	}
	document.querySelector('#rnd .datas h1 button').addEventListener('click',()=>{
		wap(0)
	})
	wap(1)
}

function score_det(dict) {
	s = ''
	for (let i = 1; i <= 4; i++) {
		if (i.toString() in dict) {
			s += player_name[i] + " "
			if (dict[i] >= 0) s += "+" + dict[i]
			else s += dict[i].toString()
			s += ' '
		}
	}
	return s
}
