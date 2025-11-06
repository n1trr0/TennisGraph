import { supabase } from "../supabase.ts";
import { Player } from "../types/player.ts";

export default async function PlayerFromId(id: string): Promise<Player | null> {
    const { data, error } = await supabase
        .from('players')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching player:', error);
        return null;
    }

    return data as Player;
}