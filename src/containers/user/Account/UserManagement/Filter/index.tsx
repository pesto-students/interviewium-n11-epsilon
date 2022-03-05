import { useEffect,useState, ForwardRefRenderFunction, forwardRef, useImperativeHandle } from 'react'
import { UserFilterForwardProps,} from '../../../../../types/index'
import styles from './index.module.scss';
import SelectField from '../../../../../widgets/SelectField';
import TableFilter from '../../../../../widgets/TableFilter';
import PrimaryButton from '../../../../../widgets/PrimaryButton';
import { userlistfiltervaluesAPI } from '_store/apis/searchFilterAPI';
import {ForwardMethod} from '../../../../../types/index'

let Filter: ForwardRefRenderFunction<ForwardMethod, UserFilterForwardProps> = ({ fetchFilterData,  userId, resetFilter }, ref) => {  
    useImperativeHandle(ref, () => ({
        method: () => {
            
            return {department_id: department.department_name==='All'?null:department.department_id,location:location.name==='All'?null:location.name.toLowerCase(), status: status.name==='All'?null:status.name==='Enable'}
        },
        method1: ()=>   {
            fetchSearch()
        },
        method2: ()=>    {
            setDepartment(departments[0])
            setLocation(locations[0])
            setStatus(statuses[0])
        }
    }))
    // let [displayedUser, setDisplayedUser] = useState<any>(null);
    
    let [department, setDepartment] = useState<any>(null);
    let [departments, setDepartments] = useState<Array<any>>([]);
    

    let [location, setLocation] = useState<any>(null);
    let [locations, setLocations] = useState<Array<any>>([]);

    let [status, setStatus] = useState<any>(null);
    let [statuses, setStatuses] = useState<Array<any>>([]);

    let tempDepartments: Array<any> = [];
    let tempLocations: Array<any> = [];
    let tempStatuses: Array<any> = [];


    let fetchSearch = async () => {
        try {
        let { status, body } = await userlistfiltervaluesAPI();
        if (status === 200) {
            body.department.map((item) =>(Object.keys(item).length !== 0) && tempDepartments.push({department_id: item.department_id, department_name: item.department_name.charAt(0).toUpperCase() + item.department_name.slice(1)})
            )
            tempDepartments.unshift({department_name: 'All'})
            setDepartment(tempDepartments[0]);
            setDepartments(tempDepartments);
            body.location.map((item) => tempLocations.push({name: item.name.charAt(0).toUpperCase() + item.name.slice(1)})!)

            tempLocations.unshift({name: 'All'})
            setLocation(tempLocations[0]);
            setLocations(tempLocations);

            body.status.map((item) => tempStatuses.push({name: item.name?'Enable':'Disable'})!)
            tempStatuses.unshift({name: 'All'})
            setStatus(tempStatuses[0]);
            setStatuses(tempStatuses);

        }
    }
    catch(err)  {
        // dispatch({ type: ERROR_MESSAGE, payload: 'Failed to connect'  })
    
    }
    }


    useEffect(() => {
      
        if (userId) {
            // displayedUser=userId
            // setDisplayedUser(userId)
            fetchSearch()
        }

    }, [userId,]);




    return (
        <div className={`${styles.filter_background}`}>
            <TableFilter onReset={resetFilter} filterBody={<>


                <SelectField className={styles.filter_select_field} value={department} label='Department' name='Department' attributeName='department_name' options={departments} methodHandleChange={setDepartment} />
                <SelectField className={styles.filter_select_field} value={location} label='Location' name='Location' attributeName='name' options={locations} methodHandleChange={setLocation} />
                <SelectField className={styles.filter_select_field} value={status} label='Status' name='Status' attributeName='name' options={statuses} methodHandleChange={setStatus} />
                <div className={`${styles.primary_button} ml-2`}>                
                <PrimaryButton className={styles.header_add_button} text={'SEARCH'} method={()=>{
                    
                    fetchFilterData()}} />
                </div>
                </>
                
            } />
        </div>
    )
}
export default forwardRef(Filter)