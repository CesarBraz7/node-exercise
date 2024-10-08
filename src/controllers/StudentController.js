let students = []

export default class StudentController {

    static getAll(req, res) {
        if (students.length === 0) {
            res.status(404).json({ error: 'students not found' })
            return
        }

        res.status(200).json({ students: students })
    }

    static addStudent(req, res) {
        const { name, s1, s2 } = req.body

        if (isNaN(s1) || isNaN(s2)) {
            res.status(400).json({ error: 'as notas devem ser numeros' })
            return
        }

        if (s1 > 10 || s1 < 0 || s2 > 10 || s2 < 0) {
            res.status(400).json({ error: 'informe notas validas' })
            return
        }

        const avg = (s1 + s2) / 2

        const status = () => {
            if (avg < 4) {
                return 'reprovado'
            } else if (avg < 7) {
                return 'recuperação'
            } else {
                return 'aprovado'
            }
        }

        let student = {
            id: (students.length == 0 ? 1 : students.at(-1).id + 1),
            name: name,
            s1: s1,
            s2: s2,
            avg: avg,
            status: status()
        }

        students.push(student)

        res.status(201).json({
            message: 'created student',
            student: student
        })

    }

    static getAverage(req, res) {
        const { id } = req.params

        let student = students.find((student) => student.id === id)

        if (!student) res.status(404).json({ error: 'student not found' })

        res.status(200).json({
            student: {
                name: students.map((student) => (student.name)),
                average: students.map((student) => (student.avg))
            }
        })

    }

    static updateStudent(req, res) {
        const { id } = req.params
        const { name, s1, s2 } = req.body

        const studentId = students.findIndex((student) => student.id === parseInt(id))

        if (studentId == -1) {
            res.status(404).json({ message: "student not found" })
            return
        }

        students[studentId] = {
            id: parseInt(id),
            name: name,
            s1: s1,
            s2: s2
        }

        res.status(200).json({
            message: 'student updated',
            student: students[studentId]
        })
    }

    static delete(req, res) {
        const { id } = req.params

        students.splice(id - 1, 1)

        res.status(200).json({
            message: 'student deleted',
            students: students
        })
    }

}