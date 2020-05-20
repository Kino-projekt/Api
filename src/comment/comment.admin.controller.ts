import {
    Controller, UseGuards,
} from '@nestjs/common';
import { RolesGuard } from '../auth/roles.gurad';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(new RolesGuard(new Reflector()))
@UseGuards(AuthGuard())
@Controller('/admin/comments')
export class CommentAdminController {

}
