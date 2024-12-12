import diagnosesData from '../../data/diagnoses';
import { DiagnoseEntry } from '../types/types';

const getEntries = (): DiagnoseEntry[] => {
  return diagnosesData;
};

const addDiary = () => {
  return null;
};

export default {
  getEntries,
  addDiary
};