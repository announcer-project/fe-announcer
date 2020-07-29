import styled from 'styled-components';

const Button = styled.button`
    width: 100%;
    padding: 8px;
    border-radius: 20px;
    border: none;
    background-color: #050042;
    color: white;
    &:hover{
        opacity: 0.8
    }
`

function ButtonRegister(props) {
    return(
        <Button {...props}>
            {props.children}
        </Button>
    )
}

export default ButtonRegister;