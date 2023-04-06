export function activePage(passPage){
  const pageButtons = document.querySelectorAll(".sidebar-button")
  let page = passPage
  const pages = {
    "": 0,
    "login": 0,
    "main": 0,
    "administration": 1,
    "account": 2
  }

  if(!page){
    page = window.location.pathname.split("/")[1]
  }

  pageButtons.forEach((button)=>{
    button.classList.remove("active-page")
  })

  pageButtons[pages[page]].classList.add("active-page")
}

export function activeTab(passTab){
  const pageButtons = document.querySelectorAll(".nav-page")

  const pages = {
    undefined: 0,
    "menu": 1,
    "service": 2,
    "statistics": 1
  }

  pageButtons.forEach((button)=>{
    button.classList.remove("active-page")
  })

  pageButtons[pages[passTab]].classList.add("active-page")
}