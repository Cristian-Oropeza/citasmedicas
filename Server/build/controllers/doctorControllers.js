"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doctorController = void 0;
const database_1 = __importDefault(require("../database"));
class DoctorController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const doctors = yield database_1.default.query('SELECT * FROM doctor');
                res.json(doctors);
            }
            catch (error) {
                console.error('Database query error:', error); // Imprimir el error completo
                res.status(500).send('Error al consultar la base de datos');
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const doctor = Array.isArray(req.body) ? req.body[0] : req.body;
                const { usuario, id_especialidad, id_horario, nombre_doc, tipo_doctor } = doctor;
                if (!usuario || !id_especialidad || !id_horario || !nombre_doc || !tipo_doctor) {
                    res.status(400).json({ message: 'Datos incompletos' });
                    return;
                }
                console.log('Received data:', doctor);
                const result = yield database_1.default.query('INSERT INTO doctor (usuario, id_especialidad, id_horario, nombre_doc, tipo_doctor) VALUES (?, ?, ?, ?, ?)', [usuario, id_especialidad, id_horario, nombre_doc, tipo_doctor]);
                res.status(201).json({ message: 'Doctor insertado' });
            }
            catch (error) {
                console.error('Database query error:', error); // Imprimir el error completo
                if (!res.headersSent) {
                    res.status(500).json({ message: 'Error al insertar en la base de datos' });
                }
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_doctor } = req.params;
                yield database_1.default.query('DELETE FROM doctor WHERE id_doctor = ?', [id_doctor]);
                res.json({ message: 'Doctor eliminado' });
            }
            catch (error) {
                console.error('Database query error:', error); // Imprimir el error completo
                res.status(500).send('Error al eliminar el doctor');
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_doctor } = req.params;
                const { usuario, id_especialidad, id_horario, nombre_doc, tipo_doctor } = req.body;
                if (!usuario || !id_especialidad || !id_horario || !nombre_doc || !tipo_doctor) {
                    res.status(400).json({ message: 'Datos incompletos' });
                    return;
                }
                const result = yield database_1.default.query('UPDATE doctor SET usuario = ?, id_especialidad = ?, id_horario = ?, nombre_doc = ?, tipo_doctor = ? WHERE id_doctor = ?', [usuario, id_especialidad, id_horario, nombre_doc, tipo_doctor, id_doctor]);
                res.json({ message: 'Doctor actualizado' });
            }
            catch (error) {
                console.error('Database query error:', error);
                res.status(500).send('Error al actualizar el doctor');
            }
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_doctor } = req.params;
                const result = yield database_1.default.query('SELECT * FROM doctor WHERE id_doctor = ?', [id_doctor]);
                res.json(result);
            }
            catch (error) {
                console.error('Database query error:', error);
                res.status(500).send('Error al consultar el doctor');
            }
        });
    }
}
exports.doctorController = new DoctorController();
