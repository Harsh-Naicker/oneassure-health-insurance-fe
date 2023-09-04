import * as React from 'react'
import { apiService } from '../api/apiRequest'
import { Input, Dropdown, Label, Text, Button, Anchor } from 'atomize'
import { Link } from 'react-router-dom'

const UserLogin = (props) => {
    const [formFields, setFormFields] = React.useState([])
    const [submitData, setSubmitData] = React.useState({})
    const [message, setMessage] = React.useState(null)

    React.useEffect(() => {
        getFormConfig()
    }, [])

    const getFormConfig = async () => {
        const response = await apiService.getUserLoginFormConfig()
        if (response.status === 200) {

            let submitData = {};

            response.data.form_fields.map((field, index) => {
                submitData[field.key] = null;

                if (field.type === "dropdown") {
                    field.showDropdown = false
                }

                return field
            })

            setFormFields(response.data.form_fields)
            setSubmitData(submitData)
        }
    }

    const submitForm = async () => {
        const response = await apiService.submitUserLoginForm(submitData)
        if (response.status === 200) {
            let temp = submitData
            Object.keys(temp).map((key, i) => {
                temp[key] = null
            })

            console.log(temp)
            let input_fields = document.getElementsByTagName("input")
            for (let i of input_fields) {
                i.value = null
            }

            setSubmitData(prev => temp)
            setMessage(prev => response.data.message)

            localStorage.setItem("access_token", response.data.access_token)
            props.navigation("/home/")
        } else {
            setMessage(prev => response.data.message)
        }
    }


    const menuList = (options, field_index, key) => {
        return (
            options.map((option, index) => (
                <Anchor 
                    d="block" 
                    p={{ y: "0.25rem" }}
                    onClick={() => {
                        let temp = submitData
                        temp[key] = option.value

                        setSubmitData(temp)

                        let t = formFields
                        t[field_index].showDropdown = !t[field_index].showDropdown
                        setFormFields(prev => t)
                    }}
                >
                    {option.label}
                </Anchor>
            ))
        )
    }

    return formFields?
    (
        <div style={{
            padding: 20,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <Text 
                tag="h1" 
                textSize="display3" 
                m={{ b: "1rem" }}
            >
                Welcome to OneAssure
            </Text>
            <Text 
                tag="h3" 
                textSize="display1" 
                m={{ b: "0.5rem" }}
            >
                Please login
            </Text>
            {
                formFields.map((field, index) => (
                    field.type === "text"? 
                    <div>
                        <Label align="center" textWeight="600" m={{ b: "0.5rem" }}>{field.label}</Label>
                        <Input 
                            key={index}
                            placeholder={field.label}
                            value={submitData[field.key]}
                            onChange={(e) => {
                                let temp = submitData
                                temp[field.key] = e.target.value

                                setSubmitData(temp)
                            }}
                            m={{b: '1rem'}}
                            w={{ xs: 'auto', md: '40vw' }}
                        /> 
                    </div>:
                    field.type === "dropdown"?
                    <Dropdown 
                        isOpen={field.showDropdown}
                        onClick={() => {
                            let temp = formFields
                            temp[index].showDropdown = !temp[index].showDropdown

                            setFormFields(prev => temp)
                        }}
                        menu={menuList(field.options, index, field.key)}
                    /> : 
                    null
                ))
            }
            <Button
                h="3rem"
                p={{ x: "1.25rem" }}
                textSize="body"
                textColor="info700"
                hoverTextColor="info900"
                bg="white"
                hoverBg="info200"
                border="1px solid"
                borderColor="info700"
                hoverBorderColor="info900"
                m={{ r: "0.5rem" }}
                onClick={(e) => submitForm()}
            >
                Login
            </Button>
            {message && 
                <Text 
                    tag="h4" 
                    textSize="display1" 
                    m={{ b: "0.5rem" }}
                >
                    {message}
                </Text>
            }
        </div>

    ) : null
}

export default UserLogin