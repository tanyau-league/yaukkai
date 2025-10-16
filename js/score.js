function score_calc(begin_gid, end_gid) { // 左闭右开
	let score = [0, 25000, 25000, 25000, 25000]
	for (let i = begin_gid; i < end_gid; i++) {
		let te = data.logs[i]
		if (te.type == 'tsumo' || te.type == 'ron' || te.type == 'howannpai_ryuukyoku' || te.type == 'ryuumann') {
			for (let j = 1; j <= 4; j++)
				if (j.toString() in te.score)
					score[j] += te.score[j.toString()]
		} else if (te.type == 'reach') {
			score[te.player] -= 1000
		} else if (te.type == 'agari_kyoutaku') {
			score[te.player] += te.score
		}
	}
	return score
}
const uma = {
	111: [50000, 10000, -10000, -30000],
	112: [50000, 10000, -20000, -20000],
	120: [50000, 0, 0, -30000],
	130: [50000, -10000, -10000, -10000],
	201: [30000, 30000, -10000, -30000],
	202: [30000, 30000, -20000, -20000],
	300: [16800, 16600, 16600, -30000],
	400: [5000, 5000, 5000, 5000]
} //马点

function rank() {
	let scr = score_calc(0, data.logs.length)
	let final_scr = [0, {
		"score": scr[1],
		"rank": 0,
		"pt": 0
	}, {
		"score": scr[2],
		"rank": 0,
		"pt": 0
	}, {
		"score": scr[3],
		"rank": 0,
		"pt": 0
	}, {
		"score": scr[4],
		"rank": 0,
		"pt": 0
	}]

	let furui_score = scr // 存储旧分数，接下来会计算新的得点（分供托+顺位）
	let score = scr
	let rank = [0, 1, 1, 1, 1]; // 排名
	let s_rank = [0, 1, 1, 1, 1]; // 不重排名
	let cnt_1 = 0,
		cnt_2 = 0,
		cnt_3 = 0; //1位，2位，3位数量
	for (let i = 1; i <= 4; i++) {
		for (let j = 1; j <= 4; j++) {
			if (score[j] > score[i]) rank[i]++, s_rank[i]++;
		}
		if (rank[i] == 1) cnt_1++;
		if (rank[i] == 2) cnt_2++;
		if (rank[i] == 3) cnt_3++;
	}
	for (let i = 1; i <= 4; i++) {
		for (let j = 1; j < i; j++) {
			if (rank[j] == rank[i]) s_rank[i]++;
		}
	}
	let kyoutaku = 0,
		howannpaied = false;
	for (let i = data.logs.length - 1 - 2; i >= 0; i--) {
		if (data.logs[i].type == 'round') {
			kyoutaku += data.logs[i].kyoutaku
			break
		}
		if (data.logs[i].type == "howannpai_ryuukyoku") {
			howannpaied = true
		}
		if (data.logs[i].type == 'reach') kyoutaku++
	}
	if (!howannpaied) kyoutaku = 0

	if (cnt_1 == 1 || cnt_1 == 2) {
		for (let i = 1; i <= 4; i++)
			if (rank[i] == 1) score[i] += parseInt(kyoutaku * 1000 / cnt_1);
	} else if (cnt_1 == 3) {
		let signal = 1;
		for (let i = 1; i <= 4; i++)
			if (rank[i] == 1) score[i] += Math.floor(kyoutaku / 3) * 1000; //先尽可能分整点1000	
		kyoutaku = kyoutaku % 3; //余下2000或1000供托
		for (let i = 1; i <= 4; i++)
			if (rank[i] == 1)
				if (signal == 1) signal = 0, score[i] += kyoutaku * 400;
				else score[i] += kyoutaku * 300;
	}
	let temp_uma = uma[100 * cnt_1 + 10 * cnt_2 + cnt_3];
	for (let i = 1; i <= 4; i++) score[i] += temp_uma[s_rank[i] - 1];
	point = [0, 0, 0, 0, 0];
	for (let i = 1; i <= 4; i++) point[i] = parseInt((score[i] - 30000) / 100)
	//冒泡排序
	order = [0, 1, 2, 3, 4]; //order[i] 代表顺位 i 的选手
	for (let i = 1; i <= 4; i++)
		for (j = i + 1; j <= 4; j++)
			if (rank[order[j]] < rank[order[i]]) {
				let tem = order[i];
				order[i] = order[j];
				order[j] = tem;
			}
	for (let i = 1; i <= 4; i++) {
		final_scr[i].rank=rank[i]
		final_scr[i].pt=point[i]
	}
	return final_scr
}
