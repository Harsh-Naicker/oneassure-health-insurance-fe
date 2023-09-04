import * as React from 'react'
import { useLocation } from 'react-router-dom';
import { Text } from 'atomize';

const PlanPurchaseSummary = (props) => {
    const {state} = useLocation();
    return (
        <div style={{
            padding: 20,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <Text
                tag="h1"
                textSize="display2"
                m={{ b: "1rem" }}
            >
               Plan purchased successfully!
            </Text>
            <Text
                tag="h1"
                textSize="display1"
                m={{ b: "1rem" }}
            >
               Tier: {state.city_tier}
            </Text>
            <Text
                tag="h1"
                textSize="display1"
                m={{ b: "1rem" }}
            >
               Cover amount: Rs.{state.cover_amount}
            </Text>
            <Text
                tag="h1"
                textSize="display1"
                m={{ b: "1rem" }}
            >
               Premium rate: Rs.{state.premium_rate}
            </Text>
            <Text
                tag="h1"
                textSize="display1"
                m={{ b: "1rem" }}
            >
               Tenure: {state.tenure} years
            </Text>
        </div>
    )
}

export default PlanPurchaseSummary;