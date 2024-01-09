import Skeleton from '@mui/material/Skeleton';

export default function ProductCardLoading() {	

	return (
		<div className="group box-border overflow-hidden flex rounded-md cursor-pointer pe-0 pb-2 lg:pb-3 flex-col items-start bg-white transition duration-200 ease-in-out transform hover:-translate-y-1 hover:md:-translate-y-1.5 hover:shadow-product">
			
			<Skeleton width="100%" height={240} animation="wave" variant="rectangular" className='mb-3' />
			
			<div className="w-full overflow-hidden">
				<h2 className="text-heading font-semibold truncate mb-1 text-sm md:text-base">
					<Skeleton animation="wave" height={22} width="100%" />
				</h2>
				
				<p className="text-body text-xs lg:text-sm leading-normal xl:leading-relaxed max-w-[250px] truncate">
					<Skeleton animation="wave" height={22} width="100%" />
				</p>
				<div className='font-semibold text-sm sm:text-base mt-1.5 flex flex-wrap gap-x-2 lg:text-lg lg:mt-2.5 text-heading'>
					<Skeleton animation="wave" height={28} width="80%" />
				</div>
			</div>
		</div>
	)
}