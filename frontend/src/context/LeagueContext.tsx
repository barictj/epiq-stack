import { createContext, useContext, useState } from 'react';

type League = 'NBA' | 'WNBA';

const LeagueContext = createContext<{
    league: League;
    setLeague: (league: League) => void;
}>({
    league: 'NBA',
    setLeague: () => { },
});

export const LeagueProvider = ({ children }: { children: React.ReactNode }) => {
    const [league, setLeague] = useState<League>('NBA');
    return (
        <LeagueContext.Provider value={{ league, setLeague }}>
            {children}
        </LeagueContext.Provider>
    );
};

export const useLeague = () => useContext(LeagueContext);
