document.querySelector('.tennsu').style.display = 'none'
document.querySelector('.kuroi').style.display = 'none'
var aga_callback;
var selected_agari_cha = -1,
	selected_houchuu_cha = -1,
	selected_fan = -1,
	selected_fu = -1,
	oya_n = 0;
var aga_round_gid = 0;
var aga_honnba = 0;
var aga_type = "none";
var res = [true, "none", 0, 0, 0, 0];

function tsumo(round_gid, rnd, honnba, callback) {
	selected_agari_cha = -1, selected_houchuu_cha = -1, selected_fan = -1, selected_fu = -1
	aga_callback = callback;
	aga_round_gid = round_gid
	aga_honnba = honnba;
	aga_type = "tsumo";
	res = [true, "none", 0, 0, 0, 0];
	oya_n = (rnd - 1) % 4 + 1;

	// 重置
	document.querySelectorAll(".tennsu button").forEach(x => {
		x.classList.remove("selected")
	})
	document.querySelector(".tennsu p.temu").innerHTML = '点数  ' + honnba + '本场'
	document.querySelector(".tennsu h2.big_temu").innerHTML = ''
	document.querySelector('.tennsu h1').innerHTML = '自摸记录添加'
	for (let i = 0; i < 4; i++) {
		document.querySelectorAll('.tennsu .agaricha button')[i].innerHTML =
			player_name[i + 1] + (oya_n == i + 1 ? '（亲）' : "")
	}
	document.querySelector('.tennsu p.agaricha').innerHTML = '自摸家'
	document.querySelectorAll('.tennsu .houchuucha').forEach(x => x.style.display = 'none')

	document.querySelector('.tennsu').style.display = 'block'
	document.querySelector('.kuroi').style.display = 'block'
}



function ron(round_gid, rnd, honnba, callback) {
	selected_agari_cha = -1, selected_houchuu_cha = -1, selected_fan = -1, selected_fu = -1
	aga_callback = callback;
	aga_round_gid = round_gid
	aga_honnba = honnba;
	aga_type = "ron";
	res = [true, "none", 0, 0, 0, 0];
	oya_n = (rnd - 1) % 4 + 1;

	// 重置
	document.querySelectorAll(".tennsu button").forEach(x => {
		x.classList.remove("selected")
	})
	document.querySelector(".tennsu p.temu").innerHTML = '点数  ' + honnba + '本场'
	document.querySelector(".tennsu h2.big_temu").innerHTML = ''
	document.querySelector('.tennsu h1').innerHTML = '荣和记录添加'
	for (let i = 0; i < 4; i++) {
		document.querySelectorAll('.tennsu .agaricha button')[i].innerHTML =
			player_name[i + 1] + (oya_n == i + 1 ? '（亲）' : "")
		document.querySelectorAll('.tennsu .houchuucha button')[i].innerHTML =
			player_name[i + 1]
	}
	document.querySelector('.tennsu p.agaricha').innerHTML = '荣和家'
	document.querySelectorAll('.tennsu .houchuucha').forEach(x => x.style.display = 'block')

	document.querySelector('.tennsu').style.display = 'block'
	document.querySelector('.kuroi').style.display = 'block'
}

