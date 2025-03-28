import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db, storage } from "../firebase.service";
import { getDownloadURL } from "firebase/storage";
import { ref } from "firebase/storage";

export type User = {
  user_id: string;
  display_name: string;
  twitter_screen_name: string;
  avatar_url: string;
  is_verified: boolean;
  speaker?: boolean;
  admin?: boolean;
};

export type Segment = {
  start: number;
  text: string;
  end: number;
  seek: number;
  no_speech_prob: number;
};
export type Space = {
  transcription_status:
    | "STARTED"
    | "PROCESSING"
    | "FAILED"
    | "ENDED"
    | "SHORT_ENDED";
  type: "recorded" | "live";
  spaceId: string;
  hls_url: string;

  title: string;
  state: string;
  media_key: string;
  created_at: number;
  started_at: number;
  ended_at: string;
  content_type: string;
  is_space_available_for_replay: boolean;
  is_space_available_for_clipping: boolean;
  total_replay_watched: number;
  total_live_listeners: number;
  tweet_id: string | any;
  admins: User[];
  speakers: User[];

  text?: string;
  segments?: Segment[];
  user_message?: string;
};

export const getSpace = async (
  spaceId: string,
  listener?: (space: Space) => void
) => {
  const docRef = doc(db, "spaces", spaceId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const space = docSnap.data() as Space;
    if (listener) {
      onSnapshot(docRef, (doc) => {
        listener(doc.data() as Space);
      });
    }
    return space;
  }
  return null;
};

const SUMMARY_SUBCOLLECTION = "summaries";
export const getSummary = async (spaceId: string) => {
  const docRef = doc(
    db,
    "spaces",
    spaceId,
    SUMMARY_SUBCOLLECTION,
    "final_summary"
  );
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};

export const getDetailedSummary = async (spaceId: string) => {
  const docRef = doc(db, "spaces", spaceId, SUMMARY_SUBCOLLECTION, "meta");
  const docSnap = await getDoc(docRef);
  return docSnap.data()?.first_level_summaries;
};

export const getFirstLevelSummaries = async (spaceId: string) => {
  const docRef = doc(db, "spaces", spaceId, SUMMARY_SUBCOLLECTION, "meta");
  const docSnap = await getDoc(docRef);
  return docSnap.data()?.first_level_summaries;
};

export const getFullTranscription = async (spaceId: string) => {
  const docRef = doc(
    db,
    "spaces",
    spaceId,
    SUMMARY_SUBCOLLECTION,
    "full_transcript"
  );
  const docSnap = await getDoc(docRef);
  return docSnap.data()?.text;
};

export const getSegments = async (spaceId: string) => {
  const colRef = query(
    collection(db, "spaces", spaceId, "segments"),
    orderBy("idx", "asc"),
    limit(20)
  );
  const snapshot = await getDocs(colRef);
  return snapshot.docs.map((doc) => doc.data());
};

export const getTwitterThread = async (spaceId: string) => {
  const docRef = doc(db, "spaces", spaceId, "twitter_threads", "v1");
  const docSnap = await getDoc(docRef);
  return docSnap.data()?.thread;
};

export const getSpaceAudioDownloadUrl = async (spaceId: string) => {
  const storageRef = ref(storage, `spaces/${spaceId}.mp3`);
  const url = await getDownloadURL(storageRef);
  return url;
};
