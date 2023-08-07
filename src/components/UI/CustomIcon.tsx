import { IconName } from '../../interfaces/IconName.enum';
import {
    ArrowRightOnRectangleIcon,
    DocumentTextIcon,
    FunnelIcon,
    MagnifyingGlassIcon,
    PlusIcon,
    StarIcon,
    TrashIcon,
    XCircleIcon
} from '@heroicons/react/24/outline';

export const CustomIcon = (props: {name: IconName, customClass?: string}) => {
    switch (props.name) {
        case IconName.trashCan:
            return <TrashIcon className={props.customClass} />
        case IconName.documentText:
            return <DocumentTextIcon className={props.customClass} />
        case IconName.star:
            return <StarIcon className={props.customClass} />
        case IconName.search:
            return <MagnifyingGlassIcon className={props.customClass} />
        case IconName.xCircle:
            return <XCircleIcon className={props.customClass} />
        case IconName.funnel:
            return <FunnelIcon className={props.customClass} />
        case IconName.plus:
            return <PlusIcon className={props.customClass} />
        case IconName.arrowRightOnRectangleIcon :
            return <ArrowRightOnRectangleIcon className={props.customClass} />

    }
}
