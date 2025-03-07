import { Products } from 'src/products/products.entity';
import { UserEntity } from 'src/users/user.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('customers')
export class CustomerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.id)
  user: UserEntity;

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

  @Column({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP' })
  creationdate: Date

  @Column({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP' })
  modificationdate: Date

  @Column({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP' })
  birthdate: Date

  @OneToMany(() => Products, product => product.id)
  products: Products[];

  //TODO: implement foreign key for user modification
}

