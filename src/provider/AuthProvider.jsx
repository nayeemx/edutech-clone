// 1. context api = initiate context api with createcontext api from react
// 2. to check if it MdWorkspacePremium, in this case use name and email under the function of page name, in this case authprovider

import { createContext, useState } from "react"

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    // if put it as object?
    
    const authInfo = {
        user,
        setUser,
    };
  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
}

export default AuthProvider