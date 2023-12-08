import { event_change_page } from "../Logic/event-change-page.js"


const change_main = () => {
  event_change_page('http://127.0.0.1:5500')
}

document.getElementById('back_main').addEventListener('click', change_main)