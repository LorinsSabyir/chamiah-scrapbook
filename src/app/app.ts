import { Component, HostListener, computed, signal } from '@angular/core';

type SlideTheme = 'cream' | 'forest' | 'clay' | 'sage';
type NavigationDirection = 'forward' | 'backward';

interface ScrapbookSlide {
  readonly number: string;
  readonly eyebrow: string;
  readonly title: string;
  readonly subtitle?: string;
  readonly bullets: readonly string[];
  readonly quote?: string;
  readonly imageUrl?: string;
  readonly imageAlt?: string;
  readonly imageCaption?: string;
  readonly speakerNotes: string;
  readonly theme: SlideTheme;
}

const IMAGES = {
  cover: 'https://i.scdn.co/image/ab6761610000e5eb2598127d529b55dcb37d1428',
  biography: 'https://i.scdn.co/image/ab6761610000e5eb262b69fed44e0ee1219d92d5',
  earlyCareer: 'https://4.bp.blogspot.com/-5fs2-tSyL6c/Ua4LQZj4mDI/AAAAAAAAHws/rIfoCBITKGI/s1600/2.jpg',
  bigDecision: 'https://s1.dmcdn.net/v/YRqR01eBsJWkhgVFr/x1080',
  hardYears: 'https://media.philstar.com/images/the-philippine-star/entertainment/20170614/TJ-Monteverde-3.jpg',
  songwriter: 'https://static.easyrock.com.ph/posts/2024/10/G9Qt8rjNhTsPacCso0vVj.png',
  songbook: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/da/51/72/da51724f-6839-62b7-6c9b-32b55311ce41/196873949192.jpg/1200x630bb.jpg',
  bisayaIdentity: 'https://aphrodite.gmanetwork.com/entertainment/articles/900_675_3_-20221129142441.jpg',
  palagi: 'https://od2-image-api.abs-cbn.com/prod/20241025121044/9d82fa28f15046242c47ef9e728baa148569e0675fcc77c4d322679d5b4dcebc.jpg?h=800&w=1200',
  puhonArtwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/7f/ca/3f/7fca3f88-7530-5cbc-3025-5886f1d2c9e3/3616405578654.jpg/1200x630wp-60.jpg',
  puhonRecording: 'https://aphrodite.gmanetwork.com/entertainment/articles/900_675_Main_Image05_0625__20200625142536.jpg',
  personalPuhon: 'https://img.youtube.com/vi/GcgPbu5CxX8/sddefault.jpg',
  wedding: 'https://aphrodite.gmanetwork.com/entertainment/photos/photo/in_photos__kz_tandingan_and_tj_monterde_s_wedding_can_t_wait_to_say_i_do_1602213765.jpg',
  bigDome: 'https://aphrodite.gmanetwork.com/entertainment/photos/photo/tj_monterde_concludes__sarili_nating_mundo__at_ikaw_at_ako_1738638359.jpg',
  today: 'https://cornerstoneent.ph/storage/slider/images/01KH9849YCGTC28J3XRC2TVGQG.png',
  artistPortrait: 'https://m.media-amazon.com/images/M/MV5BZjAwOGUxNzktOWUwYi00YjUxLWIxNmEtMjI1YzYyZDA2MmQwXkEyXkFqcGc%40._V1_.jpg',
  candidPortrait: 'https://media.philstar.com/photos/2025/01/30/tj-0_2025-01-30_16-43-39_gallery.jpg',
  guitarPortrait: 'https://4.bp.blogspot.com/-8lGGy9CqPLY/WZB5gPdoMEI/AAAAAAAA-lQ/pmtFGk-v5zYBoX2gzEOEu07OrqxDM92CACLcBGAs/s1600/TJ%2BMonterde%2B1.jpg',
  worldTour: 'https://media.assettype.com/gulfnews/2025-07-11/ku9r9017/tjmusicmonterde-insta2.jpeg?ar=40%3A21&auto=format%2Ccompress&enlarge=true&mode=crop&ogImage=true&overlay=false&overlay_position=bottom&overlay_width=100&w=1200',
  gallery: 'https://d1ef7ke0x2i9g8.cloudfront.net/manila/kz.jpg',
  closing: 'https://d2nnykqiaju69u.cloudfront.net/photos/Pinky/KZ%20Tandingan/KZ2.png',
  references: 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/62/31/ce/6231ce6c-d170-93ac-d743-0428b6bf541e/8721056911271.png/1200x1200bf-60.jpg',
  portrait: 'https://i.scdn.co/image/ab6761610000e5eb2598127d529b55dcb37d1428',
  portraitTwo: 'https://i.scdn.co/image/ab6761610000e5eb262b69fed44e0ee1219d92d5',
  live: 'https://usa.inquirer.net/files/2025/02/TJ.png',
  guitar: 'https://www.lionheartv.net/wp-content/uploads/2024/06/TJ-MONTERDE-20.jpg',
  puhon: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/7f/ca/3f/7fca3f88-7530-5cbc-3025-5886f1d2c9e3/3616405578654.jpg/1200x630wp-60.jpg',
  couple: 'https://entertainment.inquirer.net/files/2024/08/Screenshot-2024-08-30-at-2.47.06%E2%80%AFPM.png'
} as const;

