const convert_integer = number => parseInt(number)

const calculate_mod = (param1, param2) => param1 - parseInt(param2 * Math.floor(param1 / param2))

const make_array = (row, col) => {
	let arr = new Array(row)
	for (let i = 0; i < row; i++)
		arr[i] = new Array(col)
	return arr
}

const is_leapyear = year => {
	if (year % 4 == 0 && year % 100 != 0)
		return true
	return year % 400 == 0
}

const return_number_of_days_of_month = (month, year) => {
	switch (month) {
		case 1:
		case 3:
		case 5:
		case 7:
		case 8:
		case 10:
		case 12:
			return 31
		case 4:
		case 6:
		case 9:
		case 11:
			return 30
		default:
			return is_leapyear(year) ? 29 : 28
	}
}

const next_date = (day, month, year) => {
	let nday = day
	let nmonth = month
	let nyear = year
	
	nday = nday + 1
	
	if (nday > return_number_of_days_of_month(month, year)) {
		nday = 1
		nmonth = nmonth + 1
	}
	
	if (nmonth > 12) {
		nmonth = 1
		nyear = nyear + 1
	}
	
	return [nday, nmonth, nyear]
}

const convert_date_to_juliusday = (day, month, year) => {
	let juliusday
	if (year > 1582 || (year == 1582 && month > 10) || (year == 1582 && month == 10 && day > 14)) {
		juliusday = 367 * year - convert_integer(7 * (year + convert_integer((month + 9) / 12)) / 4) - convert_integer(3 * (convert_integer((year + (month - 9) / 7) / 100) + 1) / 4) + convert_integer(275 * month / 9) + day + 1721028.5
	} else {
		juliusday = 367 * year - convert_integer(7 * (year + 5001 + convert_integer((month - 9) / 7)) / 4) + convert_integer(275 * month / 9) + day + 1729776.5
	}
	return juliusday
}

const convert_juliusday_to_date = juliusday => {
	let z = convert_integer(juliusday + 0.5)
	let f = juliusday + 0.5 - z
	let a, alpha
	if(z < 2299161) {
		a = z
	} else {
		alpha = convert_integer((z - 1867216.25) / 36524.25)
		a = z + 1 + alpha - convert_integer(alpha / 4)
	}
	let b = a + 1524
	let c = convert_integer((b - 122.1) / 365.25)
	let d = convert_integer(365.25 * c)
	let e = convert_integer((b - d) / 30.6001)
	let day = convert_integer(b - d - convert_integer(30.6001 * e) + f)
	let month, year
	if (e < 14) {
	  month = e - 1
	} else {
	  month = e - 13
	}
	if (month < 3) {
	  year = c - 4715
	} else {
	  year = c - 4716
	}
	return [day, month, year]
}

const local_timezone = 7.0

const convert_localdate_to_juliusday = (day, month, year) => convert_date_to_juliusday(day, month, year) - local_timezone / 24.0

const convert_juliusday_to_localdate = juliusday => convert_juliusday_to_date(juliusday + local_timezone / 24.0)

