interface TotalExercises {
    totalExercises: number
}

export const TotalExercises = ( props: TotalExercises ) => {
    return <p>Number of exercises: {props.totalExercises}</p>
}