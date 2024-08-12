import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

export default function QuoteSkeleton() {
    return (
        <div className="bg-neutral-300 md:w-5/12 w-3/4 h-fit pb-2 md:pb-5 mt-2 md:mt-4 rounded-lg">
            <div className='md:mt-8 flex flex-col justify-center items-center'>
                <div className="flex flex-col md:flex-row justify-center items-center md:pl-10 w-full">
                    <Skeleton containerClassName="w-2/3 md:ml-20" count={2} className="h-8 m-2" />
                    <div className="flex items-center justify-center w-full md:w-20 md:pl-2 md:ml-4">
                        <Skeleton containerClassName="md:w-full w-1/12" />
                    </div>
                </div>
                <Skeleton className="mt-3" containerClassName="w-3/12" />
                <Skeleton className="mt-1" containerClassName="w-1/12" />
                <Skeleton className="mt-1" containerClassName="w-2/12" />
            </div>
        </div>
    );
}