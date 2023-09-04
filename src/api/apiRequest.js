import axios from "axios";

let headers = {
    "Content-Type": "application/json",
    "User-Agent": "okhttp",
    "Cache-Control": "no-cache",
};

const api_client = axios.create({
    // baseURL: 'https://oneassure-health-insurance-demo.onrender.com/',
    baseURL: 'http://127.0.0.1:5000/',
    headers: headers,
    timeout: 5000,
})

function getUserRegistrationFormConfig() {
    return api_client.get('get-registration-form-config/')
}

function getUserLoginFormConfig() {
    return api_client.get('get-login-form-config/')
}

function getPremiumRateFormConfig()  {
    return api_client.get('get-premium-rate-form-config/',{
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token')
        }
    })
}

function submitUserRegistrationForm(json) {
    return api_client.post('register-user/', json)
}

function submitUserLoginForm(json) {
    return api_client.post('login-user/', json)
}

function submitPremiumRateInquiryForm(json) {
    return api_client.post('get-premium-rate/', json, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token')
        }
    })
}

function checkIsUserLoggedIn() {
    return api_client.get('is-user-logged-in/',{
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token')
        }
    })
}

function purchaseInsurancePlan(json) {
    return api_client.post('purchase-insurance-plan/', json,{
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token')
        }
    })
}

export const apiService = {
    getUserRegistrationFormConfig,
    getUserLoginFormConfig,
    getPremiumRateFormConfig,
    submitUserRegistrationForm,
    submitUserLoginForm,
    submitPremiumRateInquiryForm,
    checkIsUserLoggedIn,
    purchaseInsurancePlan
}