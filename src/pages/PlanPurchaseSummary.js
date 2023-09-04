import * as React from 'react'
import { useLocation } from 'react-router-dom';
import { Text, Row, Col, Div } from 'atomize';
import Navbar from '../molecules/Navbar';

const PlanPurchaseSummary = (props) => {
    const { state } = useLocation();
    return (
        <div style={{ display: 'flex', flexDirection: 'column'}}>
            <Navbar navigation={props.navigation} />

            <div style={{
                padding: 20,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '90%',
                alignSelf: 'center'
            }}>
                <Text
                    tag="h3"
                    textSize="display1"
                    m={{ b: "1rem" }}
                    textColor={"rgb(64,62,222)"}
                >
                    Plan Purchase Summary
                </Text>
                <table style={{ width: '60%', display: 'flex', flexDirection: 'column', borderCollapse: 'collapse'}}>
                    <tbody>
                    <tr style={{ display: 'flex', justifyContent: 'space-around', borderColor: "rgb(64,62,222)", borderWidth: 1, borderStyle: 'solid'}}>
                        <td>
                            <Text
                                tag="h3"
                                textSize="display0"
                                textColor={"rgb(64,62,222)"}
                            >
                                City tier
                            </Text>
                        </td>
                        <td>{state.city_tier}</td>
                    </tr>
                    <tr style={{ display: 'flex', justifyContent: 'space-around', borderColor: "rgb(64,62,222)", borderWidth: 1, borderStyle: 'solid'}}>
                        <td>
                            <Text
                                tag="h3"
                                textSize="display0"
                                textColor={"rgb(64,62,222)"}
                            >
                                Cover amount
                            </Text>
                        </td>
                        <td>Rs. {state.cover_amount}</td>
                    </tr>
                    <tr style={{ display: 'flex', justifyContent: 'space-around', borderColor: "rgb(64,62,222)", borderWidth: 1, borderStyle: 'solid'}}>
                        <td>
                            <Text
                                tag="h3"
                                textSize="display0"
                                textColor={"rgb(64,62,222)"}
                            >
                                Premium rate
                            </Text>
                        </td>
                        <td>Rs. {state.premium_rate}</td>
                    </tr>
                    <tr style={{ display: 'flex', justifyContent: 'space-around', borderColor: "rgb(64,62,222)", borderWidth: 1, borderStyle: 'solid'}}>
                        <td>
                            <Text
                                tag="h3"
                                textSize="display0"
                                textColor={"rgb(64,62,222)"}
                            >
                                Tenure
                            </Text>
                        </td>
                        <td>{state.tenure} years</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PlanPurchaseSummary;