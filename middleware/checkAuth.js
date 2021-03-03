export default function ({ $auth, redirect }) {
  let user = $auth.user
  // if (user !== 'testing09') {
  if (user !== 'testing09') {
    redirect('/master')
  }
}
