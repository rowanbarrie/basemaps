import { BBox } from '@basemaps/geo';
import { round } from '@basemaps/test/build/rounding';
import o from 'ospec';
import { Wgs84 } from '../wgs84';

o.spec('wgs84', () => {
    o('normLon', () => {
        o(round(Wgs84.normLon(-163.12345 - 720))).equals(-163.12345);
        o(round(Wgs84.normLon(-183.12345 - 720))).equals(176.87655);
        o(round(Wgs84.normLon(-163.12345))).equals(-163.12345);
        o(round(Wgs84.normLon(184.12345))).equals(-175.87655);
        o(round(Wgs84.normLon(184.12345 + 720))).equals(-175.87655);
        o(round(Wgs84.normLon(174.12345 + 720))).equals(174.12345);
    });

    o('crossesAM', () => {
        o(Wgs84.crossesAM(-5, 5)).equals(false);
        o(Wgs84.crossesAM(80, -100)).equals(false);
        o(Wgs84.crossesAM(-175, 175)).equals(true);
        o(Wgs84.crossesAM(175, -175)).equals(true);
    });

    o('delta', () => {
        o(Wgs84.delta(170, -175)).equals(15);
        o(Wgs84.delta(-175, 170)).equals(-15);

        o(Wgs84.delta(20, 30)).equals(10);
        o(Wgs84.delta(30, 20)).equals(-10);

        o(Wgs84.delta(-10, 20)).equals(30);
        o(Wgs84.delta(20, -10)).equals(-30);
    });

    o('union', () => {
        const across: BBox = [175, -42, -178, -41];
        const after: BBox = [-170, -43, -160, -42];
        const before1: BBox = [170, 40, 178, 42];
        const before2: BBox = [160, 43, 171, 46];

        o(round(Wgs84.union(across, after), 4)).deepEquals([175, -43, -160, -41]);
        o(round(Wgs84.union(after, across), 4)).deepEquals([175, -43, -160, -41]);
        o(round(Wgs84.union(before1, before2), 4)).deepEquals([160, 40, 178, 46]);

        const unionLon = (aw: number, ae: number, bw: number, be: number): number[] =>
            round(Wgs84.union([aw, -42, ae, -40], [bw, -42, be, -40]), 4);

        // disjoint east closer
        o(unionLon(90, 100, -100, -90)).deepEquals([90, -42, -90, -40]);
        // disjoint west closer
        o(unionLon(80, 90, -90, -80)).deepEquals([-90, -42, 90, -40]);
    });
});
