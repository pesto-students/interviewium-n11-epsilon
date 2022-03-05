import {useState, useEffect,useRef, createRef, } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import AddUser from './AddUser'
import Header from './Header'
import UserTable from './UserTable'
import Filter from './Filter'
import styles from './index.module.scss'
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '../../../../_store/constants/index'

import PrimaryButton from '../../../../widgets/PrimaryButton'

import {AddUser as AddUserIcon} from '../../../../utilities/images/icons/index'
import UsersModalFeedback from '../../../../widgets/UsersModalFeedback'
import { UserTableProps,UserTableForwardMethod, ForwardMethod,UsersModalFeedbackProps, } from '../../../../types/index'
import {RootState} from '../../../../_store/reducer/rootReducer'
import { userlistAPI, userlistactionsstatussingleAPI, userlistactionsstatusmultipleAPI, 
  userdeletesingleAPI,
   userdeletemultipleAPI, userlistfilterAPI,userlistsearchAPI, userinvitemultipleAPI } from '../../../../_store/apis/userManagementAPI'
const UserManagement=()=>   { 
  const dispatch=useDispatch()

  let [totalCount,setTotalCount]=useState<number>(0)
  let [usersSelectedCount, setUsersSelectedCount]=useState<number>(0)
  let [startSlice,setStartSlice]=useState<number>(0)
  let [endSlice,setEndSlice]=useState<number>(0)
  let [userId, setUserId]=useState<string>('')
  
  const userTableForwardMethodModalRef = createRef<UserTableForwardMethod>()
  const filterForwardMethodRef = useRef<ForwardMethod>(null)
  const headerForwardMethodRef= useRef<ForwardMethod>(null)

  const [user]=useSelector((state:RootState)=>{
    return [state.user];
  }) 
    const modalRef1 = useRef<UserTableForwardMethod>(null)
    const confirmDeleteModalRef= useRef<ForwardMethod>(null)
    let [users, setUsers]=useState<Array<UserTableProps>>([])
    let [displayedUsers, setDisplayedUsers]=useState<Array<UserTableProps>>([])
    let [isLoading, setIsLoading]=useState<boolean>(false)

    let [isAPInNeverCalled, setIsAPInNeverCalled]=useState<boolean>(true)
    let [hideTable, setHideTable]=useState<boolean>(false)
    let [isFiltered, setIsFiltered]=useState<boolean>(false)
    let [isSearched, setIsSearched]=useState<boolean>(false)


    useEffect(()=>  {
    },[])

    const fetchData=async (page, rowsPerPage, order, orderBy, clearArray=false,previousPage=false):Promise<boolean>=> {
      if(!isLoading)  {
        isLoading=true
        setIsLoading(true)
        
    
        if(previousPage)  {
          startSlice=(page*rowsPerPage)
          setStartSlice((page*rowsPerPage))

          endSlice=(page<=0?rowsPerPage:(page*rowsPerPage)+rowsPerPage)
          setEndSlice((page<=0?rowsPerPage:(page*rowsPerPage)+rowsPerPage))    
          setUsers(users.slice(0,endSlice)) 


          setDisplayedUsers(users.slice(startSlice,endSlice)) 
          isLoading=false
          setIsLoading(false)
          return true  
        } else  {
          let values={page: page, limit: rowsPerPage, sort_order: order?'asc':'desc', sort_by: orderBy,id: user.user.userid}, responseData
          if(isFiltered)  {
            const {department_id, location, status}=filterForwardMethodRef.current?.method()
            values={...values, ...{department_id,location,status}}
            responseData=await userlistfilterAPI(values)
          } else if(isSearched)  {
              const searchText=headerForwardMethodRef.current?.method()
              values={...values, ...{value:searchText}}
              responseData=await userlistsearchAPI(values)
          } else  {
            responseData=await userlistAPI(values)
          }
          const {status,body}=responseData
          if(status===200)  {  
          
            if(clearArray)  {
              users=[]
              setUsers([])
            }
            setTotalCount(body.total_count)
            if(body.companyUsers.length===0 && isAPInNeverCalled) {
              isAPInNeverCalled=false
              setIsAPInNeverCalled(false)
              hideTable=true
              setHideTable(true)
            }
          else if(body.companyUsers.length>0) {
            if(isAPInNeverCalled) {
              isAPInNeverCalled=false
              setIsAPInNeverCalled(false)
            }
              body.companyUsers.map(({id,name,role, department_name, location, email, phoneNo,isInvited,isActivated, status})=>users.push({id, name, role: role?role:'User', department_name, location, email, phoneNo,isInvited,isActivated, status, checked: false}))
              setUsers(users)

              startSlice=(page*rowsPerPage)
              setStartSlice((page*rowsPerPage))

              endSlice=(page<=0?rowsPerPage:(page*rowsPerPage)+rowsPerPage)
              setEndSlice((page<=0?rowsPerPage:(page*rowsPerPage)+rowsPerPage))
      
              checkUser(0) 
              setDisplayedUsers(users.slice(startSlice,endSlice)) 
              isLoading=false
              setIsLoading(false)
              return true
            }
          } 
        }
        isLoading=false
        setIsLoading(false)
        return false
      }
      return false
    } 

    const fetchFilterData=async ()=>  {
      isFiltered=true
      setIsFiltered(true)
      isSearched=false
      setIsSearched(false)
      users=[]
      setUsers([])
      displayedUsers=[]
      setDisplayedUsers([])
      refreshTable()
    }
    const searchUsers=async ()=>  {
      isSearched=true
      setIsSearched(true)
      isFiltered=false
      setIsFiltered(false)   
      users=[]
      setUsers([])
      displayedUsers=[]
      setDisplayedUsers([])
      
      refreshTable()
    }
    const updateSingleStatus=async (id, value)=> {
      const payload={
        id: id,
        status: value,
      }
      const {status,}=await userlistactionsstatussingleAPI(payload)
      if(status===200)  {   
        users=users.map(item => 
          item.id === id 
          ? {...item, status : value} 
          : item)

        setUsers(
          users.map(item => 
              item.id === id 
              ? {...item, status : value} 
              : item 
      ))
      setDisplayedUsers(users.slice(startSlice,endSlice)) 
      }
    }
    const refreshTable=()=> {
      console.log('~~~ refreshTable: ',userTableForwardMethodModalRef.current?.method1)
      userTableForwardMethodModalRef.current?.method1()
    }
    const deleteSingleUser=async (id)=> {
      const payload={
        id: id,
      }

      const {status,body}=await userdeletesingleAPI(payload)
      if(status===200)  {
        refreshTable()
        console.log('~~~ deleteSingleUser: ',userTableForwardMethodModalRef.current?.method1)
        dispatch({ type: SUCCESS_MESSAGE, payload: body?.title===undefined?'Deleted the user':body?.title })
      
      } else  {
        dispatch({ type: ERROR_MESSAGE, payload: body?.title===undefined?'Failed to connect':body?.title })
      }
    }
    const deleteMultipleUsers=async (checkedUsers: Array<UserTableProps>)=>  {
    
      let payload:Array<any>=[]
      setUsers(
        checkedUsers.map(item => {
            payload.push({id: item.id, })
            return item 
        }
      ))
      const {status,body}=await userdeletemultipleAPI({'CompanyUsers': payload})
      if(status===200)  {
          users=[]
          setUsers([])
          displayedUsers=[]
          setDisplayedUsers([])
          dispatch({ type: SUCCESS_MESSAGE, payload: body?.title===undefined?'Deleted the users':body?.title })
          refreshTable()
          checkUser(0)
      } else  {
        dispatch({ type: ERROR_MESSAGE, payload: body?.title===undefined?'Failed to connect':body?.title })
      }
    }
    const sortOrder=()=>  {
      refreshTable()
    }
    const inviteUsers=async ()=>  {
      let checkedUsers:Array<UserTableProps>=userTableForwardMethodModalRef.current?.method()!
      if(checkedUsers.length)  {
        let payload:Array<any>=[]
      
          checkedUsers.map(item => {
              payload.push({id: item.id, })
              return item 
          })
        try {
          const {status,body}=await userinvitemultipleAPI({'CompanyUsers': payload})
       
          if(status===200)  {
            
            userTableForwardMethodModalRef.current?.method3()  
              dispatch({ type: SUCCESS_MESSAGE, payload: body?.title===undefined?'Invited the users':body?.title })     
              setDisplayedUsers(users.slice(startSlice,endSlice))     
              checkUser(0)            
          } else  {
            dispatch({ type: ERROR_MESSAGE, payload: body?.title===undefined?'Failed to connect':body?.title })
          }
        } catch(err)  {
          dispatch({ type: ERROR_MESSAGE, payload: 'Failed to connect' })
        }
      }
  }
  
    const updateMultipleStatuses=async (actionType)=> {
      let checkedUsers:Array<UserTableProps>=userTableForwardMethodModalRef.current?.method()!
      if(checkedUsers.length)  {
        let payload:Array<any>=[]


          if(actionType==='Enable' || actionType==='Disable') { 
            checkedUsers.forEach(item => {
              payload.push({id: item.id, status: actionType==='Enable'})
            })
          const {status}=await userlistactionsstatusmultipleAPI({'CompanyUsers': payload})
          if(status===200)  {
                
            userTableForwardMethodModalRef.current?.method3()  
        
            let userIdExists:boolean=false
            users=users.map((userItem)=>{
              userIdExists=false
              payload.forEach((payloadItem)=> {
                if(userItem.id===payloadItem.id)  {
                  userIdExists=true
                  return 
                }
              })
              return userIdExists?{...userItem, status: actionType==='Enable', checked: false}:{...userItem, checked: false}
            })
            setDisplayedUsers(users.slice(startSlice,endSlice))     
            checkUser(0)      
          }
        }        
      
      }
    }
  
    useEffect(()=>  {
      if(user.id && userId!==user.id)  {
        userId=user.user.userid
        setUserId(user.user.userid)
        
        userTableForwardMethodModalRef.current?.method2()
      }
      
    },[user])
    let [deleteUserModalFeedbackProps, setDeleteUserModalFeedbackProps]=useState<UsersModalFeedbackProps>({
      content: <div><h4 className={`text-center font-weight-bold ${styles.deleteUserModalTitle}`}>Are you sure?</h4>
      <div className={styles.deleteUserModalDescription}>
        Do you really want to delete these user(s)?
      </div>
      </div>,
      IconData: <AddUserIcon />,
      leftBtnText: 'CANCEL',
      leftBtnMethod: ()=> {
        confirmDeleteModalRef.current?.method()
      },
      rightBtnText: 'DELETE',
      dialogHandle: ()=>{
          
      }
  })
    const confirmDeletion=(id='')=>  {
      if(id)  {
        console.log('~~~ confirmDeletion',userTableForwardMethodModalRef)
        deleteUserModalFeedbackProps={...deleteUserModalFeedbackProps,rightBtnMethod:()=>{ deleteSingleUser.bind(this,id)}}
        setDeleteUserModalFeedbackProps({...deleteUserModalFeedbackProps,rightBtnMethod:()=>{ deleteSingleUser.bind(this,id)}})
        confirmDeleteModalRef.current?.method()
      } else  {
        let checkedUsers:Array<UserTableProps>=userTableForwardMethodModalRef.current?.method()!
        if(checkedUsers.length) {
          deleteUserModalFeedbackProps={...deleteUserModalFeedbackProps,rightBtnMethod: ()=>{ deleteMultipleUsers(checkedUsers)}}
          setDeleteUserModalFeedbackProps({...deleteUserModalFeedbackProps,rightBtnMethod: ()=>{ deleteMultipleUsers(checkedUsers)}})
          confirmDeleteModalRef.current?.method()
        }
      }
    }
    const checkUser=(count: number)=> {
      usersSelectedCount=count
      setUsersSelectedCount(count)
    }
 
   

    return (
    <div className={`${styles.background}`}>
              <UsersModalFeedback ref={confirmDeleteModalRef} dialogHandle={deleteUserModalFeedbackProps.dialogHandle}  content={deleteUserModalFeedbackProps.content} IconData={deleteUserModalFeedbackProps.IconData} leftBtnText={deleteUserModalFeedbackProps.leftBtnText} rightBtnText={deleteUserModalFeedbackProps.rightBtnText} leftBtnMethod={deleteUserModalFeedbackProps.leftBtnMethod} rightBtnMethod={deleteSingleUser} />
        <AddUser ref={modalRef1} dialogHandle={()=>{}} parentMethod={()=>{
          isAPInNeverCalled=true
          setIsAPInNeverCalled(true)
          hideTable=false
          setHideTable(false)
          refreshTable()
          if(filterForwardMethodRef.current?.method1) {
            filterForwardMethodRef.current?.method1()
          }
        }}  />
        {
       ((hideTable && !isAPInNeverCalled) && <div className={`text-center ${styles.no_data_message}`}> 
          <h4>No user have been added to add users click on below button</h4><br />
          <PrimaryButton text='ADD USER' method={()=>{
              
          modalRef1?.current?.method();
          
          }}  />        
      </div>)}
   
    
      {<div className={`${hideTable?styles.hideTable:''}`}>
        <div className={styles.allMainbodyTitle}>
          <Header ref={headerForwardMethodRef} usersSelectedCountParent={usersSelectedCount} confirmDeletion={confirmDeletion} inviteUsers={inviteUsers} searchUsers={searchUsers} updateMultipleStatuses={updateMultipleStatuses} addUser={()=>{
    
          modalRef1?.current?.method();
          if(filterForwardMethodRef?.current?.method1)  {
            filterForwardMethodRef?.current?.method1()
          }
          }} />
        </div>
        
          <div className={`d-flex row`}>
            {<div className='col-2 pr-2'>
              <Filter ref={filterForwardMethodRef} fetchFilterData={fetchFilterData}  userId={userId} resetFilter={()=>{
                isFiltered=false
              setIsFiltered(false)
              refreshTable()
              if(filterForwardMethodRef.current?.method2) {
                filterForwardMethodRef.current.method2()
              }
              }} />
            </div>}
            <div className='col-10'>  {<UserTable ref={userTableForwardMethodModalRef} checkUser={checkUser} confirmDeletion={confirmDeletion} sortOrder={sortOrder} updateSingleStatus={updateSingleStatus} users={displayedUsers} fetchData={fetchData} totalCountRows={totalCount} />}</div>
            </div></div>}
     
      </div>
      )
}

export default UserManagement