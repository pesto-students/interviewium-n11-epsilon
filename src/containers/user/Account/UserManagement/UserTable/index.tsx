import { useEffect,useState, ForwardRefRenderFunction, forwardRef, useImperativeHandle, createRef } from 'react'
import styles from './index.module.scss'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Paper from '@material-ui/core/Paper'
import Avatar from '@material-ui/core/Avatar'
import ProfilePhoto from '../../../../../utilities/images/profile-photo.png'

import TablePaginationFooter from '../../../../../widgets/TablePaginationFooter'
import CheckboxField from '../../../../../widgets/CheckboxField'
import SwitchToggle from '../../../../../widgets/SwitchToggle'
import {UserTableProps, Change,UserTableForwardMethod,UserTableForwardProps,} from '../../../../../types/index'
// import { UserTableProps } from '../../../../types/index'
import {Trash, UpArrow, DownArrow} from '../../../../../utilities/images/icons'

const UserTable: ForwardRefRenderFunction<UserTableForwardMethod, UserTableForwardProps> = ({ confirmDeletion,users,fetchData,totalCountRows,updateSingleStatus, sortOrder, checkUser }, ref) => {
  useImperativeHandle(ref, () => ({
      method: () => {
          return displayedUsers.filter((item)=>item.checked)
      },
      method1: ()=> {
        console.log('~~~ method1')
        handleChangeRowsPerPage({'item': rowsPerPage.toString()})
      },
      method2: ()=> {
        handleChangePage(Change.increase)
      },
      method3: ()=> {
        toggleAllCheckbox(false)
      },
  }))
  const tableBodyRef=createRef<any>()
  let [totalCount,setTotalCount]=useState<number>(0)
  let [displayedUsers, setDisplayedUsers]=useState<Array<UserTableProps>>([])
  const columnsNames=['Name','Role','Email ID','Phone','Department','Location', 'Delete', 'Status']
  let [page, setPage] = useState<number>(-1)
  let [rowsPerPage, setRowsPerPage] = useState<number>(10)
  const [orderBy] = useState<string>('name')    
  let [order, setOrder] = useState<boolean>(true)
  let [checkedAll,setCheckedAll]=useState<boolean>(false)
  

  const toggleAllCheckbox=(value: boolean)=>  {
    checkedAll=value
    setCheckedAll(checkedAll)
  }
  const handleChangePage = async (change: Change) => {
    let isNewData:boolean
  
    if(change===Change.increase)  {
      
      // console.log('~~~ 1 isNewData: ', ' page: ',page)
   
      
      // console.log('~~~ 2 isNewData: ', ' page: ',page)
      const tempPage=page+1
      isNewData=await fetchData(tempPage, rowsPerPage, order, orderBy)
      // console.log('~~~ 3 isNewData: ',isNewData, ' page: ',page)
      if(isNewData)  {
        setPage(++page)
        toggleAllCheckbox(false)
    //  setOrder(true)
      } else  {
        // setPage(--page)
      }
    } else if(page>0)  {
      const tempPage=page-1
        isNewData=await fetchData(tempPage, rowsPerPage, order, orderBy, false, true)
        if(isNewData)  {
          setPage(--page)
          toggleAllCheckbox(false)
          setOrder(true)
        } else  {
          // setPage(++page)
        }
    }
  }
  const checboxHandleChange=(e)=>  {
    let countUsers:number=0

    setDisplayedUsers(displayedUsers.map(item=>{
      if(item.id===e.target.name){
        if(e.target.checked)  {
          countUsers++
        }
        return {...item, checked: !item.checked}
      } 
      if(item.checked)  {
        countUsers++
      }
      return item
    }))
    checkUser(countUsers)
  }

    const checkboxAllCheck=(e)=> {
      displayedUsers=displayedUsers.map((item=>{
        return {...item, checked: e.target.checked}
      }))
      setDisplayedUsers(displayedUsers)
      toggleAllCheckbox(!checkedAll)
      if(e.target.checked)  {
        checkUser(displayedUsers.length)
      } else  {
        checkUser(0)
      }
    }
    const handleChangeRowsPerPage = (value) => {
      rowsPerPage=parseInt(value.item)
      setRowsPerPage(rowsPerPage)
      page=0
      setPage(0)
      fetchData(page, rowsPerPage, order, orderBy, true)
      toggleAllCheckbox(false)  
    }
    useEffect(()=>  {  
      setDisplayedUsers(users)
    },[users,])

    useEffect(()=>  { 
      totalCount=totalCountRows    
      setTotalCount(totalCountRows)
    },[totalCountRows])

    useEffect(()=>  {
      // enableBodyScroll(tableBodyRef)
    }, [])

    return totalCount?(
      <div className={styles.users_table_background}>      

      <Paper>
        <TableContainer className={styles.users_table_container}>
        <Table stickyHeader className={`${styles.users_table}`} aria-label="users table">
          <TableHead className={styles.users_table_head}>
          {<TableRow>
                {columnsNames.map((item, index)=><TableCell key={index}>{index===0?<TableSortLabel> <div className='align-self-center mr-3'>
            <CheckboxField value={checkedAll} handleChange={checkboxAllCheck} />
          </div>
          <div>{item}</div>
          <div className={styles.users_table_sort_arrow_icon} onClick={()=>{
            order=!order
            setOrder(order);
            sortOrder()
            }}>
            {order?<UpArrow />:<DownArrow />}
          </div>
          </TableSortLabel>:<TableSortLabel>{item}</TableSortLabel>
}
          </TableCell>
             )}
            </TableRow>}
          </TableHead>
          <TableBody ref={tableBodyRef} className={styles.users_table_body}>
          {displayedUsers.map(({id, name, role, department_name, location, email, phoneNo, status,isActivated,checked }, index) => (
              <TableRow className={`${checked?styles.users_table_checked_shade:index%2===0?'':styles.users_table_shade} ${styles.users_table_row}`} key={index}>
                <TableCell>
                  <div className='d-flex'>
                  <div className='align-self-center'>
                     <CheckboxField name={id} value={checked} handleChange={checboxHandleChange} />
                    </div>
                    <div>
                      <Avatar className={`${styles.user_avatar} mx-3`} src={ProfilePhoto} />
                    </div>
                    <div className='align-self-center'>
                      {name}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{role}</TableCell>
                <TableCell>{email}</TableCell>
                <TableCell>{phoneNo}</TableCell>
                <TableCell>{department_name}</TableCell>
                <TableCell>{location}</TableCell>
                <TableCell className="text-center"><Trash onClick={()=>{if(confirmDeletion){confirmDeletion(id)}}} className={`${styles.trash_icon}`}  /></TableCell>
                <TableCell><SwitchToggle disabled={!isActivated} name={id} value={isActivated?status:isActivated} handleChange={(e)=>{
                  if(updateSingleStatus)  {
                    updateSingleStatus(id, e.target.checked)
                  }
                }} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <TablePaginationFooter
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[{'item': '10'},{'item': '20'},{'item': '30'}]}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        totalCountRows={totalCount}
      />
      </Paper>  </div>  
    ):(<></>)
}
export default forwardRef(UserTable)