import { IUser } from 'onix-core/dist/app/IUser';

export interface IChessUser extends IUser {
    insite?: boolean,
    display?: string,
    aurl?: string | string[],
    rating?: number,
    estimate?: number,
    zone?: number,
    timer?: number,
    postpone?: Date,
}