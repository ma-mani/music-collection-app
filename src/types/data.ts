export interface Track {
    id: string;
    name: string;
    track_number: number;
    duration: string;
    previewAudio: string | null;
    spotifyLink: string;
}
export interface Album {
    id: string;
    artist: string;
    title: string;
    image: {
        height: number;
        url: string;
        width: number;
    };
    release_date: string;
    uri: string;
    tracks: Track[];
}
