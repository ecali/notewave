import { CustomInputProps } from '../../interfaces/Props.interface';
import { CustomIcon } from './CustomIcon';

export const CustomInputIcon = (props: CustomInputProps) => {
    return(
        <div className='w-full h-[50px] my-4 '>
            <div className={`flex flex-row w-full h-full rounded-lg overflow-hidden relative items-center ${props.customBackGround ? props.customBackGround : 'bg-eerie-black'} `} >
                {props.icon && <CustomIcon name={props.icon} customClass='w-6 h-6 absolute my-auto pl-1 '/>}
                <input value={props.input} onChange={(e) => props.handleInput(e.target.value) } className= {`w-full h-full pl-8 pr-6 ${props.customBackGround ? props.customBackGround : 'bg-eerie-black'}`}  type='text' placeholder={props.placeHolder ? props.placeHolder : ''}/>
                { (props.input !== '' && props.clearIcon) &&
                (
                    <div onClick={() => props.handleInput('')} className='flex flex-col justify-center items-center'>
                        <CustomIcon name={props.clearIcon} customClass='w-6 h-6 absolute right-0 pr-2 cursor-pointer' />
                    </div>
                )}
            </div>
        </div>
    );
}
