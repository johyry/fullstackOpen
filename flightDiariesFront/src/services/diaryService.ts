import axios from 'axios';
import { DiaryEntry, NewDiaryEntry } from '../types';

const baseUrl = 'http://localhost:3000/api/diaries'

export const getAllDiaries = () => {
    return axios
      .get<DiaryEntry[]>(baseUrl)
      .then(response => response.data)
  }

export const createNewDiary = async (object: NewDiaryEntry) => {
  const { data } = await axios.post<DiaryEntry>(`${baseUrl}`, object);
  return data;
}