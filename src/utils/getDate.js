export const getDateNow = (full) =>{
  const date = new Date()
  const monthNames = [ "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь" ];
  if(!full){
    return `${date.getDate()}-${monthNames[date.getMonth()]}-${date.getFullYear()}`;
  }
  else{
    return `${date.getHours() < 10 ? "0" + date.getHours() : date.getHours()}`+
    `:${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}`+
    `:${date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()}`+
    ` | `+
    `${date.getDate()}-`+
    `${monthNames[date.getMonth()]}-`+
    `${date.getFullYear()}`;
  }
}