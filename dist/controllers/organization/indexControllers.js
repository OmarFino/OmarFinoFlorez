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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrganizations = exports.updateOrganizations = exports.createOrganizations = exports.getOrganizationsById = exports.getOrganizations = void 0;
const dataBase_1 = require("../../database/dataBase");
const getOrganizations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield dataBase_1.client.query('select * from organization');
        return res.status(200).json(response.rows);
    }
    catch (error) {
        return res.status(500).json('Internal Server error');
    }
});
exports.getOrganizations = getOrganizations;
const getOrganizationsById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const response = yield dataBase_1.client.query(`select * from organization where pk_id_organization = ${id}`);
        return res.status(200).json(response.rows);
    }
    catch (error) {
        return res.status(500).json('Internal Server error');
    }
});
exports.getOrganizationsById = getOrganizationsById;
const createOrganizations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { pk_id_organization, name, status } = (req.body);
        const response = yield dataBase_1.client.query(`insert into organization (pk_id_organization, name, status) values(${pk_id_organization} , '${name}' , ${status})`);
        return res.status(200).json({ message: 'Organization created successfully' });
    }
    catch (error) {
        return res.status(500).json('Internal Server error');
    }
});
exports.createOrganizations = createOrganizations;
const updateOrganizations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const { name, status } = (req.body);
        const data = yield dataBase_1.client.query(`update organization set name = '${name}', status = ${status} where pk_id_organization = ${id}`);
        return res.status(200).json({ message: `Organization ${id} Updated successfully` });
    }
    catch (error) {
        return res.status(500).json('Internal Server error');
    }
});
exports.updateOrganizations = updateOrganizations;
const deleteOrganizations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const response = yield dataBase_1.client.query(`delete from organization where pk_id_organization = ${id}`);
        return res.status(200).json({ message: `Organization ${id} deleted successfully` });
    }
    catch (error) {
        return res.status(500).json(`Internal Server error`);
    }
});
exports.deleteOrganizations = deleteOrganizations;
