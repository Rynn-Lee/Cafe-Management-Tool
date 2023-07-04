const sidebar: any = {
  undefined: 0, "": 0, "login": 0, null: 0,
  "orders": 1,
  "statistics": 2,
  "administration": 3,
  "account": 4,
}

const tabs: any = {
  undefined: 0, "": 0, "my": 0, null: 0, "menu": 0,
  "statistics": 1, "employees": 1, "overview": 1,
  "allorders": 2, "service": 2
}

const funcTabs: any = {
  "overview": 0, "viewdishes": 0, "printers": 0, "myorders": 0,
  "add": 1, "newdish": 1, "categories": 1, "allorders": 1,
  "cleanup": 2
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