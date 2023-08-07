import { CustomInputIcon } from '../UI/CustomInputIcon';
import { IconName } from '../../interfaces/IconName.enum';

export const Search = (props: {search: string, setSearch: (arg: string) => void}) => {

    const handleSearch = (event: string) => {
        props.setSearch(event);
    }

    return (
        <CustomInputIcon  input={props.search} clearIcon={IconName.xCircle} handleInput={handleSearch} icon={IconName.search} placeHolder='Search' />
    );
}
