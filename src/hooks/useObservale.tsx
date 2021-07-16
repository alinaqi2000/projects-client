import { useEffect, useState } from "react";
import { BehaviorSubject, Observable } from "rxjs";

export const useObservable = (observable: BehaviorSubject<any>) => {
    const [state, setState] = useState();

    useEffect(() => {
        const sub = observable.subscribe(setState);
        return () => sub.unsubscribe();
    }, [observable]);

    return state;
};
