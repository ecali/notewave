import { useEffect, useState } from 'react';
import { CustomIcon } from '../UI/CustomIcon';
import { IconName } from '../../interfaces/IconName.enum';
import { CustomButton } from '../UI/CustomButton';
import { auth } from '../../config/firebase';
import { getRoutePath } from '../../utils/Routes';
import { RoutesName } from '../../interfaces/Routes.interface';
import { useNavigate } from 'react-router-dom';

export const Hello = (props: { displayName?: string | null, image?: string | null }) => {

    const navigate = useNavigate();

    const [displayName, setDisplayName] = useState<string>();
    const [image, setImage] = useState<string>();
    const [toggle, setToggle] = useState(false);
    const logOut = () => {
        auth.signOut().then( _ => navigate(getRoutePath(RoutesName.LOGIN)));
    }

    useEffect(() => {
        if (props.displayName !== null) setDisplayName(props.displayName);
        if (props.image !== null) setImage(props.image)
    }, [props])

    return (
        <div className='flex flex-col w-full'>
            <div className='flex flex-row justify-between w-full'>
                <div className="flex flex-row items-center justify-between">
                    {displayName && image ? (
                        <img src={image} alt={displayName} width="30px" height="30px" className="rounded-lg"/>
                    ) : (
                        <div
                            className="bg-eerie-black text-silver rounded-lg w-[30px] h-[30px] flex justify-center items-center">
                            <CustomIcon name={IconName.user} customClass={'h-6 w-6'} />
                        </div>
                    )}
                    <h2 className="font-bold tracking-wider ml-3">Hello, {displayName ? displayName : 'User'}</h2>
                </div>
                <div className="cursor-pointer" onClick={() => setToggle(!toggle)}>
                    <CustomIcon name={IconName.cog6Tooth} customClass={'h-6 w-6'} />
                </div>
            </div>

            <div className={ `h-[50px] my-2 flex-row justify-end ${toggle ? 'flex' : 'hidden'}` }>
                <div className='w-1/2'>
                    <CustomButton callBack={logOut} icon={IconName.arrowRightOnRectangleIcon} small={true} label='LOGOUT' background='bg-red' textColor='text-eerie-black' endIcon={true} />
                </div>
            </div>
        </div>
    );
}
