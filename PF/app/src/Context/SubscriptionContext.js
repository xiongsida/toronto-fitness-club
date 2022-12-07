import {createContext, useState} from "react";

export const useSubscriptionContext = () => {
    const [subscribed, setSubscribed] = useState(false);

    return {
        subscribed,
        setSubscribed,
    }
}

const useSubscriptionContext = createContext({
    subscribed: false, setSubscribed: () => {},
})

export default useSubscriptionContext;