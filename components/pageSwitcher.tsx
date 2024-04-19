import { useEffect, useState } from "react"

interface PageSwitcherProps {
    page?: number
    onPageChange?: (page: number) => void
}

export default function PageSwitcher(props: PageSwitcherProps) {
    const [page, setPage] = useState<number>(props.page ? props.page : 0)

    useEffect(() => {
        if (props.onPageChange) {
            props.onPageChange(page)
        }
    }, [page, props])


    return (
        <div className="flex flex-row mt-2 space-x-4">
            {page > 0 &&
                <button className=" w-12 h-12 border-2 border-neutral-700 rounded" onClick={() => setPage(page - 1)}>
                    {page}
                </button>
            }

            {page < 1 &&
                <div className="ml-12">
                </div>
            }


            <button className="w-12 h-12 border-2 border-neutral-700 rounded bg-gray-700 text-white">
                {page + 1}
            </button>

            <button className=" w-12 h-12 border-2 border-neutral-700 rounded" onClick={() => setPage(page + 1)}>
                {page + 2}
            </button>
        </div>
    )

}