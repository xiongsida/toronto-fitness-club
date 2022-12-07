import {createContext, useState} from "react";

export const useAuthenticationContext = () => {
    const [autenticated, setAuthenticated] = useState(false);

    return {
        autenticated,
        setAuthenticated,
    }
}

const AuthenticationContext = createContext({
    autenticated: false, setAuthenticated: () => {},
})

export default AuthenticationContext;