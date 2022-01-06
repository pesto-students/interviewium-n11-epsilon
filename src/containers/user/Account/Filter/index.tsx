import {useEffect,useState} from 'react'
import styles from './index.module.scss'
import SelectField from '../../../../widgets/SelectField'
import TableFilter from '../../../../widgets/TableFilter'

const Filter=({filteredData})=>   {

    const [role,setRole]=useState({'item':'User'})
    const [department,setDepartment]=useState({'item':'Sales'})
    const [location,setLocation]=useState({'item':'Bengaluru'})
    useEffect(()=>  {
        if(false)   {
            filteredData()
        }
    })
    return (
        <div className={`${styles.filter_background}`}>
            <TableFilter filterBody={<>
                <SelectField className={styles.filter_select_field} value={role} label='Role' name='Role' attributeName='item' options={[{'item':'User'},{'item':'Admin'},{'item':'CHA'}]} methodHandleChange={setRole} />
                <SelectField className={styles.filter_select_field} value={department} label='Department' name='Department' attributeName='item' options={[{'item':'Sales'},{'item':'Supply Chain'},{'item':'Admin'}]} methodHandleChange={setDepartment} />
                <SelectField className={styles.filter_select_field} value={location} label='Location' name='Location' attributeName='item' options={[{'item':'Bengaluru'},{'item':'Mumbai'},{'item':'Chennai'}]} methodHandleChange={setLocation} /></>} />             
            </div>
    )
}

export default Filter