const SLIDES: readonly ScrapbookSlide[] = [
  { number: '01', eyebrow: 'A Filipino artist I admire', title: 'TJ Monterde', subtitle: 'Singer · songwriter · storyteller', bullets: ['A Bisaya voice in OPM', 'Songs that feel like memories'], quote: 'Some songs do not simply play — they stay.', imageUrl: IMAGES.portrait, imageAlt: 'Portrait of TJ Monterde', imageCaption: 'the artist', speakerNotes: 'TJ Monterde is the artist I chose because his music feels honest and close to home. His songs hold love, waiting, faith, and the quiet memories we carry with us.', theme: 'cream' },
  { number: '02', eyebrow: 'Meet the artist', title: 'Who is TJ?', subtitle: 'Titus John Monterde', bullets: ['Born December 30, 1989 · Davao City', 'Filipino singer-songwriter from Cagayan de Oro', 'Acoustic pop, ballads & Bisaya storytelling', 'Known for “Ikaw at Ako,” “Puhon” and “Palagi”', 'Married to singer KZ Tandingan'], imageUrl: IMAGES.portraitTwo, imageAlt: 'TJ Monterde in a denim jacket', imageCaption: 'soft-spoken. deeply felt.', speakerNotes: 'TJ is a Filipino singer-songwriter whose gentle acoustic sound is built around direct, emotional storytelling. Although born in Davao City, he is closely identified with Cagayan de Oro and proudly carries his Bisaya roots into mainstream OPM.', theme: 'sage' },
  { number: '03', eyebrow: 'Before the spotlight', title: 'Early life', bullets: ['Wrote songs while still young', 'Studied Development Communication at Xavier University – Ateneo de Cagayan', 'Worked as a radio DJ', 'Hosted the regional TV variety show “Mag TV Na, Ato Ni!”'], quote: 'Every big stage begins somewhere small.', imageUrl: IMAGES.guitar, imageAlt: 'TJ Monterde performing with a guitar', imageCaption: 'the beginning', speakerNotes: 'Before becoming a recording artist, TJ developed his voice through communication, radio, local television, and songwriting. These experiences helped him learn how to speak to an audience long before he filled arenas.', theme: 'cream' },
  { number: '04', eyebrow: 'A leap of faith', title: 'His big decision', bullets: ['Left Cagayan de Oro for Manila', 'Chose music without a guaranteed future', 'Sent demos and took auditions', 'Started again in a much bigger industry'], quote: 'The dream was uncertain. The decision was not.', imageUrl: IMAGES.live, imageAlt: 'TJ Monterde performing under stage lights', imageCaption: 'toward the dream', speakerNotes: 'Moving to Manila meant leaving familiarity behind. TJ entered a competitive industry with no promise of success, but continued presenting his songs and looking for opportunities.', theme: 'forest' },
  { number: '05', eyebrow: 'Behind the music', title: 'The hard years', bullets: ['Faced closed doors in the music industry', 'Accepted voice-over and event-hosting work', 'Learned to survive between opportunities', 'Came close to giving up — but kept writing'], imageUrl: IMAGES.guitar, imageAlt: 'TJ Monterde playing acoustic guitar onstage', imageCaption: 'keep showing up', speakerNotes: 'The path was not immediate. Side jobs supported him while music remained uncertain. His story matters because success came from continuing through the quiet years, not from one lucky moment.', theme: 'clay' },
  { number: '06', eyebrow: 'Words before applause', title: 'TJ, the songwriter', subtitle: 'He does not only sing feelings — he shapes them into songs.', bullets: ['Love & commitment', 'Heartbreak & healing', 'Hope & waiting', 'Memories & relationships'], quote: 'Simple words. Specific feelings. Universal stories.', imageUrl: IMAGES.portrait, imageAlt: 'Close portrait of TJ Monterde', imageCaption: 'the songwriter', speakerNotes: 'Songwriting is central to TJ’s artistry. His language is accessible, but the emotions are precise. This is why listeners can place their own relationships and memories inside his songs.', theme: 'sage' },
  { number: '07', eyebrow: 'A songbook of feelings', title: 'Notable songs', bullets: ['Ikaw at Ako · Tulad Mo · Dating Tayo', 'Mahika · Tahanan · Puhon', 'Walong Bilyon · Sigurado · Palagi', 'Sariling Mundo · Darating Din'], quote: 'Different chapters. One unmistakable voice.', imageUrl: IMAGES.live, imageAlt: 'TJ Monterde singing live', imageCaption: 'songs we keep', speakerNotes: 'His catalogue moves from the ache of a past relationship to the certainty of lasting love. These songs show both his range and his consistent gift for turning everyday Filipino emotion into melody.', theme: 'cream' },
  { number: '08', eyebrow: 'Rooted & recognizable', title: 'His musical identity', bullets: ['Modern OPM with an acoustic heart', 'Filipino storytelling at the center', 'Tender, emotionally direct songwriting', 'Bisaya language as cultural pride'], quote: 'Local roots can carry a voice everywhere.', imageUrl: IMAGES.guitar, imageAlt: 'TJ Monterde performing with his guitar', imageCaption: 'proudly bisaya', speakerNotes: 'TJ’s identity is not separate from where he comes from. By releasing Cebuano songs and bringing Vispop to a wider audience, he shows that regional language belongs in the national OPM story.', theme: 'forest' },
  { number: '09', eyebrow: 'A promise set to music', title: 'Palagi', subtitle: 'Released July 6, 2023', bullets: ['A vow to keep choosing the same person', 'A wedding version reflected his love for KZ', 'The TJxKZ duet became a 2024 phenomenon', 'Billboard Philippines’ No. 1 Song of 2024'], imageUrl: IMAGES.palagi, imageAlt: 'TJ Monterde and KZ Tandingan performing Palagi', imageCaption: 'always choosing you', speakerNotes: '“Palagi” grew from an intimate love song into a national favorite. The duet with KZ made its promise feel even more personal, and it spent 17 weeks in the Billboard Philippines top ten before leading the 2024 year-end charts.', theme: 'clay' },
  { number: '10', eyebrow: 'In God’s time', title: 'Puhon', subtitle: 'Cebuano: someday · hopefully · God-willing', bullets: ['Written from longing, patience and hope', 'The chorus began in 2017', 'Completed and released in 2020', 'A quiet promise to wait for the right time'], quote: '“Puhon” turns waiting into faith.', imageUrl: IMAGES.puhon, imageAlt: 'Puhon single artwork with a sunset over hills', imageCaption: 'someday, in the right time', speakerNotes: '“Puhon” is a small Cebuano word with a wide emotional meaning. It accepts that something has not happened yet, while holding on to hope that it will — if and when the time is right.', theme: 'sage' },
  { number: '11', eyebrow: 'Made in stillness', title: 'The story behind Puhon', bullets: ['A chorus waited through years of writer’s block', 'A sunset helped him finish the song', 'Recorded during the 2020 quarantine', 'A USB mic, pillows and a blanket became a home studio', 'Finished in about two weeks'], imageUrl: IMAGES.puhon, imageAlt: 'Pastel sunset artwork for Puhon', imageCaption: 'create with what you have', speakerNotes: 'TJ first wrote the chorus in 2017, then could not finish the song. During quarantine, he completed it and recorded from his bedroom with simple equipment. “Puhon” proves that limitations can sharpen creativity.', theme: 'cream' },
  { number: '12', eyebrow: 'The song in my story', title: 'My Puhon', bullets: ['It reminds me of someone deeply special', 'We spent almost five years in courtship', 'Waiting became part of our shared language', 'Now the song holds hope, patience and a chapter of my life'], quote: 'We did not know when. We only hoped: puhon.', imageUrl: IMAGES.puhon, imageAlt: 'Sun setting behind layered hills', imageCaption: 'a memory I can hear', speakerNotes: 'This song became personal because its message mirrored our own season of waiting. I hear not only TJ’s story in it, but almost five years of courtship, patience, emotion, and the hope that timing would one day make sense.', theme: 'forest' },
  { number: '13', eyebrow: 'Music & marriage', title: 'TJ + KZ', bullets: ['Friends before becoming a couple', 'Married on August 28, 2020', 'Partners who champion each other’s art', 'Collaborations include “Ikaw at Ako” and “Palagi”'], quote: 'Two distinct voices, one shared life.', imageUrl: IMAGES.couple, imageAlt: 'TJ Monterde and KZ Tandingan celebrating Palagi', imageCaption: 'partners in life & music', speakerNotes: 'TJ and KZ’s relationship adds another layer to the music. Their collaborations feel convincing because they are grounded in friendship, partnership, and a real shared history.', theme: 'clay' },
  { number: '14', eyebrow: 'A decade of becoming', title: 'Career milestones', bullets: ['Breakthrough album “Ikaw at Ako”', 'Two sold-out New Frontier Theater shows in 2024', 'Three sold-out nights at the Araneta Coliseum in 2025', '“Palagi” named No. 1 Song of 2024', 'First local male act to sell out three consecutive Big Dome shows'], imageUrl: IMAGES.live, imageAlt: 'TJ Monterde on a large concert stage', imageCaption: 'from demos to the big dome', speakerNotes: 'The scale of TJ’s career changed dramatically, but it was built across more than a decade. His three-night Big Dome run made the long road visible: the songwriter who once struggled to enter the industry was now filling its biggest rooms.', theme: 'forest' },
  { number: '15', eyebrow: 'Still moving forward', title: 'TJ today', bullets: ['The “Sarili Nating Mundo” tour reached audiences beyond Manila', 'Continues creating and performing with KZ', 'Four sold-out “In Between” Big Dome shows in 2026', 'Eight nominations at the 17th PMPC Star Awards for Music'], imageUrl: IMAGES.guitar, imageAlt: 'TJ Monterde performing to an audience', imageCaption: 'the story continues', speakerNotes: 'TJ’s current chapter is defined by growth: bigger tours, shared projects with KZ, and new recognition. Even at arena scale, the center remains the same — songs that sound like a private conversation.', theme: 'sage' },
  { number: '16', eyebrow: 'More than a voice', title: 'What makes an artist?', bullets: ['Writes from lived emotion', 'Turns language into cultural expression', 'Records and shapes his own sound', 'Performs with intimacy and presence', 'Makes listeners feel seen'], quote: 'Art happens when craft meets connection.', imageUrl: IMAGES.portraitTwo, imageAlt: 'Portrait of TJ Monterde', imageCaption: 'the complete artist', speakerNotes: 'An artist does more than perform. TJ writes, interprets, records, creates, and carries culture. Most importantly, he creates an emotional bridge between his own experience and the listener’s life.', theme: 'cream' },
  { number: '17', eyebrow: 'My answer', title: 'Why I admire him', bullets: ['His talent feels sincere, never distant', 'He worked through years of uncertainty', 'He stayed connected to his Bisaya roots', 'His songs give ordinary feelings a home', '“Puhon” became part of my own story'], imageUrl: IMAGES.portrait, imageAlt: 'Thoughtful portrait of TJ Monterde', imageCaption: 'honest. patient. rooted.', speakerNotes: 'I admire TJ not only for the success we can see today, but for the unseen patience behind it. His work reminds me that authenticity can be quiet and still reach millions.', theme: 'clay' },
  { number: '18', eyebrow: 'Notes to keep', title: 'Lessons from his journey', bullets: ['Start with what you have', 'Do the work even when no one is watching', 'Stay rooted while you grow', 'Turn experience into art', 'Trust the timing — puhon'], quote: 'A slow beginning is still a beginning.', imageUrl: IMAGES.guitar, imageAlt: 'TJ Monterde singing with an acoustic guitar', imageCaption: 'for the road ahead', speakerNotes: 'TJ’s journey teaches me that progress is not always loud. We can start small, keep learning, and remain faithful to our identity. The right time still asks us to prepare for it.', theme: 'sage' },
  { number: '19', eyebrow: 'Five songs, five reasons', title: 'My favorites', bullets: ['Puhon — for a love that learned to wait', 'Palagi — for choosing love every day', 'Ikaw at Ako — for its tender certainty', 'Dating Tayo — for the ache of remembering', 'Tulad Mo — for finding someone incomparable'], imageUrl: IMAGES.palagi, imageAlt: 'TJ Monterde and KZ Tandingan singing together', imageCaption: 'the songs I return to', speakerNotes: 'Each favorite holds a different emotion, but “Puhon” comes first because it is tied to a real chapter of my life. These songs became more than tracks in a playlist; they became emotional landmarks.', theme: 'cream' },
  { number: '20', eyebrow: 'Contact sheet', title: 'A life in music', bullets: ['The singer', 'The songwriter', 'The performer', 'The storyteller', 'The artist'], imageUrl: IMAGES.live, imageAlt: 'TJ Monterde in concert beneath bright lights', imageCaption: 'onstage / in his element', speakerNotes: 'These images show the many sides of TJ: the quiet writer, the guitarist, the arena performer, and the partner in music. Together they tell the story of an artist whose reach grew without losing intimacy.', theme: 'forest' },
  { number: '21', eyebrow: 'One last note', title: 'Some songs become us.', bullets: ['TJ’s journey is a story of patience and perseverance', 'His music turns honest emotion into shared memory', 'His Bisaya identity makes OPM richer', '“Puhon” will always hold a meaningful chapter of my life'], quote: 'We listen to songs — until one day, we realize they have been listening to us, too.', imageUrl: IMAGES.puhon, imageAlt: 'Puhon artwork showing a peaceful sunset', imageCaption: 'puhon · someday · in time', speakerNotes: 'TJ Monterde is an artist I admire because his journey and his songs both honor patience. “Puhon” is more than music to me: it carries people, years, and feelings I never want to forget.', theme: 'clay' },
  { number: '22', eyebrow: 'Read & listen further', title: 'References', bullets: ['Billboard Philippines — “Palagi,” No. 1 Song of 2024', 'Billboard Philippines — Sariling Mundo at the Big Dome', 'The Philippine Star — TJ on Bisaya music and “Puhon”', 'ABS-CBN News — the making of “Puhon”', 'Philstar Life — TJ & KZ’s marriage', 'Official artist releases on Spotify / Apple Music'], quote: 'Facts verified September 2026.', imageUrl: IMAGES.portraitTwo, imageAlt: 'Portrait of TJ Monterde', imageCaption: 'salamat sa pagpaminaw', speakerNotes: 'These sources were used to verify the biography, song histories, chart milestones, and relationship details. Image credits belong to their respective publishers and official music platforms.', theme: 'cream' }
];

