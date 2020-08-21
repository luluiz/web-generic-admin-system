import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { DeviceDetectorService, DeviceInfo } from 'ngx-device-detector';

@Injectable({
    providedIn: 'root'
})
export class UtilsService {

    constructor(
        private deviceService: DeviceDetectorService,
    ) { }

    detectDevice(): DeviceInfo {
        return this.deviceService.getDeviceInfo();
    }

    isMobile(): boolean {
        return this.deviceService.isMobile();
    }

    isTablet(): boolean {
        return this.deviceService.isTablet();
    }

    isDesktop(): boolean {
        return this.deviceService.isDesktop();
    }

    isDesktopByWidth(): boolean {
        return window.innerWidth < 800;
    }


    isExpired(exp: number | string | Date, iat?: number): boolean {
        if (iat) {
            let timeStamp = Math.floor(Date.now() / 1000);
            let timeCheck = Number(exp) - timeStamp;

            return (timeCheck < 0) ? true : false;
        } else {
            if (exp) return moment(moment().toString()).isAfter(moment(exp).toString());
            else return true;
        }
    }

    getSecondsToExpire(exp: number): number {
        let timeStamp = Math.floor(Date.now() / 1000);
        let timeCheck = Number(exp) - timeStamp;

        return timeCheck;
    }

    /**
     * Async read file.
     * @param file arquivo a ser lido
     */
    async readFileAsync(file: File): Promise<string> {
        return await new Promise((resolve, reject) => {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onerror = reject;
            // reader.onload = resolve;
            reader.onload = ((_evt: any) => resolve(<string>_evt.target['result']));
        });
    }

    isValidDate(data: Date): boolean {
        return moment(data).isValid();
    }
}