const calculate_juliusday_newmoon = k => {
	// Time in Julian centuries from 13:51 GMT 1/1/1900
	let julian_century = k / 1236.85
	// Squared
	let julian_century2 = julian_century * julian_century
	// Cubed
	let julian_century3 = julian_century2* julian_century
	// Degree to radian
	let degree_to_radian = Math.PI / 180
	
	// Mean new moon
	let juliusday = 2415020.75933 + 29.53058868 * k + 0.0001178 * julian_century2 - 0.000000155 * julian_century3 + 0.00033 * Math.sin((166.56 + 132.87 * julian_century - 0.009173 * julian_century2) * degree_to_radian)
	
	// Sun's mean anomaly
	let sun_mean_anomaly = 359.2242 + 29.10535608 * k - 0.0000333 * julian_century2 - 0.00000347 * julian_century3
	// Moon's mean anomaly
	let moon_mean_anomaly = 306.0253 + 385.81691806 * k + 0.0107306 * julian_century2 + 0.00001236 * julian_century3
	// Moon's argument of latitude
	let moon_argument_latitude = 21.2964 + 390.67050646 * k - 0.0016528 * julian_century2 - 0.00000239 * julian_century3
	
	let c = (0.1734 - 0.000393 * julian_century) * Math.sin(degree_to_radian * sun_mean_anomaly) + 0.0021 * Math.sin(2 * degree_to_radian * sun_mean_anomaly) - 0.4068 * Math.sin(degree_to_radian * moon_mean_anomaly) + 0.0161*Math.sin(2 * degree_to_radian * moon_mean_anomaly) - 0.0004 * Math.sin(3 * degree_to_radian * moon_mean_anomaly) + 0.0104 * Math.sin(2 * degree_to_radian * moon_argument_latitude) - 0.0051 * Math.sin(degree_to_radian * (sun_mean_anomaly + moon_mean_anomaly)) - 0.0074 * Math.sin(degree_to_radian * (sun_mean_anomaly - moon_mean_anomaly)) + 0.0004 * Math.sin(degree_to_radian * (2 * moon_argument_latitude + sun_mean_anomaly)) - 0.0004 * Math.sin(degree_to_radian * (2 * moon_argument_latitude - sun_mean_anomaly)) - 0.0006 * Math.sin(degree_to_radian * (2 * moon_argument_latitude + moon_mean_anomaly)) + 0.0010 * Math.sin(degree_to_radian * (2 * moon_argument_latitude - moon_mean_anomaly)) + 0.0005 * Math.sin(degree_to_radian * (2 * moon_mean_anomaly + sun_mean_anomaly))
	
	let delta_julian_century
	if (julian_century < -11) {
		delta_julian_century = 0.001 + 0.000839 * julian_century + 0.0002261 * julian_century2 - 0.00000845 * julian_century3 - 0.000000081 * julian_century * julian_century3
	} else {
		delta_julian_century = -0.000278 + 0.000265 * julian_century + 0.000262 * julian_century2
	};
	
	let juliusday_newmoon = juliusday + c - delta_julian_century
	return juliusday_newmoon
}

const calculate_lunarmonth_wintersolstice = year => {
	let offset = convert_localdate_to_juliusday(31, 12, year) - 2415021.076998695
	let k = convert_integer(offset / 29.530588853)
	let juliusday_newmoon = calculate_juliusday_newmoon(k)
	let newmoon_localdate = convert_juliusday_to_localdate(juliusday_newmoon)
	// sun longitude at local midnight
	let sunlongitude = calculate_sunlongitude(convert_localdate_to_juliusday(newmoon_localdate[0], newmoon_localdate[1], newmoon_localdate[2]))
	if (sunlongitude > 3 * Math.PI / 2) {
		juliusday_newmoon = calculate_juliusday_newmoon(k - 1)
	}
	return convert_juliusday_to_localdate(juliusday_newmoon)
}

const sunlongitude_major = [
	0, Math.PI/6, 2*Math.PI/6, 3*Math.PI/6, 4*Math.PI/6, 5*Math.PI/6, Math.PI, 7*Math.PI/6, 8*Math.PI/6, 9*Math.PI/6, 10*Math.PI/6, 11*Math.PI/6
]

const init_leapyear = begindays => {
	let sunlongitudes = new Array (begindays.length)
	for (let i = 0; i < begindays.length; i++) {
		let beginday = begindays[i]
		let juliusday_beginday = convert_localdate_to_juliusday(beginday[0], beginday[1], beginday[2])
		sunlongitudes[i] = calculate_sunlongitude(juliusday_beginday)
	}
	let found = false
	for (let i = 0; i < begindays.length; i++) {
		if (found) {
			let remainder = calculate_mod(i + 10, 12)
			begindays[i][3] = remainder == 0 ? 12 : remainder
			continue
		}
		let sunlongitude1 = sunlongitudes[i]
		let sunlongitude2 = sunlongitudes[i+1]
		let has_majorterm = Math.floor(sunlongitude1 / Math.PI * 6) != Math.floor(sunlongitude2 / Math.PI * 6)
		if (!has_majorterm) {
			found = true
			begindays[i][4] = 1
			let remainder = calculate_mod(i + 10, 12)
			begindays[i][3] = remainder == 0 ? 12 : remainder
		}
	}		
}

