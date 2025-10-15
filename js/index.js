data = {
	"time": 1760258442196,
	"logs": [{
		"type": "round",
		"round": 1,
		"honnba": 0,
		"kyoutaku": 0
	}, {
		"type": "round",
		"round": 9,
		"honnba": 0,
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

var stoch = {
	'tsumo': '自摸',
	'ron': '荣和',
	'reach': '立直',
	'agari_kyoutaku': '和牌供托',
	'howannpai_ryuukyoku': '荒牌流局',
	'chuuto_ryuukyoku': '途中流局',
	'ryuumann': '流局满贯'
}

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
		data.logs[selected_gid].round = parseInt(rec_temp[0].value)
		data.logs[selected_gid].honnba = parseInt(rec_temp[1].value)
		data.logs[selected_gid].kyoutaku = parseInt(rec_temp[2].value)
		exe()
	})
})
document.querySelector("#mainpage .selround .delete").addEventListener('click', () => {
	popup(`删除本局<br/>${round_kanji(selected_round)}局 ${selected_honnba}本场<br/>! 不可恢复 !`, [], (signal,
		rec_temp) => {
		if (!signal) return
		let len = 1
		for (let i = selected_gid + 1; i < data.logs.length; i++) {
			if (data.logs[i].type == 'round') break
			len++
		}
		data.logs.splice(selected_gid, len)
		exe()
	}, danger = true)
})
var olli = document.querySelectorAll('body>ol>li')

function wap(n) {

	for (let i = 0; i < olli.length; i++) {
		if (i == n) olli[i].style.display = 'block'
		else olli[i].style.display = 'none'
	}
}
wap(0)

