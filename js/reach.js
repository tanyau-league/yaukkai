document.querySelector('.hitori').style.display = 'none'
document.querySelector('.kuroi').style.display = 'none'
var hitori_callback, hitori_round_gid;
var selected_cha = -1;

function reach(round_gid, callback) {
	hitori_round_gid = round_gid
	hitori_callback = callback
	selected_cha = -1
	document.querySelector(".hitori h1").innerHTML = '立直记录添加'
	document.querySelector(".hitori p.aite").innerHTML = '立直家'
	document.querySelectorAll('.hitori .aite button').forEach(y => {
		y.classList.remove('selected')
	})
	for (let i = 0; i < 4; i++) {
		document.querySelectorAll('.hitori .aite button')[i].innerHTML =
			player_name[i + 1]
	}
	document.querySelector('.hitori').style.display = 'block'
	document.querySelector('.kuroi').style.display = 'block'
}

function ryuumann(round_gid, rnd, callback) {
	hitori_round_gid = round_gid
	hitori_callback = callback
	selected_cha = -1
	document.querySelector(".hitori h1").innerHTML = '流局满贯记录添加'
	document.querySelector(".hitori p.aite").innerHTML = '流局满贯家'
	document.querySelectorAll('.hitori .aite button').forEach(y => {
		y.classList.remove('selected')
	})
	let oya_n = (rnd - 1) % 4 + 1;
	for (let i = 0; i < 4; i++) {
		document.querySelectorAll('.hitori .aite button')[i].innerHTML =
			player_name[i + 1] + (oya_n == i + 1 ? '（亲）' : "")
	}
	document.querySelector('.hitori').style.display = 'block'
	document.querySelector('.kuroi').style.display = 'block'
}


document.querySelectorAll('.hitori .aite button').forEach((x, n) => {
	x.addEventListener('click', () => {
		selected_cha = n + 1
		document.querySelectorAll('.hitori .aite button').forEach(y => {
			y.classList.remove('selected')
		})
		x.classList.add('selected')
	})
})
document.querySelector('.hitori .cancel').addEventListener('click', () => {
	detailed(hitori_round_gid)
	document.querySelector('.hitori').style.display = 'none'
	document.querySelector('.kuroi').style.display = 'none'
})
document.querySelector('.hitori .submit').addEventListener('click', () => {
	if (selected_cha == -1) return;
	hitori_callback(selected_cha)
	detailed(hitori_round_gid)
	document.querySelector('.hitori').style.display = 'none'
	document.querySelector('.kuroi').style.display = 'none'
})
