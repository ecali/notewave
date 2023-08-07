import { CustomButtonProps } from '../../interfaces/Props.interface';
import { CustomIcon } from './CustomIcon';

export const CustomButton = (props: CustomButtonProps) => {
    return (
        <div onClick={() => props.callBack()} className={`h-[50px]  rounded-lg flex flex-row font-bold px-4 items-center cursor-pointer 
        ${props.background ? props.background : 'bg-eerie-black'} ${props.textColor ? props.textColor : 'text-silver'}
        ${props.endIcon ? 'justify-between' : 'justify-start'} ${props.small ? 'h-[35px]' : 'h-[50px]'}`
        }>
            {(!props.endIcon && props.icon) && <CustomIcon name={props.icon} customClass='h-6 w-6 mr-4' /> }
            <p>{props.label}</p>
            {(props.endIcon && props.icon) && <CustomIcon name={props.icon} customClass='h-6 w-6 mx-4' /> }
        </div>
    );
}

