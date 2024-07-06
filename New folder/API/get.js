import { Router } from "express";
import prisma from "../DB/db.config.js";
const router = Router();

//all ourses
router.get("/courses", async (req, res) => {
  try {
    const courses = await prisma.courses.findMany();
    res.status(200).json(courses);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
});

router.get("/courses/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const course = await prisma.courses.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        modules: true,
        students: true,
        assignments: true,
        feed_backs: true,
        students: true,
        modules: {
          include: {
            assignments: true,
            recordings: true,
            resources: true,
          },
        },
      },
    });
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/courses/modules/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const module = await prisma.modules.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        assignments: true,
        recordings: true,
        resources: true,
      },
    });
    res.status(200).json(module);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/courses/assignments/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const assignment = await prisma.assignments.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(assignment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/courses/recordings/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const recording = await prisma.recordings.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(recording);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/courses/resources/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const resource = await prisma.resources.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(resource);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/students", async (req, res) => {
  try {
    const students = await prisma.students.findMany();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/students/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const student = await prisma.students.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        courses: {
          include: {
            course: {
              include: {
                modules: {
                  include: {
                    assignments: true,
                    recordings: true,
                    resources: true,
                  },
                },
                recordings: true,
                resources: true,
              },
            },
          },
        },
        assignments: {
          include: {
            assignment: true,
          },
        },
      },
    });
    res.status(200).json(student);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/users/:email", async (req, res) => {
  const email = req.params.email;
  try {
    const student = await prisma.students.findUnique({
      where: {
        email: email,
      },
      include: {
        courses: {
          include: {
            course: {
              include: {
                modules: {
                  include: {
                    assignments: true,
                    recordings: true,
                    resources: true,
                  },
                },
                recordings: true,
                resources: true,
                assignments: true,
              },
            },
          },
        },
        assignments: true,
      },
    });

    if (student) {
      // Get the first course
      const firstCourse = student.courses[0]?.course;
      if (firstCourse) {
        // Get the module IDs of the first course
        const moduleIds = firstCourse.modules.map((module) => module.id);

        // Fetch all submitted assignments for the student for the first course modules
        const submittedAssignments = await prisma.submittedAssignments.findMany({
          where: {
            studentId: student.id,
            moduleId: { in: moduleIds },
          },
        });

        // Calculate the total marks for each category
        const totalHomeworkMarks = submittedAssignments.reduce((acc, sa) => acc + sa.homework_marks, 0);
        const totalAssignmentMarks = submittedAssignments.reduce((acc, sa) => acc + sa.marks, 0);
        const totalClassPerformanceMarks = submittedAssignments.reduce((acc, sa) => acc + sa.class_performance_marks, 0);

        // Calculate the total possible marks for each category
        const totalAssignments = submittedAssignments.length;
        const totalPossibleMarks = totalAssignments * 10; // Assuming each assignment is worth 10 marks
        const totalPossibleHomeworkMarks = totalAssignments * 10;
        const totalPossibleAssignmentMarks = totalAssignments * 10;
        const totalPossibleClassPerformanceMarks = totalAssignments * 10;

        // Calculate percentages
        const homeworkPercentage = totalPossibleHomeworkMarks ? (totalHomeworkMarks / totalPossibleHomeworkMarks) * 100 : 0;
        const assignmentPercentage = totalPossibleAssignmentMarks ? (totalAssignmentMarks / totalPossibleAssignmentMarks) * 100 : 0;
        const classPerformancePercentage = totalPossibleClassPerformanceMarks ? (totalClassPerformanceMarks / totalPossibleClassPerformanceMarks) * 100 : 0;

        // Calculate course progress percentage
        const completedModules = new Set(submittedAssignments.map(sa => sa.moduleId)).size;
        const totalModules = firstCourse.modules.length;
        const courseProgressPercentage = totalModules ? (completedModules / totalModules) * 100 : 0;

        // Include the percentages and progress in the response
        const response = {
          ...student,
          course: firstCourse,
          homeworkPercentage,
          assignmentPercentage,
          classPerformancePercentage,
          courseProgressPercentage,
        };

        res.status(200).json(response);
      } else {
        const response = {
          ...student,
          course: [],
          homeworkPercentage: 0,
          assignmentPercentage: 0,
          classPerformancePercentage: 0,
          courseProgressPercentage: 0,
        };
        res.status(200).json(response);
      }
    } else {
      res.status(404).json({ error: "Student not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});





router.get('/assignments/submission/:studentId/:moduleId/:assignmentId', async (req, res) => {
    try {
        const submissions = await prisma.submittedAssignments.findUnique({
          where: {
            studentId_moduleId_assignmentId: {
              studentId: parseInt(req.params.studentId),
              moduleId: parseInt(req.params.moduleId),
              assignmentId: parseInt(req.params.assignmentId),
            }
          },
            include: {
                assignment: true
            }
        })
        res.status(200).json(submissions)
    } catch (error) {
      console.log(error)
        res.status(500).json({ error: error.message })
    }
})


router.get('/assignments/:studentId', async(req, res) => {
    try {
        const assignments = await prisma.submittedAssignments.findMany({
            where: {
                studentId: parseInt(req.params.studentId)
            },
            include: {
                assignment: true
            }
        })
        res.status(200).json(assignments)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
})
export default router;
