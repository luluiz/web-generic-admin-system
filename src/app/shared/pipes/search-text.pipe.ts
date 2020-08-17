import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'searchText', pure: false })
export class BuscarTextoPipe implements PipeTransform {
    transform(array: any[], param: string, value: string): any[] {
        if (!array) return [];
        if (!value || value == '') return array;
        return array.filter(item => item[param].trim().toLowerCase().includes(value.toLowerCase()));
    }
}