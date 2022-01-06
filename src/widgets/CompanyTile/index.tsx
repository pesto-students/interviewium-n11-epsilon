
import styles from './index.module.scss'
import {CompanyTileProps} from '../../types/index'
import CheckboxField from '../CheckboxField' 

const CompanyTile=({ id, title, logo_url, place, isSelected, method }:CompanyTileProps)=>    {
    const handleChange=()=> {
        isSelected=!isSelected
        if(method)  {
            method(id,isSelected)
        }
    }
    return (
    <div className={`${styles.company_tile_background} d-flex justify-content-around m-3 p-2`}>        
        <div className='align-self-start'>
            <img className={styles.company_logo} src={logo_url} alt={title} />
        </div>
        <div className={`${styles.company_body} align-self-start`}>
            <div className={styles.company_title}>{title}</div>
            <div className={styles.company_place}>{place}</div>
        </div>
        <div className={`${styles.company_end}`}>
            <div className={`${styles.company_checkbox}`}>
                <CheckboxField value={isSelected} handleChange={handleChange}  />
            </div>
        </div>
    </div>)
}


export default CompanyTile