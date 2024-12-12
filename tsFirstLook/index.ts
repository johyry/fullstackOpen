import express, { Request, Response } from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';


const app = express();
app.use(express.json());

app.get('/bmi', (req: Request, res: Response) => {
  const height: number = parseFloat(req.query.height as string);
  const weight: number = parseFloat(req.query.weight as string);

  if (isNaN(height) || isNaN(weight)) {
    res.status(400).json({error: 'Invalid height or weight'});
  } 

    const result = calculateBmi(height, weight);
    res.json(result);
  
});

interface ExpectedBody {
  daily_exercises: number[],
  target: number
}

app.post('/exercises', (req: Request, res: Response) => {
  const data: ExpectedBody = req.body;
  console.log(data);

  if (!data.daily_exercises || !data.target) res.status(400).json( { error: "parameters missing" });

  const isMalformatted = data.daily_exercises.some((value: any) => isNaN(value));
  if (isMalformatted) {
    res.status(400).json({ error: "malformatted parameters" }); 
  }
  if (isNaN(data.target)) res.status(400).json({ error: "malformatted parameters" });
  
  const exerciseData = calculateExercises(data.daily_exercises, data.target);

  res.json(exerciseData);

});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});