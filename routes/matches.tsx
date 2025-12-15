import MatchFilters from "../islands/MatchFilters.tsx";
import { define } from "../utils.ts";

export default define.page(function MatchesPage() {
    return (
        <div class="min-h-screen bg-gray-50 py-12 px-4" style={{ marginTop: '2rem' }}>
            <div class="mx-auto" style={{ maxWidth: '1200px' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem', textAlign: 'center' }}>
                    Buscar Partidos
                </h1>
                
                <MatchFilters />
            </div>
        </div>
    );
});
