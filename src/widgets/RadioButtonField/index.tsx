import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
export interface Props  {
  options?: any,
    value?: any,
  handleChange: any,
  className?: any,
  text?: any
}

const RadioButtonField = ({ options, value, handleChange , text }: Props) => {
  return (
    <FormControl component="fieldset">
    <FormLabel component="legend">{text}</FormLabel>
    <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
     { options.map(data => {
     return (<FormControlLabel value={data} control={<Radio />} label={data} />)
      })}
    </RadioGroup>
  </FormControl>
  )
}                            
 
export default RadioButtonField
