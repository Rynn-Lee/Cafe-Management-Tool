export default function activePage(page){
  
  const pageButtons = document.querySelectorAll(".sidebar-button")
  const pages = {
    "main": 0,
    // "menu": 1,
    // "orders": 2,
    "administrating": 1,
    "account": 2
}

  pageButtons.forEach((button)=>{
    button.classList.remove("active-page")
  })

  pageButtons[pages[page]].classList.add("active-page")
}