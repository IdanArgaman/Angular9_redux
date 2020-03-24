export class IMaterialData {
    position: number;
    name: string;
    weight: number;
    symbol: string;
}

export interface IMaterialState {
    materialData: IMaterialData[];
}