const calculate_lunaryear = year => {
	// begin days of lunar month
	let begindays
	
	let month_wintersolstice = calculate_lunarmonth_wintersolstice(year - 1)
	let juliusday_month_wintersolstice = convert_localdate_to_juliusday(month_wintersolstice[0], month_wintersolstice[1], month_wintersolstice[2])
	let k = convert_integer(Math.floor(0.5 + (juliusday_month_wintersolstice - 2415021.076998695) / 29.530588853))
	let month_wintersolstice2 = calculate_lunarmonth_wintersolstice(year)
	let offset = convert_localdate_to_juliusday(month_wintersolstice2[0], month_wintersolstice2[1], month_wintersolstice2[2]) - juliusday_month_wintersolstice
	let leap = offset > 365.0
	if (!leap) {
		begindays = make_array(13, 5)
	} else {
		begindays = make_array(14, 5)
	}
	begindays[0] = [month_wintersolstice[0], month_wintersolstice[1], month_wintersolstice[2], 0, 0]
	begindays[begindays.length - 1] = [month_wintersolstice2[0], month_wintersolstice2[1], month_wintersolstice2[2], 0, 0]
	for (let i = 1; i < begindays.length - 1; i++) {
		let newmoon_juliusday = calculate_juliusday_newmoon(k + i)
		let newmoon_date = convert_juliusday_to_localdate(newmoon_juliusday)
		begindays[i] = [newmoon_date[0], newmoon_date[1], newmoon_date[2], 0, 0]
	}
	for (let i = 0; i < begindays.length; i++) {
		let remainder = calculate_mod(i + 11, 12)
		begindays[i][3] = remainder == 0 ? 12 : remainder
	}
	if (leap) {
		init_leapyear(begindays)
	}
	return begindays
}

const convert_solar_to_lunar = (day, month, year) => {
	let lunaryear = year
	let leap = calculate_lunaryear(year)
	let month_wintersolstice = leap[leap.length - 1]
	let juliusday_solar = convert_localdate_to_juliusday(day, month, year)
	let juliusday_month_wintersolstice = convert_localdate_to_juliusday(month_wintersolstice[0], month_wintersolstice[1], month_wintersolstice[2])
	if (juliusday_solar >= juliusday_month_wintersolstice) {
		leap = calculate_lunaryear(year + 1)
		lunaryear = year + 1
	}
	let i = leap.length - 1
	while (juliusday_solar < convert_localdate_to_juliusday(leap[i][0], leap[i][1], leap[i][2])) {
		i--
	}
	let lunarday = convert_integer(juliusday_solar - convert_localdate_to_juliusday(leap[i][0], leap[i][1], leap[i][2])) + 1
	let lunarmonth = leap[i][3]
	if (lunarmonth >= 11) {
		lunaryear--
	}
	return [lunarday, lunarmonth, lunaryear, leap[i][4]]
}

const convert_lunar_to_solar = (lunarday, lunarmonth, lunaryear, leap) => {
	let year2 = lunaryear
	if (lunarmonth >= 11) {
		year2 = lunaryear + 1
	}
	let temp_lunaryear = calculate_lunaryear(year2)
	let lunardate
	for (let i = 0; i < temp_lunaryear.length; i++) {
		let temp_lunardate = temp_lunaryear[i]
		if (temp_lunardate[3] == lunarmonth && temp_lunardate[4] == leap) {
			lunardate = temp_lunardate
			break
		}
	}
	if (lunardate != null) {
		let juliusday = convert_localdate_to_juliusday(lunardate[0], lunardate[1], lunardate[2])
		return convert_juliusday_to_localdate(juliusday + lunarday - 1)
	}
}

