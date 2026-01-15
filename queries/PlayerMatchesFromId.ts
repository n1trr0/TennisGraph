import { supabase } from "../supabase.ts";
import type { Matches } from "../types/matches.ts";

export default async function PlayerMatchesFromId(id: string): Promise<Matches[] | null> {
  try {
    const { data, error } = await supabase
      .from('matches')
      .select(`
        *, 
        tournaments!inner(tourney_name, surface, year),
        winner:players!winner_id(name_full, ioc2),
        loser:players!loser_id(name_full, ioc2)
      `)
      .or(`winner_id.eq.${id},loser_id.eq.${id}`)
      .limit(10);

    if (error) {
      console.error('Supabase error:', error);
      return null;
    }

    return data as Matches[];
  } catch (err) {
    console.error('Error fetching player matches:', err);
    return null;
  }
}
