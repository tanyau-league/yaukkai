function handleTouchStart(e) {
	const touch = e.touches[0];
	startX = touch.clientX;
	moved = false;
	this.style.transition = 'none';
}

function handleTouchMove(e) {
	if (!startX) return;

	const touch = e.touches[0];
	currentX = touch.clientX;
	const diffX = startX - currentX;

	if (Math.abs(diffX) > 10) {
		moved = true;
		if (diffX > 0) {
			this.parentElement.classList.add('swiped');
		} else {
			this.parentElement.classList.remove('swiped');
		}
	}
}

function handleTouchEnd() {
	if (!moved) {
		this.parentElement.classList.remove('swiped');
	}
	startX = null;
	this.style.transition = '';
}


const elem_mp_ul = document.querySelectorAll("#mainpage .rounds ul li")
elem_mp_ul.forEach(item => {
	item.classList.remove('swiped');
	item.addEventListener('touchstart', handleTouchStart, false);
	item.addEventListener('touchmove', handleTouchMove, false);
	item.addEventListener('touchend', handleTouchEnd, false);
})
