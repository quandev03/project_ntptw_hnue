
// TODO: set fake data 

// TODO: function handle listeners event
function handleLoadPage() {
  const bodyPage = document.getElementById("main_page")
  let dataUser = JSON.parse(sessionStorage.getItem("account"))
  console.log(dataUser);
  


  const nav_tag_2 = document.getElementById("nav_tag_2")
  // ! kiểm tra đăng nhập
  if (dataUser == null) { 
    // ! nếu chưa đăng nhập thì tạo trang đăng nhâp
    
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
    notification.innerHTML = " Please login to use services" // ? thông báo yêu cầu đăng nhập
    bodyPage.appendChild(notification) // ? hiện thị thông báo
  } else { // ! trạng thái đã đăng nhập
    let idRender = document.createElement("pre") // ? tạo element hiển thị id
  let idFullName = document.createElement("pre") // ? tạo element hiển thị tên đầy đủ
  let idAge = document.createElement("pre") // ? tạo element hiển thị tuổi
  let idAddress = document.createElement("pre") // ? tạo element hiển thị địa chỉ
  // ! nạp dữ kiệu cho các element
  idRender.innerHTML = `user ID: ${dataUser.id}` 
  idFullName.innerHTML =` full name: ${dataUser.fullName}`
  idAge.innerHTML = ` age: ${dataUser.age}`
  idAddress.innerHTML = `address: ${dataUser.address}`
  //! hiện thị các element
  bodyPage.appendChild(idRender)
  bodyPage.appendChild(idFullName)
  bodyPage.appendChild(idAge)
  bodyPage.appendChild(idAddress)
  // ! tạo trường hiển thi tên ở thanh nav_bar
    
  let fullName = document.createElement('h2')
  fullName.innerHTML = dataUser.fullName
  fullName.setAttribute('id', 'logout')
  nav_tag_2.appendChild(fullName)

  }

}


// ! logout
// ? tạo hàm đăng xuất
function logout() { 
  sessionStorage.removeItem('account') // ? xoá thông tin đăng nhập
  location.reload() // ? load lại trang web
}



// TODO: add event listeners
document.addEventListener("load", handleLoadPage()) // ? sự kiện load trang sẽ chaỵ hàm handleLoadPage
document.getElementById('logout').addEventListener('click', logout) // ? sự kiên đăng xuất sẽ chạy hàm logout