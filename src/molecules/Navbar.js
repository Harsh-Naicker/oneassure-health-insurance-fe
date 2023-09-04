import * as React from 'react'
import { Text, Button } from 'atomize';
import { useLocation } from 'react-router-dom';

const Navbar = (props) => {
    const {pathname} = useLocation();

    return (
        <div
            style={{
                padding: 20,
                width: '95%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: 'white',
            }}
        >
            <img 
                src='https://static.wixstatic.com/media/0fd5af_7e536c9b5c264f2483c076066e40ce56~mv2.png/v1/fill/w_225,h_54,al_c,lg_1,q_85,enc_auto/Logo.png'
                style={{
                    width: 150,
                    height: 36,
                }}
                onClick={() => props.navigation("/")}
            />
            <Button
                h="3rem"
                p={{ x: "1.25rem" }}
                textSize="body"
                textColor="rgb(64,62,222)"
                hoverTextColor="info900"
                bg="white"
                hoverBg="info200"
                border="1px solid"
                borderColor="rgb(64,62,222)"
                hoverBorderColor="rgb(64,62,222)"
                m={{ r: "3rem" }}
                onClick={(e) => {
                    if (localStorage.getItem('access_token')) {
                        localStorage.removeItem('access_token')
                        props.navigation('/')
                    } else {
                        if (pathname === "/login/" ) {
                            props.navigation('/')
                        } else {
                            props.navigation('/login/')
                        }
                    }
                }}
            >
                {localStorage.getItem('access_token') ? 'Logout' : pathname === "/login/" ? 'Register': 'Login'}
            </Button>
        </div>
    )
}

export default Navbar;