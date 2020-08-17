import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { DeviceDetectorService } from 'ngx-device-detector';

@Injectable()
export class UtilsService {

    constructor(
        private deviceService: DeviceDetectorService,
    ) { }

    detectDevice(): any {
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

    isDesktopByWidthWindow(): boolean {
        let innerWidth = window.innerWidth;
        if (innerWidth < 800) return false;
        else return true;
    }

    isValidDate(data: Date): boolean {
        return moment(data).isValid();
    }

    noMask(value: any): number {
        if (value && typeof value === 'number')
            return value;
        else if (value) {
            let split = value.split("R$ ");
            let response = Number(split[1].replace('.', '').replace('.', '').replace('.', '').replace('.', '').replace(',', '.'));
            if (split[0] == '-')
                return value ? -response : 0;
            else
                return value ? response : 0;
        } else return 0;
    }

    isExpired(exp: number | string | Date, iat?: number): boolean {
        if (iat) {
            let timeStamp = Math.floor(Date.now() / 1000);
            let timeCheck = Number(exp) - timeStamp;

            return (timeCheck < 0) ? true : false;
        } else {
            if (exp) moment(moment().toString()).isAfter(moment(exp).toString())
            else return true;
        }
    }

    getSecondsToExpire(exp: number): number {
        let timeStamp = Math.floor(Date.now() / 1000);
        let timeCheck = Number(exp) - timeStamp;

        return timeCheck;
    }

}


