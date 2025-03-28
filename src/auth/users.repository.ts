import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { User } from "./user.entity";
import { Task } from "src/tasks/task.entity";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "./jwt-payload.interface";

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(private dataSource: DataSource, private jwtService: JwtService) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void>{
    const{ username, password } = authCredentialsDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({ username, password: hashedPassword });
    try{
      await this.save(user);
    }catch(error){
      if(error.code === '23505'){
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}>{
    const { username, password } = authCredentialsDto;
    
    const user = await this.findOne({ where: { username } });
    if(user && (await bcrypt.compare(password, user.password))){
        const payload:JwtPayload = { username };
        const accessToken: string = this.jwtService.sign(payload);
        return { accessToken };
    }else{
        throw new UnauthorizedException('Please check your login credentials.');
    }
  }
}