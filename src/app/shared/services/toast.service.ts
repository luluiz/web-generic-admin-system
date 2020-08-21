import { Injectable } from '@angular/core';
import { ActiveToast, IndividualConfig, ToastrService } from 'ngx-toastr';

@Injectable()
export class ToastService {

    constructor(private toast: ToastrService) { }

    /**
    * return a toast
    *
    * @param type toast type: 'success' | 'error' | 'warning' | 'info'
    * @param message toast message
    * @param timeout toast timeout. @default 5000 (ms)
    */
    show(type: string, message: string = '', timeout?: number): ActiveToast<any> | undefined {
        return this.getToast(type, message, timeout);
    }

    private getToast(type: string, message: string, timeout?: number): ActiveToast<any> | undefined {
        let cfg: Partial<IndividualConfig> = { positionClass: 'toast-top-right' };
        if (timeout) cfg.timeOut = timeout;

        switch (type) {
            case 'success':
                return this.toast.success(message, 'OK', cfg);
            case 'error':
                return this.toast.error(message, 'ERRO', cfg);
            case 'info':
                return this.toast.info(message, 'INFO', cfg);
            case 'warning':
                return this.toast.warning(message, 'ATENÇÃO', cfg);
            default:
                break;
        }
    }
}