import { EPSG } from '@basemaps/shared';
import { MosaicCog } from '../../tiff.mosaic';

MosaicCog.create({
    id: '01E095FBVY3PPEXJVB1EKFSJXP',
    name: 'manawatu-whanganui_rural_2016-17_0-3m',
    projection: EPSG.Wgs84,

    minZoom: 13,
    priority: 100,
    year: 2016,
    resolution: 300,

    quadKeys: [
        '3113330232',
        '3113332001',
        '3113332003',
        '3113332010',
        '3113332012',
        '3113332023',
        '3113332030',
        '31133302231',
        '31133302232',
        '31133302233',
        '31133302303',
        '31133302312',
        '31133302313',
        '31133302330',
        '31133302331',
        '31133302332',
        '31133320003',
        '31133320021',
        '31133320023',
        '31133320110',
        '31133320112',
        '31133320113',
        '31133320130',
        '31133320131',
        '31133320132',
        '31133320210',
        '31133320211',
        '31133320213',
        '31133320223',
        '31133320310',
        '31133320320',
        '31133320321',
        '31133320322',
        '31133322010',
        '31133322011',
    ],
});