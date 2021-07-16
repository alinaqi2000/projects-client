import { BehaviorSubject } from 'rxjs';

class UIService {
    toastMessage = new BehaviorSubject<{ type: string, message: string }>({ type: "info", message: "" })
    constructor() { }
    public setMessage(type: string, message: string) {
        this.toastMessage.next({ type, message })
    }
}
export default new UIService()