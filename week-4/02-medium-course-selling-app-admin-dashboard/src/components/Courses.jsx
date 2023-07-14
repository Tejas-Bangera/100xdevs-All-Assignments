import ShowCourses from "./ShowCourses";
import Navbar from "./Navbar";
import CoursesHero from "./CoursesHero";

const Courses = () => {
  return (
    <>
      {/* Navbar
      <Navbar /> */}

      {/* Hero section */}
      <main>
        <CoursesHero />

        {/* Display courses */}
        <ShowCourses />
      </main>
    </>
  );
};
export default Courses;
