import { useState, useEffect } from 'react';
import { DiaryEntry, NewDiaryEntry } from './types';
import { getAllDiaries, createNewDiary } from './services/diaryService';
import { Diaries } from './components/Diaries';
import { NewDiaryForm } from './components/NewDiaryForm';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAllDiaries().then(diaries => {
      setDiaries(diaries)
    })
  }, [])

  const addNewDiary = async (values: NewDiaryEntry) => {
    try {
      const diaryEntry = await createNewDiary(values);
      setDiaries(diaries.concat(diaryEntry))
    } catch (e: unknown) {
      console.log(e)
    }
  }
  
  return (
    <div>
      <NewDiaryForm onSubmit={addNewDiary}/>
      <Diaries diaries={diaries} />
    </div>
  )
}

export default App
