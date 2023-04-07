// export function activePage(passPage){
//   const pageButtons = document.querySelectorAll(".sidebar-button")
//   let page = passPage
//   const pages = {
//     "": 0,
//     "login": 0,
//     "main": 0,
//     "administration": 1,
//     "account": 2
//   }

//   if(!page){
//     page = window.location.pathname.split("/")[1]
//   }
//   page = page.split("?")[0]
//   console.log("page: ", page)

//   pageButtons.forEach((button)=>{
//     button.classList.remove("active-page")
//   })

//   pageButtons[pages[page]].classList.add("active-page")
// }

// export function activeTab(passTab){
//   const pageButtons = document.querySelectorAll(".nav-page")
//   let page = passTab
//   passTab && (page = passTab.split("?")[0])
//   const pages = {
//     undefined: 0,
//     "menu": 1,
//     "statistics": 1,
//     "employees": 1,
//     "service":3,
//   }

//   pageButtons.forEach((button)=>{
//     button.classList.remove("active-page2")
//   })

//   console.log("PAGE: ", page)

//   pageButtons[pages[page]].classList.add("active-page2")
// }