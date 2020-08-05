import styled from 'styled-components';

const Button = styled.button`
    border-radius: 20px;
    border: none;
    background-color: ${props => props.back ? "#CE0000" : "#050042"};
    color: white;
    &:hover{
        opacity: 0.8
    }
    font-size: 12px;
`

function ButtonRegister(props) {
    return(
        <Button {...props}>
            {props.children}
        </Button>
    )
}

export default ButtonRegister;