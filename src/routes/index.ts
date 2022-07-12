import { Router } from "express"
const router = Router()
import {getOrganizations, getOrganizationsById, createOrganizations,updateOrganizations, deleteOrganizations} from '../controllers/organization/indexControllers'
import {getRepository,getRepositorysTribe} from '../controllers/repository/indexController'

router.get('/organization', getOrganizations)
router.get('/organization/:id', getOrganizationsById)
router.post('/postOrganization', createOrganizations)
router.put('/organization/:id', updateOrganizations)
router.delete('/organization/:id', deleteOrganizations)

router.get('/repositories', getRepository)
router.get('/tribeRepositories/:id', getRepositorysTribe)


export default router