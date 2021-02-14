export interface IPlaylist {
  ID: string;
  name: string;
  slug: string;
  image: string;
  is_archived: boolean;
}

export interface IVideo {
  ID: string;
  url: string;
  title: string;
  description: string;
  playlist_order: number;
  playlistID: string;
  slug: string;
}
