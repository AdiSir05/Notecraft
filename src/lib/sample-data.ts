
import { Folder, Song } from "@/types";
import { v4 as uuidv4 } from 'uuid';

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
            lyrics: "F# A#m D#m7 G#",
            words: [
              { id: uuidv4(), text: "F#", chord: { id: "c1", name: "F#" } },
              { id: uuidv4(), text: "A#m", chord: { id: "c2", name: "A#m" } },
              { id: uuidv4(), text: "D#m7", chord: { id: "c3", name: "D#m7" } },
              { id: uuidv4(), text: "G#", chord: { id: "c4", name: "G#" } }
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
            words: [
              { id: uuidv4(), text: "When", chord: { id: "c5", name: "F#" } },
              { id: uuidv4(), text: "you" },
              { id: uuidv4(), text: "try" },
              { id: uuidv4(), text: "your" },
              { id: uuidv4(), text: "best" },
              { id: uuidv4(), text: "but" }
            ]
          },
          {
            id: "l3",
            lyrics: "you don't succeed",
            words: [
              { id: uuidv4(), text: "you", chord: { id: "c6", name: "A#m" } },
              { id: uuidv4(), text: "don't" },
              { id: uuidv4(), text: "succeed", chord: { id: "c7", name: "D#m7" } }
            ]
          },
          {
            id: "l4",
            lyrics: "When you get what you",
            words: [
              { id: uuidv4(), text: "When", chord: { id: "c8", name: "C#" } },
              { id: uuidv4(), text: "you" },
              { id: uuidv4(), text: "get" },
              { id: uuidv4(), text: "what" },
              { id: uuidv4(), text: "you", chord: { id: "c9", name: "F#" } }
            ]
          },
          {
            id: "l5",
            lyrics: "want but not what you need",
            words: [
              { id: uuidv4(), text: "want", chord: { id: "c10", name: "A#m" } },
              { id: uuidv4(), text: "but" },
              { id: uuidv4(), text: "not" },
              { id: uuidv4(), text: "what" },
              { id: uuidv4(), text: "you" },
              { id: uuidv4(), text: "need", chord: { id: "c11", name: "D#m7" } }
            ]
          },
          {
            id: "l6",
            lyrics: "When you feel so tired, but",
            words: [
              { id: uuidv4(), text: "When", chord: { id: "c12", name: "F#" } },
              { id: uuidv4(), text: "you" },
              { id: uuidv4(), text: "feel" },
              { id: uuidv4(), text: "so" },
              { id: uuidv4(), text: "tired," },
              { id: uuidv4(), text: "but" }
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
            words: [
              { id: uuidv4(), text: "Sample", chord: { id: "c1", name: "C" } },
              { id: uuidv4(), text: "lyrics" },
              { id: uuidv4(), text: "for" },
              { id: uuidv4(), text: "a" },
              { id: uuidv4(), text: "happy", chord: { id: "c2", name: "G" } },
              { id: uuidv4(), text: "song" }
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
            words: [
              { id: uuidv4(), text: "Sample", chord: { id: "c1", name: "Am" } },
              { id: uuidv4(), text: "lyrics" },
              { id: uuidv4(), text: "for" },
              { id: uuidv4(), text: "a" },
              { id: uuidv4(), text: "sad", chord: { id: "c2", name: "F" } },
              { id: uuidv4(), text: "song" }
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
            words: [
              { id: uuidv4(), text: "Sample", chord: { id: "c1", name: "Em" } },
              { id: uuidv4(), text: "lyrics" },
              { id: uuidv4(), text: "for" },
              { id: uuidv4(), text: "a" },
              { id: uuidv4(), text: "night", chord: { id: "c2", name: "C" } },
              { id: uuidv4(), text: "song" }
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
            words: [
              { id: uuidv4(), text: "Sample", chord: { id: "c1", name: "D" } },
              { id: uuidv4(), text: "lyrics" },
              { id: uuidv4(), text: "for" },
              { id: uuidv4(), text: "a" },
              { id: uuidv4(), text: "love", chord: { id: "c2", name: "A" } },
              { id: uuidv4(), text: "song" }
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
            words: [
              { id: uuidv4(), text: "Sample", chord: { id: "c1", name: "E" } },
              { id: uuidv4(), text: "lyrics" },
              { id: uuidv4(), text: "for" },
              { id: uuidv4(), text: "a" },
              { id: uuidv4(), text: "rock", chord: { id: "c2", name: "A" } },
              { id: uuidv4(), text: "song" }
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
