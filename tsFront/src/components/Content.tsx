import { CoursePart } from "../courseParts"

interface Props {
    courses: CoursePart[]
}

export const Content = ({ courses }: Props ) => {
    return (
        <>
            {courses.map(course => <Part key={course.name} course={course}/>)}
        </>
    )
}

interface PartProps {
    course: CoursePart
}
 

const Part = ({ course }: PartProps ) => {
    switch (course.kind) {
        case "basic":
            return (
                <div>
                    <p>{course.name}</p>
                    <p>Nr of exercises: {course.exerciseCount}</p>
                    <p>Description: {course.description}</p>
                    <br/>
                </div>
            )
        case "group":
            return (
                <div>
                    <p>{course.name}</p>
                    <p>Nr of exercises: {course.exerciseCount}</p>
                    <p>Nr. of groupprojects: {course.groupProjectCount}</p>
                    <br/>
                </div>
            )
        case "background":
            return (
                <div>
                    <p>{course.name}</p>
                    <p>Nr of exercises: {course.exerciseCount}</p>
                    <p>Description: {course.description}</p>
                    <p>Background material: {course.backgroundMaterial}</p>
                    <br/>
                </div>
            )
        case "special":
            return (
                <div>
                    <p>{course.name}</p>
                    <p>Nr of exercises: {course.exerciseCount}</p>
                    <p>Description: {course.description}</p>
                    <p>Requirements: {course.requirements.map(rq => `${rq}, `)}</p>
                    <br/>
                </div>
            )
        default: 
            break
    }
}