const calculate_true_anomaly = juliusday => {
	// Time in Julian centuries from 12:00:00 GMT 1/1/2000
	let julian_century = (juliusday - 2451545.0 ) / 36525
	// Squared
	let julian_century2 = julian_century * julian_century
	// Cubed
	let julian_century3 = julian_century2 * julian_century
	
	// Degree to radian
	let degree_to_radian = Math.PI / 180
	
	// mean longitude, degree
	let mean_longitude_degree = 280.46645 + 36000.76983 * julian_century + 0.0003032 * julian_century2
	// mean anomaly, degree
	let mean_anomaly_degree = 357.52910 + 35999.05030 * julian_century - 0.0001559 * julian_century2 - 0.00000048 * julian_century3
	
	let difference_center_sun = (1.914600 - 0.004817 * julian_century - 0.000014 * julian_century2) * Math.sin(degree_to_radian * mean_anomaly_degree) + (0.01993 - 0.000101 * julian_century) * Math.sin(2 * degree_to_radian * mean_anomaly_degree) + 0.000290 * Math.sin(3 * degree_to_radian * mean_anomaly_degree)
	
	// true longitude, degree
	let trueanomaly = mean_longitude_degree + difference_center_sun
	
	return trueanomaly
}

const calculate_sunlongitude = juliusday => {
	let longitude = calculate_true_anomaly(juliusday) * Math.PI / 180
	// Normalize to (0, 2*PI)
	longitude = longitude - Math.PI * 2 * (convert_integer(longitude / (Math.PI * 2)))
	return longitude
}

const calculate_solardegree = juliusday => {
	let julian_century = (juliusday - 2451545.0) / 36525
	let solardegree = calculate_true_anomaly(juliusday) - 0.00569 - 0.00478 * Math.sin(Math.PI / 180 * (125.04 - 1934.136 * julian_century))
	solardegree = solardegree - 360 * convert_integer(solardegree / 360)
	return solardegree
}

const solarterms = [
	"Lập Xuân", "Vũ Thủy", "Kinh Trập", "Xuân Phân", "Thanh Minh", "Cốc Vũ",
	"Lập Hạ", "Tiểu Mãn", "Mang Chủng", "Hạ Chí", "Tiểu Thử", "Đại Thử",
	"Lập Thu", "Xử Thử", "Bạch Lộ", "Thu Phân", "Hàn Lộ", "Sương Giáng",
	"Lập Đông", "Tiểu Tuyết", "Đại Tuyết", "Đông Chí", "Tiểu Hàn", "Đại Hàn"
]
//		315		330		345		360-0		15		30
//		45		60		75		90			105		120
//		135		150		165		180			195		210
//		225		240		255		270			285		300

const calculate_solarterm = (day, month, year) => {
	let nextdate = next_date(day, month, year)
	
	let solardegree1 = calculate_solardegree(convert_date_to_juliusday(day, month, year))
	let solardegree2 = calculate_solardegree(convert_date_to_juliusday(nextdate[0], nextdate[1], nextdate[2]))
	
	let termindex1 = convert_integer((convert_integer(solardegree1 / 15) < 21 ? convert_integer((solardegree1 + 360) / 15) : convert_integer(solardegree1 / 15)) - 21)
	let termindex2 = convert_integer((convert_integer(solardegree2 / 15) < 21 ? convert_integer((solardegree2 + 360) / 15) : convert_integer(solardegree2 / 15)) - 21)
	
	if (termindex1 == termindex2) {
		return termindex1
	} else {
		return termindex2
	}
}

const daysofweek = ["Chủ Nhật", "Thứ Hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"]

const calculate_dayofweek = (day, month, year) => {
	let k = calculate_mod(convert_integer(convert_date_to_juliusday(day, month, year) + 2.5), 7)
	return (k == 0 ? 7 : k) - 1
}

let CAN = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"]

let CHI = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"]

const calculate_dayCAN_CHI = (day, month, year) => {
	let juliusday = convert_date_to_juliusday(day, month, year)
	// CAN
	let can = calculate_mod(convert_integer(juliusday + 9.5), 10)
	// CHI
	let chi = calculate_mod(convert_integer(juliusday + 1.5), 12)

	return [can, chi]
}

const calculate_lunarmonthCAN_CHI = (lunarmonth, lunaryear) => {
	// CAN
	let can = calculate_mod((lunaryear * 12 + lunarmonth + 3), 10)
	// CHI
	let chi = calculate_mod((lunarmonth + 1), 12)
	
	return [can, chi]
}

const calculate_lunaryearCAN_CHI = lunaryear => {
	// CAN
	let can = calculate_mod(lunaryear + 6, 10)
	// CHI
	let chi = calculate_mod(lunaryear + 8, 12)
	
	return [can, chi]
}

