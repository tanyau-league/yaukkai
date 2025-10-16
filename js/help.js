let shown = [0, 0, 0, 0, 0, 0, 0, 0]
document.querySelectorAll('.help>ul div ul').forEach(x => {
	x.style.display = 'none'
})
document.querySelectorAll('.help>ul div h2').forEach((x, n) => {
	x.addEventListener('click', () => {
		shown[n] = 1 - shown[n]
		if (shown[n] == 1)
			document.querySelectorAll('.help>ul div ul')[n].style.display = 'block'
		else
			document.querySelectorAll('.help>ul div ul')[n].style.display = 'none'
	})

})
document.querySelector('.help .heading p').addEventListener('click', () => {
	wap(0)
})
