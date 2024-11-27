const Course = ({ course }) => {
    return (
      <li>
        <Header course={course} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </li>
    )
  }

  const Header = (props) => {
    return (
              <h1>{props.course.name}</h1>
          )
  }

  const Content = ({parts}) => {
    return (
      <ul>
        {parts.map(part =>
          <Part key={part.id} part={part} />
        )}
      </ul>
    )
  }

  const Part = ( {part} ) => {
    return (
      <li>
        {part.name} {part.exercises}
      </li>
    )
  }

  const Total = ({parts}) => {
    const totalAmount = parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
      <div>
        <p>
        Number of exercises {totalAmount}
        </p>
      </div>
    )
  }

  const Courses = ({ courses }) => {
    return (
      <ul>
        {courses.map(course => 
          <Course key={course.id} course={course} />
        )}
      </ul>
    )
  }

  export default Courses