// Header Component
const Header = ({ name }) => {
  return <h1>{name}</h1>;
};

// Part Component
const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

// Content Component
const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
};

// Course Component
const Course = ({ course }) => {
  const totalExercises = course.parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <p><strong>Total exercises: {totalExercises}</strong></p>
    </div>
  );
};

export default Course;
