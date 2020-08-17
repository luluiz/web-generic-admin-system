import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'orderBy' })
export class OrderByPipe implements PipeTransform {
    transform(array: any[], orderBy: string, asc: boolean = true): any[] {
        if (!array) return [];
        if (array && (!orderBy || orderBy.trim() == "")) return array;

        if (asc) return Array.from(array).sort((item1: any, item2: any) => this.orderByComparator(item1[orderBy], item2[orderBy]));
        else return Array.from(array).sort((item1: any, item2: any) => this.orderByComparator(item2[orderBy], item1[orderBy]));
    }

    orderByComparator(a: any, b: any): number {
        //Isn't a number so lowercase the string to properly compare
        if ((isNaN(parseFloat(a)) || !isFinite(a)) || (isNaN(parseFloat(b)) || !isFinite(b))) {
            a = this.removeAccents(a.toLowerCase());
            b = this.removeAccents(b.toLowerCase());
            if (a < b) return -1;
            if (a > b) return 1;
        } else {    //Parse strings as numbers to compare properly
            if (parseFloat(a) < parseFloat(b)) return -1;
            if (parseFloat(a) > parseFloat(b)) return 1;
        }

        return 0; //equal each other
    }

    removeAccents(strComAcento: string): string {
        var string = strComAcento;
        var mapaAcentosHex = { a: /[\xE0-\xE6]/g, e: /[\xE8-\xEB]/g, i: /[\xEC-\xEF]/g, o: /[\xF2-\xF6]/g, u: /[\xF9-\xFC]/g, c: /\xE7/g, n: /\xF1/g };
        for (var letra in mapaAcentosHex)
            string = string.replace(mapaAcentosHex[letra], letra);
        return string;
    }
}