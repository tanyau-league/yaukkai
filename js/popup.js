document.querySelector('.kuroi').style.display = 'none'
document.querySelector('.popup').style.display = 'none'

var current_callback, current_arr;
var current_tochuu = false;

function popup(title, arr, callback, danger = false, tochuu = false) {
	current_callback = callback
	current_arr = arr
	current_tochuu = tochuu
	document.querySelector('.popup h1').innerHTML = title
	document.querySelector(".popup ul").innerHTML=''
	arr.forEach(x => {
		let li = document.createElement('li')
		li.innerHTML = `<p>${x.text}</p><input type="text" ` + (x.value == '未命名' ? 'placeholder' : 'value') +
			`="${x.value}">`
		document.querySelector(".popup ul").appendChild(li)
	})
	if (danger) {
		document.querySelector('.popup p.submit').innerHTML = '确认'
		document.querySelector('.popup p.submit').classList.add('danger')
	} else {
		document.querySelector('.popup p.submit').innerHTML = '提交'
		document.querySelector('.popup p.submit').classList.remove('danger')
	}
	if (tochuu) {
		document.querySelectorAll('.popup .auto_next').forEach(x => {
			x.style.display = 'inline'
		})
	} else {
		document.querySelectorAll('.popup .auto_next').forEach(x => {
			x.style.display = 'none'
		})
	}
	document.querySelector('.kuroi').style.display = 'block'
	document.querySelector('.popup').style.display = 'block'
}
document.querySelector('.popup .cancel').addEventListener('click', () => {
	document.querySelector('.kuroi').style.display = 'none'
	document.querySelector('.popup').style.display = 'none'
	document.querySelector(".popup ul").innerHTML = ''
	current_callback(false, current_arr)
})
document.querySelector('.popup .submit').addEventListener('click', () => {
	for (let i = 0; i < document.querySelectorAll(".popup ul li").length; i++) {
		current_arr[i].value = document.querySelectorAll(".popup ul li input")[i].value
	}
	console.log(current_arr)
	document.querySelector(".popup ul").innerHTML = ''
	document.querySelector('.kuroi').style.display = 'none'
	document.querySelector('.popup').style.display = 'none'
	if(current_tochuu) current_callback(true, current_arr,document.querySelector(".popup input").checked)
	else current_callback(true, current_arr)
})
