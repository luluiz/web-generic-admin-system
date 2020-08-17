import { Injectable } from '@angular/core';
import { Toast, ToasterService } from 'angular2-toaster';

@Injectable()
export class ToastService {
    public toast: Toast = {
        type: '', // string;
        title: '', // string;
        body: '', // any;
        toastId: '', // string;
        timeout: 3000, // number;  // default 5000
        showCloseButton: false, // boolean;
        closeHtml: '', // string;
        data: '', // any;,
    };

    constructor(private toastService: ToasterService) { }

    /**
    * Função para abrir o toast.
    *
    * @param tipo Tipo de toast: 'success' |'sucesso' | 'error' | 'erro' | 'warning' | 'atencao' | 'info'
    * @param mensagem Mensagem do toast
    * @param timeout Tempo em ms para fechar o toast. @default 3000ms
    */
    show(tipo: string, mensagem: string, timeout?: number) {
        this.toast.type = tipo;
        this.toast.body = mensagem;
        this.toast.title = this.getTitulo(tipo);
        if (timeout) this.toast.timeout = timeout;

        this.toastService.pop(this.toast);
    }

    private getTitulo(tipo: string): string {
        if (this.getTipo(tipo) == 'success')
            return 'OK';
        else if (this.getTipo(tipo) == 'error')
            return 'ERRO';
        else if (this.getTipo(tipo) == 'info')
            return 'INFO';
        else if (this.getTipo(tipo) == 'warning')
            return 'ATENÇÃO';
    }

    private getTipo(tipo: string): string {
        if (tipo == 'success' || tipo == 'sucesso')
            return 'success';
        else if (tipo == 'error' || tipo == 'erro')
            return 'error';
        else if (tipo == 'info')
            return 'info';
        else if (tipo == 'warning' || tipo == 'atencao')
            return 'warning';
    }
}