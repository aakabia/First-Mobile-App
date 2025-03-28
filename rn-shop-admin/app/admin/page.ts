import { redirect } from 'next/navigation'


const Admin = () => {
  return redirect("/admin/dashboard")
}

export default Admin


// page redirects users to /admin/dashboard