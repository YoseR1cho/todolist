const datatime=document.querySelector('.datatime')

function realSysTime() {
    let now = new Date();
    let year = now.getFullYear(); //获取年份
    let month = now.getMonth()+1; //获取月份
    let date = now.getDate(); //获取日期
    let hour = now.getHours(); //获取小时
    let minute = now.getMinutes(); //获取分钟
    let seconds = now.getSeconds(); //获取秒

    hour= hour < 10 ? '0'+hour:hour
    minute= minute < 10 ? '0'+minute:minute
    seconds= seconds < 10 ? '0'+seconds:seconds

    let time = year + "/" + month + "/" + date + " " + hour + ":" + minute + ":" + seconds;
    datatime.innerHTML = time;
  }

function timeShow() {
    window.setInterval(realSysTime,1000)
}

realSysTime()
timeShow()