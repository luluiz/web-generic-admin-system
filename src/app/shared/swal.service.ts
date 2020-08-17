import { Injectable } from '@angular/core';
import Swal from "sweetalert2";

export interface SweetAlertOptions {
    /**
     * Mostrar botão cancelar?
     * @default true
     */
    showCancelButton?: boolean;

    /**
     * Texto do botão de confirmação.
     * @default 'Sim'
     */
    confirmButtonText?: string;

    /**
     * Texto do botão de cancelamento.
     * @default 'Não'
     */
    cancelButtonText?: string;
}

@Injectable()
export class SwalService {

    constructor() { }

    /**
         * Abre a janela swal, Sweet Alert.
         *
         * @param tipo Tipo de janela: 'success' |'sucesso' | 'error' | 'erro' | 'warning' | 'atencao' | 'info' | 'question' | 'pergunta'
         * @param titulo Título do sweet alert
         * @param text Subtítulo do sweet alert
         * @param html Subtítulo do sweet alert em formato HTML
         */
    show(tipo: string, titulo: string, text?: string, html?: string, options?: SweetAlertOptions) {
        return Swal.fire({
            title: titulo,
            html: html,
            text: text,
            type: this.getTipo(tipo),
            showCancelButton: options ? options.showCancelButton : true,
            confirmButtonColor: "#15723b",
            confirmButtonText: options ? options.confirmButtonText : "Sim",
            cancelButtonColor: "#dc3545",
            cancelButtonText: options ? options.cancelButtonText : "Não",
        });
    }

    showOk(tipo: string, titulo: string, text?: string, html?: string, options?: SweetAlertOptions) {
        return Swal.fire({
            title: titulo,
            text: text,
            html: html,
            type: this.getTipo(tipo),
            showCancelButton: false,
            confirmButtonColor: "#15723b",
            confirmButtonText: "OK",
            cancelButtonColor: "#dc3545",
        });
    }

    showPermissao(titulo: string, text: string, options?: SweetAlertOptions) {
        return Swal.fire({
            title: titulo,
            text: text,
            type: this.getTipo('tipo'),
            showCancelButton: false,
            confirmButtonColor: "#15723b",
            confirmButtonText: options && options.confirmButtonText ? options.confirmButtonText : 'Voltar',
        });
    }

    showLimitePlano(titulo: string, text: string, options?: SweetAlertOptions) {
        return Swal.fire({
            title: titulo,
            text: text,
            type: this.getTipo('atencao'),
            showCancelButton: true,
            cancelButtonColor: "#15723b",
            cancelButtonText: options && options.cancelButtonText ? options.cancelButtonText : 'Fazer Upgrade',
            confirmButtonColor: "#dc3545",
            confirmButtonText: options ? options.confirmButtonText : "Voltar",
        });
    }

    showAtivacaoConta(titulo: string, text: string, options?: SweetAlertOptions) {
        return Swal.fire({
            title: titulo,
            text: text,
            type: this.getTipo('atencao'),
            showCancelButton: true,
            cancelButtonColor: "#dc3545",
            cancelButtonText: options && options.cancelButtonText ? options.cancelButtonText : 'Fechar',
            confirmButtonColor: "#15723b",
            confirmButtonText: options ? options.confirmButtonText : 'Reenviar E-mail de Ativação',
        });
    }

    // 'success' | 'error' | 'warning' | 'info' | 'question'
    private getTipo(tipo: string) {
        if (tipo == 'success' || tipo == 'sucesso')
            return 'success';
        else if (tipo == 'error' || tipo == 'erro')
            return 'error';
        else if (tipo == 'info')
            return 'info';
        else if (tipo == 'warning' || tipo == 'atencao')
            return 'warning';
        else if (tipo == 'question' || tipo == 'pergunta')
            return 'question';
    }
}