document.querySelectorAll('.agaricha button').forEach((x, n) => {
	x.addEventListener('click', () => {
		document.querySelectorAll('.agaricha button').forEach(y => y.classList.remove('selected'))
		x.classList.add('selected')
		selected_agari_cha = n
		tscalc()
	})
})
document.querySelectorAll('.houchuucha button').forEach((x, n) => {
	x.addEventListener('click', () => {
		document.querySelectorAll('.houchuucha button').forEach(y => y.classList.remove('selected'))
		x.classList.add('selected')
		selected_houchuu_cha = n
		tscalc()
	})
})
document.querySelectorAll('.fan button').forEach((x, n) => {
	x.addEventListener('click', () => {
		document.querySelectorAll('.fan button').forEach(y => y.classList.remove('selected'))
		x.classList.add('selected')
		selected_fan = n
		tscalc()
	})
})
document.querySelectorAll('.fu button').forEach((x, n) => {
	x.addEventListener('click', () => {
		document.querySelectorAll('.fu button').forEach(y => y.classList.remove('selected'))
		x.classList.add('selected')
		selected_fu = n
		tscalc()
	})
})
document.querySelector('.tennsu .cancel').addEventListener('click', () => {
	detailed(aga_round_gid)
	document.querySelector('.tennsu').style.display = 'none'
	document.querySelector('.kuroi').style.display = 'none'
})
document.querySelector('.tennsu .submit').addEventListener('click', () => {
	if (res[1] == 'none') return;
	let c_gid = aga_callback(res, selected_agari_cha + 1, selected_houchuu_cha + 1,
		document.querySelector('#auto_kyoutaku').checked,
		document.querySelector('#auto_next').checked)
	detailed(c_gid)
	document.querySelector('.tennsu').style.display = 'none'
	document.querySelector('.kuroi').style.display = 'none'
})
const tend = {
	5: 2000,
	6: 3000,
	7: 4000,
	8: 6000,
	9: 8000,
	10: 16000,
	11: 24000,
	12: 32000,
	13: 40000,
	14: 48000
}
const fud = {
	1: 20,
	2: 25,
	3: 30,
	4: 40,
	5: 50,
	6: 60,
	7: 70,
	8: 80,
	9: 90,
	10: 100,
	11: 110
}

function tscalc() {
	if (
		(aga_type == 'tsumo' &&
			(
				(selected_agari_cha != -1 && selected_fan != -1 && selected_fu != -1) ||
				(selected_agari_cha != -1 && selected_fan >= 4)
			)
		) ||
		(aga_type == 'ron' &&
			(
				(selected_agari_cha != -1 && selected_houchuu_cha != -1 && selected_fan != -1 && selected_fu != -1) ||
				(selected_agari_cha != -1 && selected_houchuu_cha != -1 && selected_fan >= 4)
			)
		)
	) {
		let is_oya = (selected_agari_cha + 1 == oya_n)
		let fan = selected_fan + 1,
			fu = fud[selected_fu + 1]
		let a = 0
		if (fan <= 4) {
			a = Math.min(fu * Math.pow(2, (selected_fan + 1 + 2)), 2000)
		} else {
			a = tend[fan]
		}
		if (aga_type == "tsumo") {
			//自摸
			if (is_oya) {
				res = [true, "tsumo", upg(2 * a), 0, upg(2 * a) + aga_honnba * 100, 0]
			} else {
				res = [false, "tsumo", upg(a), upg(2 * a), upg(a) + aga_honnba * 100, upg(2 * a) + aga_honnba * 100]
			}
			show_res()
		} else if (aga_type == "ron") {
			//荣和

			if (is_oya) {
				res = [true, "ron", upg(6 * a), 0, upg(6 * a) + aga_honnba * 300, 0]
			} else {
				res = [false, "ron", upg(4 * a), 0, upg(4 * a) + aga_honnba * 300, 0]
			}
			show_res()
		}
	}
}

function upg(n) {
	//百向上
	return Math.ceil(n / 100) * 100
}

function show_res() {
	if (res[1] == "none") return;
	if (res[0]) {
		//亲
		if (res[1] == 'tsumo') {
			document.querySelector(".tennsu p.temu").innerHTML = `点数 ${res[2]}ALL ${aga_honnba}本场`
			document.querySelector(".tennsu h2.big_temu").innerHTML = `${res[4]}ALL`
		} else if (res[1] == 'ron') {
			document.querySelector(".tennsu p.temu").innerHTML = `点数 ${res[2]} ${aga_honnba}本场`
			document.querySelector(".tennsu h2.big_temu").innerHTML = `${res[4]}`
		}
	} else {
		//子
		if (res[1] == 'tsumo') {
			document.querySelector(".tennsu p.temu").innerHTML = `点数 ${res[2]},${res[3]} ${aga_honnba}本场`
			document.querySelector(".tennsu h2.big_temu").innerHTML = `${res[4]},${res[5]}`
		} else if (res[1] == 'ron') {
			document.querySelector(".tennsu p.temu").innerHTML = `点数 ${res[2]} ${aga_honnba}本场`
			document.querySelector(".tennsu h2.big_temu").innerHTML = `${res[4]}`
		}
	}

}
