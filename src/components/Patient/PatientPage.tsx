import { Typography } from "@mui/material";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { Diagnosis, Entry, Gender, Patient } from "../../types";

interface Props {
    patient: Patient | undefined,
    diagnoses: Diagnosis[]
}

interface GenderIconProps {
    gender: Gender
}

const GenderIcon = ({ gender }: GenderIconProps) => {
    if (gender === "male") {
        return <MaleIcon />;
    } else if (gender === "female") {
        return <FemaleIcon />;
    } else {
        return  <QuestionMarkIcon />;
    }
};

interface EntryProps {
    entry: Entry,
    diagnoses: Diagnosis[]
}

interface DiagnoseProps {
    diagnose: Diagnosis
}

const Diagnose = ({ diagnose }: DiagnoseProps) => {
    return (
        <Typography>{diagnose.code}, {diagnose.name}, {diagnose.latin}</Typography>
    );
};

const HealtCheckEntry = ({ entry, detailedDiagnoses }: { entry: Entry, detailedDiagnoses: Diagnosis[] }) => {

    return (
        <div>
            <Typography>{entry.date}</Typography>
            <Typography>{entry.description}</Typography>
            <ul>
                {detailedDiagnoses?.map(d => <li key={d.code}><Diagnose diagnose={d} /></li>)}
            </ul>
        </div>
    );
};

const OccupationalHealthcareEntry = ({ entry, detailedDiagnoses }: { entry: Entry, detailedDiagnoses: Diagnosis[] }) => {
    return (
        <div>
            <Typography>{entry.date}</Typography>
            <Typography>{entry.description}</Typography>
            <ul>
                {detailedDiagnoses?.map(d => <li key={d.code}><Diagnose diagnose={d} /></li>)}
            </ul>
        </div>
    );
    
};

const HospitalEntry = ({ entry, detailedDiagnoses }: { entry: Entry, detailedDiagnoses: Diagnosis[] }) => {
    return (
        <div>
            <Typography>{entry.date}</Typography>
            <Typography>{entry.description}</Typography>
            <ul>
                {detailedDiagnoses?.map(d => <li key={d.code}><Diagnose diagnose={d} /></li>)}
            </ul>
        </div>
    );
    
};

const EntryPage = ({ entry, diagnoses }: EntryProps) => {
    const detailedDiagnoses: Diagnosis[] = [];

    entry.diagnosisCodes?.forEach(code => {
        const foundDetails = diagnoses.find(diagnose => diagnose.code === code);
        if (foundDetails) detailedDiagnoses.push(foundDetails);
    });

    switch (entry.type) {
        case "HealthCheck":
            return <HealtCheckEntry entry={entry} detailedDiagnoses={detailedDiagnoses} />;
        case "OccupationalHealthcare":
            return <OccupationalHealthcareEntry entry={entry} detailedDiagnoses={detailedDiagnoses}/>;
        case "Hospital":
            return <HospitalEntry entry={entry} detailedDiagnoses={detailedDiagnoses}/>;
        default:
            return <></>;

    }
    return (
        <>123</>
    );
};
 
export const PatientPage = ({ patient, diagnoses }: Props) => {
    if (patient) {
    return (
        <div style={{ paddingTop: '20px' }}>
            <Typography variant="h5">
             {patient.name} <GenderIcon gender={patient.gender} />
            </Typography> 
            <Typography>Ssn: {patient.ssn}</Typography>
            <Typography>Occupation: {patient.occupation}</Typography>
            <Typography>Birth date: {patient.dateOfBirth}</Typography>
            
            <Typography variant="h6">Entries:</Typography>
            {patient.entries.map(entry => <EntryPage key={entry.id} entry={entry} diagnoses={diagnoses} />)}
            
        </div>
    );
}
};