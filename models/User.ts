import {Table, Column, PrimaryGeneratedColumn} from "typeorm";

@Table()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    description: string;
    @Column()
    avatar: string;
    @Column()
    mobile: number;
    @Column()
    wechat: string;
    @Column()
    weibo:string;
}