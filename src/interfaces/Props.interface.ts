import { PocketBaseList } from './PocketBase.interface';
import { IconName } from './IconName.enum';

export interface ListColumnProps {
    filterString: string,
    selected: PocketBaseList,
    setSelected: (arg: PocketBaseList) => void,
    lists: PocketBaseList[]
}

export interface CustomInputProps {
    input: string,
    icon?: IconName,
    clearIcon?: IconName,
    handleInput: (arg: string) => void,
    placeHolder?: string,
    customBackGround?: string
}

export interface CustomButtonProps {
    label?: string;
    icon?: IconName;
    endIcon?: boolean;
    background?: string;
    textColor?: string;
    small?: boolean;
    callBack: () => void;
}

