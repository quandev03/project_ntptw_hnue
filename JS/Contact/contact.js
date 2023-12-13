import { event_change_page } from "./../../JS/Logic/event-change-page.js"
import { get_element_id } from "../Logic/get_element_id.js"


const change_main = () => {
  event_change_page('./../../index.html')
}

get_element_id('back_main').addEventListener('click', change_main)
get_element_id('github').addEventListener('click', ()=>event_change_page('https://github.com/quandev03/project_ntptw_hnue.git'))