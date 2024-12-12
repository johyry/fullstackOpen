import patientsData from '../../data/patients';
import { PatinentEntry, NonSensitivePatientEntry, NewPatientEntry } from '../types/types';
import { v4 as uuidv4 } from 'uuid';

const getEntries = (): PatinentEntry[] => {
  return patientsData;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = ( patient: NewPatientEntry ): PatinentEntry => {
    const newPatientEntry = {
        id: uuidv4(),
        ...patient
      };
    
      patientsData.push(newPatientEntry);
      return newPatientEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient
};