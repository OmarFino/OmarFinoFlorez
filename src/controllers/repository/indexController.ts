import { Request, Response } from 'express'
import { client } from '../../database/dataBase'

export const getRepository = async (req: Request, res: Response): Promise<Response> => {
    try {
        const response = await client.query('select id_repository as id, statu as state from repository')
    return res.status(200).json({repositories: response.rows})
        
    } catch (error) {
        return res.status(500).json('Internal Server error')
    }
}

export const getRepositorysTribe = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = parseInt(req.params.id)
        const data = await client.query(`select repository.id_repository, 
        repository.name, tribe.name as tribe, organization.name as organization, metrics.coverage,metrics.code_smell, 
        metrics.bugs, metrics.vulnerabilities, metrics.hotspot, repository.statu as verificationState from organization
        inner join tribe on organization.pk_id_organization = tribe.fk_id_organization
        inner join repository on tribe.pk_id_tribe = repository.id_tribe
        inner join metrics on repository.id_repository = metrics.fk_id_repository
        where tribe.pk_id_tribe = ${id}`)
        const response = await client.query(`select repository.id_repository, 
        repository.name, tribe.name as tribe, organization.name as organization, metrics.coverage,metrics.code_smell, 
        metrics.bugs, metrics.vulnerabilities, metrics.hotspot, repository.statu as verificationState from organization
        inner join tribe on organization.pk_id_organization = tribe.fk_id_organization
        inner join repository on tribe.pk_id_tribe = repository.id_tribe
        inner join metrics on repository.id_repository = metrics.fk_id_repository
        where tribe.pk_id_tribe = ${id} and repository.state = 'E' and  metrics.coverage >= 75 `)
        response.rows.forEach(element => {
            if (element.verificationstate == 604) {
                element.verificationstate = "Verificado"
            }else{
                if (element.verificationstate == 605) {
                    element.verificationstate = "En espera"
                } else {
                    if (element.verificationstate == 606) {
                        element.verificationstate = "Aprobado"
                    } else {
                        element.verificationstate = "estado no existe"
                    }
                }
            }
            
        });
        if (data.rows != "") {
            if (response.rows != "") {
                return res.status(200).json({repositories: response.rows})
            } else {
                return res.status(200).json({message: 'La Tribu no tiene repositorios que cumplan con la cobertura necesaria'})
            }
            
        } else {
            return res.status(200).json({message: 'La Tribu no se encuentra registrada'})
        }
        
    } catch (error) {
        console.log(error)
        
        return res.status(500).json('Internal Server error')
    }
}