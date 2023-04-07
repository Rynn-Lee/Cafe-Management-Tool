const sidebar = {
  undefined: 0, "": 0, "login": 0, null: 0,
  "administration": 1,
  "account": 2
}

const tabs = {
  undefined: 0, "": 0, "my": 0, null: 0,
  "menu": 1, "statistics": 1,
  "employees": 2,
  "service": 3
}

export function activePage(){
  const sideBarButtons = document.querySelectorAll(".sidebar-button")
  const path = window.location.pathname.split("/")[1] || ""
  sideBarButtons.forEach((button) => button.classList.remove("active-page"))
  sideBarButtons[sidebar[path]].classList.add("active-page")
  if(path != "login"){ activeTab() }
}

export function activeTab(){
  const tabButtons = document.querySelectorAll(".nav-page")
  let path = tabs[window.location.pathname.split("/")[2]] || 0
  tabButtons.forEach((button) => button.classList.remove("active-page2"))
  tabButtons[path].classList.add("active-page2")
}