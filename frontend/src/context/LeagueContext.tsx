import { createContext, useContext, useState } from 'react';

type League = 'NBA' | 'WNBA';

const LeagueContext = createContext<{
    league: League;
    setLeague: (league: League) => void;
}>({
    league: 'NBA',
    setLeague: () => { },
});

export function LeagueProvider({
    children,
    initialLeague = 'NBA',
}: {
    children: React.ReactNode;
    initialLeague?: League;
}) {
    const [league, setLeague] = useState<League>(initialLeague);

    return (
        <LeagueContext.Provider value={{ league, setLeague }}>
            {children}
        </LeagueContext.Provider>
    );
}

export function useLeague() {
    return useContext(LeagueContext);
}
