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
exports.citaController = void 0;
const database_1 = __importDefault(require("../database"));
class CitaController {
    // Método para listar todas las citas
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [citas] = yield database_1.default.query('SELECT * FROM cita');
                res.json(citas);
            }
            catch (error) {
                console.error('Error al consultar la base de datos:', error);
                res.status(500).json({ message: 'Error al consultar la base de datos', error: error.message });
            }
        });
    }
    // Método para crear una nueva cita
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cita = Array.isArray(req.body) ? req.body[0] : req.body;
                const { id_paciente, id_doctor, nombre_especialidad, nombre_doc, nom_paciente, fecha, hora } = cita;
                // Validar que todos los campos necesarios estén presentes y tengan un formato válido
                if (!id_paciente || !id_doctor || !nombre_especialidad || !nombre_doc || !nom_paciente || !fecha || !hora) {
                    console.log('Datos incompletos:', cita);
                    res.status(400).json({ message: 'Datos incompletos. Asegúrese de que todos los campos requeridos estén presentes.' });
                    return;
                }
                // Asegurarse de que los campos tengan el tipo de datos correcto
                if (typeof id_paciente !== 'number' || typeof id_doctor !== 'number' || typeof nombre_especialidad !== 'string' ||
                    typeof nombre_doc !== 'string' || typeof nom_paciente !== 'string' || isNaN(new Date(fecha).getTime()) || typeof hora !== 'string') {
                    res.status(400).json({ message: 'Formato de datos incorrecto. Verifique los tipos de datos.' });
                    return;
                }
                // Insertar la nueva cita en la base de datos
                const [result] = yield database_1.default.query('INSERT INTO cita (id_paciente, id_doctor, nombre_especialidad, nombre_doc, nom_paciente, fecha, hora) VALUES (?, ?, ?, ?, ?, ?, ?)', [id_paciente, id_doctor, nombre_especialidad, nombre_doc, nom_paciente, fecha, hora]);
                res.status(201).json({ message: 'Cita insertada correctamente', insertId: result.insertId });
            }
            catch (error) {
                console.error('Error al insertar en la base de datos:', error);
                res.status(500).json({ message: 'Error al insertar en la base de datos', error: error.message });
            }
        });
    }
    // Método para eliminar una cita por ID
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_cita } = req.params;
                yield database_1.default.query('DELETE FROM cita WHERE id_cita = ?', [id_cita]);
                res.json({ message: 'Cita eliminada' });
            }
            catch (error) {
                console.error('Error al eliminar la cita:', error);
                res.status(500).json({ message: 'Error al eliminar la cita', error: error.message });
            }
        });
    }
    // Método para actualizar una cita
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_cita } = req.params;
                const { id_paciente, id_doctor, nombre_especialidad, nombre_doc, nom_paciente, fecha, hora, estado } = req.body;
                // Validar que todos los campos necesarios estén presentes
                if (!id_paciente || !id_doctor || !nombre_especialidad || !nombre_doc || !nom_paciente || !fecha || !hora || !estado) {
                    res.status(400).json({ message: 'Datos incompletos' });
                    return;
                }
                // Actualizar la cita en la base de datos
                yield database_1.default.query('UPDATE cita SET id_paciente = ?, id_doctor = ?, nombre_especialidad = ?, nombre_doc = ?, nom_paciente = ?, fecha = ?, hora = ?, estado = ? WHERE id_cita = ?', [id_paciente, id_doctor, nombre_especialidad, nombre_doc, nom_paciente, fecha, hora, estado, id_cita]);
                res.json({ message: 'Cita actualizada' });
            }
            catch (error) {
                console.error('Error al actualizar la cita:', error);
                res.status(500).json({ message: 'Error al actualizar la cita', error: error.message });
            }
        });
    }
    // Método para obtener una cita por ID
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_cita } = req.params;
                const [result] = yield database_1.default.query('SELECT * FROM cita WHERE id_cita = ?', [id_cita]);
                res.json(result);
            }
            catch (error) {
                console.error('Error al consultar la cita:', error);
                res.status(500).json({ message: 'Error al consultar la cita', error: error.message });
            }
        });
    }
    // Método para obtener las horas ocupadas en una fecha específica
    getHorasOcupadas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { fecha } = req.query;
                if (!fecha) {
                    res.status(400).json({ message: 'Fecha requerida' });
                    return;
                }
                const [result] = yield database_1.default.query('SELECT hora FROM cita WHERE fecha = ?', [fecha]);
                const horasOcupadas = Array.isArray(result) ? result.map((row) => row.hora) : [];
                res.json({ horasOcupadas });
            }
            catch (error) {
                console.error('Error al consultar las horas ocupadas:', error);
                res.status(500).json({ message: 'Error al consultar las horas ocupadas', error: error.message });
            }
        });
    }
}
// Exportar una instancia de CitaController
exports.citaController = new CitaController();
