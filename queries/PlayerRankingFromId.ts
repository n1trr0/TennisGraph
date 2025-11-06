import { supabase } from "../supabase.ts";
import { PlayerRanking } from "../types/playerRanking.ts";

export default async function PlayerRankingFromId(id: string): Promise<PlayerRanking | null> {
    try {
        console.log("Buscando ranking para jugador con ID:", id);

        const { data, error } = await supabase
            .from('rankings')
            .select('rank, ranking_date')
            .eq('player_id', id)
            .order('rank', { ascending: true });

        if (error) {
            console.error('Supabase error:', error);
            return null;
        }


        if (!data || data.length === 0) {
            return {
                player_id: id,
                best_rank: null,
                weeks_top_1: 0,
                weeks_top_10: 0,
                weeks_top_25: 0,
                weeks_top_50: 0,
                weeks_top_100: 0
            };
        }

        // Calcular estadísticas
        const bestRank = data[0].rank;
        const weeksTop1 = data.filter(r => r.rank === 1).length;
        const weeksTop10 = data.filter(r => r.rank <= 10).length;
        const weeksTop25 = data.filter(r => r.rank <= 25).length;
        const weeksTop50 = data.filter(r => r.rank <= 50).length;
        const weeksTop100 = data.filter(r => r.rank <= 100).length;

        return {
            player_id: id,
            best_rank: bestRank,
            weeks_top_1: weeksTop1,
            weeks_top_10: weeksTop10,
            weeks_top_25: weeksTop25,
            weeks_top_50: weeksTop50,
            weeks_top_100: weeksTop100
        };
    } catch (err) {
        console.error('Error fetching player ranking:', err);
        return null;
    }
}
