document.querySelector('.file .autosave').addEventListener('click',()=>{
	localStorage.setItem('yaukkai_archive',JSON.stringify(data))
	alert("已经保存到 localStroage.")
})
document.querySelector('.file .fromautosave').addEventListener('click',()=>{
	let new_data=JSON.parse(localStorage.getItem('yaukkai_archive'))
	popup("从 localStroage 恢复数据？<br><span>已保存的数据长度为"+new_data.logs.length+"<br>时间为"+todate(new_data.time)+"</span>",[],()=>{
		data=new_data
		wap(0)
		exe()
	},danger=true)
})
document.querySelector('.file .download').addEventListener('click',()=>{
	downloadJSON("TanyauData"+data.time,data)
})
// 处理毫秒时间戳
function todate(ms){
    let date = new Date(ms);
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let day = String(date.getDate()).padStart(2, '0');
    let hours = String(date.getHours()).padStart(2, '0');
    let minutes = String(date.getMinutes()).padStart(2, '0');
    let seconds = String(date.getSeconds()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
function downloadJSON(name,jsonObj) {
  // 将JSON对象转换为字符串
  const jsonString = JSON.stringify(jsonObj, null, 2);
  
  // 创建Blob对象
  const blob = new Blob([jsonString], { type: 'application/json' });
  
  // 创建下载链接
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name+'.json'; // 设置下载文件名
  
  // 触发下载
  document.body.appendChild(a);
  a.click();
  
  // 清理
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}