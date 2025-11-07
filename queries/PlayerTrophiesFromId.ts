import { supabase } from "../supabase.ts";
import { PlayerTrophies } from "../types/playerTrophies.ts";

export default async function PlayerTrophiesFromId(id: string): Promise<PlayerTrophies | null> {
    try {
        // Obtener todos los partidos ganados por el jugador en finales
        const { data: finalsWon, error: finalsError } = await supabase
            .from('matches')
            .select('match_id, round, tournaments!inner(level)')
            .eq('winner_id', id)
            .eq('round', 'F');

        console.log("Finals won data:", finalsWon);
        if (finalsError) {
            console.error('Error fetching finals:', finalsError);
            return null;
        }

        // Obtener medallas de plata
        const { data: olympicSilvers, error: silversError } = await supabase
            .from('matches')
            .select('match_id, tournaments!inner(level)')
            .eq('loser_id', id)
            .eq('round', 'F')
            .eq('tournaments.level', 'Olympics');

        if (silversError) {
            console.error('Error fetching olympic silvers:', silversError);
        }

        // Obtener medallas de bronce
        const { data: olympicBronzes, error: bronzesError } = await supabase
            .from('matches')
            .select('match_id, tournaments!inner(level)')
            .eq('winner_id', id)
            .eq('round', 'BR')
            .eq('tournaments.level', 'Olympics');

        if (bronzesError) {
            console.error('Error fetching olympic bronzes:', bronzesError);
        }

        // Contar títulos por categoría
        let grandSlams = 0;
        let masters1000 = 0;
        let atp500 = 0;
        let atp250 = 0;
        let olympicGolds = 0;

        if (finalsWon) {
            console.log("Processing", finalsWon.length, "finals");
            for (const match of finalsWon) {
                console.log("Match data:", match);
                console.log("Tournaments field:", match.tournaments);
                console.log("Type of tournaments:", typeof match.tournaments);
                
                const tournaments = match.tournaments as unknown as { level: string | null };
                const level = tournaments?.level;
                
                
                switch (level) {
                    case 'Grand Slam':
                        grandSlams++;
                        break;
                    case 'Masters 1000':
                        masters1000++;
                        break;
                    case 'ATP 500':
                        atp500++;
                        break;
                    case 'ATP 250':
                        atp250++;
                        break;
                    case 'Olympics':
                        olympicGolds++;
                        break;
                }
            };
        }

        return {
            player_id: id,
            grand_slams: grandSlams,
            masters_1000: masters1000,
            atp_500: atp500,
            atp_250: atp250,
            olympic_golds: olympicGolds,
            olympic_silvers: olympicSilvers?.length || 0,
            olympic_bronzes: olympicBronzes?.length || 0
        };
    } catch (err) {
        console.error('Error fetching player trophies:', err);
        return null;
    }
}
