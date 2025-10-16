document.querySelector('.howann').style.display = 'none'
document.querySelector('.kuroi').style.display = 'none'
var howann_round_gid, howann_callback;
var tennpaied = [false, false, false, false, false]

function howann(round_gid, callback) {
	howann_callback = callback
	howann_round_gid = round_gid
	tennpaied = [false, false, false, false, false]
	document.querySelectorAll(".howann button").forEach(x => {
		x.classList.remove('selected')
	})
	let oya_n = (data.logs[round_gid].round - 1) % 4 + 1;
	for (let i = 0; i < 4; i++) {
		document.querySelectorAll('.howann button')[i].innerHTML =
			player_name[i + 1] + (oya_n == i + 1 ? '（亲）' : "")
	}
	document.querySelector('.howann').style.display = 'block'
	document.querySelector('.kuroi').style.display = 'block'
}
document.querySelectorAll('.howann button').forEach((x, n) => {
	x.addEventListener('click', () => {
		tennpaied[n + 1] = !tennpaied[n + 1]
		if (tennpaied[n + 1]) x.classList.add('selected')
		else x.classList.remove('selected')
	})
})
document.querySelector('.howann .cancel').addEventListener('click', () => {
	detailed(howann_round_gid)
	document.querySelector('.howann').style.display = 'none'
	document.querySelector('.kuroi').style.display = 'none'
})
document.querySelector('.howann .submit').addEventListener('click', () => {
	detailed(howann_callback(tennpaied))
	document.querySelector('.howann').style.display = 'none'
	document.querySelector('.kuroi').style.display = 'none'
})
