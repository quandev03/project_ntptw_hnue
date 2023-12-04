import { create_element } from "./create-element.js"

export const event_change_page = (link) => {
  const element = create_element('a');
  element.setAttribute('href', link);
  element.click();
}