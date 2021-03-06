import type { Epsg } from '../epsg';
import { Bounds } from '../bounds';

/**
 * Cut down interface, with only the information needed to render a tileset
 */
export interface WmtsLayer {
    name: string;
    title: string;
    description: string;
    projection: Epsg;
    taggedName: string;
    extent: Bounds;
}

/** WMTS Provider information */
export interface WmtsProvider {
    version: number;
    serviceIdentification: {
        title: string;
        description: string;
        fees: string;
        accessConstraints: string;
    };
    serviceProvider: {
        name: string;
        site: string;
        contact: {
            individualName: string;
            position: string;
            phone: string;
            address: {
                deliveryPoint: string;
                city: string;
                postalCode: string;
                country: string;
                email: string;
            };
        };
    };
}
