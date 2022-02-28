export const FormatDatetime = _datetime =>{
    var datetime = new Date(_datetime)
    const month = datetime.getMonth()+1
    const day = datetime.getDate()
    const dayOfWeek = datetime.getDay()
    const dayOfWeekStr = [ "日", "月", "火", "水", "木", "金", "土" ][dayOfWeek] ;
    // const hour = datetime.getHours()
    const hour = ("0"+datetime.getHours()).slice(-2);
    const minute = ("0" + datetime.getMinutes()).slice(-2);
    const datetimeFormatted = `${month}/${day}（${dayOfWeekStr}）${hour}:${minute}`

    return datetimeFormatted
};
export const FormatDate = _datetime =>{
    var datetime = new Date(_datetime)
    const year = datetime.getFullYear()
    const month = datetime.getMonth()+1
    const day = datetime.getDate()
    const dayOfWeek = datetime.getDay()
    const dayOfWeekStr = [ "日", "月", "火", "水", "木", "金", "土" ][dayOfWeek] ;
    const datetimeFormatted = `${year}/${month}/${day}（${dayOfWeekStr}）`

    return datetimeFormatted
};

export const FormatTime = _datetime =>{
    if(!_datetime) {
        return
    }
    var datetime = new Date(_datetime)
    // const hour = ("0"+datetime.getHours()).slice(-2);
    const hour = datetime.getHours()
    const minute = datetime.getMinutes()
    // const minute = ("0" + datetime.getMinutes()).slice(-2);
    const datetimeFormatted = `${hour}時${minute}分`

    return datetimeFormatted
}


export const FormatTimeDelta = (date1, date2) =>{
    var diff = new Date(date2)-new Date(date1);
    var msec = diff;
    var hh = Math.floor(msec / 1000 / 60 / 60);
    msec -= hh * 1000 * 60 * 60;
    var mm = Math.floor(msec / 1000 / 60);
    msec -= mm * 1000 * 60;
    // var ss = Math.floor(msec / 1000);
    // msec -= ss * 1000;
    return `${hh}時間${mm}分`
}