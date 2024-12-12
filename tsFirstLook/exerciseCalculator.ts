interface DataForm {
    daysTotal: number,
    daysTrained: number,
    targetAverage: number,
    averageTrainingTime: number;
    targetReached: boolean;
    rating: number;
    ratingExplained: string;
};

interface ExerciseHoursAndTarget {
    dailyHours: number[],
    targetHours: number
};

export const calculateExercises = (dailyHours: number[], targetHours: number): DataForm => {
    const averageTraining = dailyHours.reduce((accumulator, currentValue) => accumulator + currentValue, 0)/dailyHours.length;
    
    let rating: number;
    let ratingExplained: string;
    switch (true) {
        case (averageTraining >= targetHours):
            rating = 3;
            ratingExplained = "Great job, target reached!";
            break;
        case (targetHours - averageTraining < 0.5):
            rating = 2;
            ratingExplained = "Almost made it, less than 0,5 hours away.";
            break;
        default:
            rating = 1;
            ratingExplained = "Back to gym mate.";
    }


    const results: DataForm = {
        daysTotal: dailyHours.length,
        daysTrained: dailyHours.filter(hours => hours !== 0).length,
        targetAverage: targetHours,
        averageTrainingTime: averageTraining,
        targetReached: averageTraining >= targetHours,
        rating: rating,
        ratingExplained: ratingExplained
    };

    return results;
};

interface ExpectedBody {
    daily_exercises: number[],
    target: number
}

export const validateExerciseData = (data: ExpectedBody): ExerciseHoursAndTarget | { error: string } =>  {
    if (!data.daily_exercises || !data.target) return { error: "parameters missing" };

    const isMalformatted = data.daily_exercises.some((value) => isNaN(value));

    if (isMalformatted) {
        return { error: "malformatted parameters" }; 
    }

    if (isNaN(data.target)) return { error: "malformatted parameters" };

    return {dailyHours: data.daily_exercises, targetHours: data.target};
};
 
const parseExerciseArguments = (args: string[]): ExerciseHoursAndTarget => {
    if (args.length < 4) throw new Error('Not enough arguments');

    const exerciseHours: number[] = [];
    let target: number = 0;

    args.forEach((value, index) => {
        if (index > 1) {
            if (isNaN(Number(value))) throw new Error("Only numbers accepted.");
            if (index < (args.length - 1)) {
                exerciseHours.push(Number(value));
            } else {
                target = Number(value);
            }
        }
    });

    return {
        dailyHours: exerciseHours,
        targetHours: target
    };
    
  };
  
  try {
    const values: ExerciseHoursAndTarget = parseExerciseArguments(process.argv);
    calculateExercises(values.dailyHours, values.targetHours);
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }
