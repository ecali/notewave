export const Search = (props: {search: string, setSearch: (arg: string) => void}) => {

    const handleSearch = (event: string) => {
        props.setSearch(event);
    }

    return (
        <div className='w-full h-[50px] my-4 '>
            <div className='flex flex-row w-full h-full rounded-lg overflow-hidden relative items-center bg-eerie-black '>
                <svg className="w-6 h-6 absolute my-auto pl-1 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <input value={props.search} onChange={(e) => handleSearch(e.target.value) } className='w-full h-full pl-8 bg-eerie-black pr-6' type='text' placeholder='Search'/>
                { props.search !== '' && <svg onClick={() => handleSearch('')} className="w-6 h-6 absolute right-0 pr-2 cursor-pointer"
                      xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                      stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>}
            </div>
        </div>
    );
}
