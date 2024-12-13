import patientsData from '../../data/patients';
import { PatinentEntry, NonSensitivePatientEntry, NewPatientEntry } from '../types/types';
import { v4 as uuidv4 } from 'uuid';

const getEntries = (): PatinentEntry[] => {
  return patientsData;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const getNonSensitiveEntry = (id: string): NonSensitivePatientEntry | undefined => {
  const entry = patientsData.find(p => p.id === id);
  if (entry) return entry;
  return undefined;
};

const addPatient = ( patient: NewPatientEntry ): PatinentEntry => {
    const newPatientEntry = {
        id: uuidv4(),
        ...patient
      };
      newPatientEntry.entries = [];
    
      patientsData.push(newPatientEntry);
      return newPatientEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  getNonSensitiveEntry,
  addPatient
};