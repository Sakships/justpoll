import{
    BaseEntity,
    Entity,
    Column,
    Index, 
    PrimaryGeneratedColumn
} from "typeorm";

@Entity("users")
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn("increment")
    id!: string;
  
    @Column({
      nullable: true,
      unique: false,
    })
    userName!: string;
    @Column({
      nullable: true,
      unique: true,
    })
    email!: string;
    @Column({
      nullable: true,
      unique: false,
    })
    userpassword!: string;
    displayname!: string;
    @Column({
      nullable: true,
      unique: false,
    })
    gender!: string;
    @Column({
      nullable: true,
      unique: false,
    })
    phonenumber!: number;
    @Column({
      nullable: true,
      unique: false,
    })
    bio!: string;
    @Column({
      nullable: true,
      unique: false,
    })
    isverified!: boolean;
    @Column({
      nullable: true,
      unique: false,
    })
    profileimage!: string;
    @Column({
      nullable: true,
      unique: false,
    })
    socialmedialinks!: string;
    @Column({
      nullable: true,
      unique: false,
    })
    
    ispremiunuser!:boolean;
    postcount!: number;
    followerscount!: number;
    followingcount!: number;
    createdat!:object;
  }