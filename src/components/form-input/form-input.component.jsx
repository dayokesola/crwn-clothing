import { Group, FormInputLabel, Input } from './form-input.styles';

const FormInput = (props) => {
    const { label, ...otherProps } = props;
    return (
        <Group>
            <Input {...otherProps} />
            { //if label exists
                label &&
                (<FormInputLabel shrink={otherProps.value.length}>
                    {label}
                </FormInputLabel>)
            }
        </Group>
    );
}
export default FormInput;