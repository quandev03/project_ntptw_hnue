export function check_already_accounted(accounts, username) {
  let check_already = false
  accounts.map(account => {
    if (username === undefined) {
      username = ''
    }
    if (account.username == username) {
      check_already = true
    }
  })
  if (check_already) {
    return true
  }
  else {
    return false
  }
}
