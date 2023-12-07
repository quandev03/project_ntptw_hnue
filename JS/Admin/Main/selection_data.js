import { get_item } from "../../Logic/storage.js"

export const selection_data = (select) => {
  const data = get_item('data_question', 'local') 
  if (select == 'all') return data
  else if (select == 'await') {
    return data.filter( element => element[0].status === 'waiting for approval')
  }
  else if (select == 'approvals') {
    return data.filter(element => {
      console.log(element);
      return element[0].status === 'approvals'
    })
   }
  else {
    return data.filter( element => element[0].status === 'disapprovals')
  }
} 