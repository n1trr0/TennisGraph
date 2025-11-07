import { supabase } from "../supabase.ts";
import { PlayerRanking } from "../types/playerRanking.ts";

export default async function PlayerRankingFromId(id: string): Promise<PlayerRanking | null> {
    try {
        // Obtener el mejor ranking (el menor número)
        const { data: bestRankData, error: bestRankError } = await supabase
            .from('rankings')
            .select('rank')
            .eq('player_id', id)
            .order('rank', { ascending: true })
            .limit(1);

        if (bestRankError) {
            console.error('Supabase error:', bestRankError);
            return null;
        }

        // Si no hay datos de ranking
        if (!bestRankData || bestRankData.length === 0) {
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

        const bestRank = bestRankData[0].rank;

        // Hacer conteos en paralelo con consultas separadas
        const [top1, top10, top25, top50, top100] = await Promise.all([
            supabase.from('rankings').select('rank', { count: 'exact', head: true }).eq('player_id', id).eq('rank', 1),
            supabase.from('rankings').select('rank', { count: 'exact', head: true }).eq('player_id', id).lte('rank', 10),
            supabase.from('rankings').select('rank', { count: 'exact', head: true }).eq('player_id', id).lte('rank', 25),
            supabase.from('rankings').select('rank', { count: 'exact', head: true }).eq('player_id', id).lte('rank', 50),
            supabase.from('rankings').select('rank', { count: 'exact', head: true }).eq('player_id', id).lte('rank', 100)
        ]);

        return {
            player_id: id,
            best_rank: bestRank,
            weeks_top_1: top1.count || 0,
            weeks_top_10: top10.count || 0,
            weeks_top_25: top25.count || 0,
            weeks_top_50: top50.count || 0,
            weeks_top_100: top100.count || 0
        };
    } catch (err) {
        console.error('Error fetching player ranking:', err);
        return null;
    }
}
