import {Card} from "@/components/ui/Card.tsx";

import {OpenAIAnalysis} from '@/types/types.ts'
import React, {useState} from "react";

interface ISEOProps {
	openAIAnalysis: OpenAIAnalysis;
}

export const SEO: React.FC<ISEOProps> = ({openAIAnalysis}) => {
	const [selectedFilter, setSelectedFilter] = useState<"Все" | "Прочее">("Все");

	return (
		<div
			className='bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md flex flex-col w-full max-w-full'>
			<div className='flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-2'>
				<h2
					className='font-medium text-gray-600 dark:text-gray-200 '>
					SEO
				</h2>
				<select
					className="border dark:bg-gray-800 border-gray-300 dark:border-gray-400 text-gray-600 dark:text-gray-200 text-sm rounded-lg py-2 px-2"
					value={selectedFilter}
					onChange={(e) => setSelectedFilter(e.target.value as "Все" | "Прочее")}
				>
					<option value="Все">Все</option>
					<option value="Прочее">Прочее</option>
				</select>
			</div>
			{
				selectedFilter === "Все" ? (
					<div
						className='grid grid-cols-3 sm:grid-cols-3 gap-2 sm:gap-3 text-gray-400 h-full '>
						<div
							className='w-full flex items-center justify-center border border-border rounded-xl mr-2 py-4 sm:py-6'>
							<div
								className={`border-4  rounded-full p-4 sm:p-5  text-3xl font-bold   ${openAIAnalysis.seo_score.score > 70 ? 'border-green-700 text-green-800' : 'border-red-800 text-red-800'}`}>
								{openAIAnalysis.seo_score.score}
							</div>
						</div>
						<Card
							title='Авторитет домена'
							value={openAIAnalysis.domain_authority}
							isLocked={false}
							className='border border-border'
						/>
						<Card
							title='Обратные ссылки'
							customValue={<div className='text-2xl text-gray-800 font-bold'>{openAIAnalysis.backlinks.quantity}</div>}
							isLocked={false}
							className='border border-border'
						/>
						<div className='col-span-3'>
							<Card
								title='Уязвимости безопасности'
								className='border border-border h-full'
								customValue={
									<div className='flex flex-col w-full gap-3'>
										<div
											className='text-blue-600 font-bold mr-2 text-xl'>XSS: <span
											className={`text-gray-400 `}>{openAIAnalysis.security_vulnerabilities.xss}</span>
										</div>
										<div
											className='text-blue-600 font-bold mr-2 text-xl'>CSRF: <span
											className={`text-gray-400 `}>{openAIAnalysis.security_vulnerabilities.csrf}</span>
										</div>
									</div>
								}
								isLocked={false}
							/>
						</div>
					</div>
				) : (
					<div
						className='flex flex-col items-center justify-around text-gray-400  gap-2 h-full'>
						<div
							className={`bg-white dark:bg-gray-800 hover:bg-slate-200 transition-all ease-in-out hover:dark:bg-gray-700 px-4 py-2 rounded-xl flex justify-between items-center gap-5 w-full border border-border`}
						>
							<h2 className={`font-medium text-gray-600 dark:text-gray-200`}>{openAIAnalysis.seo_score.keywords}</h2>
						</div>
						<div
							className={`bg-white dark:bg-gray-800 hover:bg-slate-200 transition-all ease-in-out hover:dark:bg-gray-700 px-4 py-2 rounded-xl flex justify-between items-center gap-5 w-full border border-border`}
						>
							<h2 className={`font-medium text-gray-600 dark:text-gray-200`}>{openAIAnalysis.seo_score.meta_tags}</h2>
						</div>
						<div
							className={`bg-white dark:bg-gray-800 hover:bg-slate-200 transition-all ease-in-out hover:dark:bg-gray-700 px-4 py-2 rounded-xl flex justify-between items-center gap-5 w-full border border-border`}
						>
							<h2 className={`font-medium text-gray-600 dark:text-gray-200`}>{openAIAnalysis.seo_score.structure}</h2>
						</div>
						<div
							className={`bg-white dark:bg-gray-800 hover:bg-slate-200 transition-all ease-in-out hover:dark:bg-gray-700 px-4 py-2 rounded-xl flex justify-between items-center gap-5 w-full border border-border`}
						>
							<h2 className={`font-medium text-gray-600 dark:text-gray-200`}>{openAIAnalysis.seo_score.description}</h2>
						</div>
					</div>
				)
			}
		</div>
	)
}
