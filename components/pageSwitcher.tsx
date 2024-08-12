import { useEffect, useState } from "react"

interface PageSwitcherProps {
    page: number
    onPageChange?: (page: number) => void
    numberOfPages: number
}

export default function PageSwitcher(props: PageSwitcherProps) {
    const [page, setPage] = useState<number>(props.page)


    useEffect(() => {
        if (props.onPageChange) {
            props.onPageChange(page)
        }
    }, [page])

    useEffect(() => {
        setPage(props.page)
    }, [props.page])


    const pages = Array.from({ length: props.numberOfPages }, (_, i) => i + 1)

    return (
        <div className="flex flex-row mt-2 space-x-4">
            {
                pages.map((pageNumber) => {
                    if (pageNumber === page + 1) {
                        return <CurrentPageButton key={pageNumber} page={pageNumber} />
                    }
                    return <PageButton key={pageNumber} page={pageNumber} onClick={() => setPage(pageNumber - 1)} />
                })
            }
        </div>
    )
}

function PageButton({ page, onClick }: { page: number, onClick: () => void }) {
    return (
        <button className="w-12 h-12 border-2 border-neutral-700 rounded" onClick={onClick}>
            {page}
        </button>
    )
}

function CurrentPageButton({ page }: { page: number }) {
    return (
        <button className="w-12 h-12 border-2 border-neutral-700 rounded bg-gray-700 text-white">
            {page}
        </button>
    )
}