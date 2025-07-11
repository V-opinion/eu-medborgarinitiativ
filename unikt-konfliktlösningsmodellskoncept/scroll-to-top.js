scrollToTop = document.createElement('button');
scrollToTop.className = 'btn btn-primary position-fixed bottom-0 end-0 m-3 d-none';
scrollToTop.innerHTML = '<i class="fas fa-arrow-up"></i> Back to Top';
document.body.appendChild(scrollToTop);

window.onscroll = () => {
	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		scrollToTop.classList.remove('d-none');
	}
	else {
		scrollToTop.classList.add('d-none');
	}
}

scrollToTop.onclick = () => {
	window.scrollTo(0, 0);
}