import * as React from 'react'
import { apiService } from '../api/apiRequest';
import { Input, Dropdown, Label, Text, Button, Anchor } from 'atomize'
import Navbar from '../molecules/Navbar';

const PremiumRateInquiry = (props) => {
    const [formFields, setFormFields] = React.useState([])
    const [changeProxy, setChangeProxy] = React.useState(false)
    const [inquiry, setInquiry] = React.useState(null)
    const [premiumRate, setPremiumRate] = React.useState(null)
    const [errorMessage, setErrorMessage] = React.useState(null)

    React.useEffect(() => {
        getFormConfig();
    }, [])

    React.useEffect(() => {
        let temp = JSON.parse(JSON.stringify(formFields))

        temp.map((form_element, index) => {
            if (form_element.type === "composite") {
                if (form_element.composite_form_groups.length < form_element.count) {
                    form_element.composite_form_groups.push(form_element.composite_form_elements)
                }
            }

            return form_element
        })

        setFormFields(temp)

    }, [changeProxy])

    const getFormConfig = async () => {
        const response = await apiService.getPremiumRateFormConfig()

        if (response.status === 200) {
            let formConfig = response.data.form_elements

            formConfig.map((form_element, index) => {
                if (form_element.type === "text" || form_element.type === "dropdown") {
                    form_element.value = null
                } else if (form_element.type === "composite") {
                    form_element.value = []
                    form_element.count = 1
                    form_element.composite_form_elements.map((composite_element, i) => {
                        composite_element.value = null

                        return composite_element
                    })
                    form_element.composite_form_groups = [form_element.composite_form_elements]
                }

                return form_element
            })

            setFormFields(prev => formConfig)
        }
    }

    const dropDownList = (field, field_index) => {
        return (
            <div>
                {
                    field.options.map((option, index) => (
                        <Anchor
                            key={index}
                            d="block"
                            p={{ y: "0.25rem", x: "0.25rem" }}
                            textColor={"rgb(64,62,222)"}
                            onClick={() => {
                                let t = JSON.parse(JSON.stringify(formFields))
                                t[field_index].options.map((op, ind) => {
                                    if (ind === index) {
                                        op.selected = true
                                    } else {
                                        op.selected = false
                                    }

                                    return op
                                })
                                t[field_index].showDropdown = !!!t[field_index].showDropdown
                                setFormFields(prev => t)
                                setChangeProxy(prev => !prev)
                            }}
                        >
                            {option.label}
                        </Anchor>
                    ))
                }
            </div>
        )
    }

    const compositeDropDownList = (element, field_index, ind, inde) => {
        return (
            <div>
                {
                    element.options.map((option, index) => (
                        <Anchor
                            key={index}
                            d="block"
                            p={{ y: "0.25rem", x: "0.25rem" }}
                            textColor={"rgb(64,62,222)"}
                            onClick={() => {
                                let t = JSON.parse(JSON.stringify(formFields))

                                t[field_index].composite_form_groups[ind][inde].options.map((op, opind) => {
                                    if (opind === index) {
                                        op.selected = true
                                    } else {
                                        op.selected = false
                                    }

                                    return op
                                })
                                t[field_index].composite_form_groups[ind][inde].showDropdown = !!!t[field_index].composite_form_groups[ind][inde].showDropdown
                                setFormFields(prev => t)
                                setChangeProxy(prev => !prev)
                            }}
                        >
                            {option.label}
                        </Anchor>
                    ))
                }
            </div>
        )
    }

    const submitForm = async () => {
        let submitData = {}
        formFields.map((field, index) => {
            if (field.type === "text") {
                submitData[field.key] = field.value
            } else if (field.type === "dropdown") {
                submitData[field.key] = field.options.find((el) => el.selected).value
            } else if (field.type === "composite") {
                submitData[field.key] = []
                field.composite_form_groups.map((group, inde) => {
                    let groupVals = {}
                    group.map((element, ind) => {
                        if (element.type === "text") {
                            groupVals[element.key] = element.value
                        } else if (element.type === "dropdown") {
                            groupVals[element.key] = element.options.find((el) => el.selected).value
                        }
                    })
                    submitData[field.key].push(groupVals)
                })
            }
        })

        await apiService.submitPremiumRateInquiryForm(submitData).then((response) => {
            if (response.status === 200) {
                setInquiry(prev => submitData)
                setPremiumRate(prev => response.data.premium_rate)
                getFormConfig()
    
            } else {
                getFormConfig()
                setErrorMessage("Something went wrong, please fill the form again")
            }
        }).catch((e) => {
            getFormConfig()
            setErrorMessage("Something went wrong, please fill the form again")
        })

        let input_fields = document.getElementsByTagName("input")
        for (let i of input_fields) {
            i.value = null
        }
    }

    const purchasePlan = async () => {
        let temp = JSON.parse(JSON.stringify(inquiry))
        temp['premium_rate'] = premiumRate

        await apiService.purchaseInsurancePlan(temp).then((response) => {
            if (response.status === 200) {
                props.navigation('/purchase-summary/', { state: response.data.plan_details })
            } else {
                setErrorMessage("Insurance plan could not be purchased")
            }
        }).catch((e) => {
            setErrorMessage("Insurance plan could not be purchased")
        })
    }

    return formFields.length > 0 ?
        (
            <div>
                <Navbar navigation={props.navigation} />
                <div style={{
                    padding: 20,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <Text
                        tag="h3"
                        textSize="display1"
                        m={{ b: "1rem" }}
                        textColor={"rgb(64,62,222)"}
                    >
                        Premium Rate Inquiry Form
                    </Text>
                    {
                        formFields.map((field, field_index) => (
                            field.type === "text" ?
                                <div key={field_index}>
                                    <Label
                                        align="center"
                                        textWeight="600"
                                        m={{ b: "0.5rem" }}
                                        textColor={"rgb(64,62,222)"}
                                    >
                                        {field.label}
                                    </Label>
                                    <Input
                                        placeholder={field.label}
                                        value={field.value}
                                        onChange={(e) => {
                                            let temp = JSON.parse(JSON.stringify(formFields))
                                            temp[field_index].value = e.target.value

                                            setFormFields(temp)
                                            setPremiumRate(prev => null)
                                            setInquiry(prev => null)
                                            setChangeProxy(prev => !prev)
                                        }}
                                        m={{ b: '1rem' }}
                                        w={{ xs: 'auto', md: '40vw' }}
                                        focusBorderColor={"rgb(64,62,222)"}
                                    />
                                </div> :
                                field.type === "dropdown" ?
                                    <div>
                                        <Label
                                            align="center"
                                            textWeight="600"
                                            m={{ b: "0.5rem" }}
                                            textColor={"rgb(64,62,222)"}
                                        >
                                            {field.label}
                                        </Label>
                                        <Dropdown
                                            key={field_index}
                                            isOpen={!!field.showDropdown}
                                            onClick={() => {
                                                let temp = JSON.parse(JSON.stringify(formFields))
                                                temp[field_index].showDropdown = !!!temp[field_index].showDropdown

                                                setFormFields(prev => temp)
                                                setPremiumRate(prev => null)
                                                setInquiry(prev => null)
                                                setChangeProxy(prev => !prev)
                                            }}

                                            menu={dropDownList(field, field_index)}
                                            m={{ b: '1rem' }}
                                            w={{ xs: 'auto', md: '40vw' }}
                                            focusBorderColor={"rgb(64,62,222)"}
                                            textColor={"rgb(168, 170, 175)"}
                                        >
                                            {field.options.find((el) => el.selected)?.label || field.label}
                                        </Dropdown>
                                    </div> :
                                    field.type === "composite" ?
                                        <div
                                            style={{
                                                marginBottom: 50,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <Label
                                                align="center"
                                                textWeight="600"
                                                m={{ b: "0.5rem" }}
                                                textSize="display1"
                                                textColor={"rgb(64,62,222)"}
                                            >
                                                {field.label}
                                            </Label>
                                            {
                                                field.composite_form_groups.map((group, ind) => {
                                                    return group.map((element, inde) => (
                                                        element.type === "text" ?
                                                            <div key={inde}>
                                                                <Label
                                                                    align="center"
                                                                    textWeight="600"
                                                                    m={{ b: "0.5rem" }}
                                                                    textColor={"rgb(64,62,222)"}
                                                                >
                                                                    {element.label}
                                                                </Label>
                                                                <Input
                                                                    placeholder={element.label}
                                                                    value={element.value}
                                                                    onChange={(e) => {
                                                                        let temp = JSON.parse(JSON.stringify(formFields))
                                                                        temp[field_index].composite_form_groups[ind][inde].value = e.target.value

                                                                        setFormFields(temp)
                                                                        setPremiumRate(prev => null)
                                                                        setInquiry(prev => null)
                                                                        setChangeProxy(prev => !prev)
                                                                    }}
                                                                    m={{ b: '1rem' }}
                                                                    w={{ xs: 'auto', md: '40vw' }}
                                                                    focusBorderColor={"rgb(64,62,222)"}
                                                                />
                                                            </div> :
                                                            element.type === "dropdown" ?
                                                                <div key={inde}>
                                                                    <Label
                                                                        align="center"
                                                                        textWeight="600"
                                                                        m={{ b: "0.5rem" }}
                                                                        textColor={"rgb(64,62,222)"}
                                                                    >
                                                                        {element.label}
                                                                    </Label>
                                                                    <Dropdown
                                                                        isOpen={!!element.showDropdown}
                                                                        onClick={() => {
                                                                            let temp = JSON.parse(JSON.stringify(formFields))
                                                                            temp[field_index].composite_form_groups[ind][inde].showDropdown = !!!temp[field_index].composite_form_groups[ind][inde].showDropdown

                                                                            setFormFields(prev => temp)
                                                                            setPremiumRate(prev => null)
                                                                            setInquiry(prev => null)
                                                                            setChangeProxy(prev => !prev)
                                                                        }}

                                                                        menu={compositeDropDownList(element, field_index, ind, inde)}
                                                                        m={{ b: '1rem' }}
                                                                        w={{ xs: 'auto', md: '40vw' }}
                                                                        focusBorderColor={"rgb(64,62,222)"}
                                                                    >
                                                                        {element.options.find((el) => el.selected)?.label || element.label}
                                                                    </Dropdown>
                                                                </div> : null
                                                    ))
                                                })
                                            }
                                            <Button
                                                h="2rem"
                                                p={{ x: "1.25rem" }}
                                                textSize="body"
                                                textColor="rgb(64,62,222)"
                                                hoverTextColor="info900"
                                                bg="white"
                                                hoverBg="info200"
                                                border="1px solid"
                                                borderColor="rgb(64,62,222)"
                                                hoverBorderColor="rgb(64,62,222)"
                                                m={{ b: "0.5rem" }}
                                                onClick={(e) => {
                                                    let temp = JSON.parse(JSON.stringify(formFields))
                                                    temp[field_index].count += 1

                                                    setFormFields(prev => temp)
                                                    setChangeProxy(prev => !prev)
                                                }}
                                            >
                                                Add Member
                                            </Button>
                                        </div> :
                                        null
                        ))
                    }
                    {
                        premiumRate &&
                        <Text
                            tag="h3"
                            textSize="display1"
                            m={{ b: "1rem" }}
                            textColor={"rgb(64,62,222)"}
                        >
                            The premium rate will be Rs. {premiumRate}
                        </Text>
                    }
                    {
                        errorMessage &&
                        <Text
                            tag="h3"
                            textSize="display1"
                            m={{ b: "1rem" }}
                        >
                            {errorMessage}
                        </Text>
                    }

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
                        m={{ b: "0.5rem" }}
                        onClick={(e) => {
                            if (premiumRate) {
                                purchasePlan()
                            } else {
                                submitForm()
                            }
                        }}
                    >
                        {premiumRate ? "Buy Plan" : "Estimate Premium"}
                    </Button>
                </div>
            </div>
        ) : null
}

export default PremiumRateInquiry;