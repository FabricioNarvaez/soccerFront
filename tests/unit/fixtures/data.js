export const mockTeams = [
    { _id: '1', name: 'Pájaro Azul FC', acronym: 'PAZ', shield: 'pajaro.webp' },
    { _id: '2', name: 'Spencer FC', acronym: 'SPE', shield: 'spencer.webp' },
    { _id: '3', name: 'Amistad C.D.', acronym: 'AMI', shield: 'amistad.webp' },
];

export const mockGroupsData = {
    A: [
        { _id: 'A1', name: 'Alpha FC', acronym: 'AFC', shield: 'shield_a1.png', Pts: 10, PG: 3, PE: 1, PP: 0, GF: 10, GC: 5, GD: 5 },
        { _id: 'A2', name: 'Beta United', acronym: 'BUT', shield: 'shield_a2.png', Pts: 7, PG: 2, PE: 1, PP: 1, GF: 8, GC: 4, GD: 4 },
        { _id: 'A3', name: 'Gamma Rovers', acronym: 'GRV', shield: 'shield_a3.png', Pts: 4, PG: 1, PE: 1, PP: 2, GF: 3, GC: 6, GD: -3 },
        { _id: 'A4', name: 'Delta Kings', acronym: 'DKG', shield: 'shield_a4.png', Pts: 1, PG: 0, PE: 1, PP: 3, GF: 2, GC: 8, GD: -6 },
    ],
    B: [
        { _id: 'B1', name: 'Epsilon FC', acronym: 'EFC', shield: 'shield_b1.png', Pts: 12, PG: 4, PE: 0, PP: 0, GF: 15, GC: 3, GD: 12 },
    ]
};

export const mockUpcomingMatchweek = {
    id: 5,
    name: 'Jornada 5',
    matches: [
        {
            id: 101,
            localId: { shield: 'local_shield_1.png', name: 'Equipo Local A' },
            visitorId: { shield: 'visitor_shield_1.png', name: 'Equipo Visitante X' },
            formattedDate: '15/11/2025',
            formattedHour: '20:00',
        },
        {
            id: 102,
            localId: { shield: 'local_shield_2.png', name: 'Equipo Local B' },
            visitorId: { shield: 'visitor_shield_2.png', name: 'Equipo Visitante Y' },
            formattedDate: '16/11/2025',
            formattedHour: '18:00',
        },
    ]
};

export const mockLastResults = [
    { 
        id: 1, 
        team1Name: 'Pájaro Azul FC', 
        team1Shield: 'pajaro.png', 
        score1: 3, 
        team2Name: 'Spencer FC', 
        team2Shield: 'spencer.png', 
        score2: 1 
    },
    { 
        id: 2, 
        team1Name: 'Amistad C.D.', 
        team1Shield: 'amistad.png', 
        score1: 0, 
        team2Name: 'Impersiva S.A.', 
        team2Shield: 'impersiva.png', 
        score2: 0 
    }
];

export const StatusMessageStub = {
    name: 'StatusMessage',
    props: ['text'],
    template: '<div class="status-message-mock" data-testid="status-message">{{ text }}</div>'
};

export const HeaderSubtitleStub = {
    name: 'HeaderSubtitle',
    props: ['subtitle', 'link', 'linkText'],
    template: '<div class="header-subtitle-mock"><h2>{{ subtitle }}</h2></div>'
};

export const RouterLinkStub = {
    template: '<a :href="fakeUrl"><slot /></a>',
    props: ['to'],
    computed: {
        fakeUrl() {
            if (typeof this.to === 'string') return this.to;
            const query = this.to.query ? new URLSearchParams(this.to.query).toString() : '';
            return `${this.to.path}?${query}`;
        }
    }
};