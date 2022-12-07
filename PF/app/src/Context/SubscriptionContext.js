import {createContext, useState} from "react";

export const useSubscriptionContext = () => {
    const [subscribed, setSubscribed] = useState(false);

    return {
        subscribed,
        setSubscribed,
    }
}

const SubscriptionContext = createContext({
    subscribed: false, setSubscribed: () => {},
})

export default SubscriptionContext;