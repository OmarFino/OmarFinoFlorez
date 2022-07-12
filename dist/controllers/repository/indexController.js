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
exports.getRepositorysTribe = exports.getRepository = void 0;
const dataBase_1 = require("../../database/dataBase");
const getRepository = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield dataBase_1.client.query('select id_repository as id, statu as state from repository');
        return res.status(200).json({ repositories: response.rows });
    }
    catch (error) {
        return res.status(500).json('Internal Server error');
    }
});
exports.getRepository = getRepository;
const getRepositorysTribe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const response = yield dataBase_1.client.query(`select repository.id_repository, 
        repository.name, tribe.name as tribe, organization.name as organization, metrics.coverage,metrics.code_smell, 
        metrics.bugs, metrics.vulnerabilities, metrics.hotspot, repository.statu as verificationState from organization
        inner join tribe on organization.pk_id_organization = tribe.fk_id_organization
        inner join repository on tribe.pk_id_tribe = repository.id_tribe
        inner join metrics on repository.id_repository = metrics.fk_id_repository
        where tribe.pk_id_tribe = ${id}`);
        response.rows.forEach(element => {
            console.log(element);
        });
        if (response.rows != "") {
            return res.status(200).json({ repositories: response.rows });
        }
        else {
            return res.status(200).json({ message: 'La Tribu no se encuentra registrada' });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('Internal Server error');
    }
});
exports.getRepositorysTribe = getRepositorysTribe;
