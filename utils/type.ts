export interface User {
  Viewer: {
    id: number;
  };
}

export interface MediaEntry {
  id: number;
  media: {
    title: {
      english: string;
    };
    coverImage: {
      large: string;
    };
    episodes: number;
  };
  score: number;
  progress: number;
}

export interface MediaList {
  name: string;
  entries: MediaEntry[];
}

export interface MediaData {
  MediaListCollection: {
    lists: MediaList[];
  };
  User: {
    mediaListOptions: {
      animeList: {
        sectionOrder: string[];
      };
    };
  };
}

export interface MutationParams {
  ids: number[];
  progress: number;
}
