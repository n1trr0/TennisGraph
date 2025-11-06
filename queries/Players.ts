import { supabase } from "../supabase.ts";
import { Player } from "../types/player.ts";

export default async function Players(): Promise<Player[]> {
    const { data, error } = await supabase
        .from('players')
        .select('*')
        .order('name', { ascending: true });

    if (error) {
        console.error('Error fetching players:', error);
        return [];
    }

    return data as Player[];
}
