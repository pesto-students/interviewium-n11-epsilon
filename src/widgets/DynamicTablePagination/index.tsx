import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, FastRewind, FastForward } from '@material-ui/icons'
// import { IconButton } from '@material-ui/core'
import SelectField from '../SelectField'
import styles from './index.module.scss'
import { Change } from '../../types/index'

interface Props {
    rowsPerPage? :any,
    paginationData : any,
    onChangePage: Function,
    onChangeRowsPerPage: Function,
}

const DynamicTablePagination = ({ paginationData, onChangePage }: Props) => {
    let [totalCount, setTotalCount] = useState<number>(paginationData)
    const [displayPage, setDisplayPage] = useState<number>(0)


    return (
        <div className={`d-flex justify-content-between align-items-center ${styles.table_pagination_footer_select_footer}`}>
            <div className={`d-flex align-items-center `}>
                <div className={`d-flex mr-5 ${styles.customePagination}`}>
                    <div className={styles.arrow_icon} onClick={() => ((1 > 0) && onChangePage(paginationData?.links?.first))}><FastRewind /></div>
                    <div className={styles.arrow_icon} onClick={() => ((1 > 0) && onChangePage(paginationData?.links?.previous))}><ArrowLeft /></div>
                    <div className={`${styles.current_page} mx-3 align-self-center`}>{paginationData?.meta.currentPage}</div>
                    <div onClick={() => (onChangePage(paginationData?.links?.next))} className={`${styles.next_page} mx-3 align-self-center`}>{ paginationData?.meta.currentPage === paginationData?.meta.totalPages ?  null : paginationData?.meta.currentPage + 1}</div>
                    <div className={styles.arrow_icon} onClick={() => (onChangePage(paginationData?.links?.next))}><ArrowRight /></div>
                    <div className={styles.arrow_icon} onClick={() => (onChangePage(paginationData?.links?.last))}><FastForward /></div>
                </div>
            </div>

            <div className={`${styles.next_page} align-self-center ml-auto`}>
                    Showing page {paginationData?.meta.currentPage} of {paginationData?.meta.totalPages}
            </div>
        </div>
    )
}

export default DynamicTablePagination