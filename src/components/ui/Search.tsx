import {IoClose, IoSearch} from "react-icons/io5";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";


interface SearchProps {
	setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export const Search: React.FC<SearchProps> = ({setLoading}) => {
	const [query, setQuery] = useState("");
	const navigate = useNavigate();

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			navigate('/analytics', {state: {query, data: 'Данные'}});
		}, 2000)
	}

	return (
		<div className='flex flex-col max-w-3xl w-full gap-2'>
			<form className="form relative" onSubmit={handleSearch}>
				<button type='submit' className="absolute left-3 -translate-y-1/2 top-1/2 p-1">
					<IoSearch size={20}/>
				</button>
				<input
					className="w-full input rounded-xl px-10 py-3 border-2 border-gray-200 focus:outline-none focus:border-blue-500 placeholder-gray-400 transition-all duration-300 shadow-md"
					placeholder="Поиск..."
					type="text"
					value={query}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						setQuery(e.target.value)
					}}
				/>
				<button onClick={() => setQuery('')} type="reset" className="absolute right-3 -translate-y-1/2 top-1/2 p-1">
					<IoClose size={20} className='hover:rotate-90 transition duration-300 '/>
				</button>
			</form>

		</div>
	);
};
