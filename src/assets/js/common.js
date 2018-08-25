///不带时分秒的
 export const timeFormattershow = (value) => { 
    let date = new Date(value)
      var y =date.getFullYear();
      var MM =date.getMonth() + 1;
      MM =MM <10 ? ('0'+MM) : MM
      var d =date.getDate();
      d = d < 10 ? ('0'+d) : d
      var h =date.getHours();
      h = h <10 ? ('0' + h) :h
      var m = date.getMinutes()
      m = m>9 ? m : ('0' +m)
     var ss = date.getSeconds()
      ss = ss >9 ? ss : ('0' +ss)
     return y + '-'+MM+'-'+d 
  
   // return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() +':'+date.getSeconds();
  
}  
export const timeFormattershowsecod = (value) => { 
    let date = new Date(value)
      var y =date.getFullYear();
      var MM =date.getMonth() + 1;
      MM =MM <10 ? ('0'+MM) : MM
      var d =date.getDate();
      d = d < 10 ? ('0'+d) : d
      var h =date.getHours();
      h = h <10 ? ('0' + h) :h
      var m = date.getMinutes()
      m = m>9 ? m : ('0' +m)
     var ss = date.getSeconds()
      ss = ss >9 ? ss : ('0' +ss)
     return y + '-'+MM+'-'+d+" "+h+':'+m+':'+ss
  
   // return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() +':'+date.getSeconds();
  
}
export const dateToMs = (value) => {
    let result = new Date(value).getTime();
    return result;     
}







  //时间戳转化格式时分秒,(00:00:00)
    /**
     * 时间秒数格式化
     * @param s 时间戳（单位：秒）
     * @returns {*} 格式化后的时分秒
     */
    var sec_to_time = function(s) {
      var t;
      if(s > -1){
          var hour = Math.floor(s/3600);
          var min = Math.floor(s/60) % 60;
          var sec = s % 60;
          if(hour < 10) {
              t = '0'+ hour + ":";
          } else {
              t = hour + ":";
          }

          if(min < 10){t += "0";}
          t += min + ":";
          if(sec < 10){t += "0";}
          t += sec.toFixed(2);
      }
      return t;
  }

  // 选择日期  一天的时间默认一天的时间
export const SevenDay = (date) => {
    // console.log(date)
  
    let today = new Date(date);
    // console.log(today)
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);
    today = today.getTime();
    let oneday = 1000 * 60 * 60 * 24;
     
  /* console.log("panpnapan")
   console.log(oneday)*/
    // console.log(today );
    // console.log(oneday)
    return today - oneday * 7;
   /*  return date >9 ?(date) : ("0"+date) */
  }; 