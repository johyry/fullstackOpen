import { DiaryEntry } from "../types"

interface Props {
    diaries: DiaryEntry[]
}

export const Diaries = ({diaries}: Props) => {
    return (
        <div>
            {diaries.map(diary => <Diary key={diary.id} diary={diary} />)}
        </div>
    )
}

interface DiaryProps {
    diary: DiaryEntry
}

const Diary = ({diary}: DiaryProps) => {
    return (
        <div>
        <b>Date: {diary.date}</b>
        <p>Visibility: {diary.visibility}</p>
        <p>Weather: {diary.weather}</p>
        <br/>
        </div>
    )
}