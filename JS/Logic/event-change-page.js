import { create_element } from "http://127.0.0.1:5500/JS/Logic/create-element.js"

export const event_change_page = (link) => {
  const element = create_element('a');
  element.setAttribute('href', link);
  element.click();
}