const calculate_hourCAN_CHI = (hour, dayCANCHI) => {
	let k = Math.ceil(hour / 2)
	if (k == 12) {
		k = 0
	}
	
	let can = calculate_mod((calculate_mod(dayCANCHI[0], 5) * 2 + calculate_mod(k, 10)), 10)
	
	let chi = k
	
	return [can, chi]
}

const zodiac_time_table = [
	[1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0], //3 9
	[1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0], //4 10
	[0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1], //5 11
	[0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1], //6 12
	[1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0], //7 1
	[0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1] //8 2
];

const calculate_zodiactime = dayCANCHI => {
	let temp_zodiactime = zodiac_time_table[calculate_mod((dayCANCHI[1] + 4), 6)]
	let zodiactime = []
	for (let i = 0; i < temp_zodiactime.length; i++) {
		if (temp_zodiactime[i] == 1) {
			zodiactime[zodiactime.length] = " " + CHI[i] + " (" + (((i * 2) - 1) < 0 ? 23 : ((i * 2) - 1))  + "-" + ((i * 2) + 1) + ")"
		}
	}
	return zodiactime
}

const months = ["Một", "Hai", "Ba", "Tư", "Năm", "Sáu", "Bảy", "Tám", "Chín", "Mười", "Mười Một", "Mười Hai"]

const solarcalendar_html = date => {
	let html_text = `
		<div class="namthang">
			<div class="nam">
				${date.getFullYear()}
			</div>
			<div class="thang">
				THÁNG ${months[date.getMonth()].toUpperCase()}
			</div>
		</div>
		<div class="ngay">
			${date.getDate()}
		</div>
		<div class="thu">
			${daysofweek[date.getDay()].toUpperCase()}
		</div>
	`;
	return html_text;
}

const lunarcalendar_html = date => {
	let solardate = [date.getDate(), date.getMonth() + 1, date.getFullYear()];
	let lunardate = convert_solar_to_lunar(solardate[0], solardate[1], solardate[2]);
	
	let zodiacicons = ["rat", "ox", "tiger", "rabbit", "dragon", "snake", "horse", "goat", "monkey", "rooster", "dog", "pork"];
	
	let dayCANCHI = calculate_dayCAN_CHI(solardate[0], solardate[1], solardate[2]);	
	let zodiacicon = zodiacicons[dayCANCHI[1]];
	
	let monthCANCHI = calculate_lunarmonthCAN_CHI(lunardate[1], lunardate[2]);
	let yearCANCHI = calculate_lunaryearCAN_CHI(lunardate[2]);
	
	let solarterm = solarterms[calculate_solarterm(solardate[0],solardate[1],solardate[2])];
	
	let leapmonth = lunardate[3] == 1 ? "(NHUẬN)" : "";
	
	let html_text = `
		<div class="ngaythangnamtiet">
			<div class="ngay">
				<div class="ngay-so">
					${lunardate[0]}
				</div>
				<div class="ngay-hinh">
					<img src="image/${zodiacicon}.png"/>
				</div>
				<div class="ngay-chu">
					NGÀY ${(CAN[dayCANCHI[0]]).toUpperCase()} ${(CHI[dayCANCHI[1]]).toUpperCase()}
				</div>
			</div>
			<div class="thangnamtiet">
				<div class="thang">
					THÁNG ${(CAN[monthCANCHI[0]]).toUpperCase()} ${(CHI[monthCANCHI[1]]).toUpperCase()} ${leapmonth}
				</div>
				<div class="nam">
					NĂM ${(CAN[yearCANCHI[0]]).toUpperCase()} ${(CHI[yearCANCHI[1]]).toUpperCase()}
				</div>
				<div class="tiet">
					TIẾT ${solarterm.toUpperCase()}
				</div>
			</div>
		</div>
		<div class="giohoangdao">
			Giờ hoàng đạo: ${calculate_zodiactime(dayCANCHI)}
		</div>
	`;
	return html_text;
}

const print_html = (() => {
	const date = new Date();
	document.getElementsByClassName("lichduong")[0].innerHTML = solarcalendar_html(date);
	document.getElementsByClassName("licham")[0].innerHTML = lunarcalendar_html(date);
})();