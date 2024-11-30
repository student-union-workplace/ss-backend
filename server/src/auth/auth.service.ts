import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    inputEmail: string,
    inputPassword: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOneEmail(inputEmail);

    if (!user) {
      throw new NotFoundException(`Пользователь с ${inputEmail} не найден`);
    }

    const isPasswordValid = bcrypt.compareSync(inputPassword, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Введён неверный пароль');
    }

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      department_id: user.department_id,
      role: user.role,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
