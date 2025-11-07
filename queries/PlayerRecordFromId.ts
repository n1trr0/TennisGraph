import { supabase } from "../supabase.ts";
import { PlayerRecord } from "../types/playerRecord.ts";

export default async function PlayerRecordFromId(id: string): Promise<PlayerRecord | null> {
    try {
        // Obtener todas las victorias del jugador
        const { data: wins, error: winsError } = await supabase
            .from('matches')
            .select('match_id, round, tournaments!inner(level)')
            .eq('winner_id', id);

        if (winsError) {
            console.error('Error fetching wins:', winsError);
            return null;
        }

        // Obtener todas las derrotas del jugador
        const { data: losses, error: lossesError } = await supabase
            .from('matches')
            .select('match_id, round, tournaments!inner(level)')
            .eq('loser_id', id);

        if (lossesError) {
            console.error('Error fetching losses:', lossesError);
            return null;
        }

        // Contar victorias y derrotas totales
        const totalWins = wins?.length || 0;
        const totalLosses = losses?.length || 0;

        // Contar victorias y derrotas en Grand Slams
        let grandSlamWins = 0;
        let grandSlamLosses = 0;

        if (wins) {
            for (const match of wins) {
                const tournaments = match.tournaments as unknown as { level: string | null };
                if (tournaments?.level === 'Grand Slam') {
                    grandSlamWins++;
                }
            }
        }

        if (losses) {
            for (const match of losses) {
                const tournaments = match.tournaments as unknown as { level: string | null };
                if (tournaments?.level === 'Grand Slam') {
                    grandSlamLosses++;
                }
            }
        }

        // Contar victorias y derrotas en finales
        const finalsWins = wins?.filter(match => match.round === 'F').length || 0;
        const finalsLosses = losses?.filter(match => match.round === 'F').length || 0;

        return {
            player_id: id,
            total_wins: totalWins,
            total_losses: totalLosses,
            grand_slam_wins: grandSlamWins,
            grand_slam_losses: grandSlamLosses,
            finals_wins: finalsWins,
            finals_losses: finalsLosses
        };
    } catch (err) {
        console.error('Error fetching player record:', err);
        return null;
    }
}
