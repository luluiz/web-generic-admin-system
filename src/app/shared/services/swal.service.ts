import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon, SweetAlertResult } from "sweetalert2";

export interface SweetAlertOptions {
    /**
     * Show cancel button?
     * @default true
     */
    showCancelButton?: boolean;

    /**
     * Confirm button text.
     * @default 'Sim'
     */
    confirmButtonText?: string;

    /**
     * Cancel button text
     * @default 'Não'
     */
    cancelButtonText?: string;
}

@Injectable()
export class SwalService {

    constructor() { }

    /**
     * Open sweet alert modal/dialog.
     *
     * @param icon Type: 'success'| 'error' | 'warning' | 'info' | 'question'
     * @param title Title
     * @param text Subtitle
     * @param html Subtitle in HTML
     */
    show(icon: string, title?: string, text?: string, html?: string, options?: SweetAlertOptions): Promise<SweetAlertResult> {

        return Swal.fire({
            title: title,
            html: html,
            text: text,
            icon: <SweetAlertIcon>icon,
            showCancelButton: options ? options.showCancelButton : true,
            confirmButtonText: options ? options.confirmButtonText : "Sim",
            cancelButtonText: options ? options.cancelButtonText : "Não",
        });
    }

    /**
     * Open sweet alert modal/dialog.
     *
     * @param icon Type: 'success'| 'error' | 'warning' | 'info' | 'question'
     * @param title Title
     * @param text Subtitle
     * @param html Subtitle in HTML
     */
    showOk(icon: string, title?: string, text?: string, html?: string) {
        return Swal.fire({
            title: title,
            text: text,
            html: html,
            icon: <SweetAlertIcon>icon,
            showCancelButton: false,
            confirmButtonText: "OK",
        });
    }

}