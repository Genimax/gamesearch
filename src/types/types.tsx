export interface ISearchGameName {
  id?: number;
  name?: string;
}

export interface IWebsite {
  id: number;
  category: number;
  trusted: boolean;
  url: string;
}

export interface IScreenshot {
  id: number;
  image_id: string;
  url: string;
}

export interface ICompany {
  id: number;
  company: {
    id: number;
    name: string;
  };
}

export interface IGameData {
  id: number;
  cover?: {
    id: number;
    url: string;
  };
  first_release_date?: number;
  involved_companies?: ICompany[];
  name?: string;
  screenshots?: IScreenshot[];
  summary?: string;
  total_rating?: number;
  websites?: IWebsite[];
}

export interface IGameComponent {
  data: IGameData;
}

export interface ITwitchProps {
  id: number;
}

export interface ITwitchStreamData {
  id: string;
  user_login: string;
  user_name: string;
  title: string;
  viewer_count: string;
  thumbnail_url: string;
}

export interface IStreamProps {
  data: ITwitchStreamData;
}

export interface ISteamReviewsProp {
  websites?: IWebsite[];
}

export interface ISteamReviewData {
  recommendationID: string;
  review: string;
  timestamp_created: number;
  weighted_vote_score: string;
}

export interface ISteamReviewComponent {
  index: number;
  review: ISteamReviewData;
}
