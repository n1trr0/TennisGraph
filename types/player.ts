export interface Player {
    id: string;
    name: string;
    country: string; //ISO country code
    birth: string;
    hand: string;
    height: number;
    ranking?: number;
}
