import {loadStripe, Stripe, StripeElements} from '@stripe/stripe-js';

export const useStripe = () => {

    let stripePromise = Promise<Stripe | null>

    const getStripe = () => {
        if(!stripePromise){
            stripePromise = loadStripe(process.env.STRIPE_SUPER_SECRET_KEY_PUBLISHABLE_LOCAL)
        }
    }

    const createPaymentIntent = async(amount: number, metadata?:any) => {
        return await $fetch('/api/stripe/payment-intent', {
            method: 'POST',
            body: {
                amount,
                metadata
            }
        })
    }

    return{
        getStripe, 
        createPaymentIntent
    }
}