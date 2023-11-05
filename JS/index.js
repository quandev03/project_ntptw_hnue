
// TODO: set fake data 

// TODO: function handle listeners event
function handleLoadPage() {
  const bodyPage = document.getElementById("main_page")
  let dataUser = JSON.parse(sessionStorage.getItem("account"))
  console.log(dataUser);
  


  const nav_tag_2 = document.getElementById("nav_tag_2")
  if (dataUser == null) {
    
    
    let nav1 = document.createElement("a")
    let nav2 = document.createElement("a")
    nav1.innerHTML = "Login"
    nav1.setAttribute("class", "home")
    nav2.setAttribute("class", "home")
    nav2.innerHTML = "Sign Up"
    nav1.setAttribute("href", "http://127.0.0.1:5500/HTML/Login_HTML/login_user.html")
    nav2.setAttribute("href", "http://127.0.0.1:5500/HTML/SignUP_HTML/sign_up.html")
    nav_tag_2.appendChild(nav1)
    nav_tag_2.appendChild(nav2)

    let notification = document.createElement("h1")
    notification.innerHTML = " Please login to use services"
    bodyPage.appendChild(notification)
  } else {
    let idRender = document.createElement("pre")
  let idFullName = document.createElement("pre")
  let idAge = document.createElement("pre")
  let idAddress = document.createElement("pre")
  idRender.innerHTML = `user ID: ${dataUser.id}`
  idFullName.innerHTML =` full name: ${dataUser.fullName}`
  idAge.innerHTML = ` age: ${dataUser.age}`
  idAddress.innerHTML = `address: ${dataUser.address}`

  bodyPage.appendChild(idRender)
  bodyPage.appendChild(idFullName)
  bodyPage.appendChild(idAge)
  bodyPage.appendChild(idAddress)

  let fullName = document.createElement('h2')
    fullName.innerHTML = dataUser.fullName
    fullName.setAttribute('id', 'logout')
    nav_tag_2.appendChild(fullName)

  }

}


// ! logout
function logout() { 
  sessionStorage.removeItem('account')
  location.reload()
}



// TODO: add event listeners
document.addEventListener("load", handleLoadPage())
document.getElementById('logout').addEventListener('click', logout)