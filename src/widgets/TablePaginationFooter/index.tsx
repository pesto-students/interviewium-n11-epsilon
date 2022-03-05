import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight } from '@material-ui/icons'
// import { IconButton } from '@material-ui/core'
import SelectField from '../SelectField'
import styles from './index.module.scss'
import { Change } from '../../types/index'

interface Props {
    rowsPerPageOptions: Array<Object>,
    count?: number,
    totalCountRows: number,
    rowsPerPage: number,
    page: number,
    onChangePage: Function,
    onChangeRowsPerPage: Function,
}

const TablePaginationFooter = ({ rowsPerPageOptions, rowsPerPage, count, page, onChangePage, onChangeRowsPerPage, totalCountRows }: Props) => {
    let [totalCount, setTotalCount] = useState<number>(0)
    const [displayPage, setDisplayPage] = useState<number>(0)

    useEffect(() => {
        setDisplayPage(page)
    }, [count, page, rowsPerPage])

    useEffect(() => {
        totalCount = 0
        setTotalCount(totalCountRows)
    }, [totalCountRows])
    
    return (
        <div className={`d-flex justify-content-between align-items-center ${styles.table_pagination_footer_select_footer}`}>
            <div className={`d-flex align-items-center `}>
                <div className={`d-flex mr-5 ${styles.customePagination}`}>
                    <div className={styles.arrow_icon} onClick={() => ((page > 0) && onChangePage(Change.decrease))}><ArrowLeft /></div>
                    <div className={`${styles.current_page} mx-3 align-self-center`}>{displayPage + 1}</div>
                    <div onClick={() => (onChangePage(Change.increase))} className={`${styles.next_page} mx-3 align-self-center`}>{displayPage + 2}</div><div className={styles.arrow_icon} onClick={() => (onChangePage(Change.increase))}><ArrowRight /></div>
                </div>
                <div className={`d-flex`}>
                    <div className={` align-self-center mr-2  ${styles.customePagination} ${styles.table_pagination_footer_select_field}`}>
                        <SelectField className={styles.custompageDrop} attributeName='item' name='table_pagination_footer' options={rowsPerPageOptions} value={{ 'item': rowsPerPage.toString() }} methodHandleChange={onChangeRowsPerPage} />
                    </div>
                    <div className={`${styles.next_page} align-self-center`}>Items per page</div>
                </div>
            </div>

            <div className={`${styles.next_page} align-self-center ml-auto`}>
                Showing {(((displayPage * rowsPerPage) + 1))} to {(((displayPage * rowsPerPage) + rowsPerPage) > totalCount) ? totalCount : (((displayPage * rowsPerPage) + rowsPerPage) > ((displayPage * rowsPerPage) + 1)) ? ((displayPage * rowsPerPage) + rowsPerPage) : ((displayPage * rowsPerPage) + 1)} of {totalCount} entries
            </div>
        </div>
    )
}

export default TablePaginationFooter