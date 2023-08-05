export const CustomButton = (props: CustomButtonProps) => {
    return (
        <div onClick={() => props.callBack()} className={`h-[50px]  rounded-lg flex flex-row font-bold px-4 items-center cursor-pointer 
        ${props.background ? props.background : 'bg-eerie-black'} ${props.textColor ? props.textColor : 'text-silver'}
        ${props.endIcon ? 'justify-between' : 'justify-start'} ${props.small ? 'h-[35px]' : 'h-[50px]'}`
        }>
            {!props.endIcon && props.icon}
            <p>{props.label}</p>
            {props.endIcon && props.icon}
        </div>
    );
}

export interface CustomButtonProps {
    label?: string;
    icon?: any;
    endIcon?: boolean;
    background?: string;
    textColor?: string;
    small?: boolean;
    callBack: () => void;
}
