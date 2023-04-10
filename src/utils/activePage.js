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

const funcTabs = {
  "overview": 0,
  "add": 1
}


export function activePage(){
  const sideBarButtons = document.querySelectorAll(".sidebar-button")
  if (!sideBarButtons.length){return}
  const path = window.location.pathname.split("/")[1] || ""
  sideBarButtons.forEach((button) => button.classList.remove("active-page"))
  sideBarButtons[sidebar[path]].classList.add("active-page")
  if(path != "login"){ activeTab() }
}

export function activeTab(){
  const tabButtons = document.querySelectorAll(".nav-page")
  if (!tabButtons.length){return}
  const path = tabs[window.location.pathname.split("/")[2]] || 0
  tabButtons.forEach((button) => button.classList.remove("active-page2"))
  tabButtons[path].classList.add("active-page2")
  activeFuncTabs()
}

export function activeFuncTabs(){
  const tabButtons = document.querySelectorAll(".nav-page2")
  if (!tabButtons.length){return}
  const path = funcTabs[window.location.pathname.split("/")[3]] || 0
  tabButtons.forEach((button) => button.classList.remove("active-page2"))
  tabButtons[path].classList.add("active-page2")
}