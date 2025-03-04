import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  typeid: string;

  @Column({ unique: true })
  idnumber: string;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column({ type: "timestamp", default: ()=> 'CURRENT_TIMESTAMP'})
  creationdate: Date
}

