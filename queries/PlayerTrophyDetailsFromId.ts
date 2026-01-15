import { supabase } from "../supabase.ts";

export interface TrophyDetail {
  tourney_name: string;
  year: number;
  level: string;
}

export default async function PlayerTrophyDetailsFromId(id: string): Promise<TrophyDetail[] | null> {
  try {
    const { data, error } = await supabase
      .from('matches')
      .select(`
        match_id,
        round,
        tournaments!inner(tourney_name, year, level)
      `)
      .eq('winner_id', id)
      .eq('round', 'F')
      .order('tournaments(year)', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return null;
    }

    // Transform data to extract tournament details
    return data.map(match => {
      const tournament = match.tournaments as unknown as { tourney_name: string; year: number; level: string };
      return {
        tourney_name: tournament.tourney_name,
        year: tournament.year,
        level: tournament.level
      };
    });
  } catch (err) {
    console.error('Error fetching trophy details:', err);
    return null;
  }
}