const SLIDE_IMAGES = Object.values(IMAGES).slice(0, SLIDES.length);

const SECONDARY_IMAGES = [
  'https://usa.inquirer.net/files/2025/02/TJ.png',
  'https://www.lionheartv.net/wp-content/uploads/2024/06/TJ-MONTERDE-20.jpg',
  'https://i.ytimg.com/vi/fu9yk7gCTbc/hq720.jpg',
  'https://entertainment.inquirer.net/files/2024/08/Screenshot-2024-08-30-at-2.47.06%E2%80%AFPM.png',
  'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/7f/ca/3f/7fca3f88-7530-5cbc-3025-5886f1d2c9e3/3616405578654.jpg/3000x3000bb.jpg',
  'https://is1-ssl.mzstatic.com/image/thumb/AMCArtistImages211/v4/b2/d9/6d/b2d96dcf-5648-180d-820f-17d79db90f5e/file_cropped.png/5336x5336bb.jpg',
  'https://og.rythm.fm/release/166226607965134848',
  'https://www.guitartabsexplorer.com/artisthires/tj-monterde.webp',
  'https://static.yesfm.com.ph/posts/2024/10/tUnBFkENhRcqs-7b9nw9d.png',
  'https://is1-ssl.mzstatic.com/image/thumb/Music2/v4/ed/bb/fe/edbbfe3f-0142-c581-7d06-4d0e58f49d86/Ikaw_At_Ako_-_TJ_Monterde.jpg/600x600bf-60.jpg',
  'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/95/b3/0f/95b30f83-75f5-e62a-b7ae-8b3224894a32/4800635059628.jpg/800x800cc.jpg',
  'https://i1.sndcdn.com/artworks-dzXIEXzQpUXp-0-t1080x1080.png',
  'https://pbs.twimg.com/media/G5y5PTGbUAAGa5H.jpg',
  'https://pbs.twimg.com/media/G4q3PElbQAEKv31.jpg',
  'https://static.easyrock.com.ph/posts/2025/10/wTohjirVWn495pACbdjrv.png',
  'https://images1.smtickets.com/images/portrait_14012026162318.jpg',
  'https://od2-image-api.abs-cbn.com/prod/editorImage/1770277927904590709138_1410608367362366_5675951918506370406_n.jpg',
  'https://pbs.twimg.com/media/HBB7R4laIAA70Dq.jpg',
  'https://pbs.twimg.com/media/G_zQY8ObUAIOm_T.jpg',
  'https://d2nnykqiaju69u.cloudfront.net/photos/Pinky/KZ%20Tandingan/META.jpg',
  'https://mega-asia.com/wp-content/uploads/2020/10/kzw-6.jpg',
  'https://media.assettype.com/tribune%2F2025-12-15%2Fyi0i4tss%2FIMG7933.jpeg?auto=format%2Ccompress&fit=crop&h=900&rect=0%2C232%2C1538%2C1154&w=1200'
] as const;

