import { createContext, useState } from "react";

export const useSubscriptionContext = () => {
    const [isSub, setisSub] = useState(false);

    return {
        isSub,
        setisSub,
    }
}

const SubscriptionContext = createContext({
    isSub: false, setisSub: () => { },
})

export default SubscriptionContext;