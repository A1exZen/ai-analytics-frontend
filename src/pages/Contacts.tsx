import { Link } from "react-router-dom";

export default function Contacts() {
	return (
		<div className='mt-[74px] py-10 px-5 flex justify-center items-center gap-5'>
			<div className='flex flex-col gap-5 items-start'>
				<h2 className='text-4xl font-bold dark:text-white'>
					Страница Временно
					<div>Недоступна.</div>
				</h2>
				<Link className='px-3 py-2 main_btn' to='/'>
					На Главную
				</Link>
			</div>
			<img
				className='w-80 h-80'
				src='/src/assets/web-maintenance.svg'
				alt='Maintenance'
			/>
		</div>
	);
}
