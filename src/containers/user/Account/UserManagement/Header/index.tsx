
import { useEffect, useState, ForwardRefRenderFunction, forwardRef, useImperativeHandle } from 'react'
import styles from './index.module.scss'
import PrimaryButton from '../../../../../widgets/PrimaryButton'
import TertiaryButton from '../../../../../widgets/TertiaryButton'
import SearchTextField from '../../../../../widgets/SearchTextField'
import SelectField from '../../../../../widgets/SelectField'
import { UserHeaderForwardProps,} from '../../../../../types/index'

import {ForwardMethod} from '../../../../../types/index'

const Header: ForwardRefRenderFunction<ForwardMethod, UserHeaderForwardProps> = ({ inviteUsers,updateMultipleStatuses, addUser, searchUsers, confirmDeletion=()=>{},usersSelectedCountParent }, ref) => {  

    useImperativeHandle(ref, () => ({
        method: () => {
            return searchText
        },
    }))
    let [usersSelectedCount, setUsersSelectedCount]=useState<number>(0)
    const [action,]=useState({'item':'Actions'})
    let [searchText, setSearchText]=useState<string>('')

    useEffect(()=>  {
        usersSelectedCount=usersSelectedCountParent
        setUsersSelectedCount(usersSelectedCountParent)
    },[usersSelectedCountParent])
    const onKeyPress=(text)=>  {
        searchText=text
        setSearchText(text)
        searchUsers()           
    }
    return (
        <div className={`d-flex justify-content-between m-0 p-0 ${styles.header} ${styles.customUsertble}`}>
            <div className={styles.innerBodytitle}>User List</div>
            
            <div className='d-flex justify-content-between align-items-center m-0 p-0'>
                {usersSelectedCount?<div className={styles.users_selected_count}>
                    {usersSelectedCount} Users selected
                </div>:null}
                <div className={`${styles.search_text_field_box} mx-2`}>
                    <SearchTextField className={styles.search_text_field} onKeyPress={onKeyPress} name='search' type='text'  placeholder='Search' onPress={searchUsers}   />               
                </div>
                <div className={`${styles.header_select_field} mx-2`}>
                    <SelectField disabled={usersSelectedCount<1} name='Actions' attributeName='item' value={action} options={[{'item':'Actions'},{'item':'Enable'},{'item':'Disable'},{'item':'Delete'}]} methodHandleChange={(value)=>{
                        if(value.item==='Enable' || value.item==='Disable')    {
                            updateMultipleStatuses(value.item);
                        }   else if(value.item==='Delete')    {
                            confirmDeletion()
                        }
                    }} className={styles.header_select_field_global}     />
                </div>
                <div className={`${styles.terinary_button} mx-2`}>
                    <TertiaryButton className={styles.header_button} text={'INVITE USER'} method={()=>{inviteUsers()}} />
                </div>
                <div className={`${styles.primary_button} ml-2`}>                
                    <PrimaryButton className={styles.header_add_button} text={'ADD USER'} method={addUser} />
                </div>
            </div>
        </div>
    )
}
export default forwardRef(Header)