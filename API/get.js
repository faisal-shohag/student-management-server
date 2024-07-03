import { Router } from "express";
import prisma from "../DB/db.config.js";
const router = Router();

//all ourses
router.get("/courses", async (req, res) => {
  try {
    const courses = await prisma.courses.findMany();
    res.status(200).json(courses);
  } catch (error) {
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
        assignments: true,
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

    res.status(200).json({ ...student, course: student.courses[0].course });
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
              assignmentId: parseInt(req.params.assignmentId),
              studentId: parseInt(req.params.studentId),
              moduleId: parseInt(req.params.moduleId)
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

export default router;
