const isPortrail = () => {
	const width = window.innerWidth
	const height = window.innerHeight
	return 2 * height / 3 > width
}

const adjustingScreen = (lich) => {
	if (isPortrail()) {
		lich.style.width = '95%';
	} else {
		lich.style.height = '95%';
	}
}

const setBoxShadow = (lich, lichwidth, thu) => {
	lich.style.boxShadow = `0 0 0 ${0.0025 * lichwidth}px#000, 0 0 0 ${0.005 * lichwidth}px#fff, 0 0 0 ${0.01 * lichwidth}px#000, 0 0 0 ${0.02 * lichwidth}px var(--backgroundcolor) inset, 0 0 0 ${0.025 * lichwidth}px#000 inset`
	
	thu.style.boxShadow = `-${0.015 * lichwidth}px 0 var(--basecolor) inset, -${0.02 * lichwidth}px 0 var(--backgroundcolor) inset`
}

const setSize = (lichwidth) => {
	document.getElementsByClassName('ngay-hinh')[0].style.width = `${0.08 * lichwidth}px`
}

const setFontSize = (lichwidth, thu, ngayduong, thangduong, namduong, ngayamso, ngayamchu, thangam, namam, tiet, giohoangdao) => {
	thu.style.fontSize = `${0.068 * lichwidth}px`
	ngayduong.style.fontSize = `${0.56 * lichwidth}px`
	thangduong.style.fontSize = `${0.068 * lichwidth}px`
	namduong.style.fontSize = `${0.08 * lichwidth}px`
	ngayamso.style.fontSize = `${0.22 * lichwidth}px`
	ngayamchu.style.fontSize = `${0.052 * lichwidth}px`
	thangam.style.fontSize = `${0.052 * lichwidth}px`
	namam.style.fontSize = `${0.052 * lichwidth}px`
	tiet.style.fontSize = `${0.052 * lichwidth}px`
	giohoangdao.style.fontSize = `${0.0416 * lichwidth}px`
}

const setROOT = (lichwidth) => {
	const root = document.querySelector(':root');
	const red = parseInt(Math.random() * 145) + 55;
	const green = parseInt(Math.random() * 145) + 55;
	const blue = parseInt(Math.random() * 145) + 55;
	root.style.setProperty('--red', red);
	root.style.setProperty('--green', green);
	root.style.setProperty('--blue', blue);
	
	const textshadow = `
		${0.005 * lichwidth}px 0 var(--textshadowcolor), -${0.005 * lichwidth}px 0 var(--textshadowcolor),
		0 ${0.005 * lichwidth}px var(--textshadowcolor), 0 -${0.005 * lichwidth}px var(--textshadowcolor), 
		${0.0025 * lichwidth}px ${0.0025 * lichwidth}px var(--textshadowcolor), -${0.0025 * lichwidth}px -${0.0025 * lichwidth}px var(--textshadowcolor), 
		${0.0025 * lichwidth}px -${0.0025 * lichwidth}px var(--textshadowcolor), -${0.0025 * lichwidth}px ${0.0025 * lichwidth}px var(--textshadowcolor)
	`	
	root.style.setProperty('--textshadow', textshadow);
}

const setTextShadow = (lichwidth, ngayduong) => {
	ngayduong.style.textShadow = `
		${0.005 * lichwidth}px 0 var(--textshadowcolor), -${0.005 * lichwidth}px 0 var(--textshadowcolor),
		0 ${0.005 * lichwidth}px var(--textshadowcolor), 0 -${0.005 * lichwidth}px var(--textshadowcolor), 
		${0.0025 * lichwidth}px ${0.0025 * lichwidth}px var(--textshadowcolor), -${0.0025 * lichwidth}px -${0.0025 * lichwidth}px var(--textshadowcolor), 
		${0.0025 * lichwidth}px -${0.0025 * lichwidth}px var(--textshadowcolor), -${0.0025 * lichwidth}px ${0.0025 * lichwidth}px var(--textshadowcolor), 0 0 ${0.125 * lichwidth}px var(--maincolor), 0 0 ${0.15 * lichwidth}px var(--maincolor), 0 0 ${0.1875 * lichwidth}px var(--maincolor), 0 0 ${0.3 * lichwidth}px var(--maincolor)
		`
}

const setPadding = (lichwidth, namduong, thangduong, thu, giohoangdao) => {
	namduong.style.paddingLeft = `${0.0125 * lichwidth}px`;
	thangduong.style.paddingRight = `${0.0125 * lichwidth}px`;
	thu.style.paddingLeft = `${0.0125 * lichwidth}px`;
	giohoangdao.style.paddingLeft = `${0.0125 * lichwidth}px`;
}

const run = (() => {
	const lich = document.getElementsByClassName('lich')[0]
	adjustingScreen(lich)
	const lichwidth = lich.offsetWidth
	const thu = document.getElementsByClassName('thu')[0]
	setBoxShadow(lich, lichwidth, thu)
	setSize(lichwidth)
	const ngayduong = document.getElementsByClassName('ngay')[0]
	const thangduong = document.getElementsByClassName('thang')[0]
	const namduong = document.getElementsByClassName('nam')[0]
	const ngayamso = document.getElementsByClassName('ngay-so')[0]
	const ngayamchu = document.getElementsByClassName('ngay-chu')[0]
	const thangam = document.getElementsByClassName('thang')[1]
	const namam = document.getElementsByClassName('nam')[1]
	const tiet = document.getElementsByClassName('tiet')[0]
	const giohoangdao = document.getElementsByClassName('giohoangdao')[0]
	setFontSize(lichwidth, thu, ngayduong, thangduong, namduong, ngayamso, ngayamchu, thangam, namam, tiet, giohoangdao)
	setROOT(lichwidth)
	setTextShadow(lichwidth, ngayduong)
	setPadding(lichwidth, namduong, thangduong, thu, giohoangdao)
})()