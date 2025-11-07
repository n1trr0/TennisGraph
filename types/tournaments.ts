export interface Tournaments {
    tourney_id: string;
    tourney_name: string;
    year: number;
    surface: string;
    level: string|null;             //'Grand Slam', 'Masters 1000', 'ATP 500', 'ATP 250', 'ATP Finals', 'Olympics'
    draw_size: number|null;
    prizepool: number|null;
    country: string;
    ioc2: string;
    start_date: Date|null;
    end_date: Date|null;
}