import { useState } from "react"
import { AdminManager } from "../components/admin/adminManager/adminManager"
import { LogIn } from "../components/admin/logIn/logIn";
import type { IUser } from "../definitions/definition";

export const Admin = () => {
  const [user, setUser] = useState<IUser | null>(null);
  return (
    <>
      {(!user) && <LogIn onPassAccess={(user)=>setUser(user)}/>}
      {(user) && <AdminManager user={user}/>}
    </>
  )
}
