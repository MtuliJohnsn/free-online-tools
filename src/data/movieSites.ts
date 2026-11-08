export type MovieSiteAccess = 'Free to watch' | 'Free with account' | 'Ad-supported';

export type MovieSite = {
  name: string;
  url: string;
  description: string;
  access: MovieSiteAccess;
};

export const MOVIE_SITES: MovieSite[] = [
  {
    name: 'Internet Archive',
    url: 'https://archive.org/details/feature_films',
    description: 'A large library of public domain feature films, classics and documentaries that you can stream or download at no cost.',
    access: 'Free to watch',
  },
  {
    name: 'Tubi',
    url: 'https://tubitv.com',
    description: 'A broad catalog of Hollywood films, cult favorites and independent movies, all free with occasional ads.',
    access: 'Ad-supported',
  },
  {
    name: 'Pluto TV',
    url: 'https://pluto.tv',
    description: 'Free live movie channels grouped by genre, plus on-demand titles, with no sign-up needed to start watching.',
    access: 'Ad-supported',
  },
  {
    name: 'Crackle',
    url: 'https://crackle.works',
    description: 'An online entertainment service that helps viewers discover free HD movies and TV shows across a variety of genres.',
    access: 'Ad-supported',
  },
  {
    name: 'YouTube Free Movies',
    url: 'https://www.youtube.com',
    description: 'YouTube offers a free movies section with licensed films, available on any device with a Google account.',
    access: 'Free with account',
  },
  {
    name: 'Plex',
    url: 'https://www.plex.tv',
    description: 'Free movies and channels through the Plex app, which you can also use to organize your own media library.',
    access: 'Free with account',
  },
];
