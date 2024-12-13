import { SyntheticEvent, useState } from 'react';
import { Visibility, Weather } from '../types';
import { NewDiaryEntry } from '../types';

interface Props {
    onSubmit: (values: NewDiaryEntry) => void
}


export const NewDiaryForm = ({onSubmit}: Props) => {
    const [date, setDate] = useState("2018-07-22");
    const [visibility, setVisibility] = useState(Visibility.Good);
    const [weather, setWeather] = useState(Weather.Sunny);
    const [comment, setComment] = useState('');

    const addDiary = (event: SyntheticEvent) => {
        event.preventDefault();
        onSubmit({
            date,
            visibility,
            weather,
            comment
        })
      };

      const onVisibilityChange = (newVisibility: string) => {
          if ( typeof newVisibility === "string") {
          const value = newVisibility;
          const visibility = Object.values(Visibility).find(g => g.toString() === value);
          if (visibility) {
            setVisibility(visibility);
          }
        }
      };

      const onWeatherChange = (newWeather: string) => {
        if ( typeof newWeather === "string") {
        const value = newWeather;
        const weather = Object.values(Weather).find(g => g.toString() === value);
        if (weather) {
            setWeather(weather);
        }
      }
    };

    return (
        <div>
        <form onSubmit={addDiary}>
            Date: <input type="date" id="start" name="diaryDate" value={date} onChange={(event) => setDate(event.target.value)}/><br/>
            <div>  Visibility: 
                great <input type="radio" name="visibility" onChange={() => onVisibilityChange('great')} defaultChecked/>
                good <input type="radio" name="visibility" onChange={() => onVisibilityChange('good')} />
                ok <input type="radio" name="visibility" onChange={() => onVisibilityChange('ok')} />
                poor <input type="radio" name="visibility" onChange={() => onVisibilityChange('poor')} />
            </div>
            <div>  Weather: 
                sunny <input type="radio" name="weather" onChange={() => onWeatherChange('sunny')} defaultChecked/>
                rainy <input type="radio" name="weather" onChange={() => onWeatherChange('rainy')} />
                cloudy <input type="radio" name="weather" onChange={() => onWeatherChange('cloudy')} />
                stormy <input type="radio" name="weather" onChange={() => onWeatherChange('stormy')} />
                windy <input type="radio" name="weather" onChange={() => onWeatherChange('windy')} />
            </div>
            Comment: <input 
                value={comment}
                onChange={(event) => setComment(event.target.value)}
            /><br/>
            <button>Add</button>
        </form>
        <br/>
        </div>
    )
}