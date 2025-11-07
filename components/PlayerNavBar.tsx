interface PlayerNavBarProps {
    playerId: string;
    activePage?: 'overview' | 'stats' | 'matches' | 'trophies';
}

export default function PlayerNavBar({ playerId, activePage = 'overview' }: PlayerNavBarProps) {
    const baseUrl = `/players/${playerId}`;
    
    return (
        <nav class="player-nav">
            <a href={baseUrl} class={activePage === 'overview' ? 'active' : ''}>Overview</a>
            <a href={`${baseUrl}/stats`} class={activePage === 'stats' ? 'active' : ''}>Stats</a>
            <a href={`${baseUrl}/matches`} class={activePage === 'matches' ? 'active' : ''}>Matches</a>
            <a href={`${baseUrl}/trophies`} class={activePage === 'trophies' ? 'active' : ''}>Trophies</a>
        </nav>
    );
}