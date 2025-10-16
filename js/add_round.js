function add_round(round_gid, round, honnba, kyoutaku) {
	//这里约定在提供的round_gid前插入.
	data.logs.splice(round_gid, 0, {
		"type": "round",
		"round": round,
		"honnba": honnba,
		"kyoutaku": kyoutaku
	})
	wap(0)
	exe()
	return round_gid
}

function add_round_after(round_gid, round, honnba, kyoutaku) {
	//这里约定在提供的round_gid后插入.
	let next_gid = 0;
	for (let i = round_gid + 1; i < data.logs.length; i++) {
		if (data.logs[i].type == 'round') {
			next_gid = i
			break
		}
	}
	data.logs.splice(next_gid, 0, {
		"type": "round",
		"round": round,
		"honnba": honnba,
		"kyoutaku": kyoutaku
	})

	wap(0)
	exe()
	return next_gid
}
