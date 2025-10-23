const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/login", authController.login);
router.post("/create-student", authController.createStudentAccount);
router.get("/turmas", authController.getTurmas);
router.post("/create-turma", authController.createTurma);
router.post("/create-professor", authController.createProfessor);
router.get("/professores", authController.getProfessores);
router.get("/alunos", authController.getAlunos);
router.post("/vincular-professor", authController.vincularProfessor);
router.post("/vincular-aluno", authController.vincularAluno);
router.post("/desvincular-professor", authController.desvincularProfessor);
router.post("/desvincular-aluno", authController.desvincularAluno);

module.exports = router;
