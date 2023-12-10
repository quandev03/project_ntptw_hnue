import { event_change_page } from "http://127.0.0.1:5500/JS/Logic/event-change-page.js";

export function event_add_question() {
  event_change_page('http://127.0.0.1:5500/HTML/Question_HTML/add_question.html')
}