export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export interface DiagnoseEntry {
    code: string,
    name: string,
    latin?: string
  }

export interface PatinentEntry {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: Gender,
    occupation: string
}


export type NewPatientEntry = Omit<PatinentEntry, 'id'>;

export type NonSensitivePatientEntry = Omit<PatinentEntry, 'ssn'>;