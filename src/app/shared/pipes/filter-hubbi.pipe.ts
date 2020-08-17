import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'groupBy' })
export class GroupByPipe implements PipeTransform {
    transform(array: any[], attr_level1: string, attr_level2?: string): any[] {
        if (!array) return null;

        const groupedArray: any[] = array.reduce((previous, current) => {
            if (!attr_level2)
                if (!previous[current[attr_level1]]) previous[current[attr_level1]] = [current];
                else previous[current[attr_level1]].push(current);
            else
                if (!previous[current[attr_level1][attr_level2]]) previous[current[attr_level1][attr_level2]] = [current];
                else previous[current[attr_level1][attr_level2]].push(current);

            return previous;
        }, {});

        return Object.keys(groupedArray).map(key => ({ key, value: groupedArray[key] }));
    }
}