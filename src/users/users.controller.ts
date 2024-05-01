import { Controller, Get, Post, Put, Delete, Body, Param, Logger, Res, HttpStatus } from '@nestjs/common';
import { User } from 'src/models/user.model';
import { UsersService } from './users/users.service';


@Controller('api/users')
export class UsersController {
    private readonly logger = new Logger(UsersController.name);

    constructor(private readonly usersService: UsersService) { }

    @Get()
    async findAll(@Res() res: Response): Promise<User[]> {
        this.logger.log('Petición para obtener todos los usuarios recibida.');
        try {
            const users = await this.usersService.findAll();
            this.sendResponseWithMessage(res, 'Petición para obtener todos los usuarios recibida.', users);
            return users;
        } catch (error) {
            this.logger.error('Error al obtener todos los usuarios.', error);
            this.sendResponseWithMessage(res, 'Error al obtener todos los usuarios.', HttpStatus.INTERNAL_SERVER_ERROR);
            return [];
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: string, @Res() res: Response): Promise<User> {
        this.logger.log(`Petición para obtener el usuario con ID: ${id} recibida.`);
        const user = await this.usersService.findOne(id).catch((error) => {
            this.logger.error(`Error al obtener el usuario con ID: ${id}.`, error);
            return null; // o cualquier otro valor que desees devolver en caso de error
        });
        this.sendResponseWithMessage(res, `Petición para obtener el usuario con ID: ${id} recibida.`, user);
        return user;
    }

    @Post()
    async create(@Body() user: User, @Res() res: Response): Promise<User> {
        this.logger.log('Petición para crear un nuevo usuario recibida.');
        try {
            const newUser = await this.usersService.create(user);
            this.sendResponseWithMessage(res, 'Petición para crear un nuevo usuario recibida.', newUser, HttpStatus.CREATED);
            return newUser;
        } catch (error) {
            this.logger.error('Error al crear un nuevo usuario.', error);
            this.sendResponseWithMessage(res, 'Error al crear un nuevo usuario.', HttpStatus.INTERNAL_SERVER_ERROR);
            return null;
        }
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() user: User, @Res() res: Response): Promise<User> {
        this.logger.log(`Petición para actualizar el usuario con ID: ${id} recibida.`);
        try {
            const updatedUser = await this.usersService.update(id, user);
            if (!updatedUser) {
                this.sendResponseWithMessage(res, `No se encontró el usuario con ID: ${id}.`, HttpStatus.NOT_FOUND);
                return null;
            }
            this.sendResponseWithMessage(res, `Petición para actualizar el usuario con ID: ${id} recibida.`, updatedUser);
            return updatedUser;
        } catch (error) {
            this.logger.error(`Error al actualizar el usuario con ID: ${id}.`, error);
            this.sendResponseWithMessage(res, `Error al actualizar el usuario con ID: ${id}.`, HttpStatus.INTERNAL_SERVER_ERROR);
            return null;
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: string, @Res() res: Response): Promise<User> {
        this.logger.log(`Petición para eliminar el usuario con ID: ${id} recibida.`);
        try {
            const deletedUser = await this.usersService.delete(id);
            if (!deletedUser) {
                this.sendResponseWithMessage(res, `No se encontró el usuario con ID: ${id}.`, HttpStatus.NOT_FOUND);
                return null;
            }
            this.sendResponseWithMessage(res, `Petición para eliminar el usuario con ID: ${id} recibida.`, deletedUser);
            return deletedUser;
        } catch (error) {
            this.logger.error(`Error al eliminar el usuario con ID: ${id}.`, error);
            this.sendResponseWithMessage(res, `Error al eliminar el usuario con ID: ${id}.`, HttpStatus.INTERNAL_SERVER_ERROR);
            return null;
        }
    }

    private sendResponseWithMessage(res: any, message: string, data: any, status: number = HttpStatus.OK) {
        res.status(status).json({
            message: message,
            data: data
        });
    }
}