function detailed(round_gid) {
	let te = data.logs[round_gid]
	document.querySelector('#rnd .datas ul').innerHTML = ''
	document.querySelector('#rnd .datas>h1 span').innerHTML = `${round_kanji(te.round)}局 ${te.honnba}本场`
	let append_x;
	for (let i = round_gid + 1; i < data.logs.length; i++) {
		if (data.logs[i].type == 'round') {
			append_x = i
			break
		}
		let elem = document.createElement('li')
		let ss = '<div class="num" gid=' + i + '>'
		ss += `<p class="title ${data.logs[i].type}">${stoch[data.logs[i].type]}</p>`
		switch (data.logs[i].type) {
			case 'tsumo':
				ss += `<p class="detail">${score_det(data.logs[i].score)}</p>`
				break
			case 'ron':
				ss += `<p class="detail">${score_det(data.logs[i].score)}</p>`
				break
			case 'reach':
				ss += `<p class="detail">${player_name[data.logs[i].player]} -1000</p>`
				break
			case 'agari_kyoutaku':
				ss += `<p class="detail">${player_name[data.logs[i].player]} +${data.logs[i].score}</p>`
				break
			case 'howannpai_ryuukyoku':
				ss += `<p class="detail">${score_det(data.logs[i].score)}</p>`
				break
			case 'chuuto_ryuukyoku':
				ss += ``
				break
			case 'ryuumann':
				ss += `<p class="detail">${score_det(data.logs[i].score)}</p>`
				break
		}

		ss += `</div>
										<div class="fix"><i class="fa-solid fa-gear"></i></div>
										<div class="del"><i class="fa-solid fa-trash"></i></div>`
		elem.innerHTML = ss
		document.querySelector('#rnd .datas ul').appendChild(elem)
		elem.querySelector('.del').addEventListener('click', () => {
			popup(`删除本条记录<br>${stoch[data.logs[i].type]}<span>[${i}]</span>`, [], (signal,
				rec_temp) => {
				if (!signal) return
				data.logs.splice(i, 1)
				detailed(round_gid)
			}, danger = true)

		})
		elem.querySelector('.fix').addEventListener('click', () => {
			switch (data.logs[i].type) {
				case "tsumo":
				case "ron":
				case "howannpai_ryuukyoku":
				case "ryuumann": {
					let temp = [{
						'text': player_name[1],
						'value': 0
					}, {
						'text': player_name[2],
						'value': 0
					}, {
						'text': player_name[3],
						'value': 0
					}, {
						'text': player_name[4],
						'value': 0
					}, ]
					popup(`${stoch[data.logs[i].type]}<span>[${i}]</span> 修正点数`, temp, (signal,
						rec_temp) => {
						if (!signal) return
						data.logs[i].score = {
							"1": parseInt(rec_temp[0].value),
							"2": parseInt(rec_temp[1].value),
							"3": parseInt(rec_temp[2].value),
							"4": parseInt(rec_temp[3].value)
						}
						detailed(round_gid)
					}, danger = true)
					break
				}
				case "reach": {
					let temp = [{
						'text': `立直家(1:${player_name[1]},2:${player_name[2]},3:${player_name[3]},4:${player_name[4]})`,
						'value': data.logs[i].player
					}]
					popup(`${stoch[data.logs[i].type]}<span>[${i}]</span> 修正`, temp, (signal,
						rec_temp) => {
						if (!signal) return
						data.logs[i].player = parseInt(rec_temp[0].value)
						detailed(round_gid)
					}, danger = true)
					break
				}
				case "agari_kyoutaku": {
					let temp = [{
						'text': `和牌家(1:${player_name[1]},2:${player_name[2]},3:${player_name[3]},4:${player_name[4]})`,
						'value': data.logs[i].player
					}, {
						'text': `供托点数`,
						'value': 0
					}]
					popup(`${stoch[data.logs[i].type]}<span>[${i}]</span> 修正点数`, temp, (signal,
						rec_temp) => {
						if (!signal) return
						data.logs[i].player = parseInt(rec_temp[0].value)
						data.logs[i].score = parseInt(rec_temp[1].value)
						detailed(round_gid)
					}, danger = true)
					break
				}
			}
		})
	}
	document.querySelector('#rnd .datas h1 button').addEventListener('click', () => {
		wap(0)
		exe()
	})
	document.querySelector("#rnd .op .add_tsumo").addEventListener('click', () => {
		tsumo(round_gid, te.round, te.honnba, (res, agari_cha, houchuu_cha, auto_kyoutaku, auto_next) => {
			if (res[1] == 'tsumo') {
				let oya_n = (te.round - 1) % 4 + 1
				if (res[0]) {
					//亲自摸
					data.logs.splice(append_x, 0, {
						"type": "tsumo",
						"score": {
							"1": (1 == oya_n) ? res[4] * 3 : -res[4],
							"2": (2 == oya_n) ? res[4] * 3 : -res[4],
							"3": (3 == oya_n) ? res[4] * 3 : -res[4],
							"4": (4 == oya_n) ? res[4] * 3 : -res[4]
						}
					})
				} else {
					//子自摸
					data.logs.splice(append_x, 0, {
						"type": "tsumo",
						"score": {
							"1": ((agari_cha == 1) ? res[4] * 2 + res[5] : ((1 == oya_n) ? -res[
								5] : -res[4])),
							"2": ((agari_cha == 2) ? res[4] * 2 + res[5] : ((2 == oya_n) ? -res[
								5] : -res[4])),
							"3": ((agari_cha == 3) ? res[4] * 2 + res[5] : ((3 == oya_n) ? -res[
								5] : -res[4])),
							"4": ((agari_cha == 4) ? res[4] * 2 + res[5] : ((4 == oya_n) ? -res[
								5] : -res[4]))
						}
					})
				}
				//供托处理
				if (auto_kyoutaku && te.kyoutaku != 0) {
					data.logs.splice(append_x + 1, 0, {
						"type": "agari_kyoutaku",
						"player": agari_cha,
						"score": 1000 * te.kyoutaku
					})
				}
			}
			/*else if(res[1]=='ron'){
				if(res[0]){
					//亲荣和
				}else{
					//子荣和
				}
			}*/
		})
	})
	document.querySelector("#rnd .op .add_ron").addEventListener('click', () => {
		ron(round_gid, te.round, te.honnba, (res, agari_cha, houchuu_cha, auto_kyoutaku, auto_next) => {
			if (res[1] == 'ron') {
				let oya_n = (te.round - 1) % 4 + 1
				data.logs.splice(append_x, 0, {
					"type": "ron",
					"score": {
						"1": (1 == agari_cha ? res[4] : (1 == houchuu_cha ? -res[4] : 0)),
						"2": (2 == agari_cha ? res[4] : (2 == houchuu_cha ? -res[4] : 0)),
						"3": (3 == agari_cha ? res[4] : (3 == houchuu_cha ? -res[4] : 0)),
						"4": (4 == agari_cha ? res[4] : (4 == houchuu_cha ? -res[4] : 0))
					}
				})
				//供托处理
				if (auto_kyoutaku && te.kyoutaku != 0) {
					data.logs.splice(append_x + 1, 0, {
						"type": "agari_kyoutaku",
						"player": agari_cha,
						"score": 1000 * te.kyoutaku
					})
				}
			}
		})
	})
	document.querySelector("#rnd .op .add_reach").addEventListener('click', () => {
		reach(round_gid, (n) => {
			data.logs.splice(append_x, 0, {
				"type": "reach",
				"player": n
			})
		})
	})
	document.querySelector("#rnd .op .add_ryuumann").addEventListener('click', () => {
		ryuumann(round_gid, te.round, (n) => {
			let oya_n = (te.round - 1) % 4 + 1
			if (n == oya_n) {
				data.logs.splice(append_x, 0, {
					"type": "ryuumann",
					"score": {
						"1": (1 == n ? 12000 : -4000),
						"2": (2 == n ? 12000 : -4000),
						"3": (3 == n ? 12000 : -4000),
						"4": (4 == n ? 12000 : -4000)
					}
				})
			} else {
				data.logs.splice(append_x, 0, {
					"type": "ryuumann",
					"score": {
						"1": (1 == n ? 8000 : (1 == oya_n ? -4000 : -2000)),
						"2": (2 == n ? 8000 : (2 == oya_n ? -4000 : -2000)),
						"3": (3 == n ? 8000 : (3 == oya_n ? -4000 : -2000)),
						"4": (4 == n ? 8000 : (4 == oya_n ? -4000 : -2000))
					}
				})
			}

		})
	})
	document.querySelector("#rnd .op .add_chuuto_ryuukyoku").addEventListener('click', () => {
		popup("途中流局记录", [], (signal) => {
			if (!signal) return;
			data.logs.splice(append_x, 0, {
				"type": "chuuto_ryuukyoku"
			})
			detailed(round_gid)
		}, danger = false, tochuu = true)

	})
	document.querySelector("#rnd .op .add_agari_kyoutaku").addEventListener('click', () => {
		let taku = te.kyoutaku;
		for (let i = round_gid + 1; i < data.logs.length; i++) {
			if (data.logs[i].type == 'round') break;
			if (data.logs[i].type == 'reach') taku++;
		}
		popup("和牌供托记录", [{
			'text': '供托获得家（1~4）',
			'value': 1
		}, {
			'text': '供托数量',
			'value': taku
		}], (signal, rec_temp) => {
			if (!signal) return;
			data.logs.splice(append_x, 0, {
				"type": "agari_kyoutaku",
				"player": parseInt(rec_temp[0].value),
				"score": parseInt(rec_temp[1].value) * 1000
			})
			detailed(round_gid)
		})

	})
	document.querySelector("#rnd .op .add_howannpai_ryuukyoku").addEventListener('click', () => {
		howann(round_gid, (tpd) => {
			let tpd_cnt = tpd[1] + tpd[2] + tpd[3] + tpd[4]
			if (tpd_cnt == 0 || tpd_cnt == 4) {
				data.logs.splice(append_x, 0, {
					"type": "howannpai_ryuukyoku",
					"score": {
						"1": 0,
						"2": 0,
						"3": 0,
						"4": 0
					}
				})
			}else if(tpd_cnt==1){
				data.logs.splice(append_x, 0, {
					"type": "howannpai_ryuukyoku",
					"score": {
						"1": tpd[1]?3000:-1000,
						"2": tpd[2]?3000:-1000,
						"3": tpd[3]?3000:-1000,
						"4": tpd[4]?3000:-1000
					}
				})
			}else if(tpd_cnt==2){
				data.logs.splice(append_x, 0, {
					"type": "howannpai_ryuukyoku",
					"score": {
						"1": tpd[1]?1500:-1500,
						"2": tpd[2]?1500:-1500,
						"3": tpd[3]?1500:-1500,
						"4": tpd[4]?1500:-1500
					}
				})
			}else if(tpd_cnt==3){
				data.logs.splice(append_x, 0, {
					"type": "howannpai_ryuukyoku",
					"score": {
						"1": tpd[1]?1000:-3000,
						"2": tpd[2]?1000:-3000,
						"3": tpd[3]?1000:-3000,
						"4": tpd[4]?1000:-3000
					}
				})
			}
		})
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
