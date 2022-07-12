import { Request, Response } from 'express'
import { client } from '../../database/dataBase'

export const getOrganizations = async (req: Request, res: Response): Promise<Response> => {
    try {
        const response = await client.query('select * from organization')
    return res.status(200).json(response.rows)
        
    } catch (error) {
        return res.status(500).json('Internal Server error')
    }
}

export const getOrganizationsById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = parseInt(req.params.id)
        const response = await client.query(`select * from organization where pk_id_organization = ${id}`)
        return res.status(200).json(response.rows)
    } catch (error) {
        return res.status(500).json('Internal Server error')
    }
}

export const createOrganizations = async (req: Request, res: Response): Promise<Response> => {
    try {
        const {pk_id_organization, name, status} = (req.body)
        
        const response = await client.query(`insert into organization (pk_id_organization, name, status) values(${pk_id_organization} , '${name}' , ${status})`)
        return res.status(200).json({message: 'Organization created successfully'})
    } catch (error) {
        return res.status(500).json('Internal Server error')
    }
}

export const updateOrganizations = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = parseInt(req.params.id)
        const { name, status} = (req.body)
        const data = await client.query(`update organization set name = '${name}', status = ${status} where pk_id_organization = ${id}`)

            return res.status(200).json({message: `Organization ${id} Updated successfully`})
        
    } catch (error) {
        return res.status(500).json('Internal Server error')
    }
}

export const deleteOrganizations = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = parseInt(req.params.id)
        const response = await client.query(`delete from organization where pk_id_organization = ${id}`)
        return res.status(200).json({message: `Organization ${id} deleted successfully`})
    } catch (error) {
        return res.status(500).json(`Internal Server error`)
    }
}