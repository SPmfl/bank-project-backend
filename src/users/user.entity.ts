import { CustomerEntity } from 'src/customers/customer.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => CustomerEntity, (customer) => customer.id)
  customers: CustomerEntity[]

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

