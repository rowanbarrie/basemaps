import { Epsg } from '@basemaps/geo';
import { getImageFormat, ImageFormat } from '@basemaps/tiler';

export interface ActionData {
    version: string;
    action: string;
    rest: string[];
    urlPath: string;
}

export enum TileType {
    WMTS = 'WMTS',
    Image = 'image',
}

export type TileData = TileDataXyz | TileDataWmts;

export interface TileDataXyz {
    type: TileType.Image;
    name: string;
    projection: Epsg;
    x: number;
    y: number;
    z: number;
    ext: ImageFormat;
}

export interface TileDataWmts {
    type: TileType.WMTS;
    name: string;
    projection: Epsg | null;
}

function tileXyzFromPath(path: string[]): TileData | null {
    const name = path[0];
    const projection = Epsg.parse(path[1]);
    if (projection == null) return null;
    const z = parseInt(path[2], 10);
    const x = parseInt(path[3], 10);
    const [ystr, extStr] = path[4].split('.', 2);
    const y = parseInt(ystr, 10);

    if (isNaN(x) || isNaN(y) || isNaN(z)) return null;

    const ext = getImageFormat(extStr);
    if (ext == null) return null;

    return { type: TileType.Image, name, projection, x, y, z, ext };
}

/**
 * Extract WMTS information from a path
 *
 * @example
 * - /v1/aerial/2193/WMTSCapabilities
 * - /v1/aerial/WMTSCapabilities
 * @param path
 * @param tileSet
 */
function tileWmtsFromPath(path: string[]): TileData | null {
    if (path.length > 3) return null;
    if (path[path.length - 1] != 'WMTSCapabilities.xml') return null;

    const name = path[0];
    let projection = null;
    if (path.length == 3) {
        projection = Epsg.parse(path[1]);
        if (projection == null) return null;
    }

    return {
        type: TileType.WMTS,
        name,
        projection,
    };
}

/**
 * Extract tile variables (`tileSet`, `projection`, `x`, `y`, `z` and `ext`) from an array
 **/
export function tileFromPath(path: string[]): TileData | null {
    if (path.length < 1) return null;

    if (path.length == 5) {
        return tileXyzFromPath(path);
    }

    return tileWmtsFromPath(path);
}