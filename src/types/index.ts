import { ReactFragment } from 'react'
export interface Handles {
    checkFile: () => void
    removeFile: () => void
}

export interface ForwardMethod {
    method: () => any
    method1?: () => any    
    method2?: () => any
}
export interface ListFileProps  {
    id: number
    filename: string
    extension: string
}
export interface ShipperDetailsProps    {
    userId: string
    address1: string
    company: string
    countryId: number
    countryName: string
    department_id: number
    department_name: string
    email: string
    name: string
    phoneNo: string
    requestDate: string
    status?: string
    listFile: Array<ListFileProps>
}

export interface ForwardMultipleMethod {
    method: () => void
    method1: (value: string) => void
}
export interface  UserTableForwardMethod {
    method: () => Array<any>
    method1: () => void
    method2: ()=> void
    method3: ()=> void
    method4?: ()=> void
}
export interface UserTableForwardProps { 
    users: Array<any>
    fetchData:Function
    totalCountRows: number
    updateSingleStatus?:Function
    sortOrder: Function
    confirmDeletion: Function
    checkUser: Function
}
export interface UserFilterForwardProps{ 
    fetchFilterData:Function
    userId: string 
    resetFilter: any 
}
export interface UserHeaderForwardProps{ 
    updateMultipleStatuses: Function
    addUser: Function
    searchUsers: Function 
    confirmDeletion: Function
    inviteUsers: Function
    usersSelectedCountParent: number
}
export interface CHAListHeaderForwardProps{ 
    updateMultipleStatuses: Function
    searchUsers: Function 
    confirmDeletion: Function
    usersSelectedCountParent: number
}
export interface ShipperRequestListHeaderForwardProps{ 
    updateMultipleStatuses?: Function
    searchUsers: Function 
    confirmDeletion: Function
    usersSelectedCountParent: number
}

export interface FieldProps {
    name: string
    label_text?: string
    placeholder?: string
    error?: any
    touched?: any
    handleChange?: any
    handleBlur?: any
    value?: any
    type?: any
    disabled?:boolean
    endAdor?: any
    startAdor?: any
    autoFocus?: any
}
export interface FeedbackProps {
    IconData: ReactFragment
    title: string
    content: ReactFragment
    className?: any
}

export interface AddUserDialogProps {
    dialogHandle: Function
    parentMethod?: Function
    parentMethod1?: Function
    csvData?: string    
    refreshPage?: Function
    departmentsParent?: Array<DepartmentProps>
}
export interface ChangeCurrentPasswordProps {
    dialogHandle?: any;
}
export interface UsersModalFeedbackProps {
    IconData: ReactFragment
    content: ReactFragment
    leftBtnMethod?: Function
    rightBtnMethod?: Function
    leftBtnText?: string
    rightBtnText: string
    dialogHandle: Function
    parentMethod?: Function
}

export interface AutocompleteProps {
    IconData: ReactFragment
    placeholder: string
    handleChange: Function
    options: Array<any>
    className?: any
}

export interface CompanyTileProps {
    id: string
    logo_url: string
    title: string
    place: string
    isSelected: boolean
    method: Function
}
export interface UserAddProps   {
    photo_url?: string
    firstname: string
    lastname: string
    role: string
    email: string
    phoneno: string
    department: string
    location: string
}
export interface UserTableProps {
    photo_url?: string
    id?: string    
    name: string
    role: string
    email: string
    phoneNo: string
    department_name: string
    location: string
    isInvited: boolean
    isActivated: boolean
    status: boolean
    checked?: boolean
}



export interface ShippingLinesListTableProps {
    photo_url: string
    id: string
    company_name: string
    headquarters: any
    total_no_of_ships: Number
    status: boolean
    checked?: boolean
}
export interface CHAListTableProps {
    user_id: string
    cha_agency_name: string    
    full_name: string
    created: string
    email: string
    pan__no: string
    registration_no: string
    status: boolean
    checked?: boolean
}
export enum Change {
    increase = 'increase',
    decrease = 'decrease'
}
export enum Order {
    asc = 'asc',
    desc = 'desc'
}
export interface ButtonTextMethod {
    btnMethod: Function
    btnText: string
}
export interface CHAAddDetailsProps {
    first_name?: string
    last_name?: string
    email?: string
    phone_no?: string
    cha_agency_name?: string
    registration_no?: string
    pan_based_cha_no?: string
    address1?: string
    address2?: string
    country_id?: number
    state_id?: number
    city_id?: number
    zipcode?: string
    status?: boolean
    title?: string
    subHead?: string
    leftBtn?: ButtonTextMethod
    rightBtn: ButtonTextMethod
}
export interface ShippersRequestListTableProps  {
    userId: string
    name: string
    requestDate: string
    emailId:string
    company:string
    department_name: string
    department_id?: number
    countryId?: number
    country: string
    checked?: boolean
}
export interface PlaceProps {
    id: number
    shortname?: string
    name: string
    phonecode?: string
}

export interface EditProfileProps {
    firstName?: string
    lastName?: string
    designation?: string
    phone_no?: string
    mobile?: string
    location?: string
    company?: string
    website?: string
    currentPassword?: string
    newPassword?: string
    confirmPassword?: string
    person_name?: string
    agency_name?: string
    email_id?: string
    registration_no?: string
    pan_no?: string
    address_1?: string
    address_2?: string
    zip_code?: string
    country?: Object
    state?: Object
    city?: Object
    status?: boolean
    title?: string
    subHead?: string
    leftBtn: ButtonTextMethod
    rightBtn: ButtonTextMethod
    role?: string
}
export interface ShipmentInformationProps  {
    id?: string
    booking_no: string
    lading_no: string
    status : string
    origin:string
    destination: string
    vessel_etd : string
    created_by: string
    role: string
    request_status: any
}

export interface FullDetailsProps   {
    booking_no: string
    lading_no: string
    origin: string
    destination: string
    vessel_voyage: string
    equipment_details: string
    vessel_etd: string
    carriage_condition: string
    commodity_description: string
    hs_code: string
    vgm_cut_off_time: string
    documentation_cut_off_time: string
    cargo_cut_off_time: string
    created_by: string
    role: string
    carriers_reference_no: string
    consignee_shipment_reference_no: string
    contact_no: string
    shippers_identifying_no: string
}

export interface FilterDataProps    {
    department: any
    location: any
    status: any
}

export interface DepartmentProps    {
    department_id: number
    department_name: string
}

export interface AlertsProps    {
    alertId: number
    emailStatus: boolean
    phoneStatus: boolean
}

export interface UserProfileProps   {
    address1?: string
    address2?: string
    cityId?: number
    cityName?:string
    companyName?:string
    countryId?: number
    countryName?:string
    designation?:string
    email?: string
    firstName?: string
    id?: string
    image_data?:string
    lastName?:string
    phoneNo?:string
    stateId?: number
    stateName?:string
    zipcode?: number
    registrationNo?: string
    location?: string
    departmentId?: string
    department?: string
    website?: string
    path?: string
    uploadPhotoAPI?: Function
    role?: string
}

export interface EditProfileProps extends UserProfileProps {
    status?: boolean
    title?: string
    subHead?: string
    leftBtn: ButtonTextMethod
    rightBtn: ButtonTextMethod
}

export enum role {
    Interviewer = 'Interviewer',
    Interviewee = 'Interviewee',
    HR = 'HR',
    Admin = 'admin'
}