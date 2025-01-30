import Header from "./Header";
import Content from "./Content";

const Course = ({ course }) => {
  // Calculate total exercises
  const totalExercises = course.parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <p><strong>Total exercises: {totalExercises}</strong></p> {/* Show total */}
    </div>
  );
};

export default Course;
