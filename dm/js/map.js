var mySwiper = new Swiper('.swiper-container', {
	direction: 'horizontal', // 垂直切换选项
	initialSlide :0,
	loop: true, // 循环模式选项
	speed:300,
	autoplay: {
	    delay: 3000,
	    stopOnLastSlide: false,
	    disableOnInteraction: true,
	    },

	// 如果需要分页器
	pagination: {
		el: '.swiper-pagination',
		clickable :true,
	},

	// 如果需要前进后退按钮
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},

	// 如果需要滚动条
	/* scrollbar: {
		el: '.swiper-scrollbar',
	}, */
})

