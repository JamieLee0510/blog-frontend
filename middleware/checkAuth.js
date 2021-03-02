export default async function ({ $auth, redirect }) {
  let user = $auth.user
  if (user === 'testing09') {
    redirect('/master/dashboard')
  } else {
    redirect('/login')
  }
}