@Component({ selector: 'app-root', templateUrl: './app.html', styleUrl: './app.css' })
export class App {
  protected readonly slides = SLIDES;
  protected readonly activeIndex = signal(0);
  protected readonly navigationDirection = signal<NavigationDirection>('forward');
  protected readonly notesVisible = signal(false);
  protected readonly currentSlide = computed(() => this.slides[this.activeIndex()]);
  protected readonly currentImage = computed(() => SLIDE_IMAGES[this.activeIndex()]);
  protected readonly currentSecondaryImage = computed(() => SECONDARY_IMAGES[this.activeIndex()]);
  protected readonly progress = computed(() => ((this.activeIndex() + 1) / this.slides.length) * 100);

  @HostListener('window:keydown', ['$event'])
  protected handleKeyboard(event: KeyboardEvent): void {
    if (event.key === 'ArrowRight' || event.key === ' ') {
      event.preventDefault();
      this.showNextSlide();
    }
    if (event.key === 'ArrowLeft') this.showPreviousSlide();
  }

  protected showNextSlide(): void { this.showSlide(this.activeIndex() + 1); }
  protected showPreviousSlide(): void { this.showSlide(this.activeIndex() - 1); }

  protected showSlide(index: number): void {
    const nextIndex = Math.max(0, Math.min(index, this.slides.length - 1));
    if (nextIndex === this.activeIndex()) return;

    this.navigationDirection.set(nextIndex > this.activeIndex() ? 'forward' : 'backward');
    this.activeIndex.set(nextIndex);
  }

  protected toggleNotes(): void { this.notesVisible.update((visible) => !visible); }
}
