import { CustomerEntity } from 'src/customers/customer.entity';
import { UserEntity } from 'src/users/user.entity';
import { BeforeInsert, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export enum AccountType {
  CC = "current",
  CA = "savings"
}
export enum AccountState {
  CA = "active",
  CI = "inactive",
  CC = "closed"
}

@Entity('products')
export class Products {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CustomerEntity, (customer) => customer.id)
  customer: CustomerEntity

  @Column({
    type: "enum",
    enum: AccountType,
    default: AccountType.CA
  })
  accounttype: AccountType;

  @Column({ unique: true })
  accountnumber: number;

  @Column({
    type: "enum",
    enum: AccountState,
    default: AccountState.CA
  })
  accountstate: AccountState;

  @Column()
  balance: number;

  @Column({ type: "numeric", nullable: true })
  balanceavailable: number;

  @Column()
  exemptgmf: boolean;

  @ManyToOne(() => UserEntity, (user) => user.id)
  usercreation: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.id)
  usermodification: UserEntity;

  @Column({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP' })
  creationdate: Date

  @Column({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP' })
  modificationdate: Date

  @BeforeInsert()
  setBalanceAvailable() {
    this.balanceavailable = this.balance;  // Asigna balance a balanceAvailable antes de insertar
  }
}
