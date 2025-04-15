
import { Folder, Song } from "@/types";

export const sampleSongs: Song[] = [
  {
    id: "1",
    title: "Fix You",
    artist: "Coldplay",
    lastEdited: new Date("2023-03-15"),
    folder: "coldplay",
    sections: [
      {
        id: "s1",
        name: "[Intro]",
        lines: [
          {
            id: "l1",
            lyrics: "",
            chords: [
              { id: "c1", name: "F#", position: 0 },
              { id: "c2", name: "A#m", position: 2 },
              { id: "c3", name: "D#m7", position: 5 },
              { id: "c4", name: "G#", position: 8 }
            ]
          }
        ]
      },
      {
        id: "s2",
        name: "[Verse 1]",
        lines: [
          {
            id: "l2",
            lyrics: "When you try your best but",
            chords: [
              { id: "c5", name: "F#", position: 0 }
            ]
          },
          {
            id: "l3",
            lyrics: "you don't succeed",
            chords: [
              { id: "c6", name: "A#m", position: 0 },
              { id: "c7", name: "D#m7", position: 8 }
            ]
          },
          {
            id: "l4",
            lyrics: "When you get what you",
            chords: [
              { id: "c8", name: "C#", position: 0 },
              { id: "c9", name: "F#", position: 10 }
            ]
          },
          {
            id: "l5",
            lyrics: "want but not what you need",
            chords: [
              { id: "c10", name: "A#m", position: 0 },
              { id: "c11", name: "D#m7", position: 12 }
            ]
          },
          {
            id: "l6",
            lyrics: "When you feel so tired, but",
            chords: [
              { id: "c12", name: "F#", position: 0 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "2",
    title: "Happy",
    artist: "My Song",
    lastEdited: new Date("2023-04-10"),
    folder: "happy",
    sections: [
      {
        id: "s1",
        name: "[Verse]",
        lines: [
          {
            id: "l1",
            lyrics: "Sample lyrics for a happy song",
            chords: [
              { id: "c1", name: "C", position: 0 },
              { id: "c2", name: "G", position: 10 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "3",
    title: "Sad",
    artist: "My Song",
    lastEdited: new Date("2023-04-12"),
    folder: "sad",
    sections: [
      {
        id: "s1",
        name: "[Verse]",
        lines: [
          {
            id: "l1",
            lyrics: "Sample lyrics for a sad song",
            chords: [
              { id: "c1", name: "Am", position: 0 },
              { id: "c2", name: "F", position: 10 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "4",
    title: "Night",
    artist: "My Song",
    lastEdited: new Date("2023-04-15"),
    folder: "night",
    sections: [
      {
        id: "s1",
        name: "[Verse]",
        lines: [
          {
            id: "l1",
            lyrics: "Sample lyrics for a night song",
            chords: [
              { id: "c1", name: "Em", position: 0 },
              { id: "c2", name: "C", position: 10 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "5",
    title: "Love",
    artist: "My Song",
    lastEdited: new Date("2023-05-01"),
    folder: "love",
    sections: [
      {
        id: "s1",
        name: "[Verse]",
        lines: [
          {
            id: "l1",
            lyrics: "Sample lyrics for a love song",
            chords: [
              { id: "c1", name: "D", position: 0 },
              { id: "c2", name: "A", position: 10 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "6",
    title: "Rock",
    artist: "My Song",
    lastEdited: new Date("2023-05-05"),
    folder: "rock",
    sections: [
      {
        id: "s1",
        name: "[Verse]",
        lines: [
          {
            id: "l1",
            lyrics: "Sample lyrics for a rock song",
            chords: [
              { id: "c1", name: "E", position: 0 },
              { id: "c2", name: "A", position: 10 }
            ]
          }
        ]
      }
    ]
  }
];

export const sampleFolders: Folder[] = [
  {
    id: "1",
    name: "sad",
    type: "library",
    songs: ["3"]
  },
  {
    id: "2",
    name: "happy",
    type: "library",
    songs: ["2"]
  },
  {
    id: "3",
    name: "night",
    type: "library",
    songs: ["4"]
  },
  {
    id: "4",
    name: "coldplay",
    type: "library",
    songs: ["1"]
  },
  {
    id: "5",
    name: "love",
    type: "studio",
    songs: ["5"]
  },
  {
    id: "6",
    name: "rock",
    type: "studio",
    songs: ["6"]
  },
  {
    id: "7",
    name: "random",
    type: "studio",
    songs: []
  }
];
