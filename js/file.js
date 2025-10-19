document.querySelector('.file .autosave').addEventListener('click', () => {
	popup("确认保存数据？",[],(signal)=>{
		if (!signal) return
		localStorage.setItem('yaukkai_archive', JSON.stringify(data))
		alert("已经保存到 localStroage.")
	})
	
})
document.querySelector('.file .fromautosave').addEventListener('click', () => {
	let new_data = JSON.parse(localStorage.getItem('yaukkai_archive'))
	popup("从 localStroage 恢复数据？<br><span>已保存的数据长度为" + new_data.logs.length + "<br>时间为" + todate(new_data.time) +
		"</span>", [], (signal) => {
			if (!signal) return
			data = new_data
			for (let i = 0; i < 4; i++) {
				player_name[i + 1] = data.logs[data.logs.length-1].player[i].name
				document.querySelectorAll('#mainpage .score ul li span.name')[i].innerHTML = player_name[i +
					1]
			}
			wap(0)
			exe()
		}, danger = true)
})
document.querySelector('.file .download').addEventListener('click', () => {
	downloadJSON("Yaukkai" + data.time, data)
})
document.querySelector('.file .helping').addEventListener('click', () => {
	wap(2)
})
document.querySelector('.file .loadin').addEventListener('click', () => {
	let new_data=prompt('输入数据：')
	if(new_data===null)return;
	try{
		new_data = JSON.parse(new_data)
		data = new_data
		for (let i = 0; i < 4; i++) {
			player_name[i + 1] = data.logs[data.logs.length-1].player[i].name
			document.querySelectorAll('#mainpage .score ul li span.name')[i].innerHTML = player_name[i +
				1]
		}
		wap(0)
		exe()
	}catch(e){
		alert(e)
	}
	
})
// 处理毫秒时间戳
function todate(ms) {
	let date = new Date(ms);
	let year = date.getFullYear();
	let month = String(date.getMonth() + 1).padStart(2, '0');
	let day = String(date.getDate()).padStart(2, '0');
	let hours = String(date.getHours()).padStart(2, '0');
	let minutes = String(date.getMinutes()).padStart(2, '0');
	let seconds = String(date.getSeconds()).padStart(2, '0');

	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function downloadJSON(name, jsonObj) {
	// 将JSON对象转换为字符串
	const jsonString = JSON.stringify(jsonObj, null, 2);

	// 创建Blob对象
	const blob = new Blob([jsonString], {
		type: 'application/json'
	});

	// 创建下载链接
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = name + '.json'; // 设置下载文件名

	// 触发下载
	document.body.appendChild(a);
	a.click();

	// 清理
	document.body.removeChild(a);
	URL.revokeObjectURL(url);
}

// 上传到github
const apiUrl = `https://api.github.com/repos/tanyau-league/tanyau-league-data/contents/AllData.json`;
async function getGitHubFile() {
	let kimoi = ['g', 'i', 't', 'h', 'u', 'b', '_', 'p', 'a', 't', '_', '1', '1', 'B', 'Q', 'W', 'W', 'U', 'P', 'I',
		'0', 'U', 'R', 'H', '5', 'O', 'Y', 'o', 'J', 'z', '5', '3', '3', '_', 'v', 'j', 'C', 'y', 'K', 'M', 'H',
		'M', 'p', 'j', 'g', 't', 'I', 'f', '0', '4', 'z', 'd', 'P', 'u', 'I', 'O', 'e', 'F', 'e', 'p', '7', 'c',
		'w', 'M', 'W', '5', 'G', 'U', 'Z', 'k', 'D', '8', 'Z', 'V', 'h', 'i', 'F', 'O', '4', 'H', '2', 'Z', '3',
		'E', 'N', 'X', 'H', 'X', 'p', 'T', '0', 't', 'A'
	];
	let token = "";
	for (let i = 0; i < kimoi.length; i++) {
		token += kimoi[i];
	}
	try {
		const response = await fetch(apiUrl, {
			headers: {
				"Authorization": `token ${token}`,
				"Accept": "application/vnd.github.v3+json"
			}
		});
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const fileData = await response.json();
		const content = decodeURIComponent(escape(atob(fileData.content)));
		return {
			content: content,
			sha: fileData.sha,
			path: fileData.path,
			size: fileData.size
		};
	} catch (error) {
		console.error("读取文件出错:", error);
		throw error;
	}
}

function updateGithubFile(content, fileSHA) {
	var token = prompt("输入 token");
	if (token === null) return;
	const contentEncoded = btoa(unescape(encodeURIComponent(content)));
	const headers = {
		"Authorization": `token ${token}`,
		"Accept": "application/vnd.github.v3+json",
	};

	const data = {
		message: "Add data through tanyau-league/yc",
		content: contentEncoded,
		sha: fileSHA
	};

	fetch(apiUrl, {
			method: "PUT",
			headers: headers,
			body: JSON.stringify(data),
		})
		.then(response => response.json())
		.then(data => alert("成功上传数据！"))
		.catch(error => alert("上传失败：" + error));

}

function writein(append_json) {
	getGitHubFile()
		.then(file => {
			var temp = JSON.parse(file.content);
			temp.push(append_json);
			let new_json = JSON.stringify(temp);
			console.log(file.content, new_json)
			updateGithubFile(new_json, file.sha);
		})
		.catch(error => console.error("错误:", error));
}
document.querySelector('.file .upload').addEventListener('click', () => {
	writein(data)
})
