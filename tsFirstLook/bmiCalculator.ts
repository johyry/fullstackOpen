interface BmiValues {
    value1: number;
    value2: number;
  }

export const calculateBmi = (height: number, weight: number) : object | string => {

    const bmi: number = weight/((height/100) ** 2);
    let description: string = "";


    switch(true) {
        case (bmi < 16):
            description = "Underweight (Severe thinness)";
            break;
        case (bmi >= 16 &&  bmi <= 16.9):
            description = "Underweight (Moderate thinness)";
            break;	
        case (bmi >= 17 &&  bmi <= 18.4):
            description = "Underweight (Mild thinness)";
            break;
        case (bmi >= 18.5 &&  bmi <= 24.9):
            description = "Normal range";
            break;
        case (bmi >= 25 &&  bmi <= 29.9):
            description = "Overweight (Pre-obese)";
            break;
        case (bmi >= 30 &&  bmi <= 34.9):
            description = "Obese (Class I)";
            break;	
        case (bmi >= 35 &&  bmi <= 39.9):
            description = "Obese (Class II)";
            break;
        case (bmi > 40):
            description = "Obese (Class III)";
            break;
        default:
            return "Something went wrong.";
    }

    if (require.main === module) {
      return description;
    }

    return {
      bmi,
      weight, 
      height, 
      description
    };


};

const parseArguments = (args: string[]): BmiValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
  
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
        value1: Number(args[2]),
        value2: Number(args[3])
      };
    } else {
      throw new Error('Provided values were not numbers!');
    }
  };
  
  try {
    const { value1, value2 } = parseArguments(process.argv);
    console.log(calculateBmi(value1, value2));
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }
