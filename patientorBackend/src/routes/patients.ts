import express, { Request, Response, NextFunction } from 'express';
import patientsService from '../services/patientService';
import { NewPatientEntry, NonSensitivePatientEntry, PatinentEntry } from '../types/types';
import { NewPatientSchema } from '../utils';
import { z } from 'zod';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatientEntry[]>) => {
  res.send(patientsService.getNonSensitiveEntries());
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => { 
    try {
      NewPatientSchema.parse(req.body);
      console.log(req.body);
      next();
    } catch (error: unknown) {
      next(error);
    }
  };

  const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => { 
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      next(error);
    }
  };

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatientEntry>, res: Response<PatinentEntry>) => {
    const addedEntry = patientsService.addPatient(req.body);
    res.json(addedEntry);
});

router.use(errorMiddleware);

export default router;