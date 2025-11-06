import { Context} from "fresh";
import { supabase } from "../../../supabase.ts";

export const handler = {
    async GET(req: Request, _ctx: Context<undefined>) {
        const url = new URL(req.url);
        const query = url.searchParams.get("q");

        if (!query || query.trim() === "") {
        return new Response(JSON.stringify([]), {
            headers: { "Content-Type": "application/json" }})
        }

        try {
            const { data, error } = await supabase
                .from('players')
                .select('*')
                .ilike('name_full', `%${query}%`)
                .limit(10);

            if (error) throw error;

            return new Response(JSON.stringify(data || []), {
                headers: { "Content-Type": "application/json" },
            });
        } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: "Error al buscar jugadores" }), {
            status: 500,
            headers: { "Content-Type": "application/json" }});
        }
    },
};
