export const getDateNow = (type: string | null = null) =>{
  const date = new Date()
  const monthNames = [ "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь" ];
  switch(type){
    case null:
      return `${date.getDate()}-${monthNames[date.getMonth()]}-${date.getFullYear()}`;
    case "time":
      return `${date.getHours() < 10 ? "0" + date.getHours() : date.getHours()}`+
      `:${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}`+
      `:${date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()}`
    case "full":
      return `${date.getHours() < 10 ? "0" + date.getHours() : date.getHours()}`+
      `:${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}`+
      `:${date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()}`+
      ` | `+
      `${date.getDate()}-`+
      `${monthNames[date.getMonth()]}-`+
      `${date.getFullYear()}`;
    case "short":
      return `${monthNames[date.getMonth()]}`+` ${date.getDate()}` +
      ` | ${date.getHours() < 10 ? "0" + date.getHours() : date.getHours()}`+
      `:${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}`+
      `:${date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()}`
      case "classic":
        return `${date.getFullYear()}-${(date.getMonth()+1) < 10 ? "0" + (date.getMonth()+1) : (date.getMonth()+1)}-${(date.getDate()) < 10 ? "0" + (date.getDate()) : (date.getDate())}`
